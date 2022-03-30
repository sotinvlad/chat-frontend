import dialogsAPI from '../../utils/api/dialogsAPI';

const actions = {
    setDialogs: (data) => ({
        type: 'DIALOGS:SET_ITEMS',
        payload: data
    }),

    setCurrentDialog: (data) => ({
        type: 'DIALOGS:SET_CURRENT_DIALOG',
        payload: data
    }),

    setIsLoading: (data) => ({
        type: 'DIALOGS:SET_IS_LOADING',
        payload: data
    }),

    updateDialog: (dialog) => ({
        type: 'DIALOGS:UPDATE_DIALOG',
        payload: dialog
    }),

    onDialogClick: (data) => (dispatch) => {
        dispatch(actions.setCurrentDialog(data));
    },

    fetchDialogs: (id) => (dispatch) => {
        dispatch(actions.setIsLoading(true));
        dialogsAPI.getAll(id).then(data => {
            dispatch(actions.setDialogs(data.data));
        })
    }
}

export default actions;