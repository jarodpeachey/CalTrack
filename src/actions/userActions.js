import axios from 'axios';
import 'babel-polyfill';
import { GET_USERS, ADD_USER, DELETE_USER, GET_CURRENT_USER, SET_CURRENT_USER } from './types';
// import { persistor } from '../Store';

export const getUsers = () => (dispatch) => {
  // persistor.purge();
  dispatch({
    type: GET_USERS,
  });
};

export const getCurrentUser = () => (dispatch) => {
  // persistor.purge();
  dispatch({
    type: GET_CURRENT_USER,
  });
};

export const setCurrentUser = user => (dispatch) => {
  // persistor.purge();
  dispatch({
    type: SET_CURRENT_USER,
    payload: user,
  });
};

export const addUser = user => (dispatch) => {
  // persistor.purge();
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
