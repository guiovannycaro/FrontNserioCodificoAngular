export class Customers{

  custid:number;
  companyname:string;
  contactname:string;
  contacttitle:string;
  address:string;
  city:string;
  region:string;
  postalcode:string;
  country:string;
  phone:string;
  fax:string;


  constructor(){
  this.custid = 0;
  this.companyname = "";
  this.contactname = "";
  this.contacttitle="";
  this.address="";
  this.city ="";
  this.region="";
  this.postalcode ="";
  this.country="";
  this.phone ="";
  this.fax ="";
  }

}
