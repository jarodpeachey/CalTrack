/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
// import { ConnectedRouter } from 'connected-react-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHamburger,
  faThLarge,
  faDumbbell,
} from '@fortawesome/free-solid-svg-icons';
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
import { getUser } from './actions/userActions';
import FooterBar from './components/FooterBar';
import PageNotFound from './components/pages/PageNotFound';

library.add(faHamburger, faThLarge, faDumbbell);

class Application extends Component {
  static propTypes = {
    user: PropTypes.object,
    getUser: PropTypes.func,
    history: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      showFooterBar: false,
    };

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.props.getUser();

    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  shouldComponentUpdate(nextState) {
    if (this.state.showFooterBar !== nextState.showFooterBar) return true;
    return false;
  }

  handleResize() {
    if (window.innerWidth < 569) {
      this.setState({ showFooterBar: true });
    } else {
      this.setState({ showFooterBar: false });
    }
  }

  render() {
    const { user, apiURL } = this.props;
    // console.log('Current user: ', user);
    // console.log('showFooterBar: ', this.state.showFooterBar);

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
                      user={user}
                      apiURL={apiURL}
                      showFooterBar={this.state.showFooterBar}
                    />
                  }
                  <Wrapper>
                    <Main
                      {...props}
                      user={user}
                      apiURL={apiURL}
                    />
                  </Wrapper>
                  {!this.state.showFooterBar ||
                  (Object.keys(user).length === 0 &&
                    user.constructor === Object) ? null : (
                    <FooterBar
                      {...props}
                      pathname={location.pathname}
                      user={user}
                      apiURL={apiURL}
                    />
                  )}
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
                      user={user}
                      apiURL={apiURL}
                      showFooterBar={this.state.showFooterBar}
                    />
                  }
                  <Wrapper>
                    <Main
                      {...props}
                      user={user}
                      apiURL={apiURL}
                    />
                  </Wrapper>
                  {!this.state.showFooterBar ||
                  (Object.keys(user).length === 0 &&
                    user.constructor === Object) ? null : (
                    <FooterBar
                      {...props}
                      pathname={location.pathname}
                      user={user}
                      apiURL={apiURL}
                    />
                  )}
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
                      user={user}
                      apiURL={apiURL}
                      showFooterBar={this.state.showFooterBar}
                    />
                  }
                  <Wrapper>
                    <Login
                      {...props}
                      user={user}
                      apiURL={apiURL}
                    />
                  </Wrapper>
                  {!this.state.showFooterBar ||
                  (Object.keys(user).length === 0 &&
                    user.constructor === Object) ? null : (
                    <FooterBar
                      {...props}
                      pathname={location.pathname}
                      user={user}
                      apiURL={apiURL}
                    />
                  )}
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
                      user={user}
                      apiURL={apiURL}
                      showFooterBar={this.state.showFooterBar}
                    />
                  }
                  <Wrapper>
                    <Signup
                      {...props}
                      user={user}
                      apiURL={apiURL}
                    />
                  </Wrapper>
                  {!this.state.showFooterBar ||
                  (Object.keys(user).length === 0 &&
                    user.constructor === Object) ? null : (
                    <FooterBar
                      {...props}
                      pathname={location.pathname}
                      user={user}
                      apiURL={apiURL}
                    />
                  )}
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
                      user={user}
                      apiURL={apiURL}
                      showFooterBar={this.state.showFooterBar}
                    />
                  }
                  <Wrapper>
                    <Dashboard
                      {...props}
                      user={user}
                      apiURL={apiURL}
                    />
                  </Wrapper>
                  {!this.state.showFooterBar ||
                  (Object.keys(user).length === 0 &&
                    user.constructor === Object) ? null : (
                    <FooterBar
                      {...props}
                      pathname={location.pathname}
                      user={user}
                      apiURL={apiURL}
                    />
                  )}
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
                      user={user}
                      apiURL={apiURL}
                      showFooterBar={this.state.showFooterBar}
                    />
                  }
                  <Wrapper>
                    <Meals
                      {...props}
                      user={user}
                      apiURL={apiURL}
                    />
                  </Wrapper>
                  {!this.state.showFooterBar ||
                  (Object.keys(user).length === 0 &&
                    user.constructor === Object) ? null : (
                    <FooterBar
                      {...props}
                      pathname={location.pathname}
                      user={user}
                      apiURL={apiURL}
                    />
                  )}
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
                      user={user}
                      apiURL={apiURL}
                      showFooterBar={this.state.showFooterBar}
                    />
                  }
                  <Wrapper>
                    <Workouts
                      {...props}
                      user={user}
                      apiURL={apiURL}
                    />
                  </Wrapper>
                  {!this.state.showFooterBar ||
                  (Object.keys(user).length === 0 &&
                    user.constructor === Object) ? null : (
                    <FooterBar
                      {...props}
                      pathname={location.pathname}
                      user={user}
                      apiURL={apiURL}
                    />
                  )}
                </>
              )}
            />
            <Route
              render={props => (
                <>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      user={user}
                      apiURL={apiURL}
                      showFooterBar={this.state.showFooterBar}
                    />
                  }
                  <Wrapper>
                    <PageNotFound
                      {...props}
                      user={user}
                      apiURL={apiURL}
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
  padding: 0 0 48px 0;
`;

const mapStateToProps = state => ({
  users: state.userReducer.users,
  user: state.userReducer.user,
});

export default connect(mapStateToProps, { getUser })(Application);
