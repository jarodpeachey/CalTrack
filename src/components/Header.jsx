import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router';
import { getCurrentUser } from '../data';

class Header extends Component {
  static propTypes = {
    welcomePageActive: PropTypes.bool,
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

  shouldComponentUpdate () {

  }

  render () {
    return (
      <span>
        {this.props.welcomePageActive ? (
          <Wrapper>
            <div className="container py-none">
              <Row>
                <ColumnOne>
                  <Link to="/">
                    <BrandName>
                      CalTrack
                    </BrandName>
                  </Link>
                </ColumnOne>
                <ColumnTwo>
                  <Link to="/signup">
                    <Button size="small" color="secondary">
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="small" color="secondary" variant="outlined">
                      Log In
                    </Button>
                  </Link>
                </ColumnTwo>
              </Row>
            </div>
          </Wrapper>
        ) : (
          <Wrapper>
            <div className="container py-none">
              <Row>
                <ColumnOne>
                  <Link to="/">
                    <BrandName>
                      CalTrack
                    </BrandName>
                  </Link>
                </ColumnOne>
                <ColumnTwo>
                  <Menu>
                    <MenuItem>
                      <Link to="/meals">
                        1
                      </Link>
                    </MenuItem>
                  </Menu>
                </ColumnTwo>
              </Row>
            </div>
          </Wrapper>
        )}
      </span>
    );
  }
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  background: ${({ theme }) => theme.colors.main};
  color: white;
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ColumnOne = styled.div`
  width: fit-content;
`;

const ColumnTwo = styled.div`
  flex: 1 1 0;
  display: flex;
  justify-content: flex-end;
`;

const Menu = styled.ul`
  list-style: none;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

const MenuItem = styled.li`
  width: fit-content:
`;

const BrandName = styled.h1`
  color: white !important;
`;

export default Header;

