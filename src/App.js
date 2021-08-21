import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import NotFound from './shared/NotFound';
import routes from './shared/routes';
import Login from './views/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to={routes.LOGIN}></Redirect>
        </Route>
        <Route path={routes.LOGIN} component={Login}></Route>
        <Route path={routes.SIGN_UP} component={Login}></Route>
        <Route path={routes.FORGOT_PASSWORD} component={Login}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
