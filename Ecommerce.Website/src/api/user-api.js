import { request } from "../utils/axios";
import {token} from "../utils/token";

// Fetch user details by ID or with additional query parameters
const getUserAPI = (params) => {
	if (typeof params === 'object') {
		// If params is an object, convert it to a query string
		const queryParams = new URLSearchParams(params).toString();
		return request('get', `user?${queryParams}`, token());
	} else {
		// If params is a simple ID, use it in the URL
		return request('get', `user/${params}`, token());
	}
};

// Update user details by ID
const putUserAPI = (id, data) => request('put', `user/${id}`, null, data);

// Delete user by ID
const deleteUserAPI = (id) => request('delete', `user/${id}`, null);

export {
	getUserAPI,
	putUserAPI,
	deleteUserAPI
};
