CREATE TABLE expense_reimbursement_system.ers_reimbursement
(
    "REIMB_ID" numeric NOT NULL,
    "REIMB_AMOUNT" numeric NOT NULL,
    "REIMB_SUBMITTED" timestamp without time zone NOT NULL,
    "REIMB_RESOLVED" timestamp without time zone NOT NULL,
    "REIMB_DESCRIPTION" character varying(250) NOT NULL,
    "REIMB_RESOLVER" numeric NOT NULL,
    "REIMB_AUTHOR" numeric NOT NULL,
    "REIMB_STATUS_ID" numeric NOT NULL,
    "REIMB_TYPE_ID" numeric NOT NULL,
    PRIMARY KEY ("REIMB_ID")
)
WITH (
    OIDS = FALSE
);

ALTER TABLE expense_reimbursement_system.ers_reimbursement
    OWNER to postgres;
CREATE TABLE expense_reimbursement_system.ers_users
(
    ers_users_id numeric NOT NULL,
    ers_username character varying(50) NOT NULL,
    ers_password character varying(50) NOT NULL,
    user_first_name character varying(100) NOT NULL,
    user_last_name character varying(100) NOT NULL,
    user_email character varying(150) NOT NULL,
    user_role_id numeric NOT NULL,
    PRIMARY KEY (ers_users_id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE expense_reimbursement_system.ers_users
    OWNER to postgres;
CREATE TABLE expense_reimbursement_system.ers_reimbursement_type
(
    reimb_type_id numeric NOT NULL,
    reimb_type character varying(10) NOT NULL,
    PRIMARY KEY (reimb_type_id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE expense_reimbursement_system.ers_reimbursement_type
    OWNER to postgres;
CREATE TABLE expense_reimbursement_system.ers_user_roles
(
    ers_user_role_id numeric NOT NULL,
    user_role character varying NOT NULL,
    PRIMARY KEY (ers_user_role_id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE expense_reimbursement_system.ers_user_roles
    OWNER to postgres;
CREATE TABLE expense_reimbursement_system.ers_reimbursement_status
(
    reimb_status_id numeric NOT NULL,
    reimb_status character varying(10) NOT NULL,
    PRIMARY KEY (reimb_status_id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE expense_reimbursement_system.ers_reimbursement_status
    OWNER to postgres;

