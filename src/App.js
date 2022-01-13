import { connect } from "react-redux";
import { Route, Redirect } from "react-router";

import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";


function App(props) {
  return (
    <div className="Wrapper">
      <Route exact path={['/','/login','/register']}>
        {props.isAuth ? <Redirect to='/im'/> : <Auth/>}
      </Route>
      <Route exact path={'/im'}>
        {props.isAuth ? <Home/> : <Redirect to='/login'/>}
      </Route>
    </div>
  );
}

const mapStateToProps = state => ({
    isAuth: state.user.isAuth
})

export default connect(mapStateToProps, {})(App);
