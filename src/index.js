/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Application from './Application';
import store from './Store';

render(
  <>
    <Provider store={store}>
      <Application />
    </Provider>
  </>, document.getElementById('app'),
);
