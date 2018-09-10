import { SqlReimb } from "../dto/sql_reimb";
import { Reimb } from "../model/Reimb";
import { SqlUser } from "../dto/sql_user";

export function reimbConverter(reimb: SqlReimb){
    return new Reimb(reimb.reimb_id, reimb.reimb_amount, reimb.reimb_submitted, reimb.reimb_resolved, reimb.reimb_description, reimb.reimb_resolver, reimb.reimb_author, reimb.reimb_status, reimb.reimb_type); 
}