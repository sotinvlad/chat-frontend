import React, { useState } from 'react';
import Upload from 'rc-upload';
import { AudioOutlined, SmileOutlined, CameraOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';

import './ChatInput.scss';
import Picker from 'emoji-picker-react';


const ChatInput = () => {

    const [input, setInput] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        console.log(emojiObject.emoji)
        setInput(input => input + emojiObject.emoji);
    };

    return (
        <div className="chat-input">
            {showEmoji && 
                <div className="chat-input__emoji">
                    <Picker onEmojiClick={onEmojiClick}/>
                </div>
            }
            <div className="chat-input__smile-btn" onClick={() => setShowEmoji(!showEmoji)}>
                <SmileOutlined />
            </div>
            <Input onChange={e => setInput(e.target.value)} size ='large' placeholder="Введите текст сообщения..." value={input}/>
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
                {input === '' ? <AudioOutlined /> : <Button type="primary" shape="circle" icon={<ArrowRightOutlined />} size={'20px'} />}
            </div>
        </div>
    )
}

export default ChatInput;
