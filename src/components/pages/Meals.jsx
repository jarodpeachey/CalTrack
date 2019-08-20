import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addMeal } from '../../actions/mealActions';

class Meals extends Component {
  static propTypes = {
    // users: this.PropTypes.array,
  };

  constructor (props) {
    super(props);
    this.state = {

    };
  }

  // componentDidMount () {
  //   this.props.addMeal(meal);
  // }


  render () {
    return (
      <h1>This is the meals page</h1>
    );
  }
}

export default connect(null, { addMeal })(Meals);


