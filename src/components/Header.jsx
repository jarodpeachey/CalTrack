import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';

class Header extends Component {
  static propTypes = {
    classes: PropTypes.object,
    pathname: PropTypes.string,
    history: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {
      // user: null,
    };
    this.redirectToSignUpPage = this.redirectToSignUpPage.bind(this);
  }

  componentDidMount () {}

  shouldComponentUpdate (nextProps) {
    if (this.props.pathname !== nextProps.pathname) {
      return true;
    }

    return false;
  }

  redirectToSignUpPage () {
    this.props.history.push('/signup');
  }

  render () {
    const { classes } = this.props;

    return (
      <span>
        {this.props.pathname === '/' || this.props.pathname === '/signup' ? (
          <Wrapper>
            <div className="container py-xs">
              <Row>
                <ColumnOne>
                  <Link to="/">
                    <BrandName className="m-none">CalTrack</BrandName>
                  </Link>
                </ColumnOne>
                <ColumnTwo>
                  {/* <Link to="/signup"> */}
                  <Button
                    color="primary"
                    variant="contained"
                    classes={{ root: classes.navigationButton }}
                    onClick={this.redirectToSignUpPage}
                  >
                    Sign Up
                  </Button>
                  {/* </Link> */}
                  <Link to="/login">
                    <Button
                      color="primary"
                      variant="contained"
                      classes={{ root: classes.navigationButton }}
                    >
                      Log In
                    </Button>
                  </Link>
                </ColumnTwo>
              </Row>
            </div>
          </Wrapper>
        ) : (
          <Wrapper>
            <div className="container py-xs">
              <Row>
                <ColumnOne>
                  <Link to="/">
                    <BrandName className="m-none">CalTrack</BrandName>
                  </Link>
                </ColumnOne>
                <ColumnTwo>
                  <Menu>
                    <MenuItem>
                      <Link to="/meals">Meals</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/workouts">Workouts</Link>
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

const styles = () => ({
  navigationButton: {
    color: 'white',
    boxShadow: 'none !important',
  },
});

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  background: ${({ theme }) => theme.colors.primary} !important;
  color: white !important;
  width: 100%;
  padding: 0;
  box-shadow: 0 20px 40px -25px #666;
  z-index: 999 !important;
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

export default withRouter(withStyles(styles)(Header));
