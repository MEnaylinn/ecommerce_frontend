import React, { useEffect, useState } from "react";
import classes from "./Signup.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getStatus,
  getToken,
  getUser,
  getUserById,
  updateUser,
} from "../auths/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

const PhoneUpdate = () => {
  const user = useSelector(getUser);
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const status = useSelector(getStatus);
  const from = location.state?.from?.pathname || "/user/profile";

  const [phone, setPhone] = useState(user?.fullname || "");
  const [updateStatus, setUpdateStatus] = useState("idle");
  const canUpdate = [phone].every(Boolean) && updateStatus === "idle";

 

  const onPhoneChange = (e) => setPhone(e.target.value);

  const onUpdate = (e) => {
    e.preventDefault();
    if (canUpdate) {
      setUpdateStatus("pending");
      dispatch(
        updateUser({
          user: {
            id: Number(user.id),
            firstName: user.firstName,
            lastName: user.lastName,
            fullname: phone,
            username: user.username,
          },
          token: String(token),
        })
      ).then(() => {
        setUpdateStatus("idle");
        navigate(from, { replace: true });
        console.log(user);
      });
    }
  };

  if (!user?.id) {
    return <div>Loading...</div>; // Display a loading indicator while waiting for user data
  }

  return (
    <div className="grid gap-2 px-2 py-2">
    <div className="card row col-sm-12 col-md-6 m-auto mt-5">
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            required
            value={phone}
            onChange={onPhoneChange}
            className="form-control"
          />
        </div>
        <div className="text-end">
          <Link className="btn btn-primary" onClick={onUpdate}>
            Update
          </Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default PhoneUpdate;
