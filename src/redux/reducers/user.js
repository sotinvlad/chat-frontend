import { io } from "socket.io-client";

const initialState = {
    data: window.localStorage.user === undefined ? null : JSON.parse(window.localStorage.user),
    token: 'window.localStorage.token || null',
    isAuth: window.localStorage.user === undefined || window.localStorage.token === undefined ? false : true,
    socket: io.connect('http://localhost:5000', {
        auth: { token: window.localStorage.token }
      }),
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER:SET_USER_DATA':
            if(action.payload === null){
                return {
                    ...state,
                    data: null,
                    token: null,
                    isAuth: false
                }
            }
            return {
                ...state,
                data: action.payload.user,
                token: action.payload.accessToken,
                isAuth: true,
                socket: io.connect('http://localhost:5000', {
                    auth: { token: window.localStorage.token }
                  })
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