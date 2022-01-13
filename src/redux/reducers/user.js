const initialState = {
    data: null,
    token: null,
    isAuth: false,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER:SET_USER_DATA':
            
            return {
                ...state,
                data: action.payload.user,
                token: action.payload.accessToken,
                isAuth: true
            };
        case 'USER:SET_ISAUTH':
            return {
                ...state,
                isAuth: action.payload
            };
        default:
            return state;

    }
}

export default userReducer;