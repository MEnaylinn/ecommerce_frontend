import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { deleteShipping, getShippingById, updateShipping } from './shippingSlice';
import { getToken } from '../auths/authSlice';

const UpdateBillingAddress = () => {
  const {shippingId} = useParams()
  const shipping = useSelector((state)=> getShippingById(state,shippingId))

  const [shippingAddressName, setShippingAddressName] = useState(shipping?.shippingAddressName);
  const [address1, setAddress1] = useState(shipping?.address1);
  const [address2, setAddress2] = useState(shipping?.address2);
  const [city, setCity] = useState(shipping?.city);
  const [country, setCountry] = useState(shipping?.country);
  const [postalCode, setPostalCode] = useState(shipping?.postalCode);
  const [status, setStatus] = useState("idle");

  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/shopping-cart";

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
    [address1, address2, city, country, postalCode,shippingAddressName].every(Boolean) &&
    status === "idle";

  const onUpdateAction = (e) => {
    if (canCreate && token) {
      setStatus("pending");
      dispatch(
        updateShipping({
          userShippingAddress: {
            id : shipping?.id,
            shippingAddressName,
            address1,
            address2,
            city,
            country,
            postalCode,
          },
          token: String(token),
        })
      );
      navigate(from, { replace: true });
    }
  };

  const onDeleteAction = (e) => {
    if (shipping?.id && token) {
      setStatus("pending");
      dispatch(
        deleteShipping({
          userShippingAddressId : shipping?.id,
          token: String(token),
        })
      );
      navigate(from, { replace: true });
    }
  };

  return (
    <div className='container'>
    <div className="col-12 col-sm-8 col-md-6 m-auto my-3">
      <form className='form'>
        <div className="mb-3">
          <label htmlFor="shippingAddressName" className="form-label">
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
        <div className='gap-3 text-end'>
        <button
          className="btn btn-danger mx-3"
          onClick={onDeleteAction}
        >
          Delete
        </button>

        <button
          className="btn btn-primary"
          onClick={onUpdateAction}
          disabled={!canCreate}
        >
          Update
        </button>

        </div>
      </form>
    </div>
    </div>
  );
};

export default UpdateBillingAddress;
