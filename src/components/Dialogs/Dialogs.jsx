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

export const Dialogs = ({items, userData, currentDialogId, isLoading, handleChange, searchValue, onDialogClick}) => {
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
                    items.length ? orderBy(items, 'createdAt', 'desc').map(item =>
                        <DialogItem
                            key={item._id}
                            id={item._id}
                            user={generateDialogName(item.dialogParticipants, userData._id)}
                            lastMessage={item.lastMessage ? item.lastMessage : "Сообщений нет..."}
                            isMe={item.isMe} 
                            isReaded={item.isReaded}
                            createdAt={item.createdAt}
                            onDialogClick={onDialogClick}
                            currentDialogId={currentDialogId}
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
        "_id": "6210b06364377aef56b6c7a9",
        "dialogParticipants": [
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
            },
            {
                "_id": "61b212b8f122e4c0500fd9bd",
                "email": "leo@yandex.com",
                "fullname": "Leo Bonart",
                "password": "qwerty",
                "confirmed": false,
                "createdAt": "2021-12-09T14:29:12.202Z",
                "updatedAt": "2021-12-09T14:29:12.202Z",
                "__v": 0
            }
        ],
        "createdAt": "2022-02-19T08:54:59.600Z",
        "updatedAt": "2022-02-19T08:54:59.600Z",
        "__v": 0
    }
]
*/