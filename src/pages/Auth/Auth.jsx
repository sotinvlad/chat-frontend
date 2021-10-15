import React from 'react';
import './Auth.scss';
import LoginForm from '../../modules/LoginForm/components/LoginForm';
import { Route } from 'react-router';
import RegisterForm from '../../modules/RegisterForm/components/RegisterForm';


const Auth = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    return (
        <section className='auth'>
            <div className='auth__content'>
                <Route exact path={['/','/login']}>
                    <LoginForm onFinish={onFinish} />
                </Route>
                <Route exact path='/register'>
                    <RegisterForm/>
                </Route>
                
            </div>
        </section>
    )
}

export default Auth;
