import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.token}`

const userAPI = {
    login: (data) => {
        return axios.post('http://localhost:3000/user/login', data);
    },

    register: (data) => {
        return axios.post('http://localhost:3000/user/registration', data);
    }
}

export default userAPI;