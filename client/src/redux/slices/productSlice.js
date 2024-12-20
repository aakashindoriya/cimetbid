import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../actions/productAction";
import {
  createBid,
  updateBid,
  deleteBid,
  confirmBid,
} from "../actions/bidAction";
import { toast } from "react-toastify";
const initialState = {
  products: [],
  selectedProduct: null,
  status: "idle",
  bidStatus: "idle",
  error: null,
  bidError: null,
  selectedProductError: null,
  selectedProductLoading: false,
  totalpages:10,
  page:1
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    newProduct: (state, action) => {
      state.products.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products;
        state.totalpages=action.payload.totalPage;
        state.page=action.payload.page
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload);
        toast.success(`project created successfully`);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(`something went wrong`);
      })
      .addCase(getProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProduct = action.payload[0];
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        
        toast.success(`project updated successfully`)
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(`something went wrong`);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createBid.pending, (state) => {
        state.bidStatus = "loading";
      })
      .addCase(createBid.fulfilled, (state, action) => {
        state.bidStatus = "succeeded";
        const productIndex = state.products.findIndex(
          (product) => product._id === action.payload.productId
        );
        if (productIndex !== -1) {
          state.products[productIndex].bids.push(action.payload);
        }
        toast.success(`bid crated successfully`);
      })
      .addCase(createBid.rejected, (state, action) => {
        state.bidStatus = "failed";
        state.bidError = action.payload;
        toast.error(`Error adding  bid: ${action.payload.message}`);
      })
      .addCase(updateBid.pending, (state) => {
        state.bidStatus = "loading";
      })
      .addCase(updateBid.fulfilled, (state, action) => {
        state.bidStatus = "succeeded";
        const productIndex = state.products.findIndex(
          (product) => product._id === action.payload.productId
        );
        if (productIndex !== -1) {
          const bidIndex = state.products[productIndex].bids.findIndex(
            (bid) => bid._id === action.payload._id
          );
          if (bidIndex !== -1) {
            state.products[productIndex].bids[bidIndex] = action.payload;
          }
        }
      })
      .addCase(updateBid.rejected, (state, action) => {
        state.bidStatus = "failed";
        state.bidError = action.payload;
      })
      .addCase(deleteBid.pending, (state) => {
        state.bidStatus = "loading";
      })
      .addCase(deleteBid.fulfilled, (state, action) => {
        state.bidStatus = "succeeded";
        state.selectedProduct.bids = state.selectedProduct.bids.filter(
          (el) => el._id !== action.payload.bidId
        );
      })
      .addCase(deleteBid.rejected, (state, action) => {
        state.bidStatus = "failed";
        state.bidError = action.payload;
      })
      .addCase(confirmBid.fulfilled, (state, action) => {
        const { product, successfulBid } = action.payload;
        (state.bidError = false), (state.selectedProduct = product);
        toast.success(`bid confirmed`);
      });
  },
});
export const { newProduct } = productSlice.actions;
export default productSlice.reducer;
