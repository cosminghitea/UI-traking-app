import './App.scss';

import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';
import { LandingPage, NotFoundPage, DashboardPage } from './pages';
import { Loading } from './components';

function Register(
  username: string,
  password: string,
  errorState: React.Dispatch<React.SetStateAction<boolean>>,
  errorMessage: React.Dispatch<React.SetStateAction<string>>,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
): void {
  axios.post('/api/users/register', {
    username,
    password,
  })
    .then(() => {
      localStorage.setItem('LOGGED', 'TRUE');
      localStorage.setItem('USERNAME', username);
      setIsLoggedIn(true);
    }).catch((err) => {
      errorState(true);
      errorMessage(err.message);
    });
}

function Login(
  username: string,
  password: string,
  errorState: React.Dispatch<React.SetStateAction<boolean>>,
  errorMessage: React.Dispatch<React.SetStateAction<string>>,
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
): void {
  axios.post('/api/users/login', {
    username,
    password,
  })
    .then(() => {
      localStorage.setItem('LOGGED', 'TRUE');
      localStorage.setItem('USERNAME', username);

      setIsLoggedIn(true);
    }).catch((err) => {
      errorState(false);
      errorMessage(err.message);
    });
}

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('LOGGED') === 'TRUE') {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, [isLoggedIn, loading]);

  if (loading) {
    return <Loading />;
  }

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
              ? (
                <DashboardPage
                  setIsLoggedIn={setIsLoggedIn}
                />
              )
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
