import axios from 'axios';

export  default {
    getAllByDialogId: (id) => {
        return axios.get('http://localhost:9999/messages')
    }
}