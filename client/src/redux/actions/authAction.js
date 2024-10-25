import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (creds, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASEURL}/user/login`,
        creds
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASEURL}/user/signup`,
        userData
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);
 
export const logoutUser = createAsyncThunk("auth/logout", async(_,{rejectWithValue}) => {
try {
    let {data}=await axios.get(`${import.meta.env.VITE_BASEURL}/user/logout`, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("auth"))?.token || "",
      },
    });
    return data
} catch (error) {
  return rejectWithValue(
    error.response?.data?.message || "Registration failed"
  )
}
  
});
