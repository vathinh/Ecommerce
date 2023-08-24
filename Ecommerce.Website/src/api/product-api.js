import { token } from "utils/token";
import { request } from "../utils/axios";

const getProductAPI = (params) => request("get", `product${params}`);
const postProductAPI = (data) => request("post", "product", token(), data);
const putProductAPI = (id, data) => request("put", `product/${id}`, token(), data);
const deleteProductAPI = (id) => request("delete", `product/${id}`, token());

export { getProductAPI, postProductAPI, putProductAPI, deleteProductAPI };
