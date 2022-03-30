/*
-Компонента получает диалоги в props и отрисовывает их в html
-Отрисовывает поле ввода поиска диалогов, передает ему callback
-Получает prop isLoading, и если он равет true отрисовывает индикатор загрузки
-Если prop items пустой отображает картинку, что диалогов нет
-Сортирует диалоги по дате создания
*/
import React from 'react';
import { orderBy } from 'lodash-es';
import { Empty, Input, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import DialogItem from '../DialogItem/DialogItem';
import './Dialogs.scss';
import generateDialogName from '../../utils/helpers/generateDialogName';

export const Dialogs = ({items, userData, currentDialog, isLoading, handleChange, searchValue, onDialogClick}) => {
    return (
        <div className='dialogs'>
            <div className="dialogs__search">
                <Input.Search placeholder="Поиск среди контактов" onChange={value => handleChange(value)} value={searchValue}/>
            </div>
            
            <div className={classnames('dialogs__content', {'dialogs__content--loading' : isLoading})}>
            { 
                isLoading ? 
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                :
                    items.length ? orderBy(items, 'lastMessage.createdAt', 'desc').map(item =>
                        <DialogItem
                            key={item._id}
                            id={item._id}
                            user={generateDialogName(item.dialogParticipants, userData._id)}
                            lastMessage={item.lastMessage ? item.lastMessage : "Сообщений нет..."}
                            isMe={item.lastMessage && item.lastMessage !== 'Сообщений нет...' && item.lastMessage.user === userData._id} 
                            isReaded={item.lastMessage && item.lastMessage !== 'Сообщений нет...' && item.lastMessage.isReaded}
                            createdAt={item.createdAt}
                            onDialogClick={onDialogClick}
                            currentDialog={currentDialog}
                            unreadedMessages={item.dialogParticipants.filter(obj => obj.user._id === userData._id)[0].unreadedMessages}
                            dialogData={item}
                        />
                    )
                    : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description = {'Контакты не найдены :('}/>
            
            }
            </div>
        </div>
    )
}

/*
EXAPMLE items: [
{
    "_id": "623edef6a4ce16aaab28d5c7",
    "dialogParticipants": [
        {
            "user": {
                "_id": "61bdccf3aa5136ef68abadae",
                "email": "khilko@yandex.com",
                "fullname": "п-к Хилько В.О.",
                "password": "$2b$10$yCabo/gqhNBs19uOG5buDOXQY8Q3AFwOErRFnusYgGTtvfgM0w0au",
                "confirmed": false,
                "createdAt": "2021-12-18T11:58:43.882Z",
                "updatedAt": "2022-03-28T08:02:52.117Z",
                "__v": 0,
                "last_seen": "Mon Mar 28 2022 11:02:52 GMT+0300 (Москва, стандартное время)"
            },
            "unreadedMessages": 0,
            "_id": "623edef6a4ce16aaab28d5c8"
        },
        {
            "user": {
                "_id": "61bdcee52c0f13ebd1b63d1c",
                "email": "test@yandex.com",
                "fullname": "Test",
                "password": "$2b$10$zmaI22GQnHVhYN.7pJByC.mil5TAQVCQo0BsoZ7s44mEQBdU8HHOS",
                "confirmed": false,
                "createdAt": "2021-12-18T12:07:01.503Z",
                "updatedAt": "2022-03-28T08:02:48.850Z",
                "__v": 0,
                "last_seen": "Mon Mar 28 2022 11:02:48 GMT+0300 (Москва, стандартное время)"
            },
            "unreadedMessages": 0,
            "_id": "623edef6a4ce16aaab28d5c9"
        }
    ],
    "createdAt": "2022-03-26T09:37:58.143Z",
    "updatedAt": "2022-03-28T08:02:52.129Z",
    "__v": 0,
    "lastMessage": {
        "_id": "623ee8973817b774fb1c1ac2",
        "text": "for test",
        "dialogId": "623edef6a4ce16aaab28d5c7",
        "user": "61bdccf3aa5136ef68abadae",
        "attachments": [],
        "isReaded": true,
        "createdAt": "2022-03-26T10:19:03.816Z",
        "updatedAt": "2022-03-26T10:19:03.877Z",
        "__v": 0
    }
}]
*/