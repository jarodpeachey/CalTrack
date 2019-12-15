/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Application from './Application';
import { persistor, store } from './Store';
import './style.css';

const history = createBrowserHistory({
  // forceRefresh: true,
});

const apiURL = process.env.NODE_ENV === 'development' ? 'http://localhost/caltrack_db/api' : '';

const renderApp = () => {
  ReactDOM.render(
    <>
      <Provider store={store}>
        <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
          <Router history={history}>
            <Route
              render={props => (
                <Application
                  {...props}
                  apiURL={apiURL}
                />
              )}
            />
          </Router>
          {/* <Application /> */}
        </PersistGate>
      </Provider>
    </>,
    document.getElementById('app'),
  );
};

renderApp();
