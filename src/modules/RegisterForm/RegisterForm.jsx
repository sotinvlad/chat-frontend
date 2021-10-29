import React, { useState } from 'react'
import { Button } from '../../components/Button/Button';
import { Block } from '../../components/Block/Block';
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, InfoCircleTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';
import validateFunc from '../../utils/validate';


const RegisterForm = (props) => {
    const [success, setSuccess] = useState(false);

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
                {!success ?
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
                            name='username'
                        >
                            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Имя' size='large' />
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
                        <InfoCircleTwoTone style={{ fontSize: '50px' }} />
                        <h2>Подтвердите свой аккаунт</h2>
                        <p>На Вашу почту отправлено письмо с ссылкой на подтверждение аккаунта</p>
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
        username: '',
    }),

    validate: values => {
        const errors = {};

        validateFunc({isAuth: false, errors, values});

        return errors;
    },

    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },

    displayName: 'RegisterForm',
})(RegisterForm);

export default RegisterFormWithFormik;