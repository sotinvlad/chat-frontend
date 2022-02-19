import dialogsAPI from '../../utils/api/dialogsAPI';

const actions = {
    setDialogs: (data) => ({
        type: 'DIALOGS:SET_ITEMS',
        payload: data
    }),

    setCurrentDialogId: (data) => ({
        type: 'DIALOGS:SET_CURRENT_DIALOG_ID',
        payload: data
    }),

    setIsLoading: (data) => ({
        type: 'DIALOGS:SET_IS_LOADING',
        payload: data
    }),


    fetchDialogs: (id) => (dispatch) => {
        dispatch(actions.setIsLoading(true));
        dialogsAPI.getAll(id).then(data => {
            dispatch(actions.setDialogs(data.data));
        })
    }
}

export default actions;