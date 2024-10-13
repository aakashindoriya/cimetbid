import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createBid = createAsyncThunk(
  'bid/createBid',
  async ({ productId, bidData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BASEURL}/bid/${productId}`, bidData);
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
      const { data } = await axios.put(`${import.meta.env.VITE_BASEURL}/bid/${bidId}`, bidData);
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
      await axios.delete(`${import.meta.env.VITE_BASEURL}/bid/${bidId}`);
      return { bidId, productId }; 
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
