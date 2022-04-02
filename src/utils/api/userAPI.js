import axios from '../../core/axios';
import { encodeRailFenceCipher } from './../helpers/encoderDecoder'

const userAPI = {
    login: ({email, password}) => {
        return axios.post('http://localhost:5000/user/login', {email, password: encodeRailFenceCipher(password, 3)});
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