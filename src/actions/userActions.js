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
  DELETE_WORKOUT,
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

export const addMeal = meal => (dispatch) => {
  dispatch({
    type: ADD_MEAL,
    payload: meal,
  });
};

export const editMeal = newMeal => (dispatch) => {
  dispatch({
    type: EDIT_MEAL,
    payload: newMeal,
  });
};

export const deleteMeal = meal => (dispatch) => {
  dispatch({
    type: DELETE_MEAL,
    payload: meal,
  });
};

export const addWorkout = workout => (dispatch) => {
  dispatch({
    type: ADD_WORKOUT,
    payload: workout,
  });
};

export const deleteWorkout = workout => (dispatch) => {
  dispatch({
    type: DELETE_WORKOUT,
    payload: workout,
  });
};
