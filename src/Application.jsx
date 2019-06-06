import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './components/Header';
import mainDataControl from './data';

class Application extends Component {
  static propTypes = {

  };

  constructor (props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount () {
    
  }

  shouldComponentUpdate () {

  }

  render () {
    console.log(mainDataControl.getCurrentUser);
    
    return (
      <div>Stuff</div>
    );
  }
}

