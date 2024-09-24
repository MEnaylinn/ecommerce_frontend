import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderPath } from "../config/pathConfig";
import axios from "axios";

export const fetchAllUserOrder = createAsyncThunk(
  "fetchAllUserOrder",
  async (data) => {
    try {
      const response = await axios.get(`${orderPath}/all`, {
        headers: {
          Authorization: data.token,
        },
      });
      return {
        statusCode: response.status,
        data: response.data,
      };
    } catch (error) {
      console.error(error);
    }
  }
);

export const postUserOrder = createAsyncThunk("postUserOrder",async (data) => {
  console.log("---order request")
  console.log(data.orderRequest)
    try {
      const response = await axios.post(`${orderPath}/create`,data.orderRequest,{
          headers: {
            "Content-Type": "application/json",
            Authorization: data.token,
          }
        }
      );
      return {
        statusCode: response.status,
        data: response.data,
      };
    } catch (error) {
      console.error(error.message);
    }
  }
);

export const updateUserOrder = createAsyncThunk(
  "putUserOrder",
  async (data) => {
    try {
      const response = await axios.put(
        `${orderPath}'/${data.orderId}/update`,
        data.userPaymentRequest,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: data.token,
          },
        }
      );
      return {
        statusCode: response.status,
        data: response.data,
      };
    } catch (error) {
      console.error(error);
    }
  }
);

export const deleteUserOrder = createAsyncThunk(
  "deleteUserOrder",
  async (data) => {
    try {
      const response = await axios.delete(
        `${orderPath}/${data.orderId}/delete`,
        {
          headers: {
            Authorization: data.token,
          },
        }
      );
      return {
        statusCode: response.status,
        data: response.data,
      };
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState = {
  userOrders: [],
  status: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllUserOrder.fulfilled, (state, action) => {
        const response = action.payload;

        if (response?.statusCode) {
          const { statusCode, data } = response;
          console.log(statusCode);
          console.log(data);
          if (statusCode === 200) {
            state.status = "idle";
            console.log("fetchAllOrder success");
            state.userOrders = data;
          } else {
            state.status = "failed";
            state.error = String(data);
            console.log("error occured in Server");
          }
        } else {
          console.log("error occured in fetchallOrder");
        }
      })
     
      .addCase(postUserOrder.fulfilled, (state, action) => {
        const response = action.payload;

        if (response?.statusCode) {
          const { statusCode, data } = response;
          if (statusCode === 201) {
            state.status = "idle";
            console.log("addOrder success");
            state.userOrders = [...state.userOrders, data];
          } else {
            state.status = "failed";
            state.error = String(data);
            console.log(state.error);
          }
        } else {
          console.log("error occured in addOrder");
          console.log(state.error);
        }
      })
      .addCase(deleteUserOrder.fulfilled, (state, action) => {
        const response = action.payload;

        if (response?.statusCode) {
          const { statusCode, data } = response;
          if (statusCode === 200) {
            state.status = "idle";
            console.log("deleteOrder success");
            const userOrder = state.userOrders.filter(
              (order) => order.id !== Number(data)
            );
            state.userOrders = [...userOrder];
          } else {
            state.status = "failed";
            state.error = String(data);
            console.log(state.error);
          }
        } else {
          console.log("error occured in deleteOrder");
        }
      })
      .addCase(updateUserOrder.fulfilled, (state, action) => {
        const response = action.payload;

        if (response?.statusCode) {
          const { statusCode, data } = response;
          if (statusCode === 200) {
            state.status = "idle";
            console.log("updateOrder success");
            console.log(data);
            state.userOrders = [
              ...state.userOrders.filter(
                (order) => order.id !== Number(data.id)
              ),
              data,
            ];
          } else {
            state.status = "failed";
            state.error = String(data);
            console.log("updateOrder failed");
            console.log(state.error);
          }
        } else {
          console.log("error occured in updateOrder");
        }
      });
  },
});
export default orderSlice.reducer;
export const getAllUserOrder = (state) => state.userorder.userOrders;
export const getStatus = (state) => state.userorder.status;
export const getError = (state) => state.userorder.error;
