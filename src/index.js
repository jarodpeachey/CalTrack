/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Application from './Application';
import { persistor, store } from './Store';

const history = createBrowserHistory({
  // forceRefresh: true,
});

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
                  testProp="TEST"
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

// history.listen(() => {
//   renderApp();
// });

// window.addEventListener('locationchange', () => {
//   console.log('Location changed to: ', window.location.pathname);
//   renderApp();
// });

// /* These are the modifications: */
// history.pushState = (f => function pushState () {
//   const ret = f.apply(this, arguments);
//   window.dispatchEvent(new Event('pushState'));
//   window.dispatchEvent(new Event('locationchange'));
//   return ret;
// })(history.pushState);

// history.replaceState = (f => function replaceState () {
//   const ret = f.apply(this, arguments);
//   window.dispatchEvent(new Event('replaceState'));
//   window.dispatchEvent(new Event('locationchange'));
//   return ret;
// })(history.replaceState);

// window.addEventListener('popstate', () => {
//   window.dispatchEvent(new Event('locationchange'));
// });

renderApp();
