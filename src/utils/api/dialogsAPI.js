import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.token}`

const dialogsAPI = {
    getAll: () => {
        return axios.get('http://localhost:3000/dialogs');
    }
}

export default dialogsAPI;