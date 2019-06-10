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
      <ButtonContainer>
        <Button
          color="primary"
          variant="contained"
        >
          Try It
        </Button>
        <Button
          color="primary"
          variant="contained"
        >
          Learn More
        </Button>
      </ButtonContainer>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: bold;
  font-size: 2.8rem;
  color: #333;
  margin-bottom: ${({theme}) => theme.spacing.md};
`;

const SubTitle = styled.h3`
  color: #333;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
`;

export default Main;

