import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
    return (
      <Wrapper>
        <div className="container py-sm">
          <Card className="card border">
            <div className="center-text">
              <h3 className="title m-none">
                Meals
              </h3>
            </div>
          </Card>
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  padding-top: 80px;
`;

const Card = styled.div`
  background: white;
`;

export default Dashboard;

