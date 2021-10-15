import React from 'react'
import { Button } from '../../../components/Button/Button';
import { Block } from '../../../components/Block/Block';
import { Form, Input } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const LoginForm = (props) => {
    return (
        <div>
            <div className='auth__top'>
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <Block>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={props.onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Пожалуйста, введите ваш E-mail!' }]}

                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="E-mail" size='large' />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Пароль"
                            size='large'
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" size='large'>
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

export default LoginForm;