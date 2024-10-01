import { Box } from "@mui/material";
import DataTable from "react-data-table-component";
import { imagePath } from "../../config/pathConfig";

const OrderTable = ({ orderedItems }) => {
  const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const netBilled = (param) => {
    let totalBill = param.quantity * param.unitPrice;
    let netTotal = 0.0;

    let totalDiscount =
      param.quantity * (param.unitPrice * (param.discountPercent / 100));
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

  const columns1 = [
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
      selector: (row) => row.unitPrice,
    },
    {
      name: "Discount (%)",
      selector: (row) => row.discountPercent,
    },
    {
      name: "Total Billed",
      selector: (row) => netBilled(row).toFixed(2),
    },
    {
      name: "User",
      selector: (row) =>
        row.order.user.firstName + " " + row.order.user.lastName,
    },
  ];

  return (
    <Box p="10px">
      <Box m="40px 0 0 0" minHeight="75vh">
        <DataTable pagination={true} data={orderedItems} columns={columns1} />
      </Box>
    </Box>
  );
};

export default OrderTable;
