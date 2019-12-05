import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { withStyles, MenuItem, Menu } from '@material-ui/core';
import Person from '@material-ui/icons/Person';
import { connect } from 'react-redux';
import { removeCurrentUser, deleteUser } from '../actions/userActions';

class Header extends Component {
  static propTypes = {
    classes: PropTypes.object,
    pathname: PropTypes.string,
    history: PropTypes.object,
    showFooterBar: PropTypes.bool,
  };

  constructor (props) {
    super(props);
    this.state = {
      // user: null,
    };
    this.redirectToSignUpPage = this.redirectToSignUpPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount () {}

  shouldComponentUpdate (nextProps, nextState) {
    if (this.props.pathname !== nextProps.pathname) return true;
    if (this.props.showFooterBar !== nextProps.showFooterBar) return true;
    if (this.state.open !== nextState.open) return true;
    if (this.state.anchorEl !== nextState.anchorEl) return true;
    return false;
  }

  redirectToSignUpPage () {
    this.props.history.push('/signup');
  }

  handleClick (event) {
    this.setState({ anchorEl: event.currentTarget, open: true });
  }

  handleClose () {
    this.setState({ anchorEl: null, open: false });
  }

  logout () {
    this.props.removeCurrentUser();

    window.location.href = `${this.props.basename}login`;
  }

  deleteAccount () {
    this.props.deleteUser(this.props.currentUser.id);

    window.location.href = `${this.props.basename}signup`;
  }

  render () {
    const { classes, pathname } = this.props;
    const { anchorEl } = this.state;

    return (
      <span>
        {!this.props.currentUser.username ? (
          <Wrapper>
            <div className="container py-xxs">
              <Row>
                <ColumnOne>
                  <Link to={`${this.props.basename}`}>
                    <BrandName className="m-none">CalTrack</BrandName>
                  </Link>
                </ColumnOne>
                <ColumnTwo>
                  <Link to={`${this.props.basename}signup`}>
                    <Button
                      color="primary"
                      variant="contained"
                      className="mx-none"
                      classes={{ root: classes.navigationButton }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                  <Link to={`${this.props.basename}login`}>
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
                  <Link to={`${this.props.basename}`}>
                    <BrandName className="m-none">CalTrack</BrandName>
                  </Link>
                </ColumnOne>
                <ColumnTwo>
                  <CustomMenu className="menu">
                    <>
                      <CustomMenuItem
                        className="menu-item hidden-below-mobile-lg"
                        active={pathname === '/dashboard'}
                      >
                        <Link to={`${this.props.basename}dashboard`}>
                          Dashboard
                        </Link>
                      </CustomMenuItem>
                      <CustomMenuItem
                        className="menu-item hidden-below-mobile-lg"
                        active={pathname === '/meals'}
                      >
                        <Link to={`${this.props.basename}meals`}>
                          Meals
                        </Link>
                      </CustomMenuItem>
                      <CustomMenuItem
                        className="menu-item hidden-below-mobile-lg"
                        active={pathname === '/workouts'}
                      >
                        <Link to={`${this.props.basename}workouts`}>
                          Workouts
                        </Link>
                      </CustomMenuItem>
                    </>
                    <CustomMenuItem
                      noBorderOnHover
                      aria-controls="simple-menu"
                      onClick={this.handleClick}
                      aria-haspopup="true"
                    >
                      <IconContainer>
                        <Person />
                      </IconContainer>
                    </CustomMenuItem>
                    <Menu
                      id="simple-menu"
                      // keepMounted
                      open={this.state.open}
                      onClose={this.handleClose}
                      elevation={1}
                      getContentAnchorEl={null}
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem onClick={this.logout}>Logout</MenuItem>
                      <MenuItem onClick={this.deleteAccount}>
                        Delete Account
                      </MenuItem>
                    </Menu>
                  </CustomMenu>
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

const CustomMenu = styled.ul`
  list-style: none;
  border-radius: 10px;
`;

const CustomMenuItem = styled.li`
  // padding: 12px !important;
  border-bottom: 1px solid transparent;
  :hover {
    border-bottom: ${(props) =>
      props.noBorderOnHover ? '1px solid transparent' : '1px solid white'};
    background: #037dd0;
    transition-duration: 0.25s;
  }
  font-weight: ${(props) => (props.active ? 'bold' : 400)};
`;

const Wrapper = styled.div`
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

const IconContainer = styled.div`
  background: #077ccb;
  padding: 5px 7px;
  :hover {
    cursor: pointer;
  }
`;

export default connect(null, { removeCurrentUser, deleteUser })(
  withRouter(withStyles(styles)(Header)),
);
