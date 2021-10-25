import React, { useState } from 'react'
import { Button } from '../../components/Button/Button';
import { Block } from '../../components/Block/Block';
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, InfoCircleTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const RegisterForm = (props) => {
    const [success, setSuccess] = useState(false);

    return ( 
        <div>
            <div className='auth__top'>
                <h2>Регистрация</h2>
                <p>Для входа в чат, вам нужно зарегистрироваться</p>
            </div>
            <Block>
                {!success ? <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={() => { 
                        props.onFinish();
                        setSuccess(true)
                    }}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Пожалуйста, введите ваш E-mail!' }]}

                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="E-mail" size='large' />
                    </Form.Item>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Пожалуйста, введите ваше имя!' }]}

                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Имя" size='large' />
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
                    <Form.Item
                        name="password2"
                        rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Повторите пароль"
                            size='large'
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" size='large'>
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Link to='/login' className='auth__register-link'>Войти в аккаунт</Link>
                    </Form.Item>
                </Form> : 
                <div className='auth__success-block'>
                    <InfoCircleTwoTone style={{ fontSize: '50px' }}/>
                    <h2>Подтвердите свой аккаунт</h2>
                    <p>На Вашу почту отправлено письмо с ссылкой на подтверждение аккаунта</p>
                </div>
                }
            </Block>
        </div>
    )
}

export default RegisterForm;