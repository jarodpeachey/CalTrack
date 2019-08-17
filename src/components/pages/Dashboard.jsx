import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
                <Button fullWidth variant="outlined" color="primary" className="m-none">
                  Add Meal
                </Button>
              </div>
              <div className="col col-6">
                <Button fullWidth variant="outlined" color="primary" className="m-none">
                  Add Workout
                </Button>
              </div>
            </div>
          </Card>
          <div className="row">
            <div className="col col-6 py-none">
              <Card className="card border px-sm py-sm pt-lg mb-sm no-shadow">
                <MealsTitle className="title mb-none">Meals</MealsTitle>
                <ul className="collection">
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
                  color="secondary"
                  className="m-none"
                >
                  See More Meals
                </Button>
              </Card>
            </div>
            <div className="col col-6 py-none">
              <Card className="card border px-sm py-sm pt-lg mb-sm no-shadow">
                <WorkoutsTitle className="title mb-none">
                  Workouts
                </WorkoutsTitle>
                <ul className="collection">
                  <div className="collection-item">
                    <strong>Pushups</strong>
                    <CaloriesCount className="right">
                      -250 calories
                    </CaloriesCount>
                  </div>
                  <div className="collection-item">
                    <strong>Sit-ups</strong>
                    <CaloriesCount className="right">
                      -120 calories
                    </CaloriesCount>
                  </div>
                  <div className="collection-item">
                    <strong>Mile Run</strong>
                    <CaloriesCount className="right">
                      -650 calories
                    </CaloriesCount>
                  </div>
                </ul>
                <Button
                  classes={{ root: classes.button }}
                  color="secondary"
                  className="m-none"
                >
                  See More Workouts
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

const styles = () => ({
  button: {
    fontWeight: 'bold',
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
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
`;

const WorkoutsTitle = styled.h3`
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 8px 16px;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
`;

export default withStyles(styles)(Dashboard);
