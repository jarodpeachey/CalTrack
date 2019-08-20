import { GET_USERS, ADD_USER, DELETE_USER, GET_CURRENT_USER, SET_CURRENT_USER, ADD_MEAL } from '../actions/types';

const initialState = {
  users: [

  ],
  currentUser: {

  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: state.users,
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.filter(users => users.id !== action.payload),
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        currentUser: state.currentUser,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case ADD_MEAL:
      state.currentUser.meals.push(action.payload);
      state.users.forEach((user) => {
        if (user.id === state.currentUser.id) {
          user.meals.push(action.payload);
        }
      });
      return {
        ...state,
        currentUser: state.currentUser,
        users: state.users,
      };
    default:
      return state;
  }
};

export default userReducer;
