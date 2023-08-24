import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoryAPI } from "api";
import * as Actions from 'actions';

export const getAllCategories = createAsyncThunk(
	'GET categories',
	async (value, { dispatch, rejectWithValue }) => {
		try {
			const result = await getCategoryAPI();

			const parentCate = result.data?.filter(item => !item.parent);
			const childCate = result.data?.filter(item => item.parent);
			const newData = parentCate.map(item => {
				return {
					...item,
					child: childCate.filter(c => c.parent === item.id)
				}
			});

			return newData;
		} catch(error) {
			dispatch(Actions.setAlertSnackbar({
				state: true,
				type: "error",
				content: "Get categories failed!"
			}));
			return rejectWithValue(error.response.data);
		}
	}
)