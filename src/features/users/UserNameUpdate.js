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

const UserNameUpdate = () => {
  const user = useSelector(getUser);
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const status = useSelector(getStatus);
  const from = location.state?.from?.pathname || "/user/profile";

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [updateStatus, setUpdateStatus] = useState("idle");

  const onFirstNameChange = (e) => setFirstName(e.target.value);
  const onLastNameChange = (e) => setLastName(e.target.value);

  const canUpdate =
    [firstName, lastName].every(Boolean) && updateStatus === "idle";

  // useEffect(() => {
  //   if (user?.id && status === "idle") {
  //     dispatch(
  //       getUserById({
  //         userId: user? Number(user.id):'0',
  //         token: String(token),
  //       })
  //     );
  //   }
  // }, [status, dispatch, token,user]);

  const onUpdate = (e) => {
    e.preventDefault();
    if (canUpdate) {
      setUpdateStatus("pending");
      dispatch(
        updateUser({
          user: {
            id: Number(user.id),
            firstName: firstName,
            lastName: lastName,
            fullname: user.fullname,
            username: user.username,
          },
          token: String(token),
        })
      ).then(()=>{
        console.log("token is ..." + token);
        setUpdateStatus('idle')
        navigate(from, { replace: true });
      })
    }
  };

  // const onUpdate = ()=>{

  //         setUpdateStatus('pending')
  // console.log(

  //                 String(user.id),
  //                 firstName,
  //                 lastName,
  //                 user.fullname,
  //                 user.username,

  //         )

  //     }

  return (
    <div className="grid gap-2 px-2 py-2">

    <div className="card row col-sm-12 col-md-6 m-auto mt-5">
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            required
            value={firstName}
            onChange={onFirstNameChange}
            className="form-control"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            required
            value={lastName}
            onChange={onLastNameChange}
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

export default UserNameUpdate;
