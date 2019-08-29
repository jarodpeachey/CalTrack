import axios from 'axios';
import 'babel-polyfill';
import {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  GET_CURRENT_USER,
  SET_CURRENT_USER,
  ADD_MEAL,
  EDIT_MEAL,
  DELETE_MEAL,
  ADD_WORKOUT,
  EDIT_WORKOUT,
  DELETE_WORKOUT,
  // UPDATE_CALORIES,
} from './types';
// import { persistor } from '../Store';

export const getUsers = () => (dispatch) => {
  dispatch({
    type: GET_USERS,
  });
};

export const getCurrentUser = () => (dispatch) => {
  dispatch({
    type: GET_CURRENT_USER,
  });
};

export const setCurrentUser = user => (dispatch) => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: user,
  });
};

export const addUser = user => (dispatch) => {
  dispatch({
    type: ADD_USER,
    payload: user,
  });
};

export const deleteUser = id => (dispatch) => {
  dispatch({
    type: DELETE_USER,
    payload: id,
  });
};

export const addMeal = newMeal => (dispatch) => {
  dispatch({
    type: ADD_MEAL,
    payload: newMeal,
  });
};

export const editMeal = updatedMeal => (dispatch) => {
  dispatch({
    type: EDIT_MEAL,
    payload: updatedMeal,
  });
};

export const deleteMeal = mealToDelete => (dispatch) => {
  dispatch({
    type: DELETE_MEAL,
    payload: mealToDelete,
  });
};

export const addWorkout = newWorkout => (dispatch) => {
  dispatch({
    type: ADD_WORKOUT,
    payload: newWorkout,
  });
};

export const editWorkout = updatedWorkout => (dispatch) => {
  dispatch({
    type: EDIT_WORKOUT,
    payload: updatedWorkout,
  });
};

export const deleteWorkout = workoutToDelete => (dispatch) => {
  dispatch({
    type: DELETE_WORKOUT,
    payload: workoutToDelete,
  });
};
