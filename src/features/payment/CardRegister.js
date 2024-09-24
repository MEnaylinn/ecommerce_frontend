import React, { useState } from "react";
import CardShortcut from "./CardShortcut";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../auths/authSlice";
import { postUserPayment } from "./paymentSlice";

const CardRegister = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [holder, setHolder] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [ccv, setCCV] = useState("");

  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const location = useLocation();
  const { billingAddress } = location.state || {};
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/payment"
  

  const formatCardNumber = (value) => {
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, "");

    // Limit to 16 digits
    const limitedDigits = digitsOnly.substring(0, 16);

    // Add spaces after every 4 digits
    const formatted = limitedDigits.replace(/(\d{4})(?=\d)/g, "$1 ");

    return formatted;
  };
  const formatExp = (value) => {
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, "");

    // Limit to 16 digits
    const limitedDigits = digitsOnly.substring(0, 4);

    // Add spaces after every 4 digits
    const formatted = limitedDigits.replace(/(\d{2})(?=\d)/g, "$1/");

    return formatted;
  };

  const onCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  const onHolderChange = (e) => setHolder(e.target.value);

  const onExpMonthChange = (e) => {
    const formattedValue = formatExp(e.target.value);
    setExpMonth(formattedValue);
  };

  const onCCVChange = (e) => setCCV(e.target.value.slice(0, 4));

  const canCreate = [cardNumber, holder, expMonth, ccv].every(Boolean);

  const onCardCreate = () => {
    let expiration = expMonth.split("/");
    if (canCreate) {
      dispatch(
        postUserPayment({
          userPaymentRequest: {
            userPayment: {
              cardName: "CARD",
              holderName: holder,
              cardNo: cardNumber,
              cardType: "CREDIT",
              expireMonth: expiration[0],
              expireYear: expiration[1],
              cvv: ccv
            },
            userBillingAddress: {
              country : billingAddress.country,
              city : billingAddress.city,
              address1 : billingAddress.address1,
              address2 : billingAddress.address2,
              postalCode : billingAddress.postalCode
            }
          },
          token: String(token),
        })
      );
      navigate(from,{replace : true});
    }
  };

  return (
    <div>
      {/* Card Register Form */}
      <div className="container items-center bg-light mb-5 mt-3 col-12 col-sm-8 col-md-6">
        <p className="fs-4 fw-bold"> Credit/Debit Card</p>
        <p className="fs-5 fw-bold text-center">Add New Card</p>

        <form className="card bg-light">
          <div className="text-end">
            <CardShortcut />
          </div>
          <div className="mb-3">
            <label htmlFor="cardNo" className="form-label">
              Card number
            </label>
            <input
              type="digit"
              className="form-control"
              id="cardNo"
              onChange={onCardNumberChange}
              value={cardNumber}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name on card
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={onHolderChange}
              value={holder}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="expMonth" className="form-label">
              Expiration (MM/YY)
            </label>
            <div className="d-flex align-items-center text-center">
              <input
                type="text"
                className="form-control"
                id="expMonth"
                onChange={onExpMonthChange}
                value={expMonth}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="cvv" className="form-label">
              CVV
            </label>
            <input
              type="number"
              className="form-control"
              id="cvv"
              onChange={onCCVChange}
              value={ccv}
            />
          </div>
          <button
            onClick={onCardCreate}
            className="btn btn-primary mt-2"
            disabled={!canCreate}
          >
            Save Card
          </button>
        </form>
      </div>
    </div>
  );
};

export default CardRegister;
