import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { withRouter, Link } from 'react-router-dom';

class Main extends Component {
  static propTypes = {
    // users: this.PropTypes.array,
  };

  constructor (props) {
    super(props);
    this.state = {

    };
  }

  render () {
    return (
      <Wrapper>
        <div className="container py-none">
          <Title>CalTrack App</Title>
          <SubTitle>CalTrack is a simple, easy app to track your calories gained and burned. Try it today!</SubTitle>
        </div>
        <ButtonContainer>
          <Link to="/signup">
            <Button
              color="primary"
              variant="contained"
              className="mx-none"
            >
              Try It
            </Button>
          </Link>
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
  height: 100%;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: bold;
  font-family: raleway;
  font-size: 2.8rem;
  color: #333;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  letter-spacing: 4px;
`;

const SubTitle = styled.h4`
  color: #333;
  text-align: center;
  line-height: 2rem;
  font-family: raleway;
  font-weight: normal;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
`;

export default withRouter(Main);

