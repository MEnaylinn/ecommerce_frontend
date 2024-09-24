import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllShipping, getAllShipping, getStatus } from "./shippingSlice";
import { getToken } from "../auths/authSlice";
import ShippingAdd from "./ShippingAdd";
import ShippingList from "./ShippingList";




const Shipping = () => {
  const shipping = useSelector(getAllShipping)
  const token = useSelector(getToken)
  const status = useSelector(getStatus)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(status === 'idle'){
      dispatch(fetchAllShipping({
        token : String(token)
      }
))
    }
  },[status,token,dispatch])

  return (
    <div>
      <div className="row mt-3 mb-3">
        <div className="col-md">
          <div className="fs-5 fw-bold text-center">
            Add New Shipping Address
          </div>
          <ShippingAdd/>
        </div>
        <div className="col-md">
          <ShippingList shipping={shipping}/>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
