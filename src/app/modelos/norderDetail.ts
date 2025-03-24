export class NOrderDetail {

  orderid: number;
  custid: number;
  empid: number;
  orderdate: Date;
  requireddate: Date;
  shippeddate: Date;
  shipperid:number;
  freight:number;
  shipname:string;
  shipaddress:string;
  shipcity:string;
  shipregion :string;
  shippostalcode:string;
  shipcountry :string;
  productid:number;
  unitprice:number;
  qty:number;
  discount:number;

  constructor() {
    this.orderid = 0;
    this.custid = 0;
    this.empid = 0;
    this.orderdate = new Date();
    this.requireddate =  new Date();
    this.shippeddate =  new Date();
    this.shipperid=0;
    this.freight=0;
    this.shipname="";
    this.shipaddress="";
    this.shipcity="";
    this.shipregion ="";
    this.shippostalcode="";
    this.shipcountry="";
    this.orderid = 0;
    this.productid = 0;
    this.unitprice = 0.0;
    this.qty = 0;
    this.discount = 0.0;
  }
}

