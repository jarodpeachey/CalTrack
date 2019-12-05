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
import { getCurrentUser } from './actions/userActions';
import FooterBar from './components/FooterBar';
import PageNotFound from './components/pages/PageNotFound';

library.add(faHamburger, faThLarge, faDumbbell);

class Application extends Component {
  static propTypes = {
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
    this.props.getCurrentUser();

    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  shouldComponentUpdate (nextState) {
    if (this.state.showFooterBar !== nextState.showFooterBar) return true;
    return false;
  }

  handleResize () {
    if (window.innerWidth < 569) {
      this.setState({ showFooterBar: true });
    } else {
      this.setState({ showFooterBar: false });
    }
  }

  render () {
    const { currentUser, basename } = this.props;
    console.log('Current user: ', currentUser);
    console.log('showFooterBar: ', this.state.showFooterBar);

    return (
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={styledTheme}>
          <Switch>
            <Route
              exact
              path={`${basename}`}
              render={(props) => (
                <>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                      showFooterBar={this.state.showFooterBar}
                      basename={basename}
                    />
                  }
                  <Wrapper>
                    <Main
                      {...props}
                      currentUser={currentUser}
                      basename={basename}
                    />
                  </Wrapper>
                  {!this.state.showFooterBar ||
                  (Object.keys(currentUser).length === 0 &&
                    currentUser.constructor === Object) ? null : (
                    <FooterBar
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                      basename={basename}
                    />
                  )}
                </>
              )}
            />
            <Route
              exact
              path={`${basename}welcome`}
              render={(props) => (
                <>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                      showFooterBar={this.state.showFooterBar}
                      basename={basename}
                    />
                  }
                  <Wrapper>
                    <Main
                      {...props}
                      currentUser={currentUser}
                      basename={basename}
                    />
                  </Wrapper>
                  {!this.state.showFooterBar ||
                  (Object.keys(currentUser).length === 0 &&
                    currentUser.constructor === Object) ? null : (
                    <FooterBar
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                      basename={basename}
                    />
                  )}
                </>
              )}
            />
            <Route
              exact
              path={`${basename}login`}
              render={(props) => (
                <>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                      showFooterBar={this.state.showFooterBar}
                      basename={basename}
                    />
                  }
                  <Wrapper>
                    <Login
                      {...props}
                      currentUser={currentUser}
                      basename={basename}
                    />
                  </Wrapper>
                  {!this.state.showFooterBar ||
                  (Object.keys(currentUser).length === 0 &&
                    currentUser.constructor === Object) ? null : (
                    <FooterBar
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                      basename={basename}
                    />
                  )}
                </>
              )}
            />
            <Route
              exact
              path={`${basename}signup`}
              render={(props) => (
                <>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                      showFooterBar={this.state.showFooterBar}
                      basename={basename}
                    />
                  }
                  <Wrapper>
                    <Signup
                      {...props}
                      currentUser={currentUser}
                      basename={basename}
                    />
                  </Wrapper>
                  {!this.state.showFooterBar ||
                  (Object.keys(currentUser).length === 0 &&
                    currentUser.constructor === Object) ? null : (
                    <FooterBar
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                      basename={basename}
                    />
                  )}
                </>
              )}
            />
            <Route
              exact
              path={`${basename}dashboard`}
              render={(props) => (
                <>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                      showFooterBar={this.state.showFooterBar}
                      basename={basename}
                    />
                  }
                  <Wrapper>
                    <Dashboard
                      {...props}
                      currentUser={currentUser}
                      basename={basename}
                    />
                  </Wrapper>
                  {!this.state.showFooterBar ||
                  (Object.keys(currentUser).length === 0 &&
                    currentUser.constructor === Object) ? null : (
                    <FooterBar
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                      basename={basename}
                    />
                  )}
                </>
              )}
            />
            <Route
              exact
              path={`${basename}meals`}
              render={(props) => (
                <>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                      showFooterBar={this.state.showFooterBar}
                      basename={basename}
                    />
                  }
                  <Wrapper>
                    <Meals
                      {...props}
                      currentUser={currentUser}
                      basename={basename}
                    />
                  </Wrapper>
                  {!this.state.showFooterBar ||
                  (Object.keys(currentUser).length === 0 &&
                    currentUser.constructor === Object) ? null : (
                    <FooterBar
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                      basename={basename}
                    />
                  )}
                </>
              )}
            />
            <Route
              exact
              path={`${basename}workouts`}
              render={(props) => (
                <>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                      showFooterBar={this.state.showFooterBar}
                      basename={basename}
                    />
                  }
                  <Wrapper>
                    <Workouts
                      {...props}
                      currentUser={currentUser}
                      basename={basename}
                    />
                  </Wrapper>
                  {!this.state.showFooterBar ||
                  (Object.keys(currentUser).length === 0 &&
                    currentUser.constructor === Object) ? null : (
                    <FooterBar
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                      basename={basename}
                    />
                  )}
                </>
              )}
            />
            <Route
              render={(props) => (
                <>
                  {
                    <Header
                      {...props}
                      pathname={location.pathname}
                      currentUser={currentUser}
                      showFooterBar={this.state.showFooterBar}
                      basename={basename}
                    />
                  }
                  <Wrapper>
                    <PageNotFound
                      {...props}
                      currentUser={currentUser}
                      basename={basename}
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

// eslint-disable-next-line arrow-parens
const mapStateToProps = (state) => ({
  currentUser: state.userReducer.currentUser,
});

export default connect(mapStateToProps, { getCurrentUser })(Application);
