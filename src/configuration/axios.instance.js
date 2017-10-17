import axios from 'axios'

export default {
	local: axios.create(),
	auth: axios.create()
};
