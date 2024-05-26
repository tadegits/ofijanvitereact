import { createSlice } from "@reduxjs/toolkit";
export const productSlice = createSlice({
    name: "productData",
    initialState: {
        productData: []
    },
    reducers: {
        saveProduct: (state, action) => {
            state.productData = action.payload
        }
    }
});
export const { saveProduct } = productSlice.actions;
export const selectProduct = (state) => state.productData;
export default productSlice.reducer;