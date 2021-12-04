import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import BaseMessages from '../components/Messages/Messages';
import messagesActions from './../actions/messages';


const Messages = (props) => {
    console.log(props)
    useEffect(() => {
        if (!props.items.length){
            props.fetchMessages(props.id);
        }
    }, [props.items])
    
    return (
        <BaseMessages
            {...props}
        />
    )
}

const mapStateToProps = (state) => ({
    items: state.messages.items
})

export default connect(mapStateToProps, messagesActions)(Messages);