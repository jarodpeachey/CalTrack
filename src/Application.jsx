/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
// import { ConnectedRouter } from 'connected-react-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHamburger, faThLarge, faDumbbell } from '@fortawesome/free-solid-svg-icons';
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
import FooterBar from './components/FooterBar';
import {isNullOrUndefined} from 'util';

library.add(faHamburger, faThLarge, faDumbbell);

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
      showFooterBar: false,
    };

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount () {
    this.props.getUsers();
    this.props.getCurrentUser();

    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  shouldComponentUpdate (nextState) {
    if (this.state.showFooterBar !== nextState.showFooterBar) return true;
    return false;
  }

  handleResize () {
    console.log(this.state.currentUser);
    if (window.innerWidth < 569 && !this.state.currentUser) {
      this.setState({ showFooterBar: true });
    } else {
      this.setState({ showFooterBar: false });
    }
  }

  render () {
    const { users, currentUser } = this.props;
    console.log('Users: ', users);
    console.log('Current user: ', currentUser);
    console.log('showFooterBar: ', this.state.showFooterBar);

    return (
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={styledTheme}>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Wrapper>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                      showFooterBar={this.state.showFooterBar}
                    />
                  }
                  <Main {...props} users={users} currentUser={currentUser} />
                  {this.state.showFooterBar && (
                    <FooterBar
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                    />
                  )}
                </Wrapper>
              )}
            />
            <Route
              exact
              path="/welcome"
              render={props => (
                <Wrapper>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                      showFooterBar={this.state.showFooterBar}
                    />
                  }
                  <Main {...props} users={users} currentUser={currentUser} />
                  {this.state.showFooterBar && (
                    <FooterBar
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                    />
                  )}
                </Wrapper>
              )}
            />
            <Route
              exact
              path="/login"
              render={props => (
                <Wrapper>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                      showFooterBar={this.state.showFooterBar}
                    />
                  }
                  <Login {...props} users={users} currentUser={currentUser} />
                  {this.state.showFooterBar && (
                    <FooterBar
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                    />
                  )}
                </Wrapper>
              )}
            />
            <Route
              exact
              path="/signup"
              render={props => (
                <Wrapper>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                      showFooterBar={this.state.showFooterBar}
                    />
                  }
                  <Signup {...props} users={users} currentUser={currentUser} />
                  {this.state.showFooterBar && (
                    <FooterBar
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                    />
                  )}
                </Wrapper>
              )}
            />
            <Route
              exact
              path="/dashboard"
              render={props => (
                <Wrapper>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                      showFooterBar={this.state.showFooterBar}
                    />
                  }
                  <Dashboard {...props} users={users} currentUser={currentUser} />
                  {this.state.showFooterBar && (
                    <FooterBar
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                    />
                  )}
                </Wrapper>
              )}
            />
            <Route
              exact
              path="/meals"
              render={props => (
                <Wrapper>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                      showFooterBar={this.state.showFooterBar}
                    />
                  }
                  <Meals {...props} users={users} currentUser={currentUser} />
                  {this.state.showFooterBar && (
                    <FooterBar
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                    />
                  )}
                </Wrapper>
              )}
            />
            <Route
              exact
              path="/workouts"
              render={props => (
                <Wrapper>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                      showFooterBar={this.state.showFooterBar}
                    />
                  }
                  <Workouts {...props} users={users} currentUser={currentUser} />
                  {this.state.showFooterBar && (
                    <FooterBar
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                    />
                  )}
                </Wrapper>
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
  padding: 68px 0;
`;

const mapStateToProps = state => ({
  users: state.userReducer.users,
  currentUser: state.userReducer.currentUser,
});

export default connect(
  mapStateToProps,
  { getUsers, getCurrentUser },
)(Application);
