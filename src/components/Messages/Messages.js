import React from 'react';
import { Empty, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import Message from '../Message/Message';
import './Messages.scss';

const Messages = (props) => {
    return (
        <div 
            className={classnames('messages', {'messages--loading' : props.isLoading})}
            ref={props.messagesBlock}
        >
            {
                props.isLoading ? 
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                :   props.items.length ? 
                        props.items.map(item => <Message  {...item} />) 
                    :   <Empty  description={props.currentDialogId === null ? 'Выберите чат, чтобы начать общение' : 'Сообщений пока нет...'}/>
                    
            }
        </div>
    )
}

export default Messages;
