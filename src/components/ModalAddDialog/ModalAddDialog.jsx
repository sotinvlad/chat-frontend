import Modal from 'antd/lib/modal/Modal';
import React, { useState } from 'react';
import { Select } from 'antd';

import './ModalAddDialog.scss';
import userAPI from '../../utils/api/user';
import dialogsAPI from '../../utils/api/dialogsAPI';



const ModalAddDialog = ({ visible, userData, toggleModal }) => {
    const { Option } = Select;
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [value, setValue] = useState('');
    const handleOk = () => {
        setConfirmLoading(true);
        dialogsAPI.create(value, userData._id)
        .then(() => {
            setConfirmLoading(false);
            toggleModal();
        })
    };

    const handleCancel = () => {
        setValue('');
        toggleModal();
    };

    const handleSearch = value => {
        userAPI.search(value)
        .then((data) => {
            setUsers(data.data.filter(u => u._id !== userData._id).map(u => <Option key={u._id}>{u.fullname}</Option>));
        })
    };
    
    const handleChange = value => {
        setValue(value);
    };
    console.log('value',value)
    return (
        <Modal
            title="Создание диалога"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            cancelText={'Отмена'}
            okText={'Создать'}
            okButtonProps={{'disabled': value == '' ? true : false}}
        >
        <Select
            showSearch
            placeholder={'Введите имя или e-mail пользователя'}
            onSearch={handleSearch}
            onChange={handleChange}
            filterOption={false}
            notFoundContent={null}
        >
            {users}
        </Select>
        </Modal>
    )
}

export default ModalAddDialog;