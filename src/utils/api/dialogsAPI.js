import axios from './../../core/axios';

const dialogsAPI = {
    getAll: (userId) => {
        return axios.get('http://localhost:5000/dialogs/' + userId);
    },
    getDialog: (dialogId) => {
        return axios.get('http://localhost:5000/dialog/' + dialogId);
    },
    create: (userId, authId) => {
        return axios.post('http://localhost:5000/dialogs/', { "dialogParticipants": [userId, authId] })
    },
    deleteDialog: (dialogId) => {
        return axios.delete('http://localhost:5000/dialogs/' + dialogId);
    }
}

export default dialogsAPI;