export class Orders {

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

  }
}
