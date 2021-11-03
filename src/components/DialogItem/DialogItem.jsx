import './DialogItem.scss';
import IconReaded from '../IconReaded/IconReaded';
import classNames from 'classnames';

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
                {getAvatar('https://sun9-43.userapi.com/s/v1/ig2/mgWIq-bl-taWp9l_DSAijduy8XYWx73es7xELgGV2dStOseDlNzpG2VhK5u9bL1HiHDp3EpsB8p8oQniuqZwfOah.jpg?size=100x100&quality=96&crop=182,322,1193,1193&ava=1')}
            </div>
            <div className="dialogs__item-info">
                <div className="dialogs__item-info-top">
                    <span className='dialogs__item-info-top-username'>{props.user.fullname}</span>
                    <span className='dialogs__item-info-top-date'>
                        {/* <Time date={new Date()}/> */}
                        12:34
                    </span>
                </div>
                <div className="dialogs__item-info-bottom">
                    <div className='dialogs__item-info-bottom-text'>
                        Я тебе купил таблетку, так что можешь приходить и забирать!
                    </div>
                    {props.isMe ?
                            <IconReaded isMe={true} isReaded={true} />
                            : props.user.unreaded > 0 ?
                        <div className="dialogs__item-info-bottom-unreaded">
                            +{props.user.unreaded}
                        </div> : null
                    }

                </div>
            </div>
        </div>
    )
}


export default DialogItem;