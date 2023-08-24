import { request } from "../utils/axios";  

const getUserAPI = (params) => request('get', `user${params}`);
const putUserAPI = (id, data) => request('put', `user/${id}`, null, data);
const deleteUserAPI = (id) => request('delete', `user/${id}`, null);

export {
	getUserAPI,
	putUserAPI,
	deleteUserAPI
}