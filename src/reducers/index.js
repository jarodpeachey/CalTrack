// import { combineReducers } from 'redux';
// import { connectRouter } from 'connected-react-router';
import userReducer from './userReducer';
import mealReducer from './mealReducer';
import workoutReducer from './workoutReducer';

const reducers = {
  userReducer,
  mealReducer,
  workoutReducer,
};

export default reducers;
