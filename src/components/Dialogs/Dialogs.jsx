import { orderBy } from 'lodash-es';
import React from 'react'
import DialogItem from '../DialogItem/DialogItem';

const Dialogs = (props) => {
    return (
        <div className="dialogs">
            {orderBy(props.items, 'createdAt', 'desc').map(item =>
                <DialogItem
                    key={item._id}
                    user={item.user}
                    lastMessage={item.lastMessage}
                    isMe={item.isMe} 
                    isReaded={item.isReaded}
                    createdAt={item.createdAt}
                />
            )}

        </div>
    )
}

export default Dialogs;