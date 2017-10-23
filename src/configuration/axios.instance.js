import axios from 'axios'

export default axios;

/**当前宿主web server*/
export const api = axios.create({
	baseURL: __SPA__ ? "http://127.0.0.1:3000/api" : "/api"
});

