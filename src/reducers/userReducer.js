import { GET_USERS, ADD_USER, DELETE_USER, GET_CURRENT_USER } from '../actions/types';

const initialState = {
  users: [
    {
      id: 1,
      name: 'Jarod Peachey',
      username: 'jwpeachey',
      password: 'ilovechickens',
    },
    {
      id: 2,
      name: 'Makenna Peachey',
      username: 'mmpeachey',
      password: 'ilovedogs',
    },
  ],
  currentUser: {
    id: 1,
    name: 'Jarod Peachey',
    username: 'jwpeachey',
    password: 'ilovechickens',
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
    default:
      return state;
  }
};

export default userReducer;
