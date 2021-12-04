import React from 'react';
import { Empty } from 'antd';

import Message from '../Message/Message';

const Messages = (props) => {
    return (
        props.items.length ? 
        <div>
            {props.items.map(item => <Message {...item} />)}
        </div> : <Empty  description={'Выберите чат, чтобы начать общение'}/>
    )
}

export default Messages;
