import React, { useEffect, useRef, useState } from 'react'
import './Message.scss';

import { formatDistanceToNow } from 'date-fns/esm';
import ru from 'date-fns/locale/ru/index.js';
import classNames from 'classnames';
import IconReaded from '../IconReaded/IconReaded';
import audioIcon from '../../assets/img/audio.svg';
import playIcon from '../../assets/img/play.svg';
import pauseIcon from '../../assets/img/pause.svg';
import convertCurrentTime from '../../utils/helpers/convertCurrentTime';


const Message = (props) => {
    return (
        <div className={classNames('message',
            {
                'message--isme': props.isMe,
                'message--typing': props.isTyping,
                'message--image': props.attachments && props.attachments.length === 1,
                'message--audio': props.audio,
            })}>
            <div className="message__content">

                <div className="message__avatar">
                    <img src={props?.avatar || ''} alt={`Avatar ${props.user?.fullname || 'unknown'}`} />
                </div>
                <div className="message__info">
                    {(props.audio || props.text || props.isTyping) &&
                        <div className="message__bubble">
                            {props.text && <p className="message__text">{props.text}</p>}
                            {props.isTyping &&
                                <div className="message__typing">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            }
                            {props.audio && <MessageAudio audio={props.audio} />}
                        </div>}

                    <div className="message__attachments">
                        {props.attachments && props.attachments.map(item => (
                            <div className="message__attachment-item">
                                <img src={item.url} alt='Attachment' />
                            </div>
                        ))}
                    </div>
                    {props.date && <span className="message__date">{formatDistanceToNow(new Date(props.date), { addSuffix: true, locale: ru })}</span>}
                </div>
                <IconReaded isMe={props.isMe} isReaded={props.isReaded} />
            </div>
        </div>
    )
}

const MessageAudio = ({ audio }) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioElem = useRef();

    const togglePlay = () => {
        if (!isPlaying)
            audioElem.current.play();
        else
            audioElem.current.pause();
    }

    useEffect(() => {
        audioElem.current.addEventListener('playing', () => setIsPlaying(true));
        audioElem.current.addEventListener('loadedmetadata', () => setDuration(audioElem.current.duration));
        audioElem.current.addEventListener('ended', () => {
            setIsPlaying(false);
            setProgress(0);
            setCurrentTime(0);
        });
        audioElem.current.addEventListener('pause', () => setIsPlaying(false));
        audioElem.current.addEventListener('timeupdate', () => {
            setCurrentTime(audioElem.current.currentTime);
            setProgress((audioElem.current.currentTime / duration) * 100);
        });
        return (() => {
            // audioElem.current.removeEventListener('playing', () => setIsPlaying(true));
            // audioElem.current.removeEventListener('ended', () => setIsPlaying(false));
            // audioElem.current.removeEventListener('pause', () => setIsPlaying(false));
        })
    })
    return <div className="message__audio">
        <audio src={audio} ref={audioElem} preload='true' />
        <div className="message__audio-progress" style={{ width: `${progress}%`, height: '100%' }}></div>
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