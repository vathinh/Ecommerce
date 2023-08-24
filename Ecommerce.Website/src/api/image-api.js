import { request } from "../utils/axios";  

const getImageAPI = (id) => request('get', `image/${id}`);
const postImageAPI = (data) => request('post', 'image');

export {
	getImageAPI,
	postImageAPI
}