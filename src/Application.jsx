/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
// import { ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider } from '@material-ui/core/styles';
import styled, { ThemeProvider } from 'styled-components';
import theme from './mui-theme';
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
    history: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {
      // updateApplication: false,
      // windowLocationPathname: '/',
    };
  }

  componentDidMount () {
    this.props.getUsers();
    this.props.getCurrentUser();

    console.log('Users: ', this.props.users);
    console.log('Current user: ', this.props.currentUser);
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   if (this.props.getUsers() !== nextProps.getUsers()) {
  //     return true;
  //   }
  //   if (this.props.getCurrentUser() !== nextProps.getCurrentUser()) {
  //     return true;
  //   }
  //   return false;
  // }

  render () {
    const { users, currentUser } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={styledTheme}>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <>
                  {<Header {...props} pathname={location.pathname} />}
                  <Wrapper>
                    <Main
                      {...props}
                      users={users}
                      currentUser={currentUser}
                    />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path="/welcome"
              render={props => (
                <>
                  {<Header {...props} pathname={location.pathname} />}
                  <Wrapper>
                    <Main
                      {...props}
                      users={users}
                      currentUser={currentUser}
                    />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path="/login"
              render={props => (
                <>
                  {<Header {...props} pathname={location.pathname} />}
                  <Wrapper>
                    <Login
                      {...props}
                      users={users}
                      currentUser={currentUser}
                    />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path="/signup"
              render={props => (
                <>
                  {<Header {...props} pathname={location.pathname} />}
                  <Wrapper>
                    <Signup
                      {...props}
                      users={users}
                      currentUser={currentUser}
                    />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path="/dashboard"
              render={props => (
                <>
                  {<Header {...props} pathname={location.pathname} />}
                  <Wrapper>
                    <Dashboard
                      {...props}
                      users={users}
                      currentUser={currentUser}
                    />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path="/meals"
              render={props => (
                <>
                  {<Header {...props} pathname={location.pathname} />}
                  <Wrapper>
                    <Meals
                      {...props}
                      users={users}
                      currentUser={currentUser}
                    />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path="/workouts"
              render={props => (
                <>
                  {<Header {...props} pathname={location.pathname} />}
                  <Wrapper>
                    <Workouts
                      {...props}
                      users={users}
                      currentUser={currentUser}
                    />
                  </Wrapper>
                </>
              )}
            />
          </Switch>
        </ThemeProvider>
      </MuiThemeProvider>
    );
  }
}

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.gray1};
  height: 100vh;
  padding-top: 68px;
`;

const mapStateToProps = state => ({
  users: state.userReducer.users,
  currentUser: state.userReducer.currentUser,
  meals: state.meals,
  workouts: state.workouts,
});

export default connect(
  mapStateToProps,
  { getUsers, getCurrentUser },
)(Application);
