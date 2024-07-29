import React, { useEffect, useState } from "react";
import CardPayment from "./CardPayment";
import AddressCart from "../shipping/AddressCard";
import CashOnDelivery from "./CashOnDelivery";

import BillingAddress from "./BillingAddress";
import BillingTotal from "./BillingTotal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCartItem,
  getAllCartItems,
  getStatus,
} from "../cart/cartItemSlice";
import { getToken } from "../auths/authSlice";
import { getStatus as paymentStatus, postUserPayment } from "./paymentSlice";
import CardRegister from "./CardRegister";


const Payment = () => {
  const [selectPayment, setSelectPayment] = useState();
  const cartItems = useSelector(getAllCartItems);
  const token = useSelector(getToken);
  const status = useSelector(getStatus);
  const createStatus = useSelector(paymentStatus)
  const dispatch = useDispatch();

  const [shipping, setShipping] = useState(null);
  const [billing, setBilling] = useState(null);
  const [payment, setPayment] = useState(null);
  const [card,setCard] = useState('')

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllCartItem(token));
    }
  }, [status, token, dispatch]);

  const onSelection = (input) => {
    setSelectPayment(input);
  };

  const onCheckBoxShippingAddress = (input) => {
    setShipping(input);
  };

  useEffect(() => {
    console.log("updated shipping is " + shipping);
  }, [shipping]);

  const onCheckBoxBillingAddress = (input) => {
    setBilling(input);
  };

  useEffect(() => {
    console.log("updated billing address is " + billing);
    
  }, [billing]);

  const onCartDetails = (input)=>{
    setCard(input)
  }

  useEffect(() => {
    
  }, [card]);


  console.log('createStatus' +createStatus)
  const canCreate = [shipping,billing].every(Boolean) && createStatus === 'idle'

  

  const orderNow = ()=>{
    console.log('canCreate'+canCreate)
    console.log('cardInfo'+card.holder)
    console.log('cardInfo'+card.cardNumber)

    if(canCreate){

      // dispatch(postUserPayment({
      //   userPaymentRequest : {
      //     userBillingAddress : {
      //         country: billing.country,
      //         city:billing.city,
      //         address1 : billing.address1,
      //         address2 : billing.address2,
      //         postalCode : billing.postalCode
      //     },
      //     userPayment : {
      //       cardName: selectPayment === 0 ? 'COD':'Credit'
      //     }
      //   },
      //   token : String(token)
      // }))
    }
  }

  let content =''
  if(selectPayment === 1){
    content = (
      <CardRegister onClick={onCartDetails}/>
    )
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
            />
            <div className="d-flex position-absolute top-50 ms-3">
              <input
                className="form-check-input me-2"
                type="radio"
                onChange={() => onSelection(1)}
                checked={selectPayment === 1}
              />
            </div>
          </div>

          {content}

          <div>
            
          </div>
        </div>

        <div className="col">
          <AddressCart onClick={onCheckBoxShippingAddress} />
          <BillingAddress onClick={onCheckBoxBillingAddress} />
          <BillingTotal items={cartItems} onClick ={orderNow} />
        </div>

        
      </div>
    </div>
  );
};

export default Payment;
