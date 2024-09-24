import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../auths/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { addShipping } from "./shippingSlice";

const ShippingAdd = () => {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [shippingAddressName, setShippingAddressName] = useState("");
  const [status, setStatus] = useState("idle");
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/shipping";

  console.log(location);
  console.log(location.state);
  console.log(from);
  console.log(location.pathname);

  const onAddress1Change = (e) => setAddress1(e.target.value);
  const onAddress2Change = (e) => setAddress2(e.target.value);
  const onCityChange = (e) => setCity(e.target.value);
  const onCountryChange = (e) => setCountry(e.target.value);
  const onPostalCodeChange = (e) => setPostalCode(e.target.value);
  const onShippingAddressName = (e) => setShippingAddressName(e.target.value);

  const canCreate =
    [address1, address2, city, country, postalCode, shippingAddressName].every(
      Boolean
    ) && status === "idle";

  const onSubmit = (e) => {
    e.preventDefault()

    if (canCreate && token) {
      setStatus("pending");
      dispatch(
        addShipping({
          userShippingAddress: {
            shippingAddressName,
            address1,
            address2,
            city,
            country : country.toUpperCase(),
            postalCode,
          },
          token: String(token),
        })
      );
      setAddress1("");
      setAddress2("");
      setCity("");
      setCountry("");
      setPostalCode("");
      setShippingAddressName("");
      setStatus('idle')
      navigate(from, { replace: true });
      
    }
  };

  return (
    <div className="container">
      {/* <div className="col-12 col-sm-8 col-md-6 m-auto my-3"> */}
      <div className="col">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Shipping Address Name
            </label>
            <input
              type="text"
              className="form-control"
              id="shippingAddressName"
              value={shippingAddressName}
              onChange={onShippingAddressName}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Address 1
            </label>
            <input
              type="text"
              className="form-control"
              id="address1"
              value={address1}
              onChange={onAddress1Change}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Address 2
            </label>
            <input
              type="text"
              className="form-control"
              id="address2"
              value={address2}
              onChange={onAddress2Change}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              value={city}
              onChange={onCityChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Country
            </label>
            <input
              type="text"
              className="form-control"
              id="country"
              value={country}
              onChange={onCountryChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Postal
            </label>
            <input
              type="text"
              className="form-control"
              id="postalCode"
              value={postalCode}
              onChange={onPostalCodeChange}
            />
          </div>

          <div className="text-end">
            <button
              className="btn btn-primary"
              onClick={onSubmit}
              disabled={!canCreate}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingAdd;
