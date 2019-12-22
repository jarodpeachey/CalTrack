import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Edit from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { deleteMeal } from '../actions/userActions';

class MealItem extends Component {
  static propTypes = {
    meal: PropTypes.object,
    classes: PropTypes.object,
    switchToEditMealMode: PropTypes.func,
  };

  constructor (props) {
    super(props);
    this.state = {
      meal: {},
      showInformation: null,
      hasBeenOpened: false,
    };

    this.toggleMealInformation = this.toggleMealInformation.bind(this);
    this.switchToEditMealMode = this.switchToEditMealMode.bind(this);
  }

  componentDidMount () {
    this.setState({ meal: this.props.meal });
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ meal: nextProps.meal });
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.state.meal !== nextState.meal) {
      return true;
    }
    if (this.state.showInformation !== nextState.showInformation) {
      return true;
    }
    return false;
  }

  toggleMealInformation () {
    const informationBool = this.state.showInformation;

    const { meal } = this.state;

    this.setState({
      showInformation: informationBool === null ? meal.mealID : null,
      hasBeenOpened: true,
    });
  }

  switchToEditMealMode () {
    const { meal } = this.props;

    console.log("Meal to edit - MealItem.jsx:", meal);

    this.props.switchToEditMealMode(meal);
  }

  render () {
    const { meal, classes } = this.props;
    const { showInformation, hasBeenOpened } = this.state;

    return (
      <>
        {showInformation === meal.mealID ? (
          <>
            <MealContainer>
              <FlexContainer>
                <Name>{meal.mealName}</Name>
                <CaloriesCount>
                  {meal.mealCalories}
                  {' '}
calories
                </CaloriesCount>
                {meal.mealDescription ? (
                  <IconButton
                    onClick={this.toggleMealInformation}
                    classes={{ root: classes.iconButtonSmall }}
                  >
                    <ArrowDropUp />
                  </IconButton>
                ) : null}
                <CloseIcon>
                  <IconButton
                    onClick={this.switchToEditMealMode}
                    classes={{ root: classes.iconButton }}
                  >
                    <Edit />
                  </IconButton>
                </CloseIcon>
              </FlexContainer>
            </MealContainer>
            {meal.mealDescription ? (
              <InformationWrapper>
                <Seperator />
                <CollectionItem>{meal.mealDescription}</CollectionItem>
              </InformationWrapper>
            ) : null}
          </>
        ) : (
          <>
            <MealContainerOutlined>
              <FlexContainer>
                <Name>{meal.mealName}</Name>
                <CaloriesCount>
                  {meal.mealCalories}
                  {' '}
calories
                </CaloriesCount>
                {meal.mealDescription ? (
                  <IconButton
                    onClick={this.toggleMealInformation}
                    classes={{ root: classes.iconButtonSmall }}
                  >
                    <ArrowDropDown />
                  </IconButton>
                ) : null}
                <CloseIcon>
                  <IconButton
                    onClick={this.switchToEditMealMode}
                    classes={{ root: classes.iconButton }}
                  >
                    <Edit />
                  </IconButton>
                </CloseIcon>
              </FlexContainer>
            </MealContainerOutlined>
            {hasBeenOpened && meal.mealDescription ? (
              <InformationWrapperGhost>
                <Seperator />
                <CollectionItem>{meal.mealDescription}</CollectionItem>
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

const MealContainer = styled.div`
  border: 1px solid #ddd;
  border-bottom: none;
  padding: 8px 16px;
  margin: 12px 0 0;
  position: relative;
  z-index: 99;
  background: white;
`;

const MealContainerOutlined = styled.div`
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
  { deleteMeal },
)(withStyles(styles)(MealItem));
