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

// Create history object for React
const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

console.log("Window location host: ", window.location.host);
console.log(process.env.NODE_ENV);

const baseURL = window.location.host === 'localhost' ? '/CalTrackReact/' : '/';

const renderApp = () => {
  ReactDOM.render(
    <>
      <Provider store={store}>
        <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
          <Router history={history} basename={baseURL}>
            <Route
              render={(props) => <Application {...props} basename={baseURL} />}
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
