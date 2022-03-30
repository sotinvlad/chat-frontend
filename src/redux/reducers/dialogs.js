import MessageReceivedSound from './../../assets/MessageReceivedSound.mp3';
const MessageReceivedAudio = new Audio(MessageReceivedSound);
MessageReceivedAudio.volume = 0.1;
const initialState = {
    items: [],
    currentDialog: {
        _id: '',
    },
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
        case 'DIALOGS:SET_CURRENT_DIALOG':
            return {
                ...state,
                currentDialog: action.payload
            };
        case 'DIALOGS:SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.payload
            };
        case 'DIALOGS:UPDATE_DIALOG':
            if(state.currentDialog._id !== '' && action.payload._id.toString() === state.currentDialog._id.toString()){
                action.payload.dialogParticipants.forEach((i, index, dialogParticipants)=> {
                    dialogParticipants[index].unreadedMessages = 0;
                })
            }
            state.items.forEach((item,index) => {
                if(item._id === action.payload._id){
                    state.items[index] = action.payload;
                };
            });
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