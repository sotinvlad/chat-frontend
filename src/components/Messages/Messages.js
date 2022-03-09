/*
-Компонент получает сообщения и мапит их в компоненты
-Если текущий диалог не выбран отображает это
-Если текущий диалог не имеет сообщений отображает это
-При загрузке диалогов отображает спиннер
*/
import React from 'react';
import { Empty, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import Message from '../Message/Message';
import './Messages.scss';

const Messages = ({items, isLoading, currentDialogId, userData, messagesBlock}) => {
    return (
        <div 
            className={classnames('messages', {'messages--loading' : isLoading})}
            ref={messagesBlock}
        >
            {
                isLoading ? 
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                :   items.length ? 
                        items.map(item => <Message
                            key = {item._id}  
                            {...item} 
                            isMe = {userData._id === item.user._id}
                            userData = {userData}
                            />) 
                    :   <Empty  description={currentDialogId === null ? 'Выберите чат, чтобы начать общение' : 'Сообщений пока нет...'}/>
                    
            }
        </div>
    )
}

export default Messages;


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