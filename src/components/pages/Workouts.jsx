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
import { addWorkout } from '../../actions/userActions';
import { sortByUserId } from '../../utils/arrayFormat';
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
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCaloriesChange = this.handleCaloriesChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.clearNoWorkoutsNotification = this.clearNoWorkoutsNotification.bind(this);
    this.editWorkout = this.editWorkout.bind(this);
  }

  componentDidMount () {
    this.setState({ workouts: this.props.currentUser.workouts });
  }

  componentWillReceiveProps (prevProps) {
    if (prevProps.currentUser.workouts !== this.props.currentUser.workouts) {
      this.setState({ workouts: this.props.currentUser.workouts });
    }
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
    let date = new Date();
    date = {
      month: date.getMonth(),
      day: date.getDay(),
      date: date.getDate(),
      year: date.getFullYear(),
    };

    let id = 1;
    if (this.state.workouts.length) {
      const sortedWorkouts = sortByUserId(this.state.workouts);

      id = sortedWorkouts[sortedWorkouts.length - 1].id + 1;
    }

    console.log(date);

    const workout = {
      id,
      name: workoutName,
      calories: workoutCalories,
      description: workoutDescription,
      date,
    };

    if (workoutName !== '' && workoutCalories !== 0) {
      this.props.addWorkout(workout);

      const newWorkoutsArray = this.state.workouts;

      newWorkoutsArray.push(workout);
      this.setState({
        workouts: newWorkoutsArray,
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

  editWorkout (id) {
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
            <Button variant="contained" color="primary" className="m-none">
              Update Workout
            </Button>
            <Button variant="outlined" className="my-none">
              Cancel
            </Button>
            <MuiThemeProvider theme={errorTheme}>
              <Button color="primary" className="m-none float-right">
                Delete Workout
              </Button>
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
          <div className="card p-md mb-lg border no-shadow bg-white">
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
          {!this.state.workouts.length && this.state.displayNoWorkoutsNotif ? (
            <Card className="card no-shadow bg-white p-sm display-flex align-left v-align-center">
              <h4 className="m-none">There are no workouts yet, add a workout!</h4>
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
          ) : (
            <div className="card p-md mb-lg border no-shadow bg-white">
              <Title>Workouts</Title>
              <ul>
                {workouts.map(workout => (
                  <WorkoutItem workout={workout} editWorkout={this.editWorkout} />
                ))}
              </ul>
            </div>
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
    // transform: 'translateY(10)',
    position: 'relative',
    bottom: 16,
  },
});

const Card = styled.div`
  border: 1px solid #ddd;
`;

export default connect(
  null,
  { addWorkout },
)(withStyles(styles)(Workouts));
