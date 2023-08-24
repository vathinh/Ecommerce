import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductAPI } from "api";
import { getHistoryAPI, postHistoryAPI } from "api/history-api";
import * as Actions from 'actions';

export const getProductsList = createAsyncThunk(
	'GET products',
	async (query, { dispatch, rejectWithValue }) => {
		try {
			const result = await getProductAPI(query);
			return result.data;
		} catch(error) {
			dispatch(Actions.setAlertSnackbar({
				state: true,
				type: "error",
				content: "Get products failed!"
			}));
			return rejectWithValue(error.response.data);
		}
	}
)

export const getSingleProduct = createAsyncThunk(
	'GET product',
	async (slug, { dispatch, rejectWithValue }) => {
		try {
			const result = await getProductAPI(`/${slug}`);
			return result.data;
		} catch(error) {
			dispatch(Actions.setAlertSnackbar({
				state: true,
				type: "error",
				content: "Get product failed!"
			}));
			return rejectWithValue(error.response.data);
		}
	}
)

export const clearProductState = createAction("Clear product state");

export const getProductStatistics = createAsyncThunk(
	'GET product statistics',
	async (id, { dispatch, rejectWithValue}) => {
		try {
			const result = await getHistoryAPI(`?productId=${id}`);
			if(result.data) {
				return result.data;
			}
		} catch(error) {
			dispatch(Actions.setAlertSnackbar({
				state: true,
				type: "error",
				content: "Get statistics failed!"
			}));
			return rejectWithValue(error.response.data);
		} 
	}
)

export const postHistory = createAsyncThunk(
	'POST history',
	async (data, { dispatch, rejectWithValue }) => {
		try {
			await postHistoryAPI(data);
		} catch(error) {
			dispatch(Actions.setAlertSnackbar({
				state: true,
				type: "error",
				content: "Get statistics failed!"
			}));
			return rejectWithValue(error.response.data);
		}
	}
)