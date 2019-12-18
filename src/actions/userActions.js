import axios from 'axios';
import 'babel-polyfill';
import {
  GET_USER,
  SET_USER,
  ADD_MEAL,
  EDIT_MEAL,
  DELETE_MEAL,
  ADD_WORKOUT,
  EDIT_WORKOUT,
  DELETE_WORKOUT,
  REMOVE_USER,
  UPDATE_USER,
  // UPDATE_CALORIES,
} from './types';
// import { persistor } from '../Store';

export const getUser = () => (dispatch) => {
  dispatch({
    type: GET_USER,
  });
};

export const setUser = user => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
};

export const removeUser = () => (dispatch) => {
  dispatch({
    type: REMOVE_USER,
  });
};

export const updateUser = () => (dispatch) => {
  dispatch({
    type: UPDATE_USER,
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
