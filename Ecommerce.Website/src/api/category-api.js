import { token } from "utils/token";
import { request } from "../utils/axios";  

const getCategoryAPI = () => request('get', `category`, token());
const postCategoryAPI = (data) => request('post', 'category', token(), data);
const putCategoryAPI = (id, data) => request('put', `category/${id}`, token(), data);
const deleteCategoryAPI = (id) => request('delete', `category/${id}`, token());

export {
	getCategoryAPI,
	postCategoryAPI,
	putCategoryAPI,
	deleteCategoryAPI
}