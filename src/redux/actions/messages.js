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

    fetchMessages: (id) => (dispatch) => {
        dispatch(actions.setIsLoading(true));
        messagesAPI.getAllByDialogId(id).then(data => {
            dispatch(actions.setMessages(data.data));
        })
    }
}

export default actions;