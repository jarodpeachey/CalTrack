import axios from 'axios';
import 'babel-polyfill';
import { GET_MEALS, ADD_MEAL, DELETE_MEAL, SET_MEALS } from './types';
import { persistor } from '../Store';

export const getMeals = () => (dispatch) => {
  persistor.purge();
  dispatch({
    type: GET_MEALS,
  });
};

export const addMeal = meal => (dispatch) => {
  persistor.purge();
  dispatch({
    type: ADD_MEAL,
    payload: meal,
  });
};

export const deleteMeal = id => (dispatch) => {
  dispatch({
    type: DELETE_MEAL,
    payload: id,
  });
};

export const setMeals = user => (dispatch) => {
  const { meals } = user;
  dispatch({
    type: SET_MEALS,
    payload: meals,
  });
};
