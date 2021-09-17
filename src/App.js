import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './shared/context';
import NotFound from './shared/NotFound';
import routes from './shared/routes';
import Home from './views/Home/Home';
import Login from './views/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to={routes.LOGIN} />
        </Route>
        <Route path={routes.LOGIN} component={Login} />
        <Route path={routes.SIGN_UP} component={Login} />
        <Route path={routes.FORGOT_PASSWORD} component={Login} />
        <Route path={routes.RESET_PASSWORD} component={Login} />
        <Route path={routes.HOME} component={Home} />
        <Route path={routes.PATIENT_ACCOUNT} component={Home} />
        <Route path={routes.DOCTOR_ACCOUNT} component={Home} />
        <Route path={routes.CONTACTS} component={Home} />
        <Route path={routes.REPORTS} component={Home} />
        <Route path={routes.RECOMMENDATIONS} component={Home} />
        <Route path={routes.NEW_REPORT} component={Home} />
        <Route path={routes.GRAPHS} component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
