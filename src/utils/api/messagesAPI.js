import axios from './../../core/axios';

const messagesAPI = {
    getAllByDialogId: (id) => {
        return axios.get('http://localhost:5000/messages?id=' + id);
    },
    send: (message) => {
        return axios.post('http://localhost:5000/messages', message);
    },
    delete: (id) => {
        return axios.delete('http://localhost:5000/messages?id=' + id);
    },
    update: ({ id, text }) => {
        return axios.put('http://localhost:5000/messages', { id, text });
    }
}

export default messagesAPI;