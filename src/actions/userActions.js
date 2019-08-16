import axios from 'axios';
import 'babel-polyfill';
import { GET_USERS, ADD_USER, DELETE_USER, GET_CURRENT_USER } from './types';

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

export const addUser = (id, name, username, password) => (dispatch) => {
  const user = {
    id,
    name,
    username,
    password,
  };

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
