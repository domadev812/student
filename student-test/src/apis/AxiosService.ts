import axios from 'axios';
import queryString from 'query-string';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.response.use(
  (response) => response.data,
  (err) => {
    const error = err.response;
    throw error;
  },
);

const AxiosService = () => {
  let AuthorizationToken = '';

  function addHeaders(userConfig: any) {
    const globalHeaders: any = {};

    // You can set global headers here
    if (AuthorizationToken) {
      globalHeaders.Authorization = `Bearer ${AuthorizationToken}`;
    }

    const { headers } = userConfig;

    // Return extended config
    return {
      headers: {
        ...globalHeaders,
        ...headers,
      },
    };
  }

  // Set authorization token
  function setAuthorizationToken(token: string) {
    AuthorizationToken = token;
  }

  // GET method
  function get(endPoint: string, params = {}, userConfig = {}) {
    const paramsString = queryString.stringify(params);
    return axios.get(`${endPoint}?${paramsString}`, addHeaders(userConfig));
  }

  // POST method
  function post(endPoint: string, params = {}, userConfig = {}) {
    return axios.post(endPoint, params, addHeaders(userConfig));
  }

  // Patch method
  function patch(endPoint: string, params = {}, userConfig = {}) {
    return axios.patch(endPoint, params, addHeaders(userConfig));
  }

  function put(endPoint: string, params = {}, userConfig = {}) {
    return axios.put(endPoint, params, addHeaders(userConfig));
  }

  function del(endPoint: string, userConfig = {}) {
    return axios.delete(endPoint, addHeaders(userConfig));
  }

  return {
    setAuthorizationToken,
    get,
    post,
    put,
    patch,
    del,
  };
};

// let's return back our create method as the default.
export default AxiosService();
