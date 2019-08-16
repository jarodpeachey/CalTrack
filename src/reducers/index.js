import { combineReducers } from 'redux';
// import { connectRouter } from 'connected-react-router';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
