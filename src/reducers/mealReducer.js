import { GET_MEALS, ADD_MEAL, DELETE_MEAL, SET_MEALS } from '../actions/types';

const initialState = {
  meals: [

  ],
};

const mealReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MEALS:
      return {
        ...state,
        meals: state.meals,
      };
    case SET_MEALS:
      return {
        ...state,
        meals: action.payload,
      };
    case ADD_MEAL:
      return {
        ...state,
        meals: [...state.meals, action.payload],
      };
    case DELETE_MEAL:
      return {
        ...state,
        meals: state.filter(meals => meals.id !== action.payload),
      };
    default:
      return state;
  }
};

export default mealReducer;
