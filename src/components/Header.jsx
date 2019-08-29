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
    const { classes, pathname } = this.props;

    return (
      <span>
        {pathname === '/' ||
        pathname === '/signup' ||
        pathname === '/login' ||
        pathname === '/welcome' ? (
          <Wrapper>
            <div className="container py-xxs">
              <Row>
                <ColumnOne>
                  <Link to="/">
                    <BrandName className="m-none">CalTrack</BrandName>
                  </Link>
                </ColumnOne>
                <ColumnTwo>
                  <Link to="/signup">
                    <Button
                      color="primary"
                      variant="contained"
                      className="mx-none"
                      classes={{ root: classes.navigationButton }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button
                      color="primary"
                      variant="contained"
                      className="mx-none"
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
              <div className="container py-xxs">
                <Row>
                  <ColumnOne>
                    <Link to="/">
                      <BrandName className="m-none">CalTrack</BrandName>
                    </Link>
                  </ColumnOne>
                  <ColumnTwo>
                    <Menu className="menu">
                      <MenuItem className="menu-item" active={pathname === '/meals'}>
                        <Link to="/meals">
                          {/* <Button
                          color="primary"
                          variant="contained"
                          className="mx-none"
                          classes={
                            pathname === '/meals' ?
                              { root: classes.navigationButtonActive } :
                              { root: classes.navigationButton }
                          }
                          > */}
                        Meals
                          {/* </Button> */}
                        </Link>
                      </MenuItem>
                      <MenuItem className="menu-item" active={pathname === '/workouts'}>
                        <Link to="/workouts">
                          {/* <Button
                          color="primary"
                          variant="contained"
                          className="mx-none"
                          classes={
                            pathname === '/workouts' ?
                              { root: classes.navigationButtonActive } :
                              { root: classes.navigationButton }
                          }
                          > */}
                        Workouts
                          {/* </Button> */}
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

const styles = () => ({
  navigationButton: {
    color: 'white',
    boxShadow: 'none !important',
  },
});

const Menu = styled.ul`
  list-style: none;
  border-radius: 10px;
`;

const MenuItem = styled.li`
  // padding: 12px !important;
  border-bottom: 1px solid transparent;
  :hover {
    border-bottom: 1px solid white;
    background: #037dd0;
    transition-duration: 0.25s;
  }
  font-weight: ${props => (props.active ? 'bold' : 400)};
`;

const Wrapper = styled.div`
  position: absolute;
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

const BrandName = styled.h1`
  color: white !important;
`;

export default withRouter(withStyles(styles)(Header));
