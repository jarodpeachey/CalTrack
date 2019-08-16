import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import muiTheme from './mui-theme';
import styledTheme from './styled-theme';
import Header from './components/Header';
import Main from './components/pages/Main';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Dashboard from './components/pages/Dashboard';
import Meals from './components/pages/Meals';
import Workouts from './components/pages/Workouts';
import { getUsers, getCurrentUser } from './actions/userActions';

class Application extends Component {
  static propTypes = {
    users: PropTypes.array,
    getUsers: PropTypes.func,
    currentUser: PropTypes.object,
    getCurrentUser: PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
    this.props.getUsers();
    this.props.getCurrentUser();

    console.log('Users: ', this.props.users);
    console.log('Current user: ', this.props.currentUser);
  }

  shouldComponentUpdate (nextProps) {
    if (this.props.users !== nextProps.users) {
      return true;
    }
    if (this.props.currentUser !== nextProps.currentUser) {
      return true;
    }
    return false;
  }

  render () {
    let header;
    const { pathname } = window.location;
    const { users, currentUser } = this.props;

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
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={styledTheme}>
          <Router>
            <>
              {header}
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => <Main {...props} users={users} currentUser={currentUser} />}
                />
                <Route
                  exact
                  path="/welcome"
                  render={props => <Main {...props} users={users} currentUser={currentUser} />}
                />
                <Route
                  exact
                  path="/login"
                  render={props => <Login {...props} users={users} currentUser={currentUser} />}
                />
                <Route
                  exact
                  path="/signup"
                  render={props => <Signup {...props} users={users} currentUser={currentUser} />}
                />
                <Route
                  exact
                  path="/dashboard"
                  render={props => <Dashboard {...props} users={users} currentUser={currentUser} />}
                />
                <Route
                  exact
                  path="/meals"
                  render={props => <Meals {...props} users={users} currentUser={currentUser} />}
                />
                <Route
                  exact
                  path="/workouts"
                  render={props => <Workouts {...props} users={users} currentUser={currentUser} />}
                />
              </Switch>
            </>
          </Router>
        </ThemeProvider>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  users: state.userReducer.users,
  currentUser: state.userReducer.currentUser,
});

export default connect(mapStateToProps, { getUsers, getCurrentUser })(Application);
