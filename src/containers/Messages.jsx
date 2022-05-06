/*
-Контейнерный компонент, который запрашивает сообщения при изменении CurrentDialog._id
-Если CurrentDialog._id === null не запрашивает
-Через реф получает доступ к окну отрисовки сообщений и при изменении сообщений прокручивает его вниз
*/
import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux';

import BaseMessages from '../components/Messages/Messages';
import messagesActions from './../redux/actions/messages';


const Messages = ({items, currentDialog, userData, isLoading, fetchMessages, addMessage, deleteMessage, updateMessage, socket}) => {
    const messagesBlock = useRef();
    const onSendMessage = (data) => {
        if (data.dialogId === currentDialog._id){
            addMessage(data);
            if (data.user._id !== userData._id){
                socket.emit('CLIENT:MESSAGE_IS_READED', data._id)
            }
        }
    }
    useEffect(() => {
        if (currentDialog._id){            
            socket.on('SERVER:SEND_MESSAGE', onSendMessage);
            socket.on('SERVER:MESSAGE_UPDATE', data => {
                console.log('SERVER:MESSAGE_UPDATE', data)
                updateMessage(data._id, data.text, data.isReaded, data.attachments, data.audio);
            });
            socket.on('SERVER:MESSAGE_DELETE', _id => {
                console.log('SERVER:MESSAGE_DELETE', _id)
                deleteMessage(_id);
            })
        }
        return () => {
            socket.removeListener('SERVER:SEND_MESSAGE', onSendMessage);
            socket.removeAllListeners('SERVER:MESSAGE_UPDATE');
            socket.removeAllListeners('SERVER:MESSAGE_DELETE');
        }
    }, [currentDialog._id]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (currentDialog._id !== ''){
            fetchMessages(currentDialog._id);
        }
    }, [currentDialog._id]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        messagesBlock.current.scrollTo(0,999999);
    },[items])
    
    return (
        <BaseMessages
            messagesBlock={messagesBlock}
            currentDialog = {currentDialog}
            items = {items}
            userData = {userData}
            isLoading = {isLoading}
        />
    )
}

const mapStateToProps = (state) => ({
    items: state.messages.items,
    currentDialog: state.dialogs.currentDialog,
    userData: state.user.data,
    isLoading: state.messages.isLoading,
    socket: state.user.socket,
})

export default connect(mapStateToProps, messagesActions)(Messages);

/*
EXAMPLE items:
[
    {
        "_id": "62135c4fa7a5580cc12926fb",
        "text": "Hello from TestUser",
        "dialogId": "6210b06364377aef56b6c7a9",
        "user": {
            "_id": "61bdcee52c0f13ebd1b63d1c",
            "email": "test@yandex.com",
            "fullname": "Test",
            "password": "$2b$10$zmaI22GQnHVhYN.7pJByC.mil5TAQVCQo0BsoZ7s44mEQBdU8HHOS",
            "confirmed": false,
            "createdAt": "2021-12-18T12:07:01.503Z",
            "updatedAt": "2022-02-22T13:54:19.995Z",
            "__v": 0,
            "last_seen": "Tue Feb 22 2022 16:54:19 GMT+0300 (Москва, стандартное время)"
        },
        "createdAt": "2022-02-21T09:33:03.170Z",
        "updatedAt": "2022-02-21T09:33:03.170Z",
        "__v": 0
    },
    {
        "_id": "6214e7e5957ec51d64078382",
        "text": "Hello from Bonart",
        "dialogId": "6210b06364377aef56b6c7a9",
        "user": {
            "_id": "61b212b8f122e4c0500fd9bd",
            "email": "leo@yandex.com",
            "fullname": "Leo Bonart",
            "password": "qwerty",
            "confirmed": false,
            "createdAt": "2021-12-09T14:29:12.202Z",
            "updatedAt": "2021-12-09T14:29:12.202Z",
            "__v": 0
        },
        "createdAt": "2022-02-22T13:40:53.336Z",
        "updatedAt": "2022-02-22T13:40:53.336Z",
        "__v": 0
    }
]

EXAMPLE userData
{
    "_id": "61bdcee52c0f13ebd1b63d1c",
    "email": "test@yandex.com",
    "fullname": "Test",
    "password": "$2b$10$zmaI22GQnHVhYN.7pJByC.mil5TAQVCQo0BsoZ7s44mEQBdU8HHOS",
    "confirmed": false,
    "createdAt": "2021-12-18T12:07:01.503Z",
    "updatedAt": "2022-02-22T13:54:19.995Z",
    "__v": 0,
    "last_seen": "Tue Feb 22 2022 16:54:19 GMT+0300 (Москва, стандартное время)"
}
*/