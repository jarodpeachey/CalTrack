import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Main from './components/pages/Main';
import Application from './Application';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Dashboard from './components/pages/Dashboard';
import Meals from './components/pages/Meals';
import Workouts from './components/pages/Workouts';
import {getTestValue} from './data';

const routes = () => (
  <Route path="/" component={Application}>
    {
    (function runFunction () {
      if (getTestValue !== undefined) {
        return <IndexRedirect to="/dashboard" />
      } else {
        return <IndexRedirect to="/welcome" />
      }
    })()
    }
    <Route path="/welcome" component={Main} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/meals" component={Meals} />
    <Route path="/workouts" component={Workouts} />
  </Route>
);

export default routes;
