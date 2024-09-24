import React, { useState } from "react";
import classes from "./Signup.module.css";

import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { getUser } from "../auths/authSlice";
import UserDetail from "./UserDetail";
import ProfileNameEdit from "./UserNameUpdate";
import UserNameUpdate from "./UserNameUpdate";
import PasswordUpdate from "./PasswordUpdate";
import EmailPhoneUpdate from "./EmailUpdate";

function Profile() {
  const user = useSelector(getUser);
  console.log("user is ...")
  console.log(user)

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [userName, setUserName] = useState(user?.username);
  const [fullName, setFullName] = useState(user?.fullname);
  const [password, setPassword] = useState(user?.password);
  const [signupRequestStatus, setSignupRequestStatus] = useState("idle");
  const navigate = useNavigate();


  const onFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setFullName(e.target.value);
  };

  const onLastNameChange = (e) => {
    setLastName(e.target.value);
    setFullName(firstName + " " + e.target.value);
  };
  const onFullNameChange = (e) => setFullName(e.target.value);
  const onUserNameChange = (e) => setUserName(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const canCreate =
    [firstName, lastName, fullName, userName, password].every(Boolean) &&
    signupRequestStatus === "idle";
  const dispatch = useDispatch();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (e) => {
    e.preventDefault();

    if (canCreate) {
      // setSignupRequestStatus('pending')
      // dispatch(signup({
      //     firstname : firstName,
      //     lastname : lastName,
      //     fullname : fullName,
      //     username : userName,
      //     password
      // }))
      // navigate(from,{replace : true})
    }
  };
  const onUsername = ()=>{
    navigate('/user/username',{replace:true})
  }
  
  const onPhone = ()=>{
    navigate('/user/phone',{replace:true})
  }
  const onEmail = ()=>{
    navigate('/user/email',{replace:true})
  }
  
  const onPassword = ()=>{
    navigate('/user/password',{replace:true})
  }

  return (
    <section>
      <div className="grid gap-2 px-2 py-2">

      <div className="card row col-sm-12 col-md-6 m-auto mt-2" onClick={onUsername}>
        <p>Username</p>
        <div className="text-end">
          <i className="bi bi-pen"></i>
        </div>
        <div className="fw-bold">{firstName}&nbsp;{lastName}</div>
      </div>

      <div className="card row col-sm-12 col-md-6 m-auto mt-2" onClick={onPhone}>
        <p>Phone</p>
        <div className="text-end">
          <i className="bi bi-pen"></i>
        </div>
        <div className="fw-bold">{fullName}</div>
      </div>
      <div className="card row col-sm-12 col-md-6 m-auto mt-2" onClick={onEmail}>
        <p>Email</p>
        <div className="text-end">
          <i className="bi bi-pen"></i>
        </div>
        <div className="fw-bold">{userName}</div>
      </div>
      <div className="card row col-sm-12 col-md-6 m-auto mt-2" onClick={onPassword}>
        <p>Password</p>
        <div className="text-end">
          <i className="bi bi-pen"></i>
        </div>
        <div className="fw-bold">****************</div>
      </div>
      </div>
    </section>
  );
}

export default Profile;
