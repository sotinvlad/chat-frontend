import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.token}`

const dialogsAPI = {
    getAll: (id) => {
        return axios.get('http://localhost:3000/dialogs/' + id);
    }
}

export default dialogsAPI;