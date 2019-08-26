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
import { addMeal } from '../../actions/userActions';
import { sortByUserId } from '../../utils/arrayFormat';
import { Title } from '../Layout/Title';
import MealItem from '../MealItem';

const errorTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff3744',
    },
  },
});

class Meals extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    classes: PropTypes.object,
    addMeal: PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.state = {
      meals: [],
      // isMobileModeOn: false,
      mealName: '',
      mealCalories: '',
      mealDescription: '',
      mode: 'addMealMode',
      displayNoMealsNotif: true,
      submitButtonActive: false,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCaloriesChange = this.handleCaloriesChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.clearNoMealsNotification = this.clearNoMealsNotification.bind(this);
    this.editMeal = this.editMeal.bind(this);
  }

  componentDidMount () {
    this.setState({ meals: this.props.currentUser.meals });
  }

  componentWillReceiveProps (prevProps) {
    if (prevProps.currentUser.meals !== this.props.currentUser.meals) {
      this.setState({ meals: this.props.currentUser.meals });
    }
  }

  shouldComponentUpdate (nextState) {
    if (this.state.mealName !== nextState.mealName) {
      return true;
    }
    if (this.state.mealCalories !== nextState.mealCalories) {
      return true;
    }
    if (this.state.mealDescription !== nextState.mealDescription) {
      return true;
    }
    if (this.state.meals !== nextState.meals) {
      return true;
    }
    return false;
  }

  handleNameChange (e) {
    this.setState({ mealName: e.target.value });
    if (this.state.mealCalories !== '' && e.target.value !== '') {
      this.setState({ submitButtonActive: true });
    } else {
      this.setState({ submitButtonActive: false });
    }
  }

  handleCaloriesChange (e) {
    this.setState({ mealCalories: e.target.value });
    if (this.state.mealName !== '' && e.target.value !== '') {
      this.setState({ submitButtonActive: true });
    } else {
      this.setState({ submitButtonActive: false });
    }
  }

  handleDescriptionChange (e) {
    this.setState({ mealDescription: e.target.value });
  }

  submitForm () {
    const { mealName, mealCalories, mealDescription } = this.state;
    let date = new Date();
    date = {
      month: date.getMonth(),
      day: date.getDay(),
      date: date.getDate(),
      year: date.getFullYear(),
    };

    let id = 1;
    if (this.state.meals.length) {
      const sortedMeals = sortByUserId(this.state.meals);

      id = sortedMeals[sortedMeals.length - 1].id + 1;
    }

    console.log(date);

    const meal = {
      id,
      name: mealName,
      calories: mealCalories,
      description: mealDescription,
      date,
    };

    if (mealName !== '' && mealCalories !== 0) {
      this.props.addMeal(meal);

      const newMealsArray = this.state.meals;

      newMealsArray.push(meal);
      this.setState({
        meals: newMealsArray,
        mealName: '',
        mealCalories: '',
        mealDescription: '',
      });
    } else {
      alert('Please fill in all the fields');
    }
  }

  clearNoMealsNotification () {
    this.setState({ displayNoMealsNotif: false });
  }

  editMeal (id) {
    let mealToEdit = {};

    this.state.meals.forEach((meal) => {
      if (meal.id === id) {
        mealToEdit = meal;
      }
    });

    this.setState({
      mealName: mealToEdit.name,
      mealCalories: mealToEdit.calories,
      mealDescription: mealToEdit.description,
      mode: 'editMealMode',
    });
  }

  render () {
    const {
      // isMobileModeOn,
      mealName,
      mealCalories,
      mealDescription,
      mode,
      meals,
      submitButtonActive,
    } = this.state;
    const { classes } = this.props;

    let buttonsGroup = '';

    switch (mode) {
      case 'addMealMode':
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
                Add Meal
              </Button>
            </div>
          </div>
        );
        break;
      case 'editMealMode':
        buttonsGroup = (
          <>
            <Button variant="contained" color="primary" className="m-none">
              Update Meal
            </Button>
            <Button variant="outlined" className="my-none">
              Cancel
            </Button>
            <MuiThemeProvider theme={errorTheme}>
              <Button color="primary" className="m-none float-right">
                Delete Meal
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
                Add Meal
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
              {mode === 'addMealMode' ? 'Add Meal' : 'Edit Meal'}
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
                    label="Meal Name"
                    value={mealName}
                    onChange={this.handleNameChange}
                    placeholder="Meal name..."
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
                    value={mealCalories}
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
                    value={mealDescription}
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
          {this.state.meals.length ? (
            <div className="card p-md mb-lg border no-shadow bg-white">
              <Title>Meals</Title>
              <ul>
                {meals.map(meal => (
                  <MealItem
                    meal={meal}
                    editMeal={this.editMeal}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <>
              {this.state.displayNoMealsNotif && (
                <Card className="card no-shadow bg-white p-sm display-flex align-left v-align-center">
                  <h4 className="m-none">
                    There are no meals yet, add a meal!
                  </h4>
                  <Tooltip
                    classes={{ tooltip: classes.toolTip }}
                    title="Dismiss"
                    TransitionComponent={Grow}
                  >
                    <IconButton
                      onClick={this.clearNoMealsNotification}
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
  { addMeal },
)(withStyles(styles)(Meals));
