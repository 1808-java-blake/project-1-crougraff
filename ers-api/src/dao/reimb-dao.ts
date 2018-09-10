import { connectionPool } from "../util/connection-util";
import {Reimb} from "../model/reimb";
import {reimbConverter} from '../util/reimbursement-converter';

export async function createReimb(reimbursement: Reimb): Promise<number> {
    const client = await connectionPool.connect();
    try {
      const resp = await client.query(
        `INSERT INTO ers.ers_reimbursement
         (reimb_amount, reimb_submitted, reimb_description, reimb_author, reimb_status_id, reimb_type_id)
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING reimb_id`, [reimbursement.reimbAmount, reimbursement.reimbSubmitted,
           reimbursement.reimbDescription, reimbursement.reimbAuthor,reimbursement.reimbStatusId ,reimbursement.reimbTypeId]);
        return resp.rows[0].reimb_id;
    } finally {
      client.release();
    }
  }
  export async function getReimbsByUserId(userId: number): Promise<Reimb[]> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM ers.ers_reimbursement
             LEFT JOIN ers.ers_reimbursement_status USING (reimb_status_id)
             LEFT JOIN ers.ers_reimbursement_type USING (reimb_type_id)
             WHERE reimb_author = $1`, [userId]);
       return resp.rows.map(reimbConverter);
    }
    finally {
        client.release();
    }
}
export async function approveReimb(reimbId: number, resolver) {
    const client = await connectionPool.connect();

    try {
        const resp = await client.query(
            `UPDATE ers.ers_reimbursement r SET reimb_status_id = 2, reimb_resolver = $1,
             reimb_resolved = $2
             WHERE reimb_id = $3`, [resolver.usersId, new Date().toISOString().slice(0, 19).replace(/T/g, " "), reimbId]);
    }
    finally {
        client.release();
    }
}

export async function denyReimb(reimbId: number, resolver) {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `UPDATE ers.ers_reimbursement r SET reimb_status_id = 3, reimb_resolver = $1,
             reimb_resolved = $2
             WHERE reimb_id = $3`, [resolver.usersId, new Date().toISOString().replace(/T/g, " ").slice(0, 19), reimbId]);
    }
    finally {
        client.release();
    }
}
export async function getStatus(statusId: number): Promise<Reimb[]> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM ers.ers_reimbursement LEFT JOIN
             ers.ers_reimbursement_status USING(reimb_status_id)
             LEFT JOIN ers.ers_reimbursement_type USING(reimb_type_id)
             WHERE reimb_status_id = $1;`, [statusId]);
        return resp.rows.map(reimbConverter);
    } finally {
        client.release();
    }
}