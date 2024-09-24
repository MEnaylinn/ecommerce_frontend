import React, { useEffect, useState } from "react";
import CardPayment from "./CardPayment";
import CashOnDelivery from "./CashOnDelivery";

import BillingAddress from "./BillingAddress";
import BillingTotal from "./BillingTotal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCartItem,
  getAllCartItems,
  getStatus as cartStatus
} from "../cart/cartItemSlice";
import { getToken } from "../auths/authSlice";
import {
  fetchAllUserPayment,
  getAllUserPayment,
  getStatus as paymentStatus,
  postUserPayment,
} from "./paymentSlice";
import CardRegister from "./CardRegister";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getDefaultShipping } from "../shipping/shippingSlice";
import { postUserOrder,
  getStatus as orderStatus
 } from "../order/orderSlice";

const Payment = () => {
  const [selectPayment, setSelectPayment] = useState(); // card type
  const [selectCard, setSelectCard] = useState(); // card no
  const cartItems = useSelector(getAllCartItems);
  const token = useSelector(getToken);
  const status = useSelector(cartStatus);
  const userOrderStatus = useSelector(orderStatus)
  const createStatus = useSelector(paymentStatus);
  const dispatch = useDispatch();
  const shippingAddress = useSelector(getDefaultShipping);
  const userPayment = useSelector(getAllUserPayment);

  const navigation = useNavigate();
  

  const [billing, setBilling] = useState(shippingAddress);
  const [card, setCard] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(
        fetchAllCartItem({
          token: String(token),
        })
      );
    }
  }, [status, token, dispatch]);

  useEffect(() => {
    if (createStatus === "idle") {
      dispatch(
        fetchAllUserPayment({
          token: String(token),
        })
      );
    }
  }, [createStatus, token, dispatch]);

  console.log("get all user payment ");
  console.log(userPayment);

  const onSelection = (input) => {
    setSelectPayment(input);
  };

  const onCardSelection = (input) => {
    setSelectCard(input);
    console.log("...selected card");
    console.log(selectCard);
  };

  useEffect(() => {}, [selectCard]);

  const onCheckBoxBillingAddress = (input) => {
    setBilling(input);
  };

  useEffect(() => {
    console.log("updated billing address is " + billing);
  }, [billing]);

  const onCartDetails = (input) => {
    setCard(input);
  };

  useEffect(() => {}, [card]);

  console.log("createStatus" + createStatus);
  const canCreate = [billing].every(Boolean) && createStatus === "idle";
  let canOrder = false;
  if (selectPayment === 0) {
    canOrder =
      [shippingAddress, billing, cartItems].every(Boolean) &&
      userOrderStatus === "idle";
  } else {
    canOrder =
      [shippingAddress, billing, cartItems, selectCard].every(Boolean) &&
      userOrderStatus === "idle";
  }

  const orderNow = () => {
    if (canOrder) {
      const cardSelected = userPayment.filter((pay)=> pay.id === selectCard)
     dispatch(
        postUserOrder({
          orderRequest: {
            shippingAddress : {
              address1 : billing.address1,
              address2 : billing.address2,
              city : billing.city,
              country : billing.country,
              postalCode : billing.postalCode
            },
            payment: {
              cardName: selectPayment === 0 ? "COD" : "CREDIT",
              holderName : selectPayment === 0 ? "holdername" : cardSelected[0].holderName ,
              cardNo : selectPayment === 0 ? "0000 0000 0000 0000" : cardSelected[0].cardNo ,
              cardType : selectPayment === 0 ? "COD" : cardSelected[0].cardType ,
              expireMonth : selectPayment === 0 ? "00" : cardSelected[0].expireMonth ,
              expireYear : selectPayment === 0 ? "00" : cardSelected[0].expireYear ,
              cvv : selectPayment === 0 ? "0000" : cardSelected[0].cvv 
            },
            billingAddress : {
              address1 : billing.address1,
              address2 : billing.address2,
              city : billing.city,
              country : billing.country,
              postalCode : billing.postalCode
            }
          },
          token: String(token),
        })
      ).then(()=>{
        dispatch(fetchAllCartItem(token))
        navigation("/", {replace:true})
      })
      
    }
  };

  let content = "";
  if (selectPayment === 1) {
    content = (
      <div
        className="modal fade"
        tabindex="-1"
        id="card-register"
        hidden={false}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      // <CardRegister onClick={onCartDetails}/>
    );
  }

  return (
    <div className="container mt-3">
      <div className="row row-cols-1 row-cols-md-2">
        <div className="col">
          <div className="fs-4 fw-bold">Payment Information</div>
          {/* <CashOnDelivery/>
          <CardPayment/> */}

          <div className="position-relative" onClick={() => onSelection(0)}>
            <CashOnDelivery />
            <div className="d-flex position-absolute top-0 mt-5 ms-3">
              <input
                className="form-check-input me-2"
                type="radio"
                onChange={() => onSelection(0)}
                checked={selectPayment === 0}
              />
            </div>
          </div>

          <div className="position-relative" onClick={() => onSelection(1)}>
            <CardPayment
              selected={selectPayment === 1}
              onClick={() => onSelection(1)}
              onCardSelection={onCardSelection}
              selectedCard={selectCard}
              billingAddress={billing}
              userPayment={userPayment}
            />
            <div className="d-flex position-absolute top-0 pt-5 ms-3">
              <input
                className="form-check-input me-2"
                type="radio"
                onChange={() => onSelection(1)}
                checked={selectPayment === 1}
              />
            </div>
          </div>

          <div
            className="modal fade"
            id="card-register"
            tabIndex="-1"
            aria-labelledby="cardRegisterLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="cardRegisterLabel">
                    Register Card
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <CardRegister onClick={onCartDetails} />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col">
          <BillingAddress
            onClick={onCheckBoxBillingAddress}
            shippingAddress={shippingAddress}
          />
          <BillingTotal items={cartItems} onClick={orderNow} />

          <div>
            <button
              className="btn btn-warning m-auto m-auto d-flex"
              disabled={!canOrder}
              onClick={orderNow}
            >
              <Link className="btn  px-5">Order Now</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
