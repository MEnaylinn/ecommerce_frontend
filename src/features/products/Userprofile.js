import React from "react";
import { Link } from "react-router-dom";

const Userprofile = () => {
  return (
    <div className="container">
      <div className="row d-flex g-3">
        <div className="col-lg bg-light">
          <Link to={"/shopping-cart"} className="nav-link position-relative">
            <i className="bi bi-cart4 fs-3"></i>
            <span
              className="text-white rounded-circle bg-danger text-center items-center justify-center mt-0 position-absolute"
              style={{ width: 25 + "px" }}
            >
              {1}
            </span>
          </Link>
        </div>
        <div className="col-lg bg-dark">
          <h1>Userprofile</h1>
          
        </div>
        <div className="col-lg-6 bg-gray">
          <checkbox class="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </checkbox>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;
