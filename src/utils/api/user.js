import axios from './../../core/axios';

const userAPI = {
    login: (data) => {
        return axios.post('http://localhost:5000/user/login', data);
    },

    register: (data) => {
        return axios.post('http://localhost:5000/user/registration', data);
    },

    get: (id) => {
        return axios.get('http://localhost:5000/user/' + id);
    },

    search: (str) => {
        return axios.post('http://localhost:5000/user/search', { "str": str });
    }
}

export default userAPI;