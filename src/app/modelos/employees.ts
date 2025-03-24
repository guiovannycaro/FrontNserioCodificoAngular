export class Employees{

  empid: number;
  lastname:  string;
  firstname:string;
  title:string;
  titleofcourtesy:string;
  birthdate :Date;
  hiredate:Date;
  address :string;
  city :string;
  region:string;
  postalcode :string;
  country :string;
  phone :string;
  mgrid :number;


  constructor(){
  this.empid = 0;
  this.lastname = "";
  this.firstname = "";
  this.title="";
  this.titleofcourtesy="";
  this.birthdate =new Date();
  this.hiredate= new Date();
  this.address ="";
  this.city="";
  this.region ="";
  this.postalcode="";
  this.country ="";
  this.phone ="";
  this.mgrid =0;
  }

}
