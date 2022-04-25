import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/Api";

export const login = createAsyncThunk("login", async (formData) => {
  return api
    .post("token/", {
      email: formData.email,
      password: formData.password,
    })
    .then(function (res) {
      
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      api.defaults.headers["Authorization"] =
        "JWT " + localStorage.getItem("access_token");
    });
});
export const logout = createAsyncThunk("logout", async () => {
  return api
    .post("user/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    })
    .then(function (res) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      api.defaults.headers["Authorization"] = null;
    });
});

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null;
      state.isSuccess = false;
    });
  },
});

export default UserSlice.reducer;
