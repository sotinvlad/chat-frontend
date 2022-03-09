const initialState = {
    data: window.localStorage.user === undefined ? null : JSON.parse(window.localStorage.user),
    token: 'window.localStorage.token || null',
    isAuth: window.localStorage.user === undefined || window.localStorage.token === undefined ? false : true,
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