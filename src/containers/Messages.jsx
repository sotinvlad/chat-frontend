/*
-Контейнерный компонент, который запрашивает сообщения при изменении CurrentDialogId
-Если CurrentDialogId === null не запрашивает
-Через реф получает доступ к окну отрисовки сообщений и при изменении сообщений прокручивает его вниз
*/
import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux';

import BaseMessages from '../components/Messages/Messages';
import messagesActions from './../redux/actions/messages';
import socket from './../core/socket';


const Messages = ({items, currentDialogId, userData, isLoading, fetchMessages, addMessage}) => {
    const messagesBlock = useRef();
    useEffect(() => {
        socket.off('SERVER:SEND_MESSAGE', data => {
            if (data.dialogId === currentDialogId){
                addMessage(data);
            }
        });
        socket.on('SERVER:SEND_MESSAGE', data => {
            if (data.dialogId === currentDialogId){
                console.log('addMessage', data)
                addMessage(data);
            }
        });
        return () => {
            socket.off('SERVER:SEND_MESSAGE', data => {
                if (data.dialogId === currentDialogId){
                    addMessage(data);
                }
            });
        }
    }, [currentDialogId]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (currentDialogId !== null){
            fetchMessages(currentDialogId);
        }
            
    }, [currentDialogId]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        messagesBlock.current.scrollTo(0,999999);
    },[items])
    
    return (
        <BaseMessages
            messagesBlock={messagesBlock}
            currentDialogId = {currentDialogId}
            items = {items}
            userData = {userData}
            isLoading = {isLoading}
        />
    )
}

const mapStateToProps = (state) => ({
    items: state.messages.items,
    currentDialogId: state.dialogs.currentDialogId,
    userData: state.user.data,
    isLoading: state.messages.isLoading,
})

export default connect(mapStateToProps, { ...messagesActions})(Messages);

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