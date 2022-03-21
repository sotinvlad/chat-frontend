import React, { useState } from 'react';
import { AudioOutlined, SmileOutlined, PaperClipOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Input, Button, Popover, Upload, message } from 'antd';
import { connect } from 'react-redux';
import Picker from 'emoji-picker-react';

import './ChatInput.scss';
import messagesActions from './../../redux/actions/messages';
import messagesAPI from '../../utils/api/messagesAPI';
import axios from '../../core/axios';


const ChatInput = ({ userData, currentDialogId }) => {

    const [input, setInput] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        setInput(input => input + emojiObject.emoji);
    };

    const onKeyUp = (e, input) => {
        if (e.keyCode == 13)
            sendMessage(input, currentDialogId, userData._id);
    }

    const sendMessage = (text, dialogId, userId) => {
        if (text !== '' || fileList.length > 0){
            messagesAPI.send({ text, dialogId, userId })
            .then(data => {
                console.log(data.data)
                if (fileList.length > 0) {
                    handleUpload(data.data._id);
                }
            })
            .catch(err => console.log(err));
            setInput('');
        }
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

    return (
        <div className="chat-input">
            <Popover content={contentForEmojiPopover}>
                <div className="chat-input__smile-btn" onClick={() => setShowEmoji(!showEmoji)}>
                    <SmileOutlined />
                </div>
            </Popover>
            <Input
                onChange={e => setInput(e.target.value)}
                onKeyUp={e => onKeyUp(e, input)}
                size='large'
                placeholder="Введите текст сообщения..."
                value={input}
            />
            <div className="chat-input__buttons">
                <Upload {...uploadProps} multiple={true}>
                    <PaperClipOutlined />
                </Upload>  
                {input === '' && fileList.length === 0 ? <AudioOutlined /> :
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<ArrowRightOutlined />}
                        size={'20px'}
                        disabled={uploading}
                        loading={uploading}
                        onClick={() => sendMessage(input, currentDialogId, userData._id)}
                    />}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentDialogId: state.dialogs.currentDialogId,
    userData: state.user.data,
})

export default connect(mapStateToProps, messagesActions)(ChatInput);

