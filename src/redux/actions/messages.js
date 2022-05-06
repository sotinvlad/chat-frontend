import messagesAPI from '../../utils/api/messagesAPI';

const actions = {
    setMessages: (data) => ({
        type: 'MESSAGES:SET_ITEMS',
        payload: data
    }),

    setIsLoading: (data) => ({
        type: 'MESSAGES:SET_IS_LOADING',
        payload: data
    }),

    addMessage: (data) => ({
        type: 'MESSAGES:ADD_ITEM',
        payload: data
    }),

    deleteMessage: (_id) => ({
        type: 'MESSAGES:DELETE_ITEM',
        payload: _id
    }),

    updateMessage: (id, text, isReaded, attachments, audio) => ({
        type: 'MESSAGES:UPDATE_ITEM',
        payload: { id, text, isReaded, attachments, audio }
    }),

    fetchMessages: (id) => (dispatch) => {
        dispatch(actions.setIsLoading(true));
        messagesAPI.getAllByDialogId(id).then(data => {
            dispatch(actions.setMessages(data.data));
        })
    },
}

export default actions;