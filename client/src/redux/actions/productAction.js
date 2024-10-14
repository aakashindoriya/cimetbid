import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('product/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const {data} = await axios.get(`${import.meta.env.VITE_BASEURL}/product`);
    return data
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
});

export const createProduct = createAsyncThunk('product/createProduct', async (productData, { rejectWithValue }) => {
  try {
    console.log(productData)
    const {data} = await axios.post(`${import.meta.env.VITE_BASEURL}/product/create`, productData,{
      headers:{
        Authorization:JSON.parse(localStorage.getItem("auth"))?.token||""
      }
    });
    console.log(data,"res")
    return data;
  } catch (error) {
    console.log(error)
    return rejectWithValue(error?.response?.data);
  }
});

export const getProductById = createAsyncThunk('product/getProductById', async (id, { rejectWithValue }) => {
  try {
    console.log("hit")
    const {data} = await axios.get(`${import.meta.env.VITE_BASEURL}/product/${id}`);
    console.log(data)
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
});

export const updateProduct = createAsyncThunk('product/updateProduct', async ({ id, updates }, { rejectWithValue }) => {
  try {
    const {data} = await axios.put(`${import.meta.env.VITE_BASEURL}/product/${id}`, updates,{
      headers:{
        Authorization:JSON.parse(localStorage.getItem("auth"))?.token||""
      }
    });
    return data;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${import.meta.env.VITE_BASEURL}/product/${id}`,{
      headers:{
        Authorization:JSON.parse(localStorage.getItem("auth"))?.token||""
      }
    });
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
