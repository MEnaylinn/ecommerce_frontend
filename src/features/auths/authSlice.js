import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userPath } from "../../config/pathConfig";
import axios from "axios";

const SIGNIN_PATH = `${userPath}/signin`;
const SIGNUP_PATH = `${userPath}/signup`;

export const signin = createAsyncThunk("signin", async (loginRequest) => {
  try {
    const response = await axios.post(SIGNIN_PATH, loginRequest, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return {
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error(error);
  }
});
export const signup = createAsyncThunk("signup", async (user) => {
  try {
    const response = await axios.post(SIGNUP_PATH, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return {
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error(error);
  }
});
export const updateUser = createAsyncThunk("updateUser", async (data) => {
  console.log(`${userPath}/updateInfo`);
  try {
    const response = await axios.put(`${userPath}/updateInfo`, data.user, {
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
});
export const updatePassword = createAsyncThunk(
  "updatePassword",
  async (data) => {
    try {
      const response = await axios.put(
        `${userPath}/updatePassword`,
        data.updatePasswordRequest,
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
  loginStatus: false,
  status: "idle",
  token: "",
  user: {},
  roles: [],
};
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.loginStatus = false;
      state.status = "idle";
      state.token = "";
      state.user = {};
      state.roles = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signin.fulfilled, (state, action) => {
        const response = action.payload;

        if (response?.statusCode) {
          const { statusCode, data } = response;
          if (statusCode === 200) {
            state.loginStatus = data.success ? true : false;
            state.token = data.token;
            state.user = data.user;
            state.roles = data.roles;
            console.log("Login Success");
            console.log(state.user);
            console.log(state.success);
            console.log(state.token);
            console.log(state.roles);
          } else {
            console.log("Login fail due to server.");
          }
        } else {
          console.log("Login fail due to server1.");
        }
      })

      .addCase(signup.fulfilled, (state, action) => {
        const response = action.payload;

        if (response?.statusCode) {
          const { statusCode, data } = response;
          if (statusCode === 200) {
            state = data;
            console.log("Signup successful.");
          } else {
            console.log("Signup fail due to server.");
          }
        } else {
          console.log("Sigup Failed");
        }
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const response = action.payload;

        if (response?.statusCode) {
          const { statusCode, data } = response;
          if (statusCode === 200) {
            state.user = data;
            state.status = "idle";
            state.loginStatus = true;
            console.log("Update UserInfo successful.");
            console.log(data.user);
          } else {
            console.log("Update UserInfo fail due to server.");
            state.status = "failed";
          }
        } else {
          console.log("Update UserInfo Failed");
        }
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        const response = action.payload;

        if (response?.statusCode) {
          const { statusCode } = response;
          if (statusCode === 200) {
            state.user = null;
            state.status = "idle";
            state.loginStatus = false;
            state.token = "";
            console.log("Update password successful.");
          } else {
            state.status = "failed";
            console.log("Update password fail due to server.");
          }
        } else {
          state.status = "failed";
          console.log(state.status)
          console.error("Update password failed:");
        }
      })
    }
});

export default authSlice.reducer;
export const getLoginStatus = (state) => state.auths.loginStatus;
export const getStatus = (state) => state.auths.status;
export const getToken = (state) => state.auths.token;
export const getUser = (state) => state.auths.user;
export const getRole = (state) => state.auths.roles;
export const { logout } = authSlice.actions;
