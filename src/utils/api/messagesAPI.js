import axios from './../../core/axios';

const messagesAPI = {
    getAllByDialogId: (id) => {
        return axios.get('http://localhost:5000/messages?id='+id);
    },
    send: (message) => {
        return axios.post('http://localhost:5000/messages', message);
    }
}

export default messagesAPI;