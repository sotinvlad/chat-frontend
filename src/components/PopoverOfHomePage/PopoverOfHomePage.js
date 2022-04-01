import { Button } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './PopoverOfHomePage.scss';
import userActions from './../../redux/actions/user';
import dialogsAPI from '../../utils/api/dialogsAPI';

const PopoverOfHomePage = ({currentDialog, setUserData}) => {
    const history = useHistory()
    const onExitButtonClick = () =>{
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('token');
        setUserData(null);
        history.push('/login');
    }
    const onRemoveDialogClick = () => {
        dialogsAPI.deleteDialog(currentDialog._id);
    }

  return (
    <div className="Home__PopoverOfHomePage">
        {currentDialog._id !== '' && <Button onClick={onRemoveDialogClick}>Удалить диалог</Button>}
        <Button danger onClick={onExitButtonClick}>Выход</Button>
        
    </div>
  )
}

const mapStateToProps = (state) =>({
    currentDialog: state.dialogs.currentDialog
})

export default connect(mapStateToProps, userActions)(PopoverOfHomePage);
