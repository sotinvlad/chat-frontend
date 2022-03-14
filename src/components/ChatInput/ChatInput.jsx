import React, { useState } from 'react';
import Upload from 'rc-upload';
import { AudioOutlined, SmileOutlined, CameraOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Input, Button, Popover } from 'antd';
import { connect } from 'react-redux';
import Picker from 'emoji-picker-react';

import './ChatInput.scss';
import messagesActions from './../../redux/actions/messages';
import messagesAPI from '../../utils/api/messagesAPI';


const ChatInput = ({ userData, currentDialogId }) => {

    const [input, setInput] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        setInput(input => input + emojiObject.emoji);
    };

    const onKeyUp = (e, input) => {
        if (e.keyCode == 13 && input !== '')
            sendMessage(input, currentDialogId, userData._id);
    }

    const sendMessage = (text, dialogId, userId) => {
        messagesAPI.send({ text, dialogId, userId })
            .then(data => console.log(data))
            .catch(err => console.err(err));
        setInput('');
    }

    const content = (
            <div className="chat-input__emoji">
                <Picker onEmojiClick={onEmojiClick} />
            </div>
    )

    return (
        <div className="chat-input">

            <Popover content={content}>
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
                <Upload
                    action={'/'}
                    multiple={true}
                    onStart={(file) => console.log('onStart', file, file.name)}
                    onSuccess={(ret) => console.log('onSuccess', ret)}
                    onError={(err) => console.log('onError', err)}
                >
                    <CameraOutlined />
                </Upload>
                {input === '' ? <AudioOutlined /> :
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<ArrowRightOutlined />}
                        size={'20px'}
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

