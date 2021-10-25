import { Route } from "react-router";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";


function App() {
  return (
    <div className="Wrapper">
      <Route exact path={['/','/login','/register']}>
        <Auth/>
      </Route>
      <Route exact path={'/im'}>
        <Home/>
      </Route>
    </div>
  );
}

export default App;
