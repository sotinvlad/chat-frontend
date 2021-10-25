import React from 'react'
import './Message.scss';

import { formatDistanceToNow } from 'date-fns/esm';
import ru from 'date-fns/locale/ru/index.js';
import classNames from 'classnames';
import readed from './../../assets/img/readed.svg'
import noreaded from './../../assets/img/noreaded.svg'

const Message = (props) => {
    return (
        <div className={classNames('message', props.isMe ? 'message--isme' : '')}>
            <div className="message__content">
                
                <div className="message__avatar">
                    <img src={props.avatar} alt={`Avatar ${props.user?.fullname || 'unknown'}`} />
                </div>
                <div className="message__info">
                    <div className="message__bubble">
                        <p className="message__text">{props.text}</p>
                    </div>
                    <div className="message__attachments">
                        { props.attachments && props.attachments.map(item => (
                            <div className="message__attachment-item">
                                <img src={item.url} alt='Attachment' />
                            </div>
                        ))}
                    </div>
                    <span className="message__date">{formatDistanceToNow(props.date, { addSuffix: true, locale: ru })}</span>
                </div>
                {props.isMe ? props.isReaded  ? (
                    <img 
                        src={readed} 
                        className='message__readed'
                        alt='Readed icon'
                    /> 
                ) : ( 
                    <img 
                        src={noreaded} 
                        className='message__readed'
                        alt='No readed icon'
                    />
                ) : null}
            </div>
        </div>
    )
}


export default Message;