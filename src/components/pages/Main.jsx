import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export class Main extends Component {
  render () {
    return (
      <Wrapper>
        <div className="container">
          <Title>CalTrack App</Title>
          <SubTitle>CalTrack is the number one fitness and calorie tracking app on the market. Over 1,000,000 people don't lie.</SubTitle>
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.main};
`;

const Title = styled.h1`
  text-align: center;
  font-weight: bold;
  color: white;
  margin-bottom: ${({theme}) => theme.spacing.lg};
`;

const SubTitle = styled.h5`
  color: white;
  text-align: center;
`;

export default Main;

