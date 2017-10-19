import axios from 'axios'

export default axios;

/**当前宿主web server*/
export const api = axios.create({
	baseURL: "/api"
});

