/*
-Компонент отрисовывает один диалог
-При клике на диалоге устанавливает его в store как текущий
*/
import { differenceInMinutes } from 'date-fns';
import classNames from 'classnames';

import './DialogItem.scss';
import IconReaded from '../IconReaded/IconReaded';
import Avatar from '../Avatar/Avatar';
import getMessageTime from '../../utils/helpers/getMessageTime';



const DialogItem = ({id, user, lastMessage, isMe, isReaded, createdAt, currentDialogId, onDialogClick}) => {
    return (
        <div 
            className={classNames(
                'dialogs__item', 
                {
                    'dialogs__item--online' : differenceInMinutes(new Date(), new Date(user.last_seen)) < 5, 
                    'dialogs__item--active' : currentDialogId === id
                })}
            onClick={() => onDialogClick(id)}
            >
            <div className="dialogs__item-avatar">
                <Avatar user={user} id={id} />
            </div>
            <div className="dialogs__item-info">
                <div className="dialogs__item-info-top">
                    <span className='dialogs__item-info-top-username'>{user.fullname}</span>
                    <span className='dialogs__item-info-top-date'>
                        {lastMessage === undefined ? getMessageTime(lastMessage.createdAt) : null} 
                    </span>
                </div>
                <div className="dialogs__item-info-bottom">
                    <div className='dialogs__item-info-bottom-text'>
                        {lastMessage.text}
                    </div>
                    {isMe ?
                            <IconReaded isMe={isMe} isReaded={isReaded} />
                            : user.unreaded > 0 ?
                        <div className="dialogs__item-info-bottom-unreaded">
                            {user.unreaded <= 9 ? user.unreaded : '9+'}
                        </div> : null
                    }
                </div>
            </div>
        </div>
    )
}


export default DialogItem;

/*
EXAMPLE props
{
    "id": "6210b06364377aef56b6c7a9",
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
    "lastMessage": {
        "_id": "6218d01e947254c1bdb7da97",
        "text": "Hello from Bonart 2",
        "dialogId": "6210b06364377aef56b6c7a9",
        "user": "61b212b8f122e4c0500fd9bd",
        "createdAt": "2022-02-25T12:48:30.803Z",
        "updatedAt": "2022-02-25T12:48:30.803Z",
        "__v": 0
    },
    "createdAt": "2022-02-19T08:54:59.600Z",
    "currentDialogId": null
}
*/