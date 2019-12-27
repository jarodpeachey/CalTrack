import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addMeal, addWorkout } from '../../actions/userActions';
import { Title } from '../Layout/Title';
import WorkoutItemCompressed from '../WorkoutItemCompressed';
import MealItemCompressed from '../MealItemCompressed';

class Dashboard extends Component {
  static propTypes = {
    user: PropTypes.object,
    classes: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {
      workouts: [],
      meals: [],
    };
  }

  componentDidMount () {
    const { calories, meals, workouts } = this.props.user;
    this.setState({
      meals,
      workouts,
      calories,
    });
  }

  componentWillReceiveProps (prevProps) {
    if (prevProps.user.meals !== this.props.user.meals) {
      this.setState({ meals: this.props.user.meals });
    }
    if (prevProps.user.workouts !== this.props.user.workouts) {
      this.setState({ workouts: this.props.user.workouts });
    }
  }

  pushToPage (path) {
    this.props.history.push(`${path}`);
  }

  render () {
    const { classes, user } = this.props;
    const { meals, workouts, calories } = this.state;

    return (
      <>
        {Object.keys(user).length === 0 && user.constructor === Object ? (
          <div className="container">
            <div className="center-text">
              <Card className="card border no-shadow px-sm py-sm mb-sm">
                <h3>You must be logged in to access this page.</h3>
                <Button variant="contained" color="primary" onClick={() => this.pushToPage('/login')}>
                  Go To Login
                </Button>
                <Button variant="contained" color="primary" onClick={() => this.pushToPage('/signup')}>
                  Go To Signup
                </Button>
              </Card>
            </div>
          </div>
        ) : (
          <Wrapper>
            <div className="container py-sm">
              {!meals.length && !workouts.length ? (
                <Card className="card border no-shadow px-sm py-sm mb-sm">
                  <h4 className="m-none mb-xs">
                    Welcome,
                    {` ${user.name}!`}
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
                  {calories.net && (
                    <div className="col col-12">
                      <Card className="card border px-sm pt-lg pb-xxs mb-sm no-shadow position-relative">
                        <Title fullWidth className="title mb-none">
                          Calories
                        </Title>
                        <div className="mt-sm row mobile-lg collection">
                          <div className="col col-4">
                            <CollectionItem>
                              <CalorieNumber>{calories.gained}</CalorieNumber>
                              <CalorieTitle>Calories Gained</CalorieTitle>
                            </CollectionItem>
                          </div>
                          <div className="col col-4">
                            <CollectionItem>
                              <CalorieNumber>{calories.lost}</CalorieNumber>
                              <CalorieTitle>Calories Lost</CalorieTitle>
                            </CollectionItem>
                          </div>
                          <div className="col col-4">
                            <CollectionItem>
                              <CalorieNumber>{calories.net}</CalorieNumber>
                              <CalorieTitle>Net Calories</CalorieTitle>
                            </CollectionItem>
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}
                  <div className="col col-6 py-none">
                    <Card className="card border px-sm pt-lg pb-md mb-sm no-shadow position-relative">
                      <Title fullWidth className="title mb-none">
                        Meals
                      </Title>
                      {meals.length ? (
                        <>
                          <ul className="collection my-md">
                            {meals.map((meal, index) => {
                              if (index <= 2) {
                                return (
                                  <MealItemCompressed
                                    key={`mealItem-${meal.mealID}`}
                                    meal={meal}
                                  />
                                );
                              }
                            })}
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
                      <Title fullWidth className="title mb-none">
                        Workouts
                      </Title>
                      {workouts.length ? (
                        <>
                          <ul className="collection my-md">
                            {workouts.map((workout, index) => {
                              if (index <= 2) {
                                return (
                                  <WorkoutItemCompressed
                                    key={`workoutItem-${workout.workoutID}`}
                                    workout={workout}
                                  />
                                );
                              }
                            })}
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
        )}
      </>
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

const CollectionItem = styled.div`
  background: ${({ theme }) => theme.colors.gray1} !important;
  border-radius: 0px !important;
  margin: 0 !important;
  padding: 16px !important;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  @media(min-width: 540px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding-top: 36px !important;
    padding-bottom: 36px !important;
    height: 100%;
  }
`;

const CalorieTitle = styled.h4`
  text-align: left;
  margin: 0;
  font-weight: bold;
  margin-right: auto;
  font-size: 16px;
  @media (min-width: 540px) {
    text-align: center;
    font-weight: normal;
    font-size: 14px;
    margin: 0 !important;
  }
`;

const CalorieNumber = styled.div`
  margin-left: auto;
  font-size: 16px;
  @media (min-width: 540px) {
    text-align: center;
    font-size: 38px;
    font-weight: normal;
    margin-left: 0;
    margin-bottom: 12px;
  }
`;

export default connect(
  null,
  { addMeal, addWorkout },
)(withStyles(styles)(Dashboard));
