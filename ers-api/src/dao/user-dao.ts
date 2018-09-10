import { connectionPool } from "../util/connection-util";
import { User } from "../model/user";
import { reimbConverter } from "../util/reimbursement-converter";
import { userConverter } from "../util/user-converter";
  
export async function findByUsernameAndPassword(username: string, password: string): Promise<User> {
    const client = await connectionPool.connect();
    try {
      const resp = await client.query(
        `SELECT * FROM ers.ers_users u
        WHERE u.ers_username = $1 AND u.ers_password = $2`, [username, password]);
        if(resp.rows.length === 0) {
            return null;
        }
        const user = userConverter(resp.rows[0]); 
        resp.rows.forEach((reimb) => {
          reimb.id && user.reimbs.push(reimbConverter(reimb));
        })
        return user; 
    } finally {
      client.release();
    }
  }
export async function getUserById(userId: number): Promise<User> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM ((((ers.ers_users eu
             LEFT JOIN ers.ers_user_roles ur ON eu.user_role_id = ur.ers_user_role_id) eur
             LEFT JOIN ers.ers_reimbursement er ON eur.ers_users_id = er.reimb_author) ereur
             LEFT JOIN ers.ers_reimbursement_status rs ON ereur.reimb_status_id = rs.reimb_status_id) ereurs
             LEFT JOIN ers.ers_reimbursement_type rt ON ereurs.reimb_type_id = rt.reimb_type_id) erurst
             WHERE ers_users_id = $1;`, [userId]);
        const user = userConverter(resp.rows[0]);
        resp.rows.forEach((reimb) => {
            reimb.reimb_id && user.reimbs.push(reimbConverter(reimb));
        });
        return user;
    } finally {
        client.release();
    }
}