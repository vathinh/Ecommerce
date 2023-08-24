import axios from "axios";

const request = (method, endpoint, token, data, options = {}) => {
  const { headers = {}, ...rest } = options;
  const authHeaders = {
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
  };

  return axios({
    ...rest,
    headers: token
      ? {
          ...headers,
          ...authHeaders,
        }
      : headers,
    method,
    data,
    url: `${process.env.REACT_APP_API_URL}/${endpoint}`
  });
};

export { request };
