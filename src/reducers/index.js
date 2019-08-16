import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userReducer from './userReducer';

const rootReducer = history => combineReducers({
  userReducer,
  router: connectRouter(history),
});

export default rootReducer;
