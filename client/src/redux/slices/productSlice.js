import { createSlice } from '@reduxjs/toolkit';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from '../actions/productAction';

const initialState = {
  products: [],
  product: null,
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });

    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.product = action.payload;
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const index = state.products.findIndex((el) => el._id === action.payload._id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(el => el._id !== action.payload);
    });
  },
});

export default productSlice.reducer;
