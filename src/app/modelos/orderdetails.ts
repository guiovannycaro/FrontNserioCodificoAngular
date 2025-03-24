export class OrderDetails {

  orderid: number;
  productid: number;
  unitprice: number;
  qty: number;
  discount: number;

  constructor() {
    this.orderid = 0;
    this.productid = 0;
    this.unitprice = 0.0;
    this.qty = 0;
    this.discount = 0.0;
  }
}
