import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { paymentPath } from "../config/pathConfig";
import axios from "axios";

export const fetchAllUserPayment = createAsyncThunk(
  "fetchAllUserPayment",
  async (data) => {
    console.log('address link')
    console.log(`${paymentPath}/all`)
    try {
      const response = await axios.get(`${paymentPath}/all`, {
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

export const postUserPayment = createAsyncThunk("postUserPayment",async (data) => {
  console.log('userPaymentRequest : '+data.userPaymentRequest)
    try {
      const response = await axios.post(`${paymentPath}/create`,data.userPaymentRequest,{
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

export const updateUserPayment = createAsyncThunk(
  "putUserPayment",
  async (data) => {
    try {
      const response = await axios.put(
        `${paymentPath}/update`,
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

export const deleteUserPayment = createAsyncThunk(
  "deleteUserPayment",
  async (data) => {
    try {
      const response = await axios.delete(
        `${paymentPath}/${data.paymentId}/delete`,
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
  userPayments: [],
  status: "idle",
  error: null,
};

const paymentSlice = createSlice({
  name: "paymentSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllUserPayment.fulfilled, (state, action) => {
        const response = action.payload;

        if (response?.statusCode) {
          const { statusCode, data } = response;
          console.log(statusCode);
          console.log(data);
          if (statusCode === 200) {
            state.status = "idle";
            console.log("fetchAllUserPayment success");
            state.userPayments = data;
          } else {
            state.status = "failed";
            state.error = String(data);
            console.log("error occured in Server");
          }
        } else {
          console.log("error occured in fetchAllUserPayment");
        }
      })
      .addCase(postUserPayment.fulfilled, (state, action) => {
        const response = action.payload;

        if (response?.statusCode) {
          const { statusCode, data } = response;
          if (statusCode === 201) {
            state.status = "idle";
            console.log("addUserPayment success");
            state.userPayments = [...state.userPayments, data];
          } else {
            state.status = "failed";
            state.error = String(data);
            console.log(state.error);
          }
        } else {
          console.log("error occured in addUserPayment");
          console.log(state.error);
        }
      })
      .addCase(deleteUserPayment.fulfilled, (state, action) => {
        const response = action.payload;

        if (response?.statusCode) {
          const { statusCode, data } = response;
          if (statusCode === 200) {
            state.status = "idle";
            console.log("deleteShipping success");
            const userpayment = state.userPayments.filter(
              (payment) => payment.id !== Number(data)
            );
            state.userPayments = [...userpayment];
          } else {
            state.status = "failed";
            state.error = String(data);
            console.log(state.error);
          }
        } else {
          console.log("error occured in deleteUserPayment");
        }
      })
      .addCase(updateUserPayment.fulfilled, (state, action) => {
        const response = action.payload;

        if (response?.statusCode) {
          const { statusCode, data } = response;
          if (statusCode === 200) {
            state.status = "idle";
            console.log("updateUserPayment success");
            console.log(data);
            state.userPayments = [
              ...state.userPayments.filter(
                (payment) => payment.id !== Number(data.id)
              ),
              data,
            ];
          } else {
            state.status = "failed";
            state.error = String(data);
            console.log("updateUserPayment failed");
            console.log(state.error);
          }
        } else {
          console.log("error occured in updateUserPayment");
        }
      });
  },
});
export default paymentSlice.reducer;
export const getAllUserPayment = (state) => state.userpayment.userPayments;
export const getStatus = (state) => state.userpayment.status;
export const getError = (state) => state.userpayment.error;
