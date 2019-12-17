import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Edit from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { deleteWorkout } from '../actions/userActions';

class WorkoutItemCompressed extends Component {
  static propTypes = {
    workout: PropTypes.object,
    classes: PropTypes.object,
    editWorkout: PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.state = {
      workout: {},
      hover: false,
    };

    this.setHoverTrue = this.setHoverTrue.bind(this);
    this.setHoverFalse = this.setHoverFalse.bind(this);
  }

  componentDidMount () {
    this.setState({ workout: this.props.workout });
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ workout: nextProps.workout });
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.state.workout !== nextState.workout) {
      return true;
    }
    if (this.state.hover !== nextState.hover) {
      return true;
    }
    return false;
  }

  setHoverTrue () {
    this.setState({ hover: true });
  }

  setHoverFalse () {
    this.setState({ hover: false });
  }

  render () {
    const { workout, classes } = this.props;
    const { hover } = this.state;

    return (
      <CollectionItem
        onMouseEnter={this.setHoverTrue}
        onMouseLeave={this.setHoverFalse}
      >
        <strong>{workout.workoutName}</strong>
        <div className="float-right">
          {hover ? (
            <Link
              to={{
                pathname: '/workouts',
                state: {
                  workoutToEdit: workout,
                },
              }}
            >
              <IconButton classes={{ root: classes.iconButton }}>
                <Edit />
              </IconButton>
            </Link>
          ) : (
            <Link
              to={{
                pathname: '/workouts',
                state: {
                  workoutToEdit: workout,
                },
              }}
            >
              <CaloriesCount>
                {workout.workoutCalories}
                {' '}
calories
              </CaloriesCount>
            </Link>
          )}
        </div>
      </CollectionItem>
    );
  }
}

const styles = () => ({
  iconButton: {
    padding: 6,
  },
});

const CaloriesCount = styled.em`
  color: ${({ theme }) => theme.colors.gray5};
`;

const CollectionItem = styled.li`
  border: 1px solid ${({ theme }) => theme.colors.gray3} !important;
  margin: 10px 0 !important;
  padding: 0 16px !important;
  height: 50px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
`;

export default connect(
  null,
  { deleteWorkout },
)(withStyles(styles)(WorkoutItemCompressed));
