/*
-Компонент получает данные по сообщению и отрисовывает его
*/
import React, { useEffect, useRef, useState } from 'react';
import { formatDistanceToNow } from 'date-fns/esm';
import ru from 'date-fns/locale/ru/index.js';
import classNames from 'classnames';
import { Popover, Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import './Message.scss';
import IconReaded from '../IconReaded/IconReaded';
import audioIcon from '../../assets/img/audio.svg';
import playIcon from '../../assets/img/play.svg';
import pauseIcon from '../../assets/img/pause.svg';
import convertCurrentTime from '../../utils/helpers/convertCurrentTime';
import Avatar from '../Avatar/Avatar';
import messagesAPI from '../../utils/api/messagesAPI';
import getNameOfFile from '../../utils/helpers/getNameOfFile';


const Message = ({ text, _id, dialogId, user, createdAt, userData, isMe, isReaded, isTyping, attachments, isAudio, audio }) => {

    const [popupVisible, setPopupVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [messageValue, setMessageValue] = useState();

    const onDeleteClick = (id) => {
        messagesAPI.delete(id)
        setPopupVisible(e => !e)
    }

    const onEditClick = () => {
        setMessageValue(text);
        setIsEditing(true);
        setPopupVisible(e => !e)
    }

    const onKeyUp = (e) => {
        if (e.keyCode == 13 && messageValue !== '') {
            messagesAPI.update({ id: _id, text: messageValue });
            setIsEditing(false);
        }
    }

    return (
        <div className={classNames('message',
            {
                'message--isme': isMe,
                'message--typing': isTyping,
                'message--image': attachments && attachments.length === 1,
                'message--audio': isAudio,
            })}>
            <div className="message__all">
                <div className="message__content">
                    <div className="message__avatar">
                        <Avatar user={isMe ? userData : user} id={isMe ? userData._id : dialogId} />
                    </div>
                    <div className="message__popover">
                        {isMe ? <Popover
                            content={
                                <div className="message__popoverItems">
                                    <Button onClick={() => onEditClick()}>Редактировать</Button>
                                    <Button onClick={() => onDeleteClick(_id)}>Удалить</Button>
                                </div>
                            }
                            trigger="click"
                            visible={popupVisible}
                            onVisibleChange={() => setPopupVisible(s => !s)}
                        >
                            <EllipsisOutlined />
                        </Popover> : null}
                    </div>
                    <div className="message__info">
                        {(isAudio || text || isTyping) &&
                            <div className="message__bubble">
                                {
                                    text && isEditing ?
                                        <input
                                            type='text'
                                            className="message__text"
                                            onKeyUp={e => onKeyUp(e)}
                                            value={messageValue}
                                            onChange={e => setMessageValue(e.target.value)}></input>

                                        :
                                        <p className="message__text">{text}</p>
                                }
                                {isTyping &&
                                    <div className="message__typing">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                }
                                {isAudio && <MessageAudio audio={audio} />}
                            </div>
                        }
                        {text === '' &&
                            <div className="message__attachments" style={{"padding": "0"}}>
                                {attachments && attachments.map(item => (
                                    <div className="message__attachment-item" key={item}>
                                        <a href={`http://localhost:5000/file/${item}`} target="_blank" rel="noopener noreferrer" > {getNameOfFile(item)} </a>
                                    </div>
                                ))}
                            </div>
                        }

                        {createdAt && <span className="message__date">{formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: ru })}</span>}
                    </div>
                    <IconReaded isMe={isMe} isReaded={isReaded} />
                </div>
                {text !== '' &&
                    <div className="message__attachments">
                        {attachments && attachments.map(item => (
                            <div className="message__attachment-item" key={item}>
                                <a href={`http://localhost:5000/file/${item}`} target="_blank" rel="noopener noreferrer" > {getNameOfFile(item)} </a>
                            </div>
                        ))}
                    </div>
                }
            </div>

        </div>
    )
}

const MessageAudio = ({ audio }) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioElem = useRef();

    const togglePlay = () => {
        if (!isPlaying)
            audioElem.current.play();
        else
            audioElem.current.pause();
    }

    const afterAudioEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(audioElem.current.duration);
    }

    const timeUpdate = () => {
        setCurrentTime(audioElem.current.currentTime);
        setDuration(audioElem.current.duration);
    }

    useEffect(() => {
        audioElem.current.addEventListener('playing', () => setIsPlaying(true));
        audioElem.current.addEventListener('ended', afterAudioEnded);
        audioElem.current.addEventListener('pause', () => setIsPlaying(false));
        audioElem.current.addEventListener('timeupdate', timeUpdate);
        return (() => {
            if (audioElem.current) {
                audioElem.current.removeEventListener('ended', afterAudioEnded);
                audioElem.current.removeEventListener('timeupdate', timeUpdate);
                audioElem.current.removeEventListener('playing', () => setIsPlaying(true));
                audioElem.current.removeEventListener('playing', () => setIsPlaying(false));
            }
        })
    }, [])
    return <div className="message__audio">
        <audio src={`http://localhost:5000/file/${audio}`} ref={audioElem} preload='true' />
        <div className="message__audio-progress" style={{ width: `${(currentTime/duration)*100}%`, height: '100%' }}></div>
        <div className="message__audio-info">
            <div className="message__audio-btn">
                <button onClick={togglePlay}>
                    {isPlaying ? <img src={pauseIcon} alt='pause icon' /> : <img src={playIcon} alt='play icon' />}
                </button>
            </div>
            <div className="message__audio-wave">
                <img src={audioIcon} alt='audioIcon'></img>
            </div>
            <span className="message__audio-duration">{!isPlaying ? convertCurrentTime(duration) : convertCurrentTime(currentTime)}</span>
        </div>
    </div>
}


export default Message;

/*
EXAMPLPE props
{
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
    "userData": {
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
    "isMe": false
}
*/