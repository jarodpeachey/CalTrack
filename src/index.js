/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import routes from './components/Routes';
import muiTheme from './mui-theme';
import styledTheme from './styled-theme';

function startApp () {
  render(
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={styledTheme}>
        <Router>
          {routes()}
        </Router>
      </ThemeProvider>
    </MuiThemeProvider>, document.getElementById('app'),
  );
}

startApp();
