/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';
import {
  browserHistory, Router,
} from 'react-router';
// import { useScroll } from 'react-router-scroll';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import muiTheme from './mui-theme';
import styledTheme from './styled-theme';
import routes from './Routes';

function startApp () {
  render(
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={styledTheme}>
        <Router
          history={browserHistory}
        >
          {routes()}
        </Router>
      </ThemeProvider>
    </MuiThemeProvider>, document.getElementById('app'),
  );
}

startApp();
