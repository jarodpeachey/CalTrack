/* eslint-disable no-unused-expressions */
import React from 'react';
import { Route } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Meals from './pages/Meals';
import Workouts from './pages/Workouts';

const routes = () => {
  <>
    <Route path="/" component={Main} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/meals" component={Meals} />
    <Route path="/workouts" component={Workouts} />
  </>;
};

export default routes;
