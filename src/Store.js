import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// import { createBrowserHistory } from 'history';
import reducers from './reducers';

const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistCombinedReducers = persistCombineReducers(persistConfig, reducers);

export const store = createStore(
  persistCombinedReducers,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  ),
);

export const persistor = persistStore(store);
