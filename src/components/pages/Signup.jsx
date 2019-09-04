import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { addUser, setCurrentUser } from '../../actions/userActions';
import { sortByUserId } from '../../utils/arrayFormat';

class Signup extends Component {
  static propTypes = {
    classes: PropTypes.object,
    users: PropTypes.array,
    currentUser: PropTypes.object,
    addUser: PropTypes.func,
    setCurrentUser: PropTypes.func,
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
    this.setState({
      nameValue: 'Name',
      userNameValue: 'Username',
      passwordValue: 'Password',
      confirmValue: 'Confirm',
    });
  }

  shouldComponentUpdate () {
    return false;
  }

  onNameInputChange (e) {
    this.setState({ nameValue: e.target.value });
  }

  onUsernameInputChange (e) {
    this.setState({ userNameValue: e.target.value });
  }

  onPasswordInputChange (e) {
    this.setState({ passwordValue: e.target.value });
  }

  onConfirmInputChange (e) {
    this.setState({ confirmValue: e.target.value });
  }

  onFormSubmit (e) {
    e.preventDefault();

    let userNameTaken = false;

    this.props.users.forEach((user) => {
      if (user.username === this.state.userNameValue) {
        userNameTaken = true;
      } else {
        userNameTaken = false;
      }
    });

    if (
      this.state.nameValue &&
      this.state.userNameValue &&
      this.state.passwordValue === this.state.confirmValue &&
      !userNameTaken
    ) {
      let id = 0;
      if (this.props.users.length) {
        const sortedUsers = sortByUserId(this.props.users);
        id = sortedUsers[sortedUsers.length - 1].id + 1;
      }

      const user = {
        id,
        name: this.state.nameValue,
        username: this.state.userNameValue,
        password: this.state.passwordValue,
        meals: [],
        workouts: [],
        calories: {
          caloriesBurned: 0,
          caloriesGained: 0,
          netCalories: 0,
        },
      };

      this.props.addUser(user);
      this.props.setCurrentUser(user);

      // this.setState({ redirect: true });
      window.location.href = '/dashboard';
    } else if (userNameTaken) {
      alert('Please choose a different username');
    } else {
      alert('Please fill in all the fields');
    }
  }

  render () {
    const { classes } = this.props;

    return (
      <div>
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
          <div className="mt-xs">
            Already have an account?
            {' '}
            <Link to="/login">Login</Link>
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
    { addUser, setCurrentUser },
  )(withStyles(styles)(Signup)),
);
