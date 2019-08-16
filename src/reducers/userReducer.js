import { GET_USERS, ADD_USER, DELETE_USER } from '../actions/types';

const initialState = [
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
];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
      };
    case ADD_USER:
      return {
        ...state,
        state: [...state, action.payload],
      };
    case DELETE_USER:
      return {
        ...state,
        state: state.filter(users => users.id !== action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;
