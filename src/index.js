/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';
import {
  browserHistory, Router, Route,
} from 'react-router';
// import { useScroll } from 'react-router-scroll';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import muiTheme from './mui-theme';
import styledTheme from './styled-theme';
import Main from './components/pages/Main';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Dashboard from './components/pages/Dashboard';
import Meals from './components/pages/Meals';
import Workouts from './components/pages/Workouts';

function startApp () {
  render(
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={styledTheme}>
        <Router
          history={browserHistory}
        >
          <Route path="/" component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/meals" component={Meals} />
          <Route path="/workouts" component={Workouts} />
        </Router>
      </ThemeProvider>
    </MuiThemeProvider>, document.getElementById('app'),
  );
}

startApp();
