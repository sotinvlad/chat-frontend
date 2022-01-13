const initialState = {
    items: [],
    currentDialogId: null,
    isLoading: false
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DIALOGS:SET_ITEMS':
            return {
                ...state,
                items: action.payload,
                isLoading: false
            };
        case 'DIALOGS:SET_CURRENT_DIALOG_ID':
            return {
                ...state,
                currentDialogId: action.payload
            };
        case 'DIALOGS:SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;

    }
}

export default dialogsReducer;