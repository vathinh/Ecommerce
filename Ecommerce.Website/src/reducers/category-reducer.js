import { createSlice } from "@reduxjs/toolkit";
import * as Actions from "actions";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Actions.getAllCategories.fulfilled, (state, action) => {
		state.data = action.payload
	})
  },
});

const { reducer } = categorySlice;
export default reducer;
