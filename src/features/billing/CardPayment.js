import React, { useState } from "react";
import card from "../../image/card.jpg";
import CardShortcut from "./CardShortcut";
import { Link } from "react-router-dom";
import CardRegister from "./CardRegister";

const CardPayment = ({selected,onClick}) => {
  const [cond,setCond] =useState(0)
  
  const onDisplay = ()=>{
    console.log('Payment with Credit Card')
    console.log()
    setCond((prevCond)=>(prevCond === 0 ? 1: 0))
  }

  let cardForm = ''
  let cards = ''
  if(selected){
    cards = (
      <div className="row gap-3 mx-1 mt-2">
        <div className="card col bg-info">
              <p className="ms-5 mt-3">**** **** **** 4562</p>
              <input type="checkbox" className="form-check-input mx-0 my-0"/>
              <p className="ms-5">Credit/Debit Card</p>
        </div>
        <div className="card col bg-info">
              <p className="ms-5 mt-3">**** **** **** 4562</p>
              <input type="checkbox" className="form-check-input mx-0 my-0"/>
              <p className="ms-5">Credit/Debit Card</p>
        </div>
      </div>
    )

    cardForm = (
      <CardRegister/>
    )
      
  }

  return (
    <div>
      <div className="text-center" onClick={onClick}>
        <div className="border px-3 py-3 mt-2 bg-info">
          <div className="mb-2">
            <img src={card} alt="card" className="credit-card" />
            <span className="fs-5 ms-3">Credit/Debit Card</span>
          </div>
          <CardShortcut/>
          <div className="text-end"><Link to={'/payment/create'}>Tap here to add card</Link></div>
        </div>
      </div>
            

      </div>
  );
};

export default CardPayment;
