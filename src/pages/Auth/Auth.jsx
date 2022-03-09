/*
-Компонент отрисовывает форму логина или регистрации в зависимости от содержимого адресной строки браузера
*/
import React from 'react';
import './Auth.scss';
import LoginForm from '../../modules/LoginForm/LoginForm';
import { Route } from 'react-router';
import RegisterForm from '../../modules/RegisterForm/RegisterForm';


const Auth = () => {
    return (
        <section className='auth'>
            <div className='auth__content'>
                <Route exact path={['/','/login']}>
                    <LoginForm />
                </Route>
                <Route exact path='/register'>
                    <RegisterForm />
                </Route>
                
            </div>
        </section>
    )
}

export default Auth;
