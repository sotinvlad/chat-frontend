import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import { Dialogs as BaseDialogs } from '../components/Dialogs/Dialogs';
import dialogsActions from './../redux/actions/dialogs';


const Dialogs = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [filtered, setFiltered] = useState(props.items);

    const handleChange = (value) => {
        setFiltered(props.items.filter(item => item.user.fullname.toLowerCase().indexOf(value.target.value.toLowerCase()) >= 0));
        setInputValue(value.target.value);
    }
    
    useEffect(() => {
        if (!props.items.length){
            props.fetchDialogs();
        }
        setFiltered(props.items);
    }, [props.items])
    
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
    isLoading: state.dialogs.isLoading
})

export default connect(mapStateToProps, dialogsActions)(Dialogs);