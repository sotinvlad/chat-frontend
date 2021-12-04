import messagesAPI from './../utils/api/messagesAPI';

const actions = {
    setMessages: (data) => ({
        type: 'MESSAGES:SET_ITEMS',
        payload: data.data
    }),

    fetchMessages: (id) => (dispatch) => {
        messagesAPI.getAllByDialogId(id).then(data => {
            dispatch(actions.setMessages(data));
        })
    }
}

export default actions;