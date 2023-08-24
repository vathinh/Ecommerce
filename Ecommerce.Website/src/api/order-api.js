import { token } from "utils/token";
import { request } from "../utils/axios";  

const getOrderAPI = (params) => request('get', `order${params}`, token());
const postOrderAPI = (data) => request('post', 'order', token(), data);
const putOrderAPI = (id, data) => request('put', `order/${id}`, token(), data);
const deleteOrderAPI = (id) => request('delete', `order/${id}`, token());

export {
	getOrderAPI,
	postOrderAPI,
	putOrderAPI,
	deleteOrderAPI
}