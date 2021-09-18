import './App.scss';

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { LandingPage, NotFoundPage, DashboardPage } from './pages';

function Register(
  username: string,
  password: string,
  errorState: React.Dispatch<React.SetStateAction<boolean>>,
  errorMessage: React.Dispatch<React.SetStateAction<string>>,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
): void {
  const checkAuthentication = username === 'test' && password === 'Cc@01234';
  if (checkAuthentication) {
    setIsLoggedIn(true);
  } else {
    errorState(checkAuthentication);
    errorMessage('Username already exists');
  }
}

function Login(
  username: string,
  password: string,
  errorState: React.Dispatch<React.SetStateAction<boolean>>,
  errorMessage: React.Dispatch<React.SetStateAction<string>>,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
): void {
  const checkAuthentication = username === 'test' && password === 'Cc@01234';

  if (checkAuthentication) {
    setIsLoggedIn(true);
  } else {
    errorState(checkAuthentication);
    errorMessage('Incorrect Username or Password');
  }
}

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login">
            {isLoggedIn ? <Redirect exact from="/" to="/dashboard" /> : (
              <LandingPage
                redirectLink="/registration"
                redirectContent="Sign up"
                submitContent="Login"
                submit={(
                  username: string,
                  password: string,
                  errorState: React.Dispatch<React.SetStateAction<boolean>>,
                  errorMessage: React.Dispatch<React.SetStateAction<string>>,
                ) => Login(
                  username, password, errorState, errorMessage, setIsLoggedIn,
                )}
              />
            )}
          </Route>
          <Route exact path="/registration">
            {isLoggedIn ? <Redirect exact from="/" to="/dashboard" /> : (
              <LandingPage
                redirectLink="/login"
                redirectContent="Login"
                submitContent="Sign up"
                submit={(
                  username: string,
                  password: string,
                  errorState: React.Dispatch<React.SetStateAction<boolean>>,
                  errorMessage: React.Dispatch<React.SetStateAction<string>>,
                ) => Register(
                  username, password, errorState, errorMessage, setIsLoggedIn,
                )}
              />
            )}
          </Route>
          <Route exact path="/dashboard">
            {isLoggedIn
              ? (<DashboardPage />)
              : <Redirect exact from="/dashboard" to="/login" />}
          </Route>
          <Route exact path="/pageNotFound">
            <NotFoundPage
              href={isLoggedIn ? '/dashboard' : '/login'}
            />
          </Route>
          <Redirect exact from="/" to={isLoggedIn ? '/dashboard' : '/login'} />
          <Route path="*">
            <Redirect exact from="/" to="/pageNotFound" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
