import React, { useEffect } from "react";
import ProductList from "./ProductList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategory,
  fetchAllProducts,
  getAllProducts,
  getError,
  getStatus,
} from "./productSlice";
import { getToken } from "../auths/authSlice";
import { useParams } from "react-router-dom";

const AllProducts = () => {
  const {category} = useParams();
  const products = useSelector(getAllProducts);
  const error = useSelector(getError);
  const status = useSelector(getStatus);
  // const categories = useSelector(getAllCategories);
  const token = useSelector(getToken);
  const dispatch = useDispatch();

  let selectedProducts=[];

  if(category){
    selectedProducts = products.filter((product)=> product.category === category);
  }else{
    selectedProducts = products;
  }


  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchAllCategory());
    }
  }, [ dispatch,token]);

  let content = "";
  if (status === "success" && selectedProducts) {
    content = <ProductList products={selectedProducts} />;
  }

  if (status === "loading") {
    content = (
      <>
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </>
    );
  }

  if (status === "failed") {
    content = { error };
  }

  // let categoryBar = "";
  // console.log("categories");
  // console.log(categories);
  // if (categories) {
  //   categoryBar = categories.map((category) => (
  //     <button className="btn btn-info" key={category}>{category}</button>
  //   ));
  // } else {
  //   categoryBar = "No category";
  // }

  return (
    <div className="container align-items-center">
      {/* <div className="mt-1 gap-2 d-flex">{categoryBar}</div> */}
      {content}
    </div>
  );
};

export default AllProducts;
