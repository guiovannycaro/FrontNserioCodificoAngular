export class DetailsOrders{

  orderid: number;
  companyname:string;
  contactname:string;
  productname:string;
  unitprice:number;
  qty: number;
  discount: number;


  constructor(){
  this.orderid = 0;
  this.companyname = "";
  this.contactname = "";
  this.productname="";
  this.unitprice=0;
  this.qty =0;
  this.discount= 0;

  }

}
