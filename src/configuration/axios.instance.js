import axios from 'axios'

export default axios;

export const local = axios.create({
	baseURL: "/api"
});

