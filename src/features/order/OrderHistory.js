import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken, getUser } from "../auths/authSlice";
import DataTable from "react-data-table-component";
import {
  fetchOrderedCartItems,
  getAllOrderedItems,
  getStatus as getCartStatus,
} from "../cart/cartItemSlice";
import { imagePath } from "../../config/pathConfig";

const OrderHistory = () => {
  const orderedItems = useSelector(getAllOrderedItems);
  const cartStatus = useSelector(getCartStatus);
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const user = useSelector(getUser);

  useEffect(() => {
    if (cartStatus === "success") {
      dispatch(
        fetchOrderedCartItems({
          token: String(token),
          username: String(user.username),
        })
      );
    }
  }, [dispatch, token, cartStatus, user]);

  if (orderedItems) {
    console.log("ordered item is : ");
    console.log(orderedItems);
  } else {
    console.log("no items ");
  }

  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const netBilled = (param) => {
    let totalBill = param.quantity * param.product.price;
    let netTotal = 0.0;

    let totalDiscount =
      param.quantity *
      (param.product.price * (param.product.discountPercent / 100));
    netTotal = totalBill - totalDiscount;
    return netTotal;
  };

  const setImage = (param) => {
    return (
      <div>
        <img
          src={`${imagePath}/${param}.jpg`}
          style={{
            height: 70 + "px",
            width: 70 + "px",
            padding: 5 + "px",
            borderRadius: 10 + "px",
          }}
          alt={`${param}`}
        />
      </div>
    );
  };

  const columns = [
    {
      name: "Order ID",
      selector: (row) => row.order.orderNo.substring(0, 5),
      flex: "1",
    },
    {
      name: "Date",
      selector: (row) => dateFormat(row.order.createdAt),
    },
    {
      name: "Image",
      selector: (row) => setImage(row.product.id),
    },
    {
      name: "Product",
      selector: (row) => row.product.name,
    },

    {
      name: "Quantity",
      selector: (row) => row.quantity,
    },
    {
      name: "Price",
      selector: (row) => row.product.price,
    },
    {
      name: "Discount (%)",
      selector: (row) => row.product.discountPercent,
    },
    {
      name: "Total Billed",
      selector: (row) => netBilled(row).toFixed(2),
    },
  ];
  return (
    <div>
      <div className="fs-5 fw-bold mt-1 ms-3">Orders History</div>
      <div style={{ borderRadius: 10 + "px", padding: 10 + "px" }}>
        <DataTable pagination selectableRows data={orderedItems} columns={columns} />
      </div>
    </div>
  );
};

export default OrderHistory;
