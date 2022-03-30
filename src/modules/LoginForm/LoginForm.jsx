/*
-Компонент отрисовывает форму логина
-Валидация не происходит
-При Submit отправляет запрос в backend
-При 200 запросе получает данные пользователя и token
-Производит dispatch данных пользователя в Redux store
-Запоминает token в localStorage
-Отображает нотификации при успешном или неуспешном логине
*/
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { withFormik } from 'formik';

import { Button } from '../../components/Button/Button';
import { Block } from '../../components/Block/Block';
// import validateFunc from '../../utils/validate';
import store from './../../redux/store';
import userActions from './../../redux/actions/user';
import userApi from './../../utils/api/userAPI';
import openNotification from '../../utils/helpers/openNotification';
import axios from './../../core/axios';







const LoginForm = ({
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
}) => {
    return (
        <div>
            <div className='auth__top'>
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <Block>
                <Form
                    className='login-form'
                    onSubmit={handleSubmit}
                >
                    <Form.Item
                        validateStatus={!touched.email ? '' : errors.email ? 'error' : 'success'}
                        hasFeedback
                        help={!touched.email ? null : errors.email}
                    >
                        <Input
                            prefix={<MailOutlined className='site-form-item-icon' />}
                            placeholder='E-mail'
                            size='large'
                            name='email'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Input
                            prefix={<LockOutlined className='site-form-item-icon' />}
                            type='password'
                            placeholder='Пароль'
                            size='large'
                            name='password'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='login-form-button'
                            size='large'
                            onClick={handleSubmit}
                        >
                            Войти в аккаунт
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Link to='/register' className='auth__register-link'>Зарегистрироваться</Link>
                    </Form.Item>
                </Form>
            </Block>
        </div>
    )
}

const LoginFormWithFormik = withFormik({
    mapPropsToValues: (props) => ({
        email: '',
    }),

    validate: values => {
        const errors = {};

        // validateFunc({ isAuth: true, errors, values });

        return errors;
    },

    handleSubmit: (values, { setSubmitting }) => {
        userApi.login(values)
        .then(data => {
            window.localStorage.token = data.data.accessToken;
            window.localStorage.user = JSON.stringify(data.data.user);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.accessToken}`;
            store.dispatch(userActions.setUserData(data.data));
            // setSubmitting(false);
            openNotification('success', 'Вы успешно вошли!');
        })
        .catch(err => {
            console.log(err);
            openNotification('error', 'Неверный логин или пароль!')
        })
    },

    displayName: 'LoginForm',
})(LoginForm);

export default LoginFormWithFormik;