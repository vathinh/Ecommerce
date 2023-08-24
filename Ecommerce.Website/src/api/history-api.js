import { token } from "utils/token";
import { request } from "../utils/axios";  

const getHistoryAPI = (params) => request('get', `history${params}`, token());
const postHistoryAPI = (data) => request('post', 'history', token(), data);

export {
	getHistoryAPI,
	postHistoryAPI
}