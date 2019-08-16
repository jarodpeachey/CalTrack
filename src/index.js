/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Application from './Application';
import configureStore, { history } from './configureStore';

const store = configureStore();

render(
  <>
    <Provider store={store}>
      <Application history={history} />
    </Provider>
  </>, document.getElementById('app'),
);
