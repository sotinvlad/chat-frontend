import React from 'react';
import { Button } from '../../components/Button/Button';
import { Block } from '../../components/Block/Block';
import { Form, Input, Result } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';

import validateFunc from '../../utils/validate';
import userApi from './../../utils/api/user';
import openNotification from '../../utils/helpers/openNotification';

const RegisterForm = (props) => {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    } = props;

    return (
        <div>
            <div className='auth__top'>
                <h2>Регистрация</h2>
                <p>Для входа в чат, вам нужно зарегистрироваться</p>
            </div>
            <Block>
                {!values.isSuccess ?
                    <Form
                        className='register-form'
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
                        <Form.Item
                            validateStatus={!touched.fullname ? '' : errors.fullname ? 'error' : 'success'}
                            hasFeedback
                            help={!touched.fullname ? null : errors.fullname}
                        >
                            <Input 
                                prefix={<UserOutlined className='site-form-item-icon' />} 
                                placeholder='Имя' 
                                size='large'
                                name='fullname'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.fullname}
                            />
                        </Form.Item>
                        <Form.Item
                            validateStatus={!touched.password ? '' : errors.password ? 'error' : 'success'}
                            hasFeedback
                            help={!touched.password ? null : errors.password}
                        >
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
                        <Form.Item
                            validateStatus={!touched.passwordRepeat ? '' : errors.passwordRepeat ? 'error' : 'success'}
                            hasFeedback
                            help={!touched.passwordRepeat ? null : errors.passwordRepeat}
                        >
                            <Input
                                prefix={<LockOutlined className='site-form-item-icon' />}
                                type='password'
                                placeholder='Повторите пароль'
                                size='large'
                                name='passwordRepeat'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.passwordRepeat}
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
                                Зарегистрироваться
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Link to='/login' className='auth__register-link'>Войти в аккаунт</Link>
                        </Form.Item>
                    </Form> :
                    <div className='auth__success-block'>
                        <Result
                            status="success"
                            title="Вы успешно зарегистрированы!"
                            subTitle="На Вашу почту отправлено письмо с ссылкой на подтверждение аккаунта."
                        />
                    </div>
                }
            </Block>
        </div>
    )
}

const RegisterFormWithFormik = withFormik({
    mapPropsToValues: (props) => ({
        email: '',
        password: '',
        passwordRepeat: '',
        fullname: '',
        isSuccess: false,
    }),

    validate: values => {
        const errors = {};

        validateFunc({isAuth: false, errors, values});

        return errors;
    },

    handleSubmit: (values, { setSubmitting }) => {
        const userData = {
            email: values.email,
            password: values.password,
            fullname: values.fullname,
        }
        userApi.register(userData)
        .then(data => {
            values.isSuccess = true;
            setSubmitting(false);
        })
        .catch(err => {
            console.log(err);
            openNotification('error', 'Пользователь с таким e-mail уже существует', 4);
        })
    },

    displayName: 'RegisterForm',
})(RegisterForm);

export default RegisterFormWithFormik;