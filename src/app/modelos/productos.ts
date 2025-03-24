export class Products {

  productid: number;
  productname:string;
  supplierid: number;
  categoryid: number;
  unitprice: number;
  discontinued: boolean;




  constructor() {
    this.productid = 0;
    this.productname = "";
    this.supplierid = 0;
    this.categoryid = 0;
    this.unitprice =  0;
    this.discontinued =  true;
  }
}
