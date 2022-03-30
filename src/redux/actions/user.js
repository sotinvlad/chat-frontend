import userAPI from "../../utils/api/userAPI";

const actions = {
    setUserData: (data) => ({
        type: 'USER:SET_USER_DATA',
        payload: data
    }),

    setIsAuth: (data) => ({
        type: 'USER:SET_ISAUTH',
        payload: data
    }),

    authUser: (userId) => (dispatch) => {
        userAPI.get(userId)
        .then(() => {
            dispatch(actions.setIsAuth(true));
            return true;
        })
        .catch(() => {
            dispatch(actions.setIsAuth(false));
            return false;
        })
    }
}

export default actions;