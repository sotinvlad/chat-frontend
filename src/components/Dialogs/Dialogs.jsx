import { orderBy } from 'lodash-es';
import React, { useEffect } from 'react';
import { Empty, Input } from 'antd';

import DialogItem from '../DialogItem/DialogItem';
import './Dialogs.scss';


export const Dialogs = (props) => {
    return (
        <div className="dialogs">
            <div className="dialogs__search">
                <Input.Search placeholder="Поиск среди контактов" onChange={value => props.handleChange(value)} value={props.searchValue}/>
            </div>
            
            {props.items.length ? orderBy(props.items, 'createdAt', 'desc').map(item =>
                <DialogItem
                    key={item._id}
                    id={item._id}
                    user={item.user}
                    lastMessage={item.lastMessage}
                    isMe={item.isMe} 
                    isReaded={item.isReaded}
                    createdAt={item.createdAt}
                    onSelect={props.setCurrentDialogId}
                />
            ): <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description = {'Контакты не найдены :('}/>}

        </div>
    )
}
