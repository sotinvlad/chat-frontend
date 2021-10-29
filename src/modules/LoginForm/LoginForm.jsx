import React from 'react'
import { Button } from '../../components/Button/Button';
import { Block } from '../../components/Block/Block';
import { Form, Input } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { withFormik } from 'formik';
import validateFunc from '../../utils/validate';


const LoginForm = (props) => {

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

        validateFunc({ isAuth: true, errors, values });

        return errors;
    },

    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },

    displayName: 'LoginForm',
})(LoginForm);

export default LoginFormWithFormik;