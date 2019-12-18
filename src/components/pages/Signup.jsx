import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../actions/userActions';

class Signup extends Component {
  static propTypes = {
    classes: PropTypes.object,
    user: PropTypes.object,
    setUser: PropTypes.func,
    apiURL: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      nameValue: undefined,
      emailValue: undefined,
      passwordValue: undefined,
      confirmValue: undefined,
      mainMessage: '',
    };
    this.onNameInputChange = this.onNameInputChange.bind(this);
    this.onEmailInputChange = this.onEmailInputChange.bind(this);
    this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
    this.onConfirmInputChange = this.onConfirmInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      nameValue: 'Name',
      emailValue: 'Email',
      passwordValue: 'Password',
      confirmValue: 'Confirm',
    });
  }

  shouldComponentUpdate(nextState) {
    if (this.state.mainMessage !== nextState.mainMessage) return true;
    return false;
  }

  onNameInputChange(e) {
    this.setState({ nameValue: e.target.value });
  }

  onEmailInputChange(e) {
    this.setState({ emailValue: e.target.value });
  }

  onPasswordInputChange(e) {
    this.setState({ passwordValue: e.target.value });
  }

  onConfirmInputChange(e) {
    this.setState({ confirmValue: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();

    if (
      this.state.nameValue !== '' &&
      this.state.emailValue !== '' &&
      this.state.passwordValue === this.state.confirmValue
    ) {
      const userFormData = new FormData();
      userFormData.set('name', this.state.nameValue);
      userFormData.set('email', this.state.emailValue);
      userFormData.set('password', this.state.passwordValue);

      console.log(this.props.apiURL);

      axios({
        method: 'POST',
        url: `${this.props.apiURL}/signup.php`,
        config: {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
        data: userFormData,
      })
        .then((res) => {
          console.log('Sent! Response: ', res);
          if (res.data.email_used) {
            this.setState({
              mainMessageType: 'error',
              mainMessage: (
                <span>
                  This email is already connected to an account. You can log in{' '}
                  <Link to="/login">here.</Link>
                </span>
              ),
            });
          } else if (res.data.success) {
            this.setState({
              mainMessageType: 'success',
              mainMessage: 'Success! You are now registered.',
            });
          } else {
            this.setState({
              mainMessageType: 'error',
              mainMessage: 'There was a problem adding you. Please try again',
            });
          }
        })
        .catch((err) => {
          console.log('Error.', err);
        });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div>{this.state.mainMessage}</div>
        <FormWrapper>
          <Heading className="mb-sm">Sign Up</Heading>
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
              id="email"
              type="text"
              fullWidth
              placeholder="Email"
              variant="outlined"
              margin="dense"
              label="Email"
              onChange={this.onEmailInputChange}
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
          <div className="mt-xs">
            Already have an account? <Link to="/login">Login</Link>
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
  connect(null, { setUser })(withStyles(styles)(Signup)),
);
