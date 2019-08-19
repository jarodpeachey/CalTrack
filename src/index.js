/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Application from './Application';
import { persistor, store } from './Store';

ReactDOM.render(
  <>
    <Provider store={store}>
      <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
        <Router>
          <Route component={Application} />
        </Router>
      </PersistGate>
    </Provider>
  </>, document.getElementById('app'),
);
