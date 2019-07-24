import { combineReducers } from 'redux';
import contactReducer from './userReducer';

export default combineReducers({
  contacts: contactReducer,
});
