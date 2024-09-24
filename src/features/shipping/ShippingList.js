import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDefaultShipping, setDefaultShipping } from "./shippingSlice";

const ShippingList = ({ shipping }) => {
  const [selectedItem, setSelectedItem] = useState("");
  const canContinue = [selectedItem].every(Boolean);
  const dispatch = useDispatch();

  const handleCheckbox = (shippingAddress) => {
    setSelectedItem(shippingAddress);
  };

  const onClickAction = () => {
    dispatch(setDefaultShipping(selectedItem));
    console.log('default shipping is ...')
    console.log(getDefaultShipping)
  };

  let address = "";

  if (shipping) {
    address = (
      <div className="row d-flex">
        {shipping.map((ship, index) => (
          <div className="d-flex fs-6 mb-3" key={ship.id}>
            <input
              className="form-check-input me-2"
              type="checkbox"
              value={ship.id}
              onChange={() => handleCheckbox(ship)}
              checked={ship.id === selectedItem.id}
            />

            <div className="d-flex flex-sm-wrap">
              {ship.shippingAddressName}, {ship.address1}, {ship.address2},{" "}
              {ship.city}, {ship.country}, {ship.postalCode}
            </div>
            <div className="ms-3">
              <Link to={`/shipping/update/${ship.id}`}>
                <i className="bi bi-pencil-square text-info"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    address = (
      <div className="card-body">
        <p className="card-text">Register your address.</p>
      </div>
    );
  }

  return (
    <section>
      <div className="card text-dark bg-light mb-3">
        <div className="card-title fw-bold fs-4">
          <i className="bi bi-geo-alt"></i>Shipping Address
        </div>
        {address}
      </div>
      <div>
        <div className="text-center">
          <button
            className="btn"
            disabled={!canContinue}
            onClick={onClickAction}
          >
            {" "}
            <Link
              to={"/payment"}
              // state={{ selectedItem }}
              className="btn btn-primary"
            >
              Check to Payment
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShippingList;
