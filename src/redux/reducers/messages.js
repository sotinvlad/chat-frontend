const initialState = {
    items: [],
    isLoading: false,
}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MESSAGES:SET_ITEMS':
            return {
                ...state,
                items: action.payload,
                isLoading: false
            };
        case 'MESSAGES:ADD_ITEM':
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        case 'MESSAGES:DELETE_ITEM':
            console.log(action,state.items.filter(m => m._id !== action.payload))
            return {
                ...state,
                items: state.items.filter(m => m._id !== action.payload)
            };
        case 'MESSAGES:UPDATE_ITEM':
            let itemToUpdate = state.items.find(i => i._id === action.payload.id);
            if (itemToUpdate !== undefined){
                itemToUpdate.text = action.payload.text;
                itemToUpdate.isReaded = action.payload.isReaded;
                itemToUpdate.attachments = action.payload.attachments;
            }
            const newItems = [...state.items];
            return {
                ...state,
                items: newItems,
            };
        case 'MESSAGES:SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;

    }
}

export default messagesReducer;