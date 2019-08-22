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
      mode: 'editMealMode',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount () {
  //   this.props.addMeal(meal);
  // }

  handleChange (e, type) {
    switch (type) {
      case 'name':
        this.setState({ mealName: e.target.value });
        break;
      default:
        console.log('');
        break;
    }
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
          <Button variant="contained" className="m-none" color="primary">
            Add Meal
          </Button>
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
          <Button variant="contained" color="primary">
            Add Meal
          </Button>
        );
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
                  onChange={this.handleChange('name')}
                  placeholder="Meal name..."
                />
              </form>
            </div>
          </div>
        ) : (
          <div className="container py-md">
            <div className="card p-md border no-shadow bg-white">
              <h3 className="title m-none">Add Meal</h3>
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
                      onChange={this.handleChange('name')}
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
                      onChange={this.handleChange('calories')}
                      placeholder="Calories"
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
                      onChange={this.handleChange('description')}
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
