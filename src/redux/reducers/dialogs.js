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
        case 'DIALOGS:UPDATE_DIALOG':
            state.items.forEach((item,index) => item._id === action.payload._id ? state.items[index] = action.payload : null);
            const newItems = [...state.items];
            return {
                ...state,
                items: newItems
            }
        default:
            return state;

    }
}

export default dialogsReducer;