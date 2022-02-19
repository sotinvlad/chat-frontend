import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import { Dialogs as BaseDialogs } from '../components/Dialogs/Dialogs';
import dialogsActions from './../redux/actions/dialogs';


const Dialogs = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [filtered, setFiltered] = useState(props.items);

    const handleChange = (value) => {
        // setFiltered(props.items.filter(item => { 
        //     item.dialogParticipants.indexOf().toLowerCase().indexOf(value.target.value.toLowerCase()) >= 0
        // }));
        setFiltered(props.items);
        setInputValue(value.target.value);
    }
    
    useEffect(() => {
        if (!props.items.length){
            props.fetchDialogs(props.userData._id);
        }
        setFiltered(props.items);
    }, [props.items, props])
    
    return (
        <BaseDialogs 
            {...props}
            handleChange={handleChange}
            searchValue={inputValue}
            items = {filtered}
        />
    )
}

const mapStateToProps = (state) => ({
    items: state.dialogs.items,
    isLoading: state.dialogs.isLoading,
    currentDialogId: state.dialogs.currentDialogId, 
    userData: state.user.data
})

export default connect(mapStateToProps, dialogsActions)(Dialogs);