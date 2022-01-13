import { orderBy } from 'lodash-es';
import React from 'react';
import { Empty, Input, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import classnames from 'classnames';

import DialogItem from '../DialogItem/DialogItem';
import './Dialogs.scss';


export const Dialogs = (props) => {
    return (
        <div className='dialogs'>
            <div className="dialogs__search">
                <Input.Search placeholder="Поиск среди контактов" onChange={value => props.handleChange(value)} value={props.searchValue}/>
            </div>
            
            <div className={classnames('dialogs__content', {'dialogs__content--loading' : props.isLoading})}>
            { 
                props.isLoading ? 
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                :
                    props.items.length ? orderBy(props.items, 'createdAt', 'desc').map(item =>
                        <DialogItem
                            key={item._id}
                            id={item._id}
                            user={item.user}
                            lastMessage={item.lastMessage}
                            isMe={item.isMe} 
                            isReaded={item.isReaded}
                            createdAt={item.createdAt}
                            onSelect={props.setCurrentDialogId}
                            currentDialogId={props.currentDialogId}
                        />
                    )
                    : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description = {'Контакты не найдены :('}/>
            
            }
            </div>
        </div>
    )
}
