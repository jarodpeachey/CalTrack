/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Application from './Application';
import { persistor, store } from './Store';

render(
  <>
    <Provider store={store}>
      <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
        <Application />
      </PersistGate>
    </Provider>
  </>, document.getElementById('app'),
);
