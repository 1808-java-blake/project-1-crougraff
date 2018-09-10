import { Reimb } from "./reimb";

export class User{
    usersId = 0;
    username = '';
    password = '';
    userFirstName = '';
    userLastName = '';
    userEmail = '';
    userRoleId = 0;
    reimbs: Reimb[] = [];
    constructor(usersId?:number,username?:string,password?:string,userFirstName?:string,userLastName?:string,
    userEmail?:string,userRoleId?:number,reimbs?:any
    ){
        usersId && (this.usersId = usersId);
        username && (this.username = username);
        password && (this.password = password);
        userFirstName && (this.userFirstName = userFirstName);
        userLastName && (this.userLastName = userLastName);
        userEmail && (this.userEmail = userEmail);
        userRoleId && (this.userRoleId = userRoleId);
        reimbs && (this.reimbs = reimbs);
    }
}