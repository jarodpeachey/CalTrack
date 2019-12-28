import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Input, Button, IconButton, Tooltip, Grow } from '@material-ui/core';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import Delete from '@material-ui/icons/Delete';
import Check from '@material-ui/icons/Check';
import axios from 'axios';
import {
  addWorkout,
  editWorkout,
  deleteWorkout,
  updateUser,
} from '../../actions/userActions';
// import { sortByDate } from '../../utils/arrayFormat';
import { Title } from '../Layout/Title';
import WorkoutItem from '../WorkoutItem';

const errorTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff3744',
    },
  },
});

class Workouts extends Component {
  static propTypes = {
    user: PropTypes.object,
    classes: PropTypes.object,
    addWorkout: PropTypes.func,
    editWorkout: PropTypes.func,
    deleteWorkout: PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.state = {
      workouts: [],
      // isMobileModeOn: false,
      workoutName: '',
      workoutCalories: '',
      workoutDescription: '',
      mode: 'addWorkoutMode',
      displayNoWorkoutsNotif: true,
      submitButtonActive: false,
      workoutToEdit: {},
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCaloriesChange = this.handleCaloriesChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.clearNoWorkoutsNotification = this.clearNoWorkoutsNotification.bind(this);
    this.switchToEditWorkoutMode = this.switchToEditWorkoutMode.bind(this);
    this.clearEditMode = this.clearEditMode.bind(this);
    this.editWorkout = this.editWorkout.bind(this);
    this.deleteWorkout = this.deleteWorkout.bind(this);
  }

  componentDidMount () {
    if (
      Object.keys(this.props.user).length === 0 &&
      this.props.user.constructor === Object
    ) {
      this.setState({ workouts: []});
    } else {
      this.setState({ workouts: this.props.user.workouts });
    }

    if (this.props.location.state) {
      const { workoutToEdit } = this.props.location.state;
      this.setState({
        workoutName: workoutToEdit.workoutName,
        workoutCalories: workoutToEdit.workoutCalories,
        workoutDescription: workoutToEdit.workoutDescription,
        mode: 'editWorkoutMode',
        workoutToEdit,
      });
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ workouts: nextProps.user.workouts });
  }

  shouldComponentUpdate (nextState) {
    if (this.state.workoutName !== nextState.workoutName) {
      return true;
    }
    if (this.state.workoutCalories !== nextState.workoutCalories) {
      return true;
    }
    if (this.state.workoutDescription !== nextState.workoutDescription) {
      return true;
    }
    if (this.state.workouts !== nextState.workouts) {
      return true;
    }
    return false;
  }

  handleNameChange (e) {
    this.setState({ workoutName: e.target.value });
    if (this.state.workoutCalories !== '' && e.target.value !== '') {
      this.setState({ submitButtonActive: true });
    } else {
      this.setState({ submitButtonActive: false });
    }
  }

  handleCaloriesChange (e) {
    this.setState({ workoutCalories: e.target.value });
    if (this.state.workoutName !== '' && e.target.value !== '') {
      this.setState({ submitButtonActive: true });
    } else {
      this.setState({ submitButtonActive: false });
    }
  }

  handleDescriptionChange (e) {
    this.setState({ workoutDescription: e.target.value });
  }

