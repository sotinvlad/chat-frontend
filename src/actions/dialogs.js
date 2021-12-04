import dialogsAPI from './../utils/api/dialogsAPI';

const actions = {
    setDialogs: (data) => ({
        type: 'DIALOGS:SET_ITEMS',
        payload: data.data
    }),

    setCurrentDialogId: (data) => ({
        type: 'DIALOGS:SET_CURRENT_DIALOG_ID',
        payload: data
    }),

    fetchDialogs: () => (dispatch) => {
        dialogsAPI.getAll().then(data => {
            dispatch(actions.setDialogs(data));
        })
    }
}

export default actions;