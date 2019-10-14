import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class FooterBar extends Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  constructor (props) {
    super(props);
    this.state = {};

    this.getSelectedTab = this.getSelectedTab.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {}

  shouldComponentUpdate (nextProps) {
    if (this.props.pathname !== nextProps.pathname) {
      return true;
    }
    return false;
  }

  getSelectedTab = () => {
    const { pathname } = this.props;
    if (pathname.includes('/dashboard')) return 0;
    if (pathname.includes('/meals')) return 1;
    if (pathname.includes('/workouts')) return 2;
    return -1;
  };

  handleChange = (event, value) => {
    switch (value) {
      case 0:
        return this.props.history.push('/dashboard');
      case 1:
        return this.props.history.push('/meals');
      case 2:
        return this.props.history.push('/workouts');
      default:
        return null;
    }
  };

  render () {
    const { classes } = this.props;

    return (
      <BottomNavigation
        value={this.getSelectedTab()}
        onChange={this.handleChange}
        showLabels
        classes={{ root: classes.root }}
        className="hidden-above-mobile-lg"
      >
        <BottomNavigationAction
          title="Dashboard"
          classes={{ root: classes.actionItem }}
          showLabel
          icon={<FontAwesomeIcon icon="th-large" />}
        />
        <BottomNavigationAction
          title="Meals"
          classes={{ root: classes.actionItem }}
          showLabel
          icon={<FontAwesomeIcon icon="hamburger" />}
        />
        <BottomNavigationAction
          title="Workous"
          classes={{ root: classes.actionItem }}
          showLabel
          icon={<FontAwesomeIcon icon="dumbbell" />}
        />
      </BottomNavigation>
    );
  }
}

const styles = theme => ({
  root: {
    position: 'fixed',
    bottom: 0,
    // background: [theme.palette.primary.main],
    width: '100%',
    // boxShadow: '0 -10px 20px -12.5px #ccc',
    borderTop: '2px solid #ddd',
    zIndex: '999 !important',
    padding: '0',
  },
  actionItem: {
    // color: 'white !important',
    fontSize: 20,
    fontWeight: 'normal',
  },
});

export default withTheme(withStyles(styles)(FooterBar));
