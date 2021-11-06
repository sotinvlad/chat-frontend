import React, { useState } from 'react'
import { Dialogs as BaseDialogs } from '../components/Dialogs/Dialogs';

const Dialogs = (props) => {

    const [inputValue, setInputValue] = useState('');
    const [filtered, setFiltered] = useState(props.items);

    const handleChange = (value) => {
        setFiltered(props.items.filter(item => item.user.fullname.toLowerCase().indexOf(value.target.value.toLowerCase()) >= 0));
        setInputValue(value.target.value);
    }

    return (
        <BaseDialogs 
            items = {filtered}
            handleChange={handleChange}
            searchValue={inputValue}
        />
    )
}

export default Dialogs;