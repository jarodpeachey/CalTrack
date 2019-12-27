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

class Login extends Component {
  static propTypes = {
    classes: PropTypes.object,
    setUser: PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.state = {
      emailValue: undefined,
      passwordValue: undefined,
      emailError: false,
      passwordError: false,
    };
    this.onemailInputChange = this.onemailInputChange.bind(this);
    this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount () {
    this.setState({
      emailValue: 'Email',
      passwordValue: 'Password',
    });
  }

  shouldComponentUpdate (nextState) {
    if (this.state.passwordError !== nextState.passwordError) {
      return true;
    }
    if (this.state.emailError !== nextState.emailError) {
      return true;
    }
    if (this.state.emailValue !== nextState.emailValue) {
      return true;
    }
    if (this.state.passwordValue !== nextState.passwordValue) {
      return true;
    }
    return false;
  }

  onemailInputChange (e) {
    this.setState({ emailValue: e.target.value });
  }

  onPasswordInputChange (e) {
    this.setState({ passwordValue: e.target.value });
  }

  onFormSubmit (e) {
    e.preventDefault();

    if (this.state.emailValue === '' || this.state.passwordValue === '') {
      alert('Please fill in all the fields');
    } else {
      const bodyFormData = new FormData();
      bodyFormData.set('email', this.state.emailValue);
      bodyFormData.set('password', this.state.passwordValue);

      axios({
        method: 'POST',
        url: `${this.props.apiURL}/login.php`,
        config: {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
        data: bodyFormData,
      })
        .then((res) => {
          console.log('Sent! Response: ', res);
          if (res.data.match) {
            this.setState({
              mainMessageType: 'success',
              mainMessage:
                'Success! You are now being redirected to the welcome page.',
            });

            const newUser = {
              userID: res.data.user.userID,
              name: res.data.user.name,
              email: res.data.user.email,
              calories: {
                gained: parseInt(res.data.user.caloriesGained),
                lost: parseInt(res.data.user.caloriesLost),
                net: parseInt(res.data.user.netCalories),
              },
              meals: res.data.user.meals,
              workouts: res.data.user.workouts,
            };

            this.props.setUser(newUser);

            setTimeout(() => {
              this.props.history.push('/dashboard');
            }, 1000);
          } else {
            this.setState({
              mainMessageType: 'error',
              mainMessage: 'Your email/password is incorrect.',
            });
          }
        })
        .catch((err) => {
          console.log('Error: ', err);
        });
    }
  }

  render () {
    const { classes } = this.props;
    const { emailError, passwordError } = this.state;

    return (
      <div>
        <FormWrapper>
          <Heading className="mb-sm">Log In</Heading>
          <form onSubmit={this.onFormSubmit}>
            <TextField
              error={emailError}
              id="email"
              type="text"
              fullWidth
              placeholder="Email"
              variant="outlined"
              margin="dense"
              label="Email"
              onChange={this.onemailInputChange}
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
  connect(null, { setUser })(withStyles(styles)(Login)),
);
