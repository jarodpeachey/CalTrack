import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Input, Button } from '@material-ui/core';
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import { addMeal } from '../../actions/userActions';

const errorTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff3744',
    },
  },
});

class Meals extends Component {
  static propTypes = {
    // users: this.PropTypes.array,
    classes: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {
      isMobileModeOn: false,
      mealName: '',
      mealCalories: '',
      mealDescription: '',
      mode: 'addMealMode',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCaloriesChange = this.handleCaloriesChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  // componentDidMount () {
  //   this.props.addMeal(meal);
  // }

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
    return false;
  }

  handleNameChange (e) {
    this.setState({ mealName: e.target.value });
  }

  handleCaloriesChange (e) {
    this.setState({ mealCalories: e.target.value });
  }

  handleDescriptionChange (e) {
    this.setState({ mealDescription: e.target.value });
  }

  render () {
    const {
      isMobileModeOn,
      mealName,
      mealCalories,
      mealDescription,
      mode,
    } = this.state;
    const { classes } = this.props;

    let buttonsGroup = '';

    switch (mode) {
      case 'addMealMode':
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
      case 'editMealMode':
        buttonsGroup = (
          <>
            <div className="row">
              <div className="col col-6 pt-none">
                <Button variant="contained" color="primary" className="m-none">
                  Update Meal
                </Button>
                <Button variant="outlined">Cancel</Button>
              </div>
              <div className="col col-6">
                <div className="float-right">
                  <MuiThemeProvider theme={errorTheme}>
                    <Button
                      classes={{ root: classes.deleteButton }}
                      color="primary"
                      className="m-none"
                      // variant="outlined"
                    >
                      Delete Meal
                    </Button>
                  </MuiThemeProvider>
                </div>
              </div>
            </div>
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
        {isMobileModeOn ? (
          <div className="container py-sm">
            <div className="card p-md border no-shadow bg-white">
              <h3 className="title m-none">Add Meal</h3>
              <form action="">
                <Input
                  margin="normal"
                  label="Meal"
                  value={mealName}
                  onChange={this.handleNameChange}
                  placeholder="Meal name..."
                />
              </form>
            </div>
          </div>
        ) : (
          <div className="container py-md">
            <div className="card p-md border no-shadow bg-white">
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
  },
  focusedInput: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
});

export default connect(
  null,
  { addMeal },
)(withStyles(styles)(Meals));
