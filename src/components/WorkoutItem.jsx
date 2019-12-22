import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Edit from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { deleteWorkout } from '../actions/userActions';

class WorkoutItem extends Component {
  static propTypes = {
    workout: PropTypes.object,
    classes: PropTypes.object,
    switchToEditWorkoutMode: PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.state = {
      workout: {},
      showInformation: null,
      hasBeenOpened: false,
    };

    this.toggleWorkoutInformation = this.toggleWorkoutInformation.bind(this);
    this.switchToEditWorkoutMode = this.switchToEditWorkoutMode.bind(this);
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
    if (this.state.showInformation !== nextState.showInformation) {
      return true;
    }
    return false;
  }

  toggleWorkoutInformation () {
    const informationBool = this.state.showInformation;

    const { workout } = this.state;

    this.setState({
      showInformation: informationBool === null ? workout.workoutID : null,
      hasBeenOpened: true,
    });
  }

  switchToEditWorkoutMode () {
    const { workout } = this.props;

    console.log("Workout to edit - WorkoutItem.jsx:", workout);

    this.props.switchToEditWorkoutMode(workout);
  }

  render () {
    const { workout, classes } = this.props;
    const { showInformation, hasBeenOpened } = this.state;

    return (
      <>
        {showInformation === workout.workoutID ? (
          <>
            <WorkoutContainer>
              <FlexContainer>
                <Name>{workout.workoutName}</Name>
                <CaloriesCount>
                  {workout.workoutCalories}
                  {' '}
calories
                </CaloriesCount>
                {workout.workoutDescription ? (
                  <IconButton
                    onClick={this.toggleWorkoutInformation}
                    classes={{ root: classes.iconButtonSmall }}
                  >
                    <ArrowDropUp />
                  </IconButton>
                ) : null}
                <CloseIcon>
                  <IconButton
                    onClick={this.switchToEditWorkoutMode}
                    classes={{ root: classes.iconButton }}
                  >
                    <Edit />
                  </IconButton>
                </CloseIcon>
              </FlexContainer>
            </WorkoutContainer>
            {workout.workoutDescription ? (
              <InformationWrapper>
                <Seperator />
                <CollectionItem>{workout.workoutDescription}</CollectionItem>
              </InformationWrapper>
            ) : null}
          </>
        ) : (
          <>
            <WorkoutContainerOutlined>
              <FlexContainer>
                <Name>{workout.workoutName}</Name>
                <CaloriesCount>
                  {workout.workoutCalories}
                  {' '}
calories
                </CaloriesCount>
                {workout.workoutDescription ? (
                  <IconButton
                    onClick={this.toggleWorkoutInformation}
                    classes={{ root: classes.iconButtonSmall }}
                  >
                    <ArrowDropDown />
                  </IconButton>
                ) : null}
                <CloseIcon>
                  <IconButton
                    onClick={this.switchToEditWorkoutMode}
                    classes={{ root: classes.iconButton }}
                  >
                    <Edit />
                  </IconButton>
                </CloseIcon>
              </FlexContainer>
            </WorkoutContainerOutlined>
            {hasBeenOpened && workout.workoutDescription ? (
              <InformationWrapperGhost>
                <Seperator />
                <CollectionItem>{workout.workoutDescription}</CollectionItem>
              </InformationWrapperGhost>
            ) : (
              <Outline />
            )}
          </>
        )}
      </>
    );
  }
}

const styles = () => ({
  iconButton: {
    padding: 10,
  },
  iconButtonSmall: {
    padding: 2,
    marginLeft: 4,
  },
});

const slideDown = keyframes`
  0% {
    height: 0px;
    overflow: hidden;
    padding-bottom: 0;
    padding-top: 0;
    margin-bottom: 0;
    margin-top: 0;
  }
  30% {
    height: 5px;
  }
  50% {
    height: 20px;
  }
  100% {
    height: auto;
    overflow: hidden;
  }
`;

const slideUp = keyframes`
  0% {
    height: auto;
    overflow: hidden;
  }
  50% {
    height: 5px;
  }
  100% {
    height: 0px;
    overflow: hidden;
    padding-bottom: 0;
    padding-top: 0;
    margin-bottom: 0;
    margin-top: 0;
  }
`;

const CaloriesCount = styled.span`
  color: #888;
  margin: none;
  margin-left: 6px;
`;

const WorkoutContainer = styled.div`
  border: 1px solid #ddd;
  border-bottom: none;
  padding: 8px 16px;
  margin: 12px 0 0;
  position: relative;
  z-index: 99;
  background: white;
`;

const WorkoutContainerOutlined = styled.div`
  border: 1px solid #ddd;
  border-bottom: none;
  padding: 8px 16px;
  margin: 12px 0 0;
`;

const FlexContainer = styled.div`
  align-items: center;
  justify-content: flex-start;
  display: flex;
`;

const Name = styled.h4`
  font-weight: bold;
  margin: 0;
`;

const CloseIcon = styled.div`
  margin-left: auto;
  font-weight: 10px;
`;

const InformationWrapper = styled.div`
  border: 1px solid #ddd;
  border-top: none;
  padding: 8px 16px;
  padding-top: 8px;
  animation-name: ${slideDown};
  animation-duration: 0.4s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  margin-bottom: 0;
  width: 100%;
  z-index: -2;
`;

const InformationWrapperGhost = styled.div`
  border: 1px solid #ddd;
  border-top: none;
  padding: 8px 16px;
  padding-top: 8px;
  animation-name: ${slideUp};
  animation-duration: 0.4s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  margin-bottom: 0;
  width: 100%;
  z-index: -2;
`;

const Seperator = styled.div`
  height: 2px;
  display: block;
  content: '';
  background: ${({ theme }) => theme.colors.primary};
  width: 100%;
  margin: -8px auto 16px;
`;

const Outline = styled.div`
  width: 100%;
  height: 1px;
  border-top: 1px solid #ddd;
  margin: 0;
  padding; 0;
  z-index: 999;
`;

const CollectionItem = styled.div`
  background: #f7f7f7;
  margin: 8px 0;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export default connect(
  null,
  { deleteWorkout },
)(withStyles(styles)(WorkoutItem));
