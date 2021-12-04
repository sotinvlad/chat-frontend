const initialState = {
    items: [],
    currentDialogId: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'DIALOGS:SET_ITEMS':
            return {
                ...state,
                items: action.payload
            };
        case 'DIALOGS:SET_CURRENT_DIALOG_ID':
            return {
                ...state,
                currentDialog: action.payload
            }
        default:
            return state;

    }
}