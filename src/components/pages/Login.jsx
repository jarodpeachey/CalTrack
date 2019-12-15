import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../actions/userActions';

class Login extends Component {
  static propTypes = {
    classes: PropTypes.object,
    // currentUser: PropTypes.object,
    setCurrentUser: PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.state = {
      userNameValue: undefined,
      passwordValue: undefined,
      userNameError: false,
      passwordError: false,
    };
    this.onUsernameInputChange = this.onUsernameInputChange.bind(this);
    this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount () {
    this.setState({
      userNameValue: 'Username',
      passwordValue: 'Password',
    });
  }

  shouldComponentUpdate (nextState) {
    if (this.state.passwordError !== nextState.passwordError) {
      return true;
    }
    if (this.state.userNameError !== nextState.userNameError) {
      return true;
    }
    if (this.state.userNameValue !== nextState.userNameValue) {
      return true;
    }
    if (this.state.passwordValue !== nextState.passwordValue) {
      return true;
    }
    return false;
  }

  onUsernameInputChange (e) {
    this.setState({ userNameValue: e.target.value });
  }

  onPasswordInputChange (e) {
    this.setState({ passwordValue: e.target.value });
  }

  onFormSubmit (e) {
    e.preventDefault();

    const usersWithSameUsername = this.props.users.filter(
      user => user.username === this.state.userNameValue,
    );

    const usersWithSamePassword = this.props.users.filter(
      user => user.password === this.state.passwordValue,
    );

    if (!usersWithSameUsername.length) {
      this.setState({ userNameError: true });
    }

    if (!usersWithSamePassword.length) {
      this.setState({ passwordError: true });
    }

    this.props.users.forEach((user) => {
      if (
        user.username === this.state.userNameValue &&
        user.password === this.state.passwordValue
      ) {
        this.props.setCurrentUser(user);
        window.location.href = '/dashboard';
      }
    });
  }

  render () {
    const { classes } = this.props;
    const { userNameError, passwordError } = this.state;

    return (
      <div>
        <FormWrapper>
          <Heading className="mb-sm">Log In</Heading>
          <form onSubmit={this.onFormSubmit}>
            <TextField
              error={userNameError}
              id="username"
              type="text"
              fullWidth
              placeholder="Username"
              variant="outlined"
              margin="dense"
              label="Username"
              onChange={this.onUsernameInputChange}
            />
            <TextField
              error={passwordError}
              id="password"
              type="password"
              fullWidth
              placeholder="Password"
              variant="outlined"
              margin="dense"
              label="Password"
              onChange={this.onPasswordInputChange}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              classes={{ root: classes.buttonRoot }}
            >
              Log In
            </Button>
          </form>
          <div className="mt-xs">
            Don't have an account?
            {' '}
            <Link to="/signup">Signup</Link>
          </div>
        </FormWrapper>
      </div>
    );
  }
}

const styles = () => ({
  buttonRoot: {
    margin: 0,
    marginTop: 8,
    height: 49,
  },
});

const FormWrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  max-width: 540px;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const Heading = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.main};
`;

export default withRouter(
  connect(
    null,
    { setCurrentUser },
  )(withStyles(styles)(Login)),
);
