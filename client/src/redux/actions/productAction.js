import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('product/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/products');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const createProduct = createAsyncThunk('product/createProduct', async (productData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/products/create', productData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getProductById = createAsyncThunk('product/getProductById', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateProduct = createAsyncThunk('product/updateProduct', async ({ id, updates }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`/api/products/${id}`, updates);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/api/products/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
