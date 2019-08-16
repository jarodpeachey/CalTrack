import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { useScroll } from 'react-router-scroll';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import muiTheme from './mui-theme';
import styledTheme from './styled-theme';
// import routes from './Routes';
import store from './Store';
import Header from './components/Header';
import Main from './components/pages/Main';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Dashboard from './components/pages/Dashboard';
import Meals from './components/pages/Meals';
import Workouts from './components/pages/Workouts';

class Application extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
    console.log(this.props.children);
  }

  // shouldComponentUpdate () {

  // }

  render () {
    let header;
    const { pathname } = window.location;

    if (
      pathname === '/meals' ||
      pathname === '/workouts' ||
      pathname === '/dashboard'
    ) {
      header = <Header />;
    } else if (pathname === '/login' || pathname === '/signup') {
      header = null;
    } else {
      header = <Header welcomePageActive />;
    }

    return (
      <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
          <ThemeProvider theme={styledTheme}>
            <Router>
              <div>
                {header}
                <Switch>
                  <Route exact path="/" component={Main} />
                  <Route exact path="/welcome" component={Main} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/meals" component={Meals} />
                  <Route exact path="/workouts" component={Workouts} />
                </Switch>
              </div>
            </Router>
          </ThemeProvider>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default Application;
