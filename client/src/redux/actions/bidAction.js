import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createBid = createAsyncThunk(
  'bid/createBid',
  async ({ productId, bid }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BASEURL}/bid/${productId}`,{bidAmount:bid},{
        headers:{
          Authorization:JSON.parse(localStorage.getItem("auth"))?.token||""
        }
      });
      return { ...data, productId }; 
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateBid = createAsyncThunk(
  'bid/updateBid',
  async ({ bidId, bidData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_BASEURL}/bid/${bidId}`, bidData,{
        headers:{
          Authorization:JSON.parse(localStorage.getItem("auth"))?.token||""
        }
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteBid = createAsyncThunk(
  'bid/deleteBid',
  async ({ bidId, productId }, { rejectWithValue }) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASEURL}/bid/${bidId}`,{
        headers:{
          Authorization:JSON.parse(localStorage.getItem("auth"))?.token||""
        }
      });
      return { bidId, productId }; 
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
