import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { cartPath } from "../../config/pathConfig";

export const fetchAllCartItem = createAsyncThunk(
  "fetchAllCartItem",
  async (token) => {
    console.log(`${cartPath}/all`);
    try {
      const response = await axios.get(`${cartPath}/all`, {
        headers: {
          Authorization: String(token),
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

export const fetchOrderedCartItems = createAsyncThunk(
  "fetchOrderedCartItems",
  async (data) => {
    try {
      const response = await axios.get(
        `${cartPath}/orderedCartItem/${data.username}`,
        {
          headers: {
            Authorization: String(data.token),
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

export const fetchAllOrderedCartItems = createAsyncThunk(
  "fetchAllOrderedCartItems",
  async (data) => {
    try {
      const response = await axios.get(
        `${cartPath}/allOrderedCartItem/${data.username}/${data.role}`,
        {
          headers: {
            Authorization: String(data.token),
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

export const fetchAllUserOrderedItem = createAsyncThunk(
  "fetchAllUserOrderedItem",
  async (data) => {
    try {
      const response = await axios.get(
        `${cartPath}/allOrderedItem/${data.role}`,
        {
          headers: {
            Authorization: String(data.token),
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

export const addCartItem = createAsyncThunk("addCartItem", async (data) => {
  console.log(`${cartPath}/add/${data.productId}/${data.username}`);

  try {
    const response = await axios.post(
      `${cartPath}/add/${data.productId}/${data.username}`,
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
});

export const deleteCartItem = createAsyncThunk(
  "deleteCartItem",
  async (data) => {
    try {
      const response = await axios.delete(
        `${cartPath}/${data.cartItemId}/delete`,
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
export const updateCartItem = createAsyncThunk(
  "updateCartItem",
  async (data) => {
    console.log(`${cartPath}/update/${data.cartItemId}/${data.quantity}`);
    try {
      const response = await axios.patch(
        `${cartPath}/update/${data.cartItemId}/${data.quantity}`,
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

const initialState = {
  cartItems: [],
  orderedCartItems: [],
  status: "idle",
  error: "",
};
const cartItemSlice = createSlice({
  name: "cartItemSlice",
  initialState,
  reducers: {
    clearCartItem: (state) => {
      state.cartItems = [];
      state.orderedCartItems = [];
      state.status = "idle";
      state.error = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllCartItem.fulfilled, (state, action) => {
        const response = action.payload;

        if (response?.statusCode) {
          const { statusCode, data } = response;
          console.log(statusCode);
          console.log(data);
          if (statusCode === 200) {
            state.status = "success";
            console.log("fetchAllCartItem success");
            state.cartItems = data;
          } else {
            state.status = "failed";
            state.error = String(data);
            console.log("error occured in Server");
          }
        } else {
          console.log("error occured in fetchAllCartItem");
        }
      })

      .addCase(fetchOrderedCartItems.fulfilled, (state, action) => {
        const response = action.payload;

        if (response?.statusCode) {
          const { statusCode, data } = response;
          console.log(statusCode);
          console.log(data);
          if (statusCode === 200) {
            state.status = "success";
            state.orderedCartItems = data;
          } else {
            state.status = "failed";
            state.error = String(data);
            console.log("error occured in Server");
          }
        } else {
          console.log("error occured in fetchAllCartItem");
        }
      })

      .addCase(fetchAllOrderedCartItems.fulfilled, (state, action) => {
        const response = action.payload;

        if (response?.statusCode) {
          const { statusCode, data } = response;
          console.log(statusCode);
          console.log(data);
          if (statusCode === 200) {
            state.status = "success";
            state.orderedCartItems = data;
          } else {
            state.status = "failed";
            state.error = String(data);
            console.log("error occured in Server");
          }
        } else {
          console.log("error occured in fetchAllOrderedCartItem");
        }
      })

      .addCase(addCartItem.fulfilled, (state, action) => {
        const response = action.payload;

        if (response?.statusCode) {
          const { statusCode, data } = response;
          if (statusCode === 201) {
            state.status = "idle";
            console.log("addCartItem success");
            state.cartItems = [...state.cartItems, data];
          } else {
            state.status = "failed";
            state.error = String(data);
            console.log(state.error);
          }
        } else {
          console.log("error occured in addCartItem");
          console.log(state.error);
        }
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        const response = action.payload;

        if (response?.statusCode) {
          const { statusCode, data } = response;
          if (statusCode === 200) {
            state.status = "idle";
            console.log("deleteCartItem success");
            const carts = state.cartItems.filter(
              (cart) => cart.cartItemId !== Number(data)
            );
            state.cartItems = [...carts];
          } else {
            state.status = "failed";
            state.error = String(data);
            console.log(state.error);
          }
        } else {
          console.log("error occured in deleteCartItem");
        }
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const response = action.payload;

        if (response?.statusCode) {
          const { statusCode, data } = response;
          if (statusCode === 200) {
            state.status = "idle";
            console.log("updateCartItem success");
            console.log(data);
            const items = state.cartItems.filter(
              (cartItem) => cartItem.id !== Number(data.id)
            );
            state.cartItems = [data, ...items];
          } else {
            state.status = "failed";
            state.error = String(data);
            console.log("updateCartItem failed");
            console.log(state.error);
          }
        } else {
          console.log("error occured in updateCartItem");
        }
      });
  },
});
export default cartItemSlice.reducer;
export const getAllCartItems = (state) => state.carts.cartItems;
export const getAllOrderedItems = (state) => state.carts.orderedCartItems;
export const getStatus = (state) => state.carts.status;
export const getError = (state) => state.carts.error;
export const { clearCartItem } = cartItemSlice.actions;
