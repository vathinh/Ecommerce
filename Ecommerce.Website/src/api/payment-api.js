import { token } from "utils/token";
import { request } from "../utils/axios";  

const getPaymentAPI = (params) => request('get', `payment${params}`, token());
const postPaymentAPI = (data) => request('post', 'payment', token(), data);
const putPaymentAPI = (id, data) => request('put', `payment/${id}`, token(), data);
const deletePaymentAPI = (id) => request('delete', `payment/${id}`, token());

export {
	getPaymentAPI,
	postPaymentAPI,
	putPaymentAPI,
	deletePaymentAPI
}