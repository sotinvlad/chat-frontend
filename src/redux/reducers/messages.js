const initialState = {
    items: [],
    isLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'MESSAGES:SET_ITEMS':
            return {
                ...state,
                items: action.payload,
                isLoading: false
            };
        case 'MESSAGES:SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.payload
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