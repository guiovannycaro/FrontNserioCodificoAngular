export class PredictionView {

  custid: number;
  companyname:string;
  contactname: number;
  orderdate:Date;
  nexpredictedorder: Date;





  constructor() {
    this.custid = 0;
    this.companyname = "";
    this.contactname = 0;
    this.orderdate = new Date();
    this.nexpredictedorder = new Date();

  }
}



