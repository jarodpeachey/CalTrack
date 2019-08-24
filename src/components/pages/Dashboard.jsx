import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addMeal, addWorkout } from '../../actions/userActions';

class Dashboard extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    classes: PropTypes.object,
    // addMeal: PropTypes.func,
    // addWorkout: PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.state = {
      workouts: [],
      meals: [],
    };

    // this.addMealToLocalState = this.addMealToLocalState.bind(this);
    // this.addWorkoutToLocalState = this.addWorkoutToLocalState.bind(this);
  }

  componentDidMount () {
    this.setState({
      meals: this.props.currentUser.meals,
      workouts: this.props.currentUser.workouts,
    });
  }

  componentWillReceiveProps (prevProps) {
    if (prevProps.currentUser.meals !== this.props.currentUser.meals) {
      this.setState({ meals: this.props.currentUser.meals });
    }
    if (prevProps.currentUser.workouts !== this.props.currentUser.workouts) {
      this.setState({ workouts: this.props.currentUser.workouts });
    }
  }

  shouldComponentUpdate (nextState) {
    if (this.state.meals !== nextState.meals) {
      return true;
    }
    if (this.state.workouts !== nextState.workouts) {
      return true;
    }
    return false;
  }

  // addMealToLocalState () {
  //   const meal = {
  //     id: 1,
  //     name: 'Chicken and Rice',
  //     calories: 350,
  //   };

  //   this.props.addMeal(meal);

  //   const newMealsArray = this.state.meals;

  //   newMealsArray.push(meal);
  //   this.setState({ meals: newMealsArray });

  //   console.log('New meal is added: ', meal);
  // }

  // addWorkoutToLocalState () {
  //   const workout = {
  //     id: 1,
  //     name: 'Pushups',
  //     calories: -500,
  //   };

  //   this.props.addWorkout(workout);

  //   const newWorkoutsArray = this.state.workouts;

  //   newWorkoutsArray.push(workout);
  //   this.setState({ workouts: newWorkoutsArray });

  //   console.log('New workout is added: ', workout);
  // }

  render () {
    const { classes, currentUser } = this.props;
    const { meals, workouts } = this.state;

    console.log('Meals: ', meals);
    console.log('Workouts: ', workouts);

    return (
      <Wrapper>
        <div className="container py-sm">
          {!meals.length && !workouts.length ? (
            <Card className="card border no-shadow px-sm py-sm mb-sm">
              <h4 className="m-none mb-xs">
                Welcome,
                {` ${currentUser.name}!`}
              </h4>
              <p className="m-none">
                Get started with CalTrack by adding a meal or a workout!
              </p>
              <div className="row mobile">
                <div className="col col-6">
                  <Link to="/meals">
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className="m-none"
                    >
                      Add Meal
                    </Button>
                  </Link>
                </div>
                <div className="col col-6">
                  <Link to="/workouts">
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className="m-none"
                    >
                      Add Workout
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ) : (
            <div className="row">
              <div className="col col-6 py-none">
                <Card className="card border px-sm pt-lg pb-md mb-sm no-shadow position-relative">
                  <Title className="title mb-none">Meals</Title>
                  {meals.length ? (
                    <>
                      <ul className="collection mb-md">
                        {meals.map(meal => (
                          <div className="collection-item">
                            <strong>{meal.name}</strong>
                            <div className="right">
                              <CaloriesCount>
                                {meal.calories}
                                {' '}
calories
                              </CaloriesCount>
                            </div>
                          </div>
                        ))}
                      </ul>
                      <Link to="/meals">
                        <Button
                          classes={{ root: classes.button }}
                          color="primary"
                          className="m-none"
                        >
                          See More Meals
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <div className="center-text">
                      <h4 className="mt-sm">There are no meals! Eat up!</h4>
                      <Link to="/meals">
                        <Button
                          variant="contained"
                          color="primary"
                          className="m-none"
                        >
                          Add Meal
                        </Button>
                      </Link>
                    </div>
                  )}
                </Card>
              </div>
              <div className="col col-6 py-none">
                <Card className="card border px-sm pt-lg pb-md mb-sm no-shadow position-relative">
                  <Title className="title mb-none">Workouts</Title>
                  {workouts.length ? (
                    <>
                      <ul className="collection mb-md">
                        {workouts.map(workout => (
                          <div className="collection-item">
                            <strong>{workout.name}</strong>
                            <div className="right">
                              <CaloriesCount>
                                {workout.calories}
                                {' '}
calories
                              </CaloriesCount>
                            </div>
                          </div>
                        ))}
                      </ul>
                      <Link to="/workouts">
                        <Button
                          classes={{ root: classes.button }}
                          color="primary"
                          className="m-none"
                        >
                          See More Workouts
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <div className="center-text">
                      <h4 className="mt-sm">
                        There are no workouts! Get cracking!!
                      </h4>
                      <Link to="/workouts">
                        <Button
                          variant="contained"
                          color="primary"
                          className="m-none"
                        >
                          Add Workout
                        </Button>
                      </Link>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          )}
        </div>
      </Wrapper>
    );
  }
}

const styles = () => ({
  button: {
    width: 'calc(100% + 1px)',
    position: 'absolute',
    left: -0.5,
    bottom: 0,
    borderRadius: 2,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTop: '1px solid #ddd',
  },
});

const Wrapper = styled.div`
  padding-top: 20px;
`;

const Card = styled.div`
  background: white;
  position: relative;
`;

const CaloriesCount = styled.em`
  color: ${({ theme }) => theme.colors.gray5};
`;

const Title = styled.h3`
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 8px 16px;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
`;

export default connect(
  null,
  { addMeal, addWorkout },
)(withStyles(styles)(Dashboard));
