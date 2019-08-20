import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
// import { ConnectedRouter } from 'connected-react-router';
import { MuiThemeProvider } from '@material-ui/core/styles';
import styled, { ThemeProvider } from 'styled-components';
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
    history: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {
      updateApplication: false,
      windowLocationPathname: '/',
    };
  }

  componentDidMount () {
    this.props.getUsers();
    this.props.getCurrentUser();

    console.log('Users: ', this.props.users);
    console.log('Current user: ', this.props.currentUser);

    this.checkWindowLocationUpdate();
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.props.getUsers() !== nextProps.getUsers()) {
      return true;
    }
    if (this.props.getCurrentUser() !== nextProps.getCurrentUser()) {
      return true;
    }
    if (this.state.updateApplication !== nextState.updateApplication) {
      return true;
    }
    return false;
  }

  componentDidUpdate () {
    this.checkWindowLocationUpdate();
  }

  checkWindowLocationUpdate () {
    if (window.location.pathname !== this.state.windowLocationPathname) {
      this.setState({ updateApplication: true });

      this.setState({ windowLocationPathname: window.location.pathname });
    }

    console.log(window.location.pathname);
  }

  render () {
    const { users, currentUser } = this.props;
    let header;

    if (window.location.pathname === '/welcome' || window.location.pathname === '/') {
      header = <Header welcomePageActive />;
    } else {
      header = <Header />;
    }

    return (
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={styledTheme}>
          <Wrapper>
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
          </Wrapper>
        </ThemeProvider>
      </MuiThemeProvider>
    );
  }
}

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.gray1};
  height: 100vh;
`;

const mapStateToProps = state => ({
  users: state.userReducer.users,
  currentUser: state.userReducer.currentUser,
  meals: state.meals,
  workouts: state.workouts,
});

export default connect(mapStateToProps, { getUsers, getCurrentUser })(Application);
