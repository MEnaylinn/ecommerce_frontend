import { useDispatch, useSelector } from "react-redux";

import CartList from "./CartList";
import { getToken } from "../auths/authSlice";
import { useEffect } from "react";
import { fetchAllCartItem, getAllCartItems, getStatus } from "./cartItemSlice";
import AddressCart from "../shipping/AddressCard";
import CartBill from "./CartBill";

const ShoppingCard = () => {
  const status = useSelector(getStatus);
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  

  console.log(status);
  console.log(token);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllCartItem(token));
    }
  }, [status, token, dispatch]);

  const cartItems = useSelector(getAllCartItems);
  console.log(cartItems);

  let content = ''
  if (status === "success") {
    cartItems.map((item) => console.log(item.id));
    content = <CartList items={cartItems} />;
  } else {
    content = "There is no cart item added.";
  }

  return (
    <div className="container bg-info">
      <p className="fs-4 fw-bold">Shopping Cart</p>
      {content}
      <div className="row">
        <div className="col-lg">
          
        </div>
        <div className="col-lg">
          <CartBill items={cartItems}/>
        </div>
      </div>
    </div>
  );
};
export default ShoppingCard;
