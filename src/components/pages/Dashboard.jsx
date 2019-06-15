import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getCurrentUser } from '../../data';

class Dashboard extends Component {
  static propTypes = {

  };

  constructor (props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount () {
    const currentUser = getCurrentUser();

    this.setState({ user: currentUser });
  }

  shouldComponentUpdate (nextState) {
    if (this.state.user !== nextState.user) {
      return true;
    }
    return false;
  }

  render () {
    console.log(this.state.user);
    return (
      <div>
        Hello!
      </div>
    );
  }
}

export default Dashboard;

