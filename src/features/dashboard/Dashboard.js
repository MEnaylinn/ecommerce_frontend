import React, { useEffect } from "react";
import StatBox from "./StatBox";
import OrderTable from "./OrderTable";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrderedCartItems, fetchOrderedCartItems, getAllOrderedItems, getStatus } from "../cart/cartItemSlice";
import { getToken, getUser } from "../auths/authSlice";

const Dashboard = () => {
  const orderedCartItems = useSelector(getAllOrderedItems);
  const cartStatus = useSelector(getStatus);
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const user = useSelector(getUser);
  const orderedItems = orderedCartItems.filter((item)=>item.order? item:undefined);

  useEffect(() => {
    if (cartStatus === "success") {
      dispatch(
        fetchAllOrderedCartItems({
          token: String(token),
          username: String(user.username),
          role : String("ROLE_ADMIN"),
        })
      );
    }
  }, [dispatch, token, cartStatus, user]);

  let totalSale = Number(0.0);
  let totalProduct = Number(0);
  let totalCustomer = Number(0);
  let totalOrder = Number(0);

  if(orderedItems.length > 0){
     totalSale = orderedItems.reduce((acc, item) => acc + Number(item.subTotal * ((100-item.discountPercent)/100)), 0);
    totalProduct = orderedItems.reduce((acc,item)=> acc + Number( item.quantity),0);
    const usernameList = new Set((orderedItems.map((item)=> item.order.user.username )));
    totalCustomer = usernameList.size;

    const orderList = new Set((orderedItems.map((item)=> item.order.id)));

    totalOrder = orderList.size;

  }

  return (
    <div className=" row w-100 gap-2 p-2">
      <div className="row d-flex gap-2 w-100 m-1">
        <div className="col-md">
          <StatBox
            title={"Total Sale"}
            amount={totalSale}
            icon={<i className="bi bi-cash-coin"></i>}
            increase={"15"}
            progress={"0.5"}
          />
        </div>
        <div className="col-md">
          <StatBox
            title={"Total Product"}
            amount={totalProduct}
            icon={<i className="bi bi-cart-check-fill"></i>}
            increase={"15"}
            progress={"0.75"}
          />
        </div>
        <div className="col-md">
          <StatBox
            title={"Total Customer"}
            amount={totalCustomer}
            icon={<i className="bi bi-person-heart"></i>}
            increase={"15"}
            progress={"0.5"}
          />
        </div>
        <div className="col-md">
          <StatBox
            title={"Total Order"}
            amount={totalOrder}
            icon={<i className="bi bi-receipt-cutoff"></i>}
            increase={"15"}
            progress={"0.65"}
          />
        </div>
        <div></div>
      </div>
      <div className="row d-flex gap-2 w-100 m-2">
        <div className="col bg-info rounded">
          <div className="fs-5 fw-bold mt-3">Product Trending By Quantity</div>
          <Box height="400px">
            <BarChart orderedItems={orderedItems} />
          </Box>
        </div>
        <div className="col bg-info rounded">
        <div className="fs-5 fw-bold mt-3">Product Trending By Price</div>
          <Box height="400px">
            <PieChart orderedItems = {orderedItems} />
          </Box>
        </div>
      </div>
      <div className="card bg-info rounded m-3">
      <div className="fs-5 fw-bold mt-3">Sale Orders</div>
        <OrderTable orderedItems={orderedItems} />
      </div>
    </div>
  );
};

export default Dashboard;
