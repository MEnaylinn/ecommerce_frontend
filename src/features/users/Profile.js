import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../auths/authSlice";

function Profile() {
  const user = useSelector(getUser);
  console.log("user is ...");
  console.log(user);

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [userName, setUserName] = useState(user?.username);
  const [fullName, setFullName] = useState(user?.fullname);
  const [password, setPassword] = useState(user?.password);
  const navigate = useNavigate();

  const onUsername = () => {
    navigate("/user/username", { replace: true });
  };

  const onPhone = () => {
    navigate("/user/phone", { replace: true });
  };
  const onEmail = () => {
    navigate("/user/email", { replace: true });
  };

  const onPassword = () => {
    navigate("/user/password", { replace: true });
  };

  return (
    <section>
      <div className="grid gap-2 px-2 py-2">
        <div
          className="card row col-sm-12 col-md-6 m-auto mt-2"
          onClick={onUsername}
        >
          <p>Username</p>
          <div className="text-end">
            <i className="bi bi-pen"></i>
          </div>
          <div className="fw-bold">
            {firstName}&nbsp;{lastName}
          </div>
        </div>

        <div
          className="card row col-sm-12 col-md-6 m-auto mt-2"
          onClick={onPhone}
        >
          <p>Phone</p>
          <div className="text-end">
            <i className="bi bi-pen"></i>
          </div>
          <div className="fw-bold">{fullName}</div>
        </div>
        <div
          className="card row col-sm-12 col-md-6 m-auto mt-2"
          onClick={onEmail}
        >
          <p>Email</p>
          <div className="text-end">
            <i className="bi bi-pen"></i>
          </div>
          <div className="fw-bold">{userName}</div>
        </div>
        <div
          className="card row col-sm-12 col-md-6 m-auto mt-2"
          onClick={onPassword}
        >
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
