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
import { addWorkout, editWorkout, deleteWorkout } from '../../actions/userActions';
import { sortByUserId, sortByDate } from '../../utils/arrayFormat';
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
    currentUser: PropTypes.object,
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
    this.updateWorkout = this.updateWorkout.bind(this);
    this.deleteWorkout = this.deleteWorkout.bind(this);
  }

  componentDidMount () {
    this.setState({ workouts: sortByDate(this.props.currentUser.workouts) });

    if (this.props.location.state) {
      const { workoutToEdit } = this.props.location.state;
      this.setState({
        workoutName: workoutToEdit.name,
        workoutCalories: workoutToEdit.calories,
        workoutDescription: workoutToEdit.description,
        mode: 'editWorkoutMode',
        workoutToEdit,
      });
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ workouts: nextProps.currentUser.workouts });
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
    const { workoutName, workoutCalories, workoutDescription, workouts } = this.state;
    let date = new Date();
    date = {
      month: date.getMonth(),
      day: date.getDay(),
      date: date.getDate(),
      year: date.getFullYear(),
      UTC: date.getTime(),
    };

    let id = 0;
    if (workouts.length) {
      const sortedWorkouts = sortByUserId(workouts);

      id = sortedWorkouts[sortedWorkouts.length - 1].id + 1;
    }

    const workout = {
      id,
      name: workoutName,
      calories: JSON.parse(workoutCalories),
      description: workoutDescription,
      date,
    };

    if (workoutName !== '' && workoutCalories !== '') {
      this.props.addWorkout(workout);
      // this.props.updateCalories('add', workout.calories);

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

  switchToEditWorkoutMode (id) {
    let workoutToEdit = {};

    this.state.workouts.forEach((workout) => {
      if (workout.id === id) {
        workoutToEdit = workout;
      }
    });

    this.setState({
      workoutName: workoutToEdit.name,
      workoutCalories: workoutToEdit.calories,
      workoutDescription: workoutToEdit.description,
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

  updateWorkout () {
    const {
      workoutName: newWorkoutName,
      workoutCalories: newWorkoutCalories,
      workoutDescription: newWorkoutDescription,
      workoutToEdit,
    } = this.state;

    const newWorkout = {
      id: workoutToEdit.id,
      name: newWorkoutName,
      calories: JSON.parse(newWorkoutCalories),
      description: newWorkoutDescription,
      date: workoutToEdit.date,
    };

    if (newWorkoutName !== '' && newWorkoutCalories !== '') {
      this.props.editWorkout(newWorkout);

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
    const { workoutToEdit } = this.state;

    this.props.deleteWorkout(workoutToEdit);

    this.setState({
      workoutName: '',
      workoutCalories: '',
      workoutDescription: '',
      mode: 'addWorkoutMode',
      workoutToEdit: {},
    });
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
    const { classes } = this.props;

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
              onClick={this.updateWorkout}
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
                    workout={workout}
                    switchToEditWorkoutMode={this.switchToEditWorkoutMode}
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

export default connect(
  null,
  { addWorkout, editWorkout, deleteWorkout },
)(withStyles(styles)(Workouts));
