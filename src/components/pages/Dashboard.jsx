import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

class Dashboard extends Component {
  static propTypes = {
    users: PropTypes.array,
    currentUser: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount () {

  }

  shouldComponentUpdate () {

  }

  render () {
    console.log('Users: ', this.props.users);
    console.log('Current user: ', this.props.currentUser);

    return (
      <>
        <br />
        <div>
          Hello!
        </div>
      </>
    );
  }
}

export default Dashboard;

