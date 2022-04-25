import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BaseApi from "../../config/BaseApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const login = createAsyncThunk("login", async (formData) => {
  return BaseApi.post("token/", {
    email: formData.email,
    password: formData.password,
  }).then(function (res) {
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);
    BaseApi.defaults.headers["Authorization"] =
      "JWT " + localStorage.getItem("access_token");
  });
});

const UserSlice = createSlice({
  name: "user",
  initialState: {
    status: "pending",
    user: [],
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "successful";
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "rejected";
    });
  },
});

export default UserSlice.reducer;
