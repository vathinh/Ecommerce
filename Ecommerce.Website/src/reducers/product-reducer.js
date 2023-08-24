import { createSlice } from "@reduxjs/toolkit";
import * as Actions from "actions";

const initialState = {
	loaded: false,
	list: [],
    data: null,
	statics: null
}

const productSlice = createSlice({
  name: "product",
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Actions.getProductsList.fulfilled, (state, action) => {
		state.list = action.payload
		state.loaded = true
	});
	builder.addCase(Actions.getSingleProduct.fulfilled, (state, action) => {
		state.data = action.payload
		state.loaded = true
	});
	builder.addCase(Actions.getProductStatistics.fulfilled, (state, action) => {
		state.statics = action.payload
	})
	builder.addCase(Actions.clearProductState, (state) => {
		state = initialState
	});
  },
});

const { reducer } = productSlice;
export default reducer;
