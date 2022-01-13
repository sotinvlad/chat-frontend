import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux';

import BaseMessages from '../components/Messages/Messages';
import messagesActions from './../redux/actions/messages';


const Messages = (props) => {

    const messagesBlock = useRef();
    useEffect(() => {
        if (props.currentDialogId !== null){
            props.fetchMessages(props.currentDialogId);
        }
    }, [props.currentDialogId, props])

    useEffect(() => {
        messagesBlock.current.scrollTo(0,999);
    },[props.items])
    
    return (
        <BaseMessages
            messagesBlock={messagesBlock}
            {...props}
        />
    )
}

const mapStateToProps = (state) => ({
    items: state.messages.items,
    currentDialogId: state.dialogs.currentDialogId,
    isLoading: state.messages.isLoading
})

export default connect(mapStateToProps, messagesActions)(Messages);