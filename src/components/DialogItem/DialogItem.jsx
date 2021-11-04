import './DialogItem.scss';
import IconReaded from '../IconReaded/IconReaded';
import classNames from 'classnames';
import { format, isToday } from 'date-fns/esm';
import { ru } from 'date-fns/locale';

const getMessageTime = createdAt => {
    if (!isToday(createdAt)) {
        return format(createdAt, 'dd MMM', { locale: ru } )
    } else {
        return format(createdAt, 'HH:mm')
    }
}

const getAvatar = avatar => {
    if (avatar) {
        return (
            <img
                src={avatar}
                alt={`user avatar`}
            />
        )
    } else {
        // create avatar
    }
}

const DialogItem = (props) => {
    return (
        <div className={classNames('dialogs__item', {'dialogs__item--online' : props.user.isOnline})}>
            <div className="dialogs__item-avatar">
                {getAvatar(props.user.avatar)}
            </div>
            <div className="dialogs__item-info">
                <div className="dialogs__item-info-top">
                    <span className='dialogs__item-info-top-username'>{props.user.fullname}</span>
                    <span className='dialogs__item-info-top-date'>
                        {getMessageTime(props.createdAt)} 
                    </span>
                </div>
                <div className="dialogs__item-info-bottom">
                    <div className='dialogs__item-info-bottom-text'>
                        {props.lastMessage}
                    </div>
                    {props.isMe ?
                            <IconReaded isMe={props.isMe} isReaded={props.isReaded} />
                            : props.user.unreaded > 0 ?
                        <div className="dialogs__item-info-bottom-unreaded">
                            {props.user.unreaded <= 9 ? props.user.unreaded : '9+'}
                        </div> : null
                    }

                </div>
            </div>
        </div>
    )
}


export default DialogItem;