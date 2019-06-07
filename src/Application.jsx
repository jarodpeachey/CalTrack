import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Header from './components/Header';

class Application extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  constructor (props) {
    super(props);
    this.state = {
      
    };
  }

  // componentDidMount () {
    
  // }

  // shouldComponentUpdate () {

  // }

  render () {
    let header;
    const { pathname } = window.location;

    if (
      pathname === '/meals' ||
      pathname === '/workouts' ||
      pathname === '/dashboard'
    ) {
      header = <Header />;
    } else {
      header = <Header welcomePageActive />;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col col-12">
            {/* {header} */}

            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Application;