  submitForm () {
    const { workoutName, workoutCalories, workoutDescription } = this.state;

    if (workoutName !== '' && workoutCalories !== '') {
      const bodyFormData = new FormData();
      bodyFormData.set('workoutName', workoutName);
      bodyFormData.set('workoutCalories', workoutCalories);
      bodyFormData.set('workoutDescription', workoutDescription);

      axios({
        method: 'POST',
        url: `${this.props.apiURL}/users/${this.props.user.userID}/workouts`,
        config: {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
        data: bodyFormData,
      })
        .then((res) => {
          console.log('Sent! Response: ', res);
          if (res.data.success) {
            this.setState({
              mainMessageType: 'success',
              mainMessage: 'Success! Your workout has been added.',
            });

            this.props.addWorkout(res.data.workout);
            // this.props.updateUser();
          } else {
            this.setState({
              mainMessageType: 'error',
              mainMessage:
                'There was an error adding your workout. Check your internet connection.',
            });
          }
        })
        .catch((err) => {
          console.log('Error: ', err);
        });
      this.setState({
        workoutName: '',
        workoutCalories: '',
        workoutDescription: '',
      });
    } else {
      alert('Please fill in all the fields');
    }
  }

  clearNoWorkoutsNotification () {
    this.setState({ displayNoWorkoutsNotif: false });
  }

  switchToEditWorkoutMode (workoutToEdit) {
    console.log('Workout to edit - Workouts.jsx:', workoutToEdit);

    this.setState({
      workoutName: workoutToEdit.workoutName,
      workoutCalories: workoutToEdit.workoutCalories,
      workoutDescription: workoutToEdit.workoutDescription,
      mode: 'editWorkoutMode',
      workoutToEdit,
    });
  }

  clearEditMode () {
    this.setState({
      workoutName: '',
      workoutCalories: '',
      workoutDescription: '',
      mode: 'addWorkoutMode',
      workoutToEdit: {},
    });
  }

  editWorkout () {
    const { workoutName, workoutDescription, workoutCalories, workoutToEdit } = this.state;

    const workoutToSendToAPI = {
      workoutName,
      workoutCalories,
      workoutDescription,
    };

    const workoutToUpdateStore = {
      ...workoutToSendToAPI,
      workoutID: workoutToEdit.workoutID,
      userID: workoutToEdit.userID,
    };

    if (workoutName !== '' && workoutCalories !== '') {
      axios({
        method: 'PUT',
        url: `${this.props.apiURL}/users/${this.props.user.userID}/workouts/${workoutToEdit.workoutID}`,
        config: {
          headers: { 'Content-Type': 'application/json' },
        },
        data: { ...workoutToSendToAPI },
      })
        .then((res) => {
          console.log('Sent! Response: ', res);
          if (res.data.success) {
            this.setState({
              mainMessageType: 'success',
              mainMessage: 'Success! Your workout has been edited.',
            });

            this.props.editWorkout(workoutToUpdateStore);
            // this.props.updatseUser();
          } else {
            this.setState({
              mainMessageType: 'error',
              mainMessage:
                'There was an error updating your workout. Check your internet connection.',
            });
          }
        })
        .catch((err) => {
          console.log('Error: ', err);
        });

      this.setState({
        workoutName: '',
        workoutCalories: '',
        workoutDescription: '',
        mode: 'addWorkoutMode',
        workoutToEdit: {},
      });
    } else {
      alert('Please fill in all the fields');
    }
  }

  deleteWorkout () {
    const {
      workoutToEdit: { workoutID },
    } = this.state;

    axios({
      method: 'DELETE',
      url: `${this.props.apiURL}/workouts/${workoutID}`,
      config: {
        headers: { 'Content-Type': 'application/json' },
      },
    })
      .then((res) => {
        console.log('Sent! Response: ', res);
        if (res.data.success) {
          this.setState({
            mainMessageType: 'success',
            mainMessage: 'Success! Your workout has been deleted.',
          });

          this.props.deleteWorkout(workoutID);
          // this.props.updatseUser();
        } else {
          this.setState({
            mainMessageType: 'error',
            mainMessage:
              'There was an error deleting your workout. Check your internet connection.',
          });
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });

    this.setState({
      workoutName: '',
      workoutCalories: '',
      workoutDescription: '',
      mode: 'addWorkoutMode',
      workoutToEdit: {},
    });
  }

  pushToPage (path) {
    this.props.history.push(`${path}`);
  }

  render () {
    const {
      // isMobileModeOn,
      workoutName,
      workoutCalories,
      workoutDescription,
      mode,
      workouts,
      submitButtonActive,
    } = this.state;
    const { classes, user } = this.props;

    let buttonsGroup = '';

    switch (mode) {
      case 'addWorkoutMode':
        buttonsGroup = (
          <div className="row">
            <div className="col col-12">
              <Button
                variant="contained"
                className="m-none"
                color="primary"
                onClick={this.submitForm}
                disabled={!submitButtonActive}
              >
                Add Workout
              </Button>
            </div>
          </div>
        );
        break;
      case 'editWorkoutMode':
        buttonsGroup = (
          <>
            <Button
              variant="contained"
              color="primary"
              className="m-none"
              onClick={this.editWorkout}
            >
              <MobileUpdateButton className="hidden-above-mobile-lg m-none full-width">
                <Check />
              </MobileUpdateButton>
              <span className="hidden-below-mobile-lg">Update Workout</span>
            </Button>
            <Button
              variant="outlined"
              className="my-none"
              onClick={this.clearEditMode}
            >
              Cancel
            </Button>
            <MuiThemeProvider theme={errorTheme}>
              <div className="hidden-above-mobile-lg float-right">
                <IconButton
                  onClick={this.deleteWorkout}
                  color="primary"
                  className="m-none"
                  classes={{ root: classes.deleteButton }}
                >
                  <Delete />
                </IconButton>
              </div>
              <div className="hidden-below-mobile-lg float-right">
                <Button
                  onClick={this.deleteWorkout}
                  color="primary"
                  className="m-none"
                >
                  Delete Workout
                </Button>
              </div>
            </MuiThemeProvider>
          </>
        );
        break;
      default:
        buttonsGroup = (
          <div className="row">
            <div className="col col-12">
              <Button variant="contained" className="m-none" color="primary">
                Add Workout
              </Button>
            </div>
          </div>
        );
        break;
    }

    return (
      <>
        {Object.keys(user).length === 0 && user.constructor === Object ? (
          <div className="container">
            <div className="center-text">
              <Card className="card border no-shadow px-sm py-sm mb-sm">
                <h3>You must be logged in to access this page.</h3>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.pushToPage('/login')}
                >
                  Go To Login
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.pushToPage('/signup')}
                >
                  Go To Signup
                </Button>
              </Card>
            </div>
          </div>
        ) : (
          <div className="container p-none mt-md">
            <div className="card p-md mb-md border no-shadow bg-white">
              <h3 className="title m-none">
                {mode === 'addWorkoutMode' ? 'Add Workout' : 'Edit Workout'}
              </h3>
              <form action="">
                <div className="row">
                  <div className="col col-6">
                    <Input
                      classes={{
                        root: classes.input,
                        focused: classes.focusedInput,
                      }}
                      disableUnderline
                      fullWidth
                      label="Workout Name"
                      value={workoutName}
                      onChange={this.handleNameChange}
                      placeholder="Workout name..."
                    />
                  </div>
                  <div className="col col-6">
                    <Input
                      classes={{
                        root: classes.input,
                        focused: classes.focusedInput,
                      }}
                      disableUnderline
                      fullWidth
                      label="Calories"
                      value={workoutCalories}
                      onChange={this.handleCaloriesChange}
                      placeholder="Calories"
                      type="number"
                    />
                  </div>
                  <div className="col col-12">
                    <Input
                      classes={{
                        root: classes.textField,
                        focused: classes.focusedInput,
                      }}
                      fullWidth
                      label="Comments and description"
                      value={workoutDescription}
                      onChange={this.handleDescriptionChange}
                      placeholder="Comments and description"
                      multiline
                      disableUnderline
                      rows="4"
                    />
                  </div>
                </div>
                {buttonsGroup}
              </form>
            </div>
            {this.state.workouts.length ? (
              <div className="card p-md mb-md border no-shadow bg-white">
                <Title>Workouts</Title>
                <ul>
                  {workouts.map(workout => (
                    <WorkoutItem
                      key={`workoutItem-${workout.workoutID}`}
                      workout={workout}
                      switchToEditWorkoutMode={workoutToEdit => this.switchToEditWorkoutMode(workoutToEdit)
                      }
                    />
                  ))}
                </ul>
              </div>
            ) : (
              <>
                {this.state.displayNoWorkoutsNotif && (
                  <Card className="card no-shadow bg-white p-sm display-flex align-left v-align-center">
                    <h4 className="m-none">
                      There are no workouts yet, add a workout!
                    </h4>
                    <Tooltip
                      classes={{ tooltip: classes.toolTip }}
                      title="Dismiss"
                      TransitionComponent={Grow}
                    >
                      <IconButton
                        onClick={this.clearNoWorkoutsNotification}
                        classes={{ root: classes.iconButton }}
                      >
                        <Close />
                      </IconButton>
                    </Tooltip>
                  </Card>
                )}
              </>
            )}
          </div>
        )}
      </>
    );
  }
}

const styles = theme => ({
  input: {
    background: '#f7f7f7',
    padding: theme.spacing(2, 3),
    // border: 'none !important',
    border: '1px solid #ddd',
    borderRadius: 2,
  },
  textField: {
    background: '#f7f7f7',
    padding: theme.spacing(4, 4, 2, 4),
    border: '1px solid #ddd',
    borderRadius: 2,
    marginBottom: theme.spacing(2),
  },
  focusedInput: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  iconButton: {
    marginLeft: 'auto',
  },
  toolTip: {
    position: 'relative',
    bottom: 16,
  },
  deleteButton: {
    position: 'relative',
    bottom: 5,
  },
});

const Card = styled.div`
  border: 1px solid #ddd;
`;

const MobileUpdateButton = styled.span`
  height: 24px !important;
`;

export default connect(null, { addWorkout, editWorkout, deleteWorkout, updateUser })(
  withStyles(styles)(Workouts),
);
