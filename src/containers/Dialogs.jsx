/*
-Контейнерная компонента, при первой отрисовке делает запрос на сервер для получения диалогов пользователя, который залогинен
-Диалоги приходят в store, а также в этот же компонент, он понимает, что диалоги пришли и передает их в BaseDialogs
-Диалоги хранятся в filtered
-Компонент прокидывает useRef и callback в BaseDialogs для обработки ввода в строку поиска названий диалога и фильтрации 
-При изменении значения в строке поиска диалога, фильтруются диалоги, чтобы в диалоге был юзер с именем включающим данную строку, 
но не текущий юзер
*/
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import { Dialogs as BaseDialogs } from '../components/Dialogs/Dialogs';
import filterDialogs from '../utils/helpers/filterDialogs';
import dialogsActions from './../redux/actions/dialogs';
import socket from './../core/socket';

const Dialogs = ({items, userData, isLoading, currentDialogId, fetchDialogs, onDialogClick}) => {
    const [inputValue, setInputValue] = useState('');
    const [filtered, setFiltered] = useState(items);
    const handleChange = (e) => {
        setFiltered(filterDialogs(items, e.target.value, userData));
        setInputValue(e.target.value);
    }
    useEffect(() => {
        socket.on('SERVER:DIALOG_CREATED', () => {
            socket.disconnect();
            socket.connect();
            fetchDialogs(userData._id)
        })
        return () => {
            socket.off('SERVER:DIALOG_CREATED', () => fetchDialogs(userData._id))
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        fetchDialogs(userData._id);
    }, [userData]); // eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(()   => {
        setFiltered(items);
    }, [items])
    
    return (
        <BaseDialogs 
            items = {filtered}
            userData = {userData}
            currentDialogId = {currentDialogId}
            onDialogClick = {onDialogClick}
            isLoading = {isLoading}
            handleChange={handleChange}
            searchValue={inputValue}
        />
    )
}

const mapStateToProps = (state) => ({
    items: state.dialogs.items,
    isLoading: state.dialogs.isLoading,
    currentDialogId: state.dialogs.currentDialogId, 
    userData: state.user.data
})

export default connect(mapStateToProps, dialogsActions)(Dialogs);

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

EXMAPLE userData:
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