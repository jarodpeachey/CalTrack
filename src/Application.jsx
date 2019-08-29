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
    this.state = {};
  }

  componentDidMount () {
    this.props.getUsers();
    this.props.getCurrentUser();
  }

  // componentWillReceiveProps (nextProps) {
  //   this.setState({ users: nextProps.users, currentUser: nextProps.currentUser });
  // }

  // shouldComponentUpdate (nextProps) {
  //   if (this.props.users !== nextProps.users) {
  //     return true;
  //   }
  //   if (this.props.currentUser !== nextProps.currentUser) {
  //     return true;
  //   }
  //   return false;
  // }

  render () {
    const { users, currentUser } = this.props;
    console.log('Users: ', users);
    console.log('Current user: ', currentUser);

    return (
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={styledTheme}>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                    />
                  }
                  <Wrapper>
                    <Main {...props} users={users} currentUser={currentUser} />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path="/welcome"
              render={props => (
                <>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                    />
                  }
                  <Wrapper>
                    <Main {...props} users={users} currentUser={currentUser} />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path="/login"
              render={props => (
                <>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                    />
                  }
                  <Wrapper>
                    <Login {...props} users={users} currentUser={currentUser} />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path="/signup"
              render={props => (
                <>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                    />
                  }
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
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                    />
                  }
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
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                    />
                  }
                  <Wrapper>
                    <Meals {...props} users={users} currentUser={currentUser} />
                  </Wrapper>
                </>
              )}
            />
            <Route
              exact
              path="/workouts"
              render={props => (
                <>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                    />
                  }
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
  // background: ${({ theme }) => theme.colors.gray1};
  height: 100% !important;
  padding-top: 68px;
`;

const mapStateToProps = state => ({
  users: state.userReducer.users,
  currentUser: state.userReducer.currentUser,
});

export default connect(
  mapStateToProps,
  { getUsers, getCurrentUser },
)(Application);
