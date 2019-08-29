import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Edit from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { deleteMeal } from '../actions/userActions';

class MealItemCompressed extends Component {
  static propTypes = {
    meal: PropTypes.object,
    classes: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {
      meal: {},
      hover: false,
    };

    this.setHoverTrue = this.setHoverTrue.bind(this);
    this.setHoverFalse = this.setHoverFalse.bind(this);
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
    const { meal, classes } = this.props;
    const { hover } = this.state;

    return (
      <CollectionItem
        onMouseEnter={this.setHoverTrue}
        onMouseLeave={this.setHoverFalse}
      >
        <strong>{meal.name}</strong>
        <div className="float-right">
          {hover ? (
            <IconButton classes={{ root: classes.iconButton }}>
              <Edit />
            </IconButton>
          ) : (
            <CaloriesCount>
              {meal.calories}
              {' '}
calories
            </CaloriesCount>
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
  { deleteMeal },
)(withStyles(styles)(MealItemCompressed));
