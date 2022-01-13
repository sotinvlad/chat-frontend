import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.token}`

const messagesAPI = {
    getAllByDialogId: (id) => {
        return axios.get('http://localhost:3000/messages?_id='+id);
    }
}

export default messagesAPI;