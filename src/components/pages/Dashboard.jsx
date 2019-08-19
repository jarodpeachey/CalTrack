import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


class Dashboard extends Component {
  static propTypes = {
    users: PropTypes.array,
    currentUser: PropTypes.object,
    classes: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {}

  shouldComponentUpdate () {}

  render () {
    const { classes, currentUser } = this.props;

    return (
      <Wrapper>
        <div className="container py-sm">
          {!currentUser.meals && !currentUser.workouts ? (
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
              {currentUser.meals ? (
                <div className={currentUser.workouts ? 'col col-6 py-none' : 'col col-12'}>
                  <Card className="card border px-sm pt-lg pb-md mb-sm no-shadow position-relative">
                    <MealsTitle className="title mb-none">Meals</MealsTitle>
                    <ul className="collection mb-md">
                      <div className="collection-item">
                        <strong>Chicken and Rice</strong>
                        <CaloriesCount className="right">
                          300 calories
                        </CaloriesCount>
                      </div>
                      <div className="collection-item">
                        <strong>Smoothie</strong>
                        <CaloriesCount className="right">
                          215 calories
                        </CaloriesCount>
                      </div>
                      <div className="collection-item">
                        <strong>Cookie</strong>
                        <CaloriesCount className="right">
                          100 calories
                        </CaloriesCount>
                      </div>
                    </ul>
                    <Button
                      classes={{ root: classes.button }}
                      color="primary"
                      className="m-none"
                    >
                      See More Meals
                    </Button>
                  </Card>
                </div>
              ) : null}
              {currentUser.workouts ? (
                <div className={currentUser.meals ? 'col col-6 py-none' : 'col col-12'}>
                  <Card className="card border px-sm pt-lg pb-md mb-sm no-shadow position-relative">
                    <MealsTitle className="title mb-none">Workouts</MealsTitle>
                    <ul className="collection mb-md">
                      <div className="collection-item">
                        <strong>Pushups</strong>
                        <CaloriesCount className="right">
                          -150 calories
                        </CaloriesCount>
                      </div>
                      <div className="collection-item">
                        <strong>Situps</strong>
                        <CaloriesCount className="right">
                          -325 calories
                        </CaloriesCount>
                      </div>
                      <div className="collection-item">
                        <strong>Mile Run</strong>
                        <CaloriesCount className="right">
                          -765 calories
                        </CaloriesCount>
                      </div>
                    </ul>
                    <Button
                      classes={{ root: classes.button }}
                      color="primary"
                      className="m-none"
                    >
                      See More Workouts
                    </Button>
                  </Card>
                </div>
              ) : null}
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
  padding-top: 80px;
`;

const Card = styled.div`
  background: white;
  position: relative;
`;

const CaloriesCount = styled.em`
  color: ${({ theme }) => theme.colors.gray5};
`;

const MealsTitle = styled.h3`
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 8px 16px;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
`;

const WorkoutsTitle = styled.h3`
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 8px 16px;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
`;

export default withStyles(styles)(Dashboard);
