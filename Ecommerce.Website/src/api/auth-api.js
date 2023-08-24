import { request } from "../utils/axios";  

const signInAPI = (data) => request('post', 'auth/signin', null, data);
const signUpAPI = (data) => request('post', 'auth/signup', null, data);

export {
	signInAPI,
	signUpAPI
}