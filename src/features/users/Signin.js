import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../auths/authSlice";

const Signin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("idle");
  const dispatch = useDispatch();
  const location = useLocation();

  const from = location.state?.from.pathname || "/";

  const onUserNameChange = (e) => setUserName(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const canLogin =
    [userName, password].every(Boolean) && loginStatus === "idle";
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (canLogin) {
      setLoginStatus("pending");
      dispatch(
        signin({
          username: userName,
          password,
        })
      );

      navigate(from, { replace: true });
    }
  };

  return (
    <section>
      <div className="container mt-5">
        <div className="row">
          <div className=" card col-12 col-sm-8 col-md-6 m-auto">
            <p className="fs-4 text-capitalize fw-bold">Login here</p>
            <form>
              <div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="userName"
                    value={userName}
                    onChange={onUserNameChange}
                    aria-describedby="emailHelp"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={onPasswordChange}
                    id="password"
                    required
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end">
              <button
                className="btn btn-primary btn-hover"
                type="submit"
                onClick={onSubmit}
                disabled={!canLogin}
              >
                Submit
              </button>
              </div>
            </form>
            <Link to={"/user/register"}>
              No have an account? Register here.
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
