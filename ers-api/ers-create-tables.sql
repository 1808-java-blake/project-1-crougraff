-- set schema 'ers';
-- CREATE TABLE ers.ers_reimbursement
-- (
--      reimb_id serial NOT NULL,
--      reimb_amount numeric NOT NULL,
--      reimb_submitted timestamp without time zone NOT NULL,
--      reimb_resolved timestamp without time zone,
--      reimb_description character varying(250) NOT NULL,
--      reimb_resolver numeric,
--      reimb_author numeric NOT NULL,
--      reimb_status_id numeric NOT NULL,
--      reimb_type_id numeric NOT NULL,
--     PRIMARY KEY (reimb_id)
-- );

-- CREATE TABLE ers.ers_users
-- (
--     ers_users_id serial NOT NULL,
--     ers_username character varying(50) NOT NULL,
--     ers_password character varying(50) NOT NULL,
--     user_first_name character varying(100) NOT NULL,
--     user_last_name character varying(100) NOT NULL,
--     user_email character varying(150) NOT NULL,
--     user_role_id numeric NOT NULL,
--     PRIMARY KEY (ers_users_id)
-- );

-- CREATE TABLE ers.ers_reimbursement_type
-- (
--     reimb_type_id numeric NOT NULL,
--     reimb_type character varying(10) NOT NULL,
--     PRIMARY KEY (reimb_type_id)
-- );
-- CREATE TABLE ers.ers_user_roles
-- (
--     ers_user_role_id numeric NOT NULL,
--     user_role character varying NOT NULL,
--     PRIMARY KEY (ers_user_role_id)
-- );
-- CREATE TABLE ers.ers_reimbursement_status
-- (
--     reimb_status_id numeric NOT NULL,
--     reimb_status character varying(10) NOT NULL,
--     PRIMARY KEY (reimb_status_id)
-- );

