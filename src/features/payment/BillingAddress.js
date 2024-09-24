import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getToken } from "../auths/authSlice";
import { fetchAllShipping, getAllShipping, getStatus } from "../shipping/shippingSlice";

const BillingAddress = ({onClick,shippingAddress}) => {
  const shipping = useSelector(getAllShipping);
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const status = useSelector(getStatus);

  const [selectedItem,setSelectedItem] = useState('')

  const handleCheckbox = (address)=>{
        onClick(...shipping.filter((ship) => ship.id === address.id))
        setSelectedItem(address)
  }

  console.log(token);
  console.log(status);

  useEffect(()=>{
    setSelectedItem(shippingAddress)
  },[shippingAddress])

  useEffect(() => {
    if (status === "idle") {
      dispatch(
        fetchAllShipping({
          token: String(token),
        })
      );
    }
  }, [token, status, dispatch]);

  let address = "";

  console.log("shipping is :" + shipping);

  if (shipping) {
    address = (
      <div className="row d-flex">
        
        {shipping.map((ship,index) => (
          <div className="d-flex fs-6 mb-3" key={ship.id}>
            
              <input
                className="form-check-input me-2"
                type="checkbox"
                value={ship.id}
                onChange={()=> handleCheckbox(ship)}
                checked = {ship.id === selectedItem.id}
                
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
          <i className="bi bi-geo-alt"></i>Billing Address
        </div>
        {address}
        {/* <div className="ms-auto">
          <Link to={"/shipping/create"}>Add New Address</Link>
        </div> */}
      </div>
    </section>
  );
};

export default BillingAddress