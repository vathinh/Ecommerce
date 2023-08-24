import { createSlice } from "@reduxjs/toolkit";
import * as Actions from "actions";
import { putOrderAPI } from "api";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    list: JSON.parse(localStorage.getItem("cart")) ?? [],
	data: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Actions.addToCart.fulfilled, (state, action) => {
		const data = action.payload.data;
		let currentCart = state.list;
		const index = currentCart.findIndex(item => item.id === data.id);

		if(index > -1) {
			currentCart[index].quantity += 1;
		} else {
			currentCart.push({
				...data,
				quantity: 1
			})
		}

		state.list = currentCart;

		//if user is not loged in
		if(!action.payload.isLogedIn) {
			localStorage.setItem('cart', JSON.stringify(currentCart));
		} 
	});
	builder.addCase(Actions.removeFromCart.fulfilled, (state, action) => {
		const id = action.payload.id;
		const newCart = state.list?.filter(item => item.id !== id);

		state.list = newCart;
		
		//if user is not loged in
		if(action.payload.isLogedIn) {
			localStorage.setItem('cart', JSON.stringify(newCart));
		}
	});
	builder.addCase(Actions.updateCartData.fulfilled, (state, action) => {
		state.data = action.payload;
	});
	builder.addCase(Actions.updateCartList.fulfilled, (state, action) => {
		state.list = action.payload;
	});
  },
});

const { reducer } = cartSlice;
export default reducer;