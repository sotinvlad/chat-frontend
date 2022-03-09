import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.token}`;

export default axios;