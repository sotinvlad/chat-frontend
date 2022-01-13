import './DialogItem.scss';
import IconReaded from '../IconReaded/IconReaded';
import classNames from 'classnames';
import Avatar from '../Avatar/Avatar';
import { format, isToday } from 'date-fns';
import { ru } from 'date-fns/locale';

const getMessageTime = createdAt => {
    const date = new Date(createdAt);
    if (!isToday(date)) {
        return format(date, 'dd MMM', { locale: ru } )
    } else {
        return format(date, 'HH:mm')
    }
}

const DialogItem = (props) => {
    return (
        <div 
            className={classNames('dialogs__item', {'dialogs__item--online' : props.user.isOnline, 'dialogs__item--active' : props.currentDialogId === props.id})}
            onClick={() => props.onSelect(props.id)}
            >
            <div className="dialogs__item-avatar">
                <Avatar user={props.user} id={props.id} />
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