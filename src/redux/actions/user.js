const actions = {
    setUserData: (data) => ({
        type: 'USER:SET_USER_DATA',
        payload: data
    }),

    setIsAuth: (data) => ({
        type: 'USER:SET_ISAUTH',
        payload: data
    }),

}

export default actions;