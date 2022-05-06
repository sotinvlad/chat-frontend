import React, { useState } from 'react';
import { AudioOutlined, SmileOutlined, PaperClipOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Input, Button, Popover, Upload, message } from 'antd';
import { connect } from 'react-redux';
import Picker from 'emoji-picker-react';

import './ChatInput.scss';
import messagesActions from './../../redux/actions/messages';
import messagesAPI from '../../utils/api/messagesAPI';
import axios from '../../core/axios';
import openNotification from '../../utils/helpers/openNotification';
import useStateCallback from '../../utils/helpers/useStateCallback';

let audioChunks = [];
let mediaRecorder;

const ChatInput = ({ userData, currentDialog, socket }) => {

    const [input, setInput] = useState('');
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        setInput(input => input + emojiObject.emoji);
    };

    const onKeyUp = (e, input) => {
        if (e.keyCode == 13)
            sendMessage(input, currentDialog._id, userData._id);
    }

    const onChange = (e) => {
        setInput(e.target.value);
        socket.emit('CLIENT:IS_TYPING', { dialogId: currentDialog._id, userId: userData._id });
    }

    const sendMessage = (text = '', dialogId, userId) => {
        if (text !== '' || fileList.length > 0) {
            messagesAPI.send({ text, dialogId, userId, isAudio: false })
                .then(data => {
                    console.log(data.data)
                    if (fileList.length > 0) {
                        handleUpload(data.data._id);
                    }
                })
                .catch(err => console.log(err));
            setInput('');
        }
        if (isRecording) {
            mediaRecorder.onstop = () => {
                messagesAPI.send({ text, dialogId, userId, isAudio: true })
                .then(data => {
                    uploadAudio(data.data._id);
                    setIsRecording(false);
                    audioChunks = [];
                })
                // const fileReader = new FileReader();
                // fileReader.readAsArrayBuffer(audioBlob);
                // fileReader.onload = () => {
                //     const arrayBuffer = fileReader.result;
                //     const blob = new Blob([arrayBuffer], { 'type': 'audio/ogg; codecs=opus' })
                //     const audio = document.createElement('audio');
                //     var audioURL = URL.createObjectURL(blob);
                //     audio.src = audioURL;
                //     audio.play();
                //     const audioFile = new File([blob], 'audio.ogg');
                //     console.log(audioFile);
                // }
            }
            mediaRecorder.stop();
        }
    }

    const uploadAudio = (messageId) => {
        const audioBlob = new Blob(audioChunks, { 'type': 'audio/mpeg; codecs=opus' });
        const audioFile = new File([audioBlob], `${messageId}.mpeg`);
        const formData = new FormData();
        formData.append('files', audioFile);
        setUploading(true);
        axios.post('http://localhost:5000/file/' + messageId, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).catch(error => {
            message.error(error);
        }).finally(() => {
            console.log(uploading)
            setUploading(false);
        })
    }

    const contentForEmojiPopover = (
        <div className="chat-input__emoji">
            <Picker onEmojiClick={onEmojiClick} />
        </div>
    )

    const handleUpload = (messageId) => {
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files', file);
        });
        setUploading(true);
        axios.post('http://localhost:5000/file/' + messageId, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(res => {
            setFileList([]);
        }).catch(error => {
            message.error(error);
        }).finally(() => {
            setUploading(false);
        })
    }

    const uploadProps = {
        onRemove: file => {
            setFileList(fileList => {
                const index = fileList.indexOf(file);
                const newFileList = fileList.slice();
                newFileList.splice(index, 1);
                return newFileList;
            });
        },
        beforeUpload: file => {
            setFileList(fileList => [...fileList, file]);
            return false;
        },
        fileList,
    }

    const startRecord = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                setIsRecording(true);
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                mediaRecorder.ondataavailable = e => {
                    audioChunks.push(e.data);
                }
            })
            .catch(err => openNotification('error', err.toString(), 2));

    }

    return (
        <div className="chat-input">
            <Popover content={contentForEmojiPopover} trigger="click">
                <div className="chat-input__smile-btn">
                    <SmileOutlined />
                </div>
            </Popover>
            {
                isRecording ?
                    <div className="chat-input__recordingField">

                        <span>Идет запись...</span>
                        <Button onClick={() => setIsRecording(false)}>Отмена</Button>
                    </div>
                    :
                    <Input
                        onChange={e => onChange(e)}
                        onKeyUp={e => onKeyUp(e, input)}
                        size='large'
                        placeholder="Введите текст сообщения..."
                        value={input}
                    />
            }
            <div className="chat-input__buttons">
                <Upload {...uploadProps} multiple={true}>
                    <PaperClipOutlined />
                </Upload>
                {input === '' && fileList.length === 0 && !isRecording ?
                    <AudioOutlined onClick={startRecord} />
                    :
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<ArrowRightOutlined />}
                        size={'20px'}
                        disabled={uploading}
                        loading={uploading}
                        onClick={() => sendMessage(input, currentDialog._id, userData._id)}
                    />}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentDialog: state.dialogs.currentDialog,
    userData: state.user.data,
    socket: state.user.socket,
})

export default connect(mapStateToProps, messagesActions)(ChatInput);
