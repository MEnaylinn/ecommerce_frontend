import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategory,
  getAllCategories,
} from "../features/products/productSlice";
import { Link } from "react-router-dom";

const Footer = () => {
  const categories = useSelector(getAllCategories);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchAllCategory())
  },[dispatch])

  let categoryList = "";
  if (categories) {
    categoryList = categories.map((category) => (
      <div className="fs-6" key={category}>
        {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
      </div>
    ));
  }
  console.log("categories" + categories);
  return (
    <div className="bg-primary text-light">
      <div className="row d-flex justify-content-between w-100 p-3">
        <div className="col-sm">
          <div className="fs-5 text-dark fw-bold">Products and Services</div>
          {categoryList}
        </div>

        <div className="col-sm">
          <div className="fs-5 text-dark fw-bold">Trade Assurance</div>
          <div className="fs-6">Safe and easy payments</div>
          <div className="fs-6">Money-back policy</div>
          <div className="fs-6">On-time shipping</div>
          <div className="fs-6">After-sales protections</div>
          <div className="fs-6">Product monitoring services</div>
        </div>

        <div className="col-sm">
          <div className="fs-5 text-dark fw-bold">Get Support</div>
          <div className="fs-6">Help Center</div>
          <div className="fs-6">Live chat</div>
          <div className="fs-6">Check order status</div>
          <div className="fs-6">Refunds</div>
          <div className="fs-6">Report abuse</div>
        </div>

        <div className="col-sm">
          <div className="fs-5 text-dark fw-bold">About Us</div>
          <div className="fs-6">About Shoppy</div>
          <div className="fs-6">Corporate responsibility</div>
          <div className="fs-6">News center</div>
          <div className="fs-6">Careers</div>
        </div>
      </div>

      <div className="bg-dark py-2">
        <div className="container text-light text-center">
          <p className="display-5 mb-3">Shoppy</p>
          <div className="fs-5 align-items-center">
            <Link
              to={"https://www.facebook.com"}
              target="_blank"
              className="bi bi-facebook me-2 ms-2 text-light"
            />
            <Link
              to={"https://www.twitter.com"}
              target="_blank"
              className="bi bi-twitter me-2 ms-2 text-light"
            />
            <Link
              to={"https://www.instagram.com"}
              target="_blank"
              className="bi bi-instagram me-2 ms-2 text-light"
            />
            <Link
              to={"https://www.whatsapp.com"}
              target="_blank"
              className="bi bi-whatsapp me-2 ms-2 text-light"
            />
            <Link
              to={"https://www.tiktok.com"}
              target="_blank"
              className="bi bi-tiktok me-2 ms-2 text-light"
            />
          </div>
          <small className="text-white-50">
            &copy; Copyright by Devnlk. All right reserved.
          </small>
        </div>
      </div>
    </div>
  );
};

export default Footer;
