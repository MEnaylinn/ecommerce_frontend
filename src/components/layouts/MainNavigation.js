import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginStatus,
  getToken,
  getUser,
  logout,
} from "../../features/auths/authSlice";
import { useEffect, useState } from "react";
import { fetchAllCartItem, getAllCartItems, getStatus } from "../../features/cart/cartItemSlice";




function MainNavigation() {
  const loginStatus = useSelector(getLoginStatus);
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const {totalItem} = useParams()
  const carts = useSelector(getAllCartItems)
  const token = useSelector(getToken)
  const status = useSelector(getStatus)
  

  useEffect(()=>{
    if(loginStatus && status === 'idle'){
      dispatch(fetchAllCartItem(token))
    }
    console.log('totalItem')
    console.log(totalItem)
  },[dispatch,loginStatus,status])

  console.log(carts)

  let navProfile = "";
  let navLogin = "";

  if (loginStatus) {
    
    navProfile = (
      <li className="nav-item">
        <Link to="/user/profile" className="nav-link">{user.username}</Link>
      </li>
    );
    navLogin = (
      <Link to="/user/logout" onClick={dispatch(logout)} className="nav-link">
        Logout
      </Link>
    );
  } else {
    navLogin = <Link to="/user/login" className="nav-link">Login</Link>;
  }

  return (
    <section>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand fs-3" href="#">
            Fake Shop
          </a>
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
            <ul className="navbar-nav ms-auto fs-5 mx-6">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/product/new"} className="nav-link">
                  New Product
                </Link>
              </li>
              {navProfile}
              <li className="nav-item me-3 position-relative">
                <Link to={"/shopping-cart"} className="nav-link">
                <i className="bi bi-cart4 fs-3"> </i>
                
                  <span className="text-white rounded-circle bg-danger align-self-center text-center position-absolute mt-0 fs-6 px-auto" style={{minWidth
                     : 20 +'px', minHeight : 20 + 'px'}}>{carts.length}</span>
                  
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/dashboard"} className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                {navLogin}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
}
export default MainNavigation;
