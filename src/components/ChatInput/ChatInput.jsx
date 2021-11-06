import React, { useState } from 'react';
import './ChatInput.scss';
import { AudioOutlined, SmileOutlined, CameraOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';

const ChatInput = () => {

    const [input, setInput] = useState('');

    return (
        <div className="chat-input">
            <div className="chat-input__smile-btn">
                <SmileOutlined />
            </div>
            <Input onChange={e => setInput(e.target.value)} size ='large' placeholder="Введите текст сообщения..." />
            <div className="chat-input__buttons">
                <CameraOutlined />
                {input == '' ? <AudioOutlined /> : <Button type="primary" shape="circle" icon={<ArrowRightOutlined />} size={'20px'} />}
            </div>
        </div>
    )
}

export default ChatInput;
