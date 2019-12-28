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
  addMeal,
  editMeal,
  deleteMeal,
  updateUser,
} from '../../actions/userActions';
// import { sortByDate } from '../../utils/arrayFormat';
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
    user: PropTypes.object,
    classes: PropTypes.object,
    addMeal: PropTypes.func,
    editMeal: PropTypes.func,
    deleteMeal: PropTypes.func,
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
      mealToEdit: {},
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCaloriesChange = this.handleCaloriesChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.clearNoMealsNotification = this.clearNoMealsNotification.bind(this);
    this.switchToEditMealMode = this.switchToEditMealMode.bind(this);
    this.clearEditMode = this.clearEditMode.bind(this);
    this.editMeal = this.editMeal.bind(this);
    this.deleteMeal = this.deleteMeal.bind(this);
  }

  componentDidMount () {
    if (
      Object.keys(this.props.user).length === 0 &&
      this.props.user.constructor === Object
    ) {
      this.setState({ meals: []});
    } else {
      this.setState({ meals: this.props.user.meals });
    }

    if (this.props.location.state) {
      const { mealToEdit } = this.props.location.state;
      this.setState({
        mealName: mealToEdit.mealName,
        mealCalories: mealToEdit.mealCalories,
        mealDescription: mealToEdit.mealDescription,
        mode: 'editMealMode',
        mealToEdit,
      });
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ meals: nextProps.user.meals });
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

    if (mealName !== '' && mealCalories !== '') {
      const bodyFormData = new FormData();
      bodyFormData.set('mealName', mealName);
      bodyFormData.set('mealCalories', mealCalories);
      bodyFormData.set('mealDescription', mealDescription);

      axios({
        method: 'POST',
        url: `${this.props.apiURL}/users/${this.props.user.userID}/meals`,
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
              mainMessage: 'Success! Your meal has been added.',
            });

            this.props.addMeal(res.data.meal);
            // this.props.updateUser();
          } else {
            this.setState({
              mainMessageType: 'error',
              mainMessage:
                'There was an error adding your meal. Check your internet connection.',
            });
          }
        })
        .catch((err) => {
          console.log('Error: ', err);
        });
      this.setState({
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

  switchToEditMealMode (mealToEdit) {
    console.log('Meal to edit - Meals.jsx:', mealToEdit);

    this.setState({
      mealName: mealToEdit.mealName,
      mealCalories: mealToEdit.mealCalories,
      mealDescription: mealToEdit.mealDescription,
      mode: 'editMealMode',
      mealToEdit,
    });
  }

  clearEditMode () {
    this.setState({
      mealName: '',
      mealCalories: '',
      mealDescription: '',
      mode: 'addMealMode',
      mealToEdit: {},
    });
  }

  editMeal () {
    const { mealName, mealDescription, mealCalories, mealToEdit } = this.state;

    const mealToSendToAPI = {
      mealName,
      mealCalories,
      mealDescription,
    };

    const mealToUpdateStore = {
      ...mealToSendToAPI,
      mealID: mealToEdit.mealID,
      userID: mealToEdit.userID,
    };

    if (mealName !== '' && mealCalories !== '') {
      axios({
        method: 'PUT',
        url: `${this.props.apiURL}/users/${this.props.user.userID}/meals/${mealToEdit.mealID}`,
        config: {
          headers: { 'Content-Type': 'application/json' },
        },
        data: { ...mealToSendToAPI },
      })
        .then((res) => {
          console.log('Sent! Response: ', res);
          if (res.data.success) {
            this.setState({
              mainMessageType: 'success',
              mainMessage: 'Success! Your meal has been edited.',
            });

            this.props.editMeal(mealToUpdateStore);
            // this.props.updatseUser();
          } else {
            this.setState({
              mainMessageType: 'error',
              mainMessage:
                'There was an error updating your meal. Check your internet connection.',
            });
          }
        })
        .catch((err) => {
          console.log('Error: ', err);
        });

      this.setState({
        mealName: '',
        mealCalories: '',
        mealDescription: '',
        mode: 'addMealMode',
        mealToEdit: {},
      });
    } else {
      alert('Please fill in all the fields');
    }
  }

  deleteMeal () {
    const {
      mealToEdit: { mealID },
    } = this.state;

    axios({
      method: 'DELETE',
      url: `${this.props.apiURL}/meals/${mealID}`,
      config: {
        headers: { 'Content-Type': 'application/json' },
      },
    })
      .then((res) => {
        console.log('Sent! Response: ', res);
        if (res.data.success) {
          this.setState({
            mainMessageType: 'success',
            mainMessage: 'Success! Your meal has been deleted.',
          });

          this.props.deleteMeal(mealID);
          // this.props.updatseUser();
        } else {
          this.setState({
            mainMessageType: 'error',
            mainMessage:
              'There was an error deleting your meal. Check your internet connection.',
          });
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      });

    this.setState({
      mealName: '',
      mealCalories: '',
      mealDescription: '',
      mode: 'addMealMode',
      mealToEdit: {},
    });
  }

  pushToPage (path) {
    this.props.history.push(`${path}`);
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
    const { classes, user } = this.props;

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
            <Button
              variant="contained"
              color="primary"
              className="m-none"
              onClick={this.editMeal}
            >
              <MobileUpdateButton className="hidden-above-mobile-lg m-none full-width">
                <Check />
              </MobileUpdateButton>
              <span className="hidden-below-mobile-lg">Update Meal</span>
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
                  onClick={this.deleteMeal}
                  color="primary"
                  className="m-none"
                  classes={{ root: classes.deleteButton }}
                >
                  <Delete />
                </IconButton>
              </div>
              <div className="hidden-below-mobile-lg float-right">
                <Button
                  onClick={this.deleteMeal}
                  color="primary"
                  className="m-none"
                >
                  Delete Meal
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
                Add Meal
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
              <div className="card p-md mb-md border no-shadow bg-white">
                <Title>Meals</Title>
                <ul>
                  {meals.map(meal => (
                    <MealItem
                      key={`mealItem-${meal.mealID}`}
                      meal={meal}
                      switchToEditMealMode={mealToEdit => this.switchToEditMealMode(mealToEdit)
                      }
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

export default connect(null, { addMeal, editMeal, deleteMeal, updateUser })(
  withStyles(styles)(Meals),
);
