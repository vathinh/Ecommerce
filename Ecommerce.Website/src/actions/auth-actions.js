import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { signInAPI, signUpAPI } from "api";
import * as Actions from 'actions';

export const signInAccount = createAsyncThunk(
	'POST Sign In',
	async (data, { dispatch, rejectWithValue }) => {
		try {
			const result = await signInAPI(data);
			dispatch(Actions.setAlertSnackbar({
				state: true,
				type: "success",
				content: "Sign in success!"
			}));
			return result.data;
		} catch(error) {
			dispatch(Actions.setAlertSnackbar({
				state: true,
				type: "error",
				content: "Sign in failed!"
			}));
			return rejectWithValue(error.response.data);
		}
	}
);

export const signUpAccount = createAsyncThunk(
	'POST Sign Up',
	async (data, { dispatch, rejectWithValue }) => {
		try {
			const result = await signUpAPI(data);
			dispatch(Actions.setAlertSnackbar({
				state: true,
				type: "success",
				content: "Sign up success!"
			}));
			return result.data;
		} catch(error) {
			dispatch(Actions.setAlertSnackbar({
				state: true,
				type: "error",
				content: "Sign up failed!"
			}));
			return rejectWithValue(error.response.data);
		}
	}
);

export const signOutAccount = createAction('Sign Out');

export const setAlertSnackbar = createAsyncThunk(
	'Set Alert Snackbar',
	async (data) => {
		return data;
	}
);

