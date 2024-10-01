import { useDispatch, useSelector } from "react-redux";

import CartList from "./CartList";
import { getToken } from "../auths/authSlice";
import { useEffect } from "react";
import { fetchAllCartItem, getAllCartItems, getStatus } from "./cartItemSlice";
import CartBill from "./CartBill";
import { Link } from "react-router-dom";
import { getStatus as getProductStatus } from "../products/productSlice";

const ShoppingCard = () => {
  const status = useSelector(getStatus);
  const productStatus = useSelector(getProductStatus)
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const cartItems = useSelector(getAllCartItems);

  console.log(status);
  console.log(token);

  useEffect(() => {
    if (status === "idle" || productStatus === "idle") {
      dispatch(fetchAllCartItem(token));
    }
  }, [status, productStatus, token, dispatch]);

  console.log(cartItems);

  let heading = "";
  if (cartItems && cartItems.length > 0) {
    heading = <p className="fs-5 fw-bold">Your Orders</p>;
  } else {
    heading = (
      <div className="fs-5 fw-bold">
        <p >There is no order in your shopping cart.</p>
        <Link to={"/"}>Go to shopping.</Link>
      </div>
    );
  }

  let content = "";
  if (status === "success") {
    cartItems.map((item) => console.log(item.id));
    content = <CartList items={cartItems} />;
  } else {
    content = "There is no cart item added.";
  }

  return (
    <div className="container">
      {heading}
      {content}
      <div className="row">
        <div className="col-lg"></div>
        <div className="col-lg">
          <CartBill items={cartItems} />
        </div>
      </div>
    </div>
  );
};
export default ShoppingCard;
