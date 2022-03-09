/*
-Получает prop isAuth, который говорит нам, залогинился ли пользователь в чате
-В зависимости от props и содержимого браузерной строки перенаправляет пользователя 
 либо на страницу логина/регистрации или в сам чат
*/

import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router";

import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import userActions from './redux/actions/user';

const App = ({ userData, isAuth, authUser }) => {
  useEffect(() => {
    if(userData?._id !== undefined) 
      authUser(userData._id);
  }, [userData]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="Wrapper">
      <Route exact path={['/','/login','/register']}>
        {isAuth ? <Redirect to='/im'/> : <Auth/>}
      </Route>
      <Route exact path={'/im'}>
        {isAuth ? <Home/> : <Redirect to='/login'/>}
      </Route>
    </div>
  );
}

const mapStateToProps = state => ({
    userData: state.user.data,
    isAuth: state.user.isAuth,
})

export default connect(mapStateToProps, {...userActions})(App);
