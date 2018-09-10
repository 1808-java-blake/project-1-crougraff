export class Reimb{
    reimbId = 0;
    reimbAmount = 0;
    reimbSubmitted = '';
    reimbResolved = '';
    reimbDescription = '';
    reimbResolver = 0;
    reimbAuthor = 0;
    reimbStatusId = 0;
    reimbTypeId = 0;

    constructor(reimbId?:number,reimbAmount?:number,reimbSubmitted?:string,
    reimbResolved?:string,reimbDescription?:string,reimbResolver?:number,
    reimbAuthor?:number,reimbStatusId?:number,reimbTypeId?:number){
        reimbId && (this.reimbId = reimbId);
        reimbAmount && (this.reimbAmount = reimbAmount);
        reimbSubmitted && (this.reimbSubmitted = reimbSubmitted);
        reimbResolved && (this.reimbResolved = reimbResolved);
        reimbDescription && (this.reimbDescription = reimbDescription);
        reimbResolver && (this.reimbResolver = reimbResolver);
        reimbAuthor && (this.reimbAuthor = reimbAuthor);
        reimbStatusId && (this.reimbStatusId = reimbStatusId);
        reimbTypeId && (this.reimbTypeId = reimbTypeId);
    }
}