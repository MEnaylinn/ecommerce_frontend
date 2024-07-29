import React from "react";
import { Link } from "react-router-dom";

const CartBill = ({ items }) => {
  let totalBill = 0.0;
  let totalDiscount = 0.0;
  let netTotal = 0.0;

  if(items){
  items.forEach((element) => {
    totalBill += element.subTotal;
    totalDiscount +=
      element.quantity *
      (element.product.price * (element.product.discountPercent / 100));
  });
}
  netTotal = totalBill - totalDiscount;

  return (
    <section>
      <div className="card billing-details mb-5">
        <div className="card-title fw-bold fs-5">Order Summary</div>
        <div className="d-grid gap-3 ps-3">
        <div className="row">
          <div className="col">Total :</div>
          <div className="col">{totalBill.toFixed(2)}</div>
        </div>
        <div className="row">
          <div className="col">Discount :</div>
          <div className="col">{totalDiscount.toFixed(2)}</div>
        </div>
       
        <div className="input-group mb-3 pe-5">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Voucher Code"
            aria-label="voucher-code"
            aria-describedby="button-addon2"
          />
          <button className="btn btn-info" type="button" id="button-addon2">
            APPLY
          </button>
        </div>

        <div className="row fw-bold fs-5">
          <div className="col">Net Total :</div>
          <div className="col">{netTotal.toFixed(2)}</div>
        </div>

        <button className="btn btn-warning w-70 m-auto"><Link to={'/shipping/'} className="btn">PROCEED TO CHECKOUT</Link></button>
        </div>
      </div>
    </section>
  );
};

export default CartBill;
