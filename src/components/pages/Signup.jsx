import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import { createNewUser, addUserToLocalStorage, setCurrentUser } from '../../data';


class Signup extends Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {
      nameValue: undefined,
      userNameValue: undefined,
      passwordValue: undefined,
      confirmValue: undefined,
    };
    this.onNameInputChange = this.onNameInputChange.bind(this);
    this.onUsernameInputChange = this.onUsernameInputChange.bind(this);
    this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
    this.onConfirmInputChange = this.onConfirmInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount () {
    this.setState({ nameValue: 'Name', userNameValue: 'Username', passwordValue: 'Password', confirmValue: 'Confirm' });
  }

  // shouldComponentUpdate (state, nextState) {
  //   // if ((state.nameValue !== nextState.nameValue) || (state.userNameValue !== nextState.userNameValue) || (state.passwordValue !== nextState.passwordValue) || (state.confirmValue !== nextState.confirmValue)) {
  //   //   return true;
  //   // } else {
  //   //   return false;
  //   // }
  // }

  onNameInputChange (e) {
    console.log('Name Input Change');
    this.setState({ nameValue: e.target.value });
  }

  onUsernameInputChange (e) {
    console.log('Username Input Change');
    this.setState({ userNameValue: e.target.value });
  }

  onPasswordInputChange (e) {
    console.log('Password Input Change');
    this.setState({ passwordValue: e.target.value });
  }

  onConfirmInputChange (e) {
    console.log('Confirm Input Change');
    this.setState({ confirmValue: e.target.value });
  }

  onFormSubmit (e) {
    e.preventDefault();

    if (this.state.nameValue && this.state.userNameValue && (this.state.passwordValue === this.state.confirmValue)) {
      const newUser = createNewUser(this.state.nameValue, this.state.userNameValue, this.state.passwordValue);
      addUserToLocalStorage(newUser);
      setCurrentUser(newUser);
      window.location.href = '/dashboard';
    } else {
      /* Error message component */
    }
  }

  render () {
    const { classes } = this.props;

    return (
      <div>
        <FormWrapper>
          <Heading>
            Sign Up
          </Heading>
          <form onSubmit={this.onFormSubmit}>
            <TextField
              id="name"
              type="text"
              fullWidth
              placeholder="Name"
              variant="outlined"
              margin="dense"
              label="Name"
              onChange={this.onNameInputChange}
            />
            <TextField
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
              id="password"
              type="password"
              fullWidth
              placeholder="Password"
              variant="outlined"
              margin="dense"
              label="Password"
              onChange={this.onPasswordInputChange}
            />
            <TextField
              id="password-reenter"
              type="password"
              fullWidth
              placeholder="Verify Password"
              variant="outlined"
              margin="dense"
              label="Verify Password"
              onChange={this.onConfirmInputChange}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              classes={{ root: classes.buttonRoot }}
            >
              Sign Up
            </Button>
          </form>
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
`;

const Heading = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.main};
`;

export default withStyles(styles)(Signup);

