import React, { useState } from "react";
import { imagePath } from "../../config/pathConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  getAllCartItems,
  updateCartItem,
} from "./cartItemSlice";
import { getToken } from "../auths/authSlice";

const CartItem = ({ item }) => {
  const cartItems = useSelector(getAllCartItems);
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const [statusCode, setStatusCode] = useState("idle");

  // useEffect(()=>{
  //   if(token && getStatus === 'idle'){
  //       dispatch(fetchAllCartItem(token))
  //   }
  // },[getStatus,token,dispatch])

  const onSubAction = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const cartItem = cartItems.filter(
      (cartItem) => cartItem.id === Number(e.target.value)
    );
    console.log({ cartItem });

    const updateItem = cartItem[0].quantity -1;


    if (cartItem && token && updateItem > 0) {
      setStatusCode("pending");
      dispatch(
        updateCartItem({
          cartItemId: Number(cartItem[0].id),
          quantity: Number(cartItem[0].quantity - 1),
          token: String(token),
        })
      );
    }else{
      // delete when subration is zero
      if (token) {
        setStatusCode("pending");
        dispatch(
          deleteCartItem({
            cartItemId: Number(cartItem[0].id),
            token: String(token),
          })
        );
      }

    }
  };

  const onAddAction = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const cartItem = cartItems.filter(
      (cartItem) => cartItem.id === Number(e.target.value)
    );
    console.log(cartItem);

    if (cartItem && token) {
      setStatusCode("pending");
      dispatch(
        updateCartItem({
          cartItemId: Number(cartItem[0].id),
          quantity: Number(cartItem[0].quantity + 1),
          token: String(token),
        })
      );
    }
  };

  const onDeleteAction = (e) => {
    e.preventDefault();

    if (token) {
      setStatusCode("pending");
      dispatch(
        deleteCartItem({
          cartItemId: Number(e.currentTarget.value),
          token: String(token),
        })
      );
    }
  };

  return (
    <section>
      <div className="modal fade" tabIndex="-1" id="confirmation-modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmation</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Remove item from shipping cart?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-primary">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="row">
          <div className="col">
            <img
              src={`${imagePath}/${item.product.id}.jpg`}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-lg">
            <div className="card-body">
              <h5 className="card-title fw-bold">{item.product.name}</h5>
              <p className="card-text">{item.product.description}</p>
            </div>
          </div>

          <div className="col d-flex align-self-center text-center">
            <div className="col">
              <button
                className="btn btn-info"
                onClick={onSubAction}
                value={item.id}
              >
                -
              </button>
            </div>
            <div className="col-5 align-self-center">{item.quantity}</div>
            <div className="col">
              <button
                className="btn btn-info "
                onClick={onAddAction}
                value={item.id}
              >
                +
              </button>
            </div>
          </div>

          <div className="col align-self-center text-center mt-3 fw-bold">
            <p>$ {(item.product.price * item.quantity).toFixed(2)}</p>
          </div>

          <div className="col align-self-center text-end">
            <button
              className="btn btn-info "
              value={item.id}
              onClick={onDeleteAction}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartItem;
