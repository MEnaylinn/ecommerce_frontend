import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginStatus,
  getToken,
  getUser,
  logout,
  getRole,
} from "../features/auths/authSlice";
import { useEffect } from "react";
import {
  fetchAllCartItem,
  getAllCartItems,
  getStatus,
} from "../features/cart/cartItemSlice";
import {
  fetchAllCategory,
  getAllCategories,
} from "../features/products/productSlice";

function MainNavigation() {
  const loginStatus = useSelector(getLoginStatus);
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const carts = useSelector(getAllCartItems);
  const token = useSelector(getToken);
  const status = useSelector(getStatus);
  const role = useSelector(getRole);
  const categories = useSelector(getAllCategories);
  

  useEffect(() => {
    if (loginStatus && status === "idle") {
      dispatch(fetchAllCartItem(token));
    }
  }, [dispatch, loginStatus, status, token]);


  useEffect(() => {
    if (token) {
      dispatch(fetchAllCategory());
    }
  }, [ dispatch,token]);

  let navProfile = "";
  let navLogin = "";
  let dashboard = "";

  console.log("login status "+loginStatus)
  if (loginStatus) {
    navProfile = (
      <li className="nav-item">
        <Link to="/user/profile" className="nav-link gap-2 d-flex">
          <i className="bi bi-person"></i>
          {user ? user.firstName + " " + user.lastName : ""}
        </Link>
      </li>
    );
    navLogin = (
      <Link to="/" onClick={dispatch(logout)} className="nav-link">
        Logout
      </Link>
    );

  } else {
    navLogin = (
      <Link to="/user/login" className="nav-link">
        Login
      </Link>
    );
  }

  if (`${role}` === "ROLE_ADMIN") {
    dashboard = (
      <li className="nav-item">
        <Link to={"/dashboard"} className="nav-link d-flex gap-2">
          <i className="bi bi-graph-up-arrow"></i>
          Dashboard
        </Link>
      </li>
    );
  } else {
    dashboard = (
      <li className="nav-item">
        <Link to={"/orders"} className="nav-link d-flex gap-2">
          <i className="bi bi-receipt-cutoff"></i>
          Order History
        </Link>
      </li>
    );
  }

  let products = "";
  if (categories) {
    products = categories.map((category)=>(
      <li key={category}>
        <Link className="dropdown-item" to={`categories/${category}`}>
          {
            category
          }
        </Link>
      </li>
    ))
  }

  return (
    <section>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3 d-flex gap-3" to={"/"}>
            <i className="bi bi-shop-window"></i>
            Shoppy
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav fs-6 ms-auto gap-3">
              <li className="nav-item">
                <Link to={"/"} className="nav-link d-flex gap-2">
                  <i className="bi bi-house-fill"></i>
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-expanded="false"
                >
                  Products
                </Link>
                <ul className="dropdown-menu">
                  {products}
                </ul>
              </li>
              <li
                className="nav-item"
                hidden={`${role}` === "ROLE_ADMIN" ? false : true}
              >
                <Link to={"/product/new"} className="nav-link gap-2">
                  <i className="bi bi-plus-square"></i>
                  New Product
                </Link>
              </li>
              <li className="nav-item me-3 position-relative">
                <Link to={"/shopping-cart"} className="nav-link d-flex gap-2">
                  <i className="bi bi-cart4 fs-5"> </i>

                  <span
                    className="text-white rounded-circle bg-danger align-self-center text-center position-absolute fs-6 px-auto"
                    style={{
                      minWidth: 20 + "px",
                      minHeight: 20 + "px",
                      margin: "-35px 0 0 15px",
                    }}
                  >
                    {carts?.length || 0}
                  </span>
                </Link>
              </li>
              {dashboard}
              {navProfile}
              <li className="nav-item">{navLogin}</li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
}
export default MainNavigation;
