import axios from 'axios';
import 'babel-polyfill';
import { GET_WORKOUTS, ADD_WORKOUT, DELETE_WORKOUT, SET_WORKOUTS } from './types';
// import { persistor } from '../Store';

export const getWorkouts = () => (dispatch) => {
  // persistor.purge();
  dispatch({
    type: GET_WORKOUTS,
  });
};

export const addWorkout = workout => (dispatch) => {
  // persistor.purge();
  dispatch({
    type: ADD_WORKOUT,
    payload: workout,
  });
};

export const deleteWorkout = id => (dispatch) => {
  dispatch({
    type: DELETE_WORKOUT,
    payload: id,
  });
};

export const setWorkouts = workouts => (dispatch) => {
  dispatch({
    type: SET_WORKOUTS,
    payload: workouts,
  });
};
