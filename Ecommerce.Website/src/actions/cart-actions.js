import { createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
	'Add To Cart',
	async ({data, isLogedIn}) => {
		return { data, isLogedIn }
	}
);

export const removeFromCart = createAsyncThunk(
	'Remove From Cart',
	async ({id, isLogedIn}) => {
		return { id, isLogedIn }
	}
);

export const updateCartData = createAsyncThunk(
	'Update Cart Data',
	async (data) => data
);

export const updateCartList = createAsyncThunk(
	'Update Cart List',
	async (data) => data
);
