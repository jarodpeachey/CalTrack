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
} from '../actions/types';

const initialState = {
  users: [],
  currentUser: {},
};

const addArrayItem = (array, newItem) => {
  const newArray = [...array];

  newArray.push(newItem);

  return [...newArray];
};

const updateArrayItem = (array, newItem) => {
  const newArray = [...array];

  return newArray.map((item) => {
    if (item.id !== newItem.id) {
      return item;
    }

    return {
      ...item,
      ...newItem,
    };
  });
};

const removeArrayItem = (array, id) => {
  const newArray = [...array];

  return newArray.filter(item => item.id !== id);
};

const addMealOrWorkoutToUser = (state, newItem, type) => {
  const newUsersArray = [...state.users];

  const updatedUsersArray = newUsersArray.map((user) => {
    if (user.id === state.currentUser.id) {
      if (type === 'meals') {
        return {
          ...user,
          meals: addArrayItem(user.meals, newItem),
        };
      } else {
        return {
          ...user,
          workouts: addArrayItem(user.workouts, newItem),
        };
      }
    } else {
      return {
        ...user,
      };
    }
  });

  return [...updatedUsersArray];
};

const updateMealOrWorkoutInUser = (state, newItem, type) => {
  const newUsersArray = [...state.users];

  const updatedUsersArray = newUsersArray.map((user) => {
    if (user.id === state.currentUser.id) {
      if (type === 'meals') {
        return {
          ...user,
          meals: updateArrayItem(user.meals, newItem),
        };
      } else {
        return {
          ...user,
          workouts: updateArrayItem(user.workouts, newItem),
        };
      }
    } else {
      return {
        ...user,
      };
    }
  });

  return [...updatedUsersArray];
};

const removeMealOrWorkoutInUser = (state, id, type) => {
  const newUsersArray = [...state.users];
  const updatedUsersArray = newUsersArray.map((user) => {
    if (user.id === state.currentUser.id) {
      if (type === 'meals') {
        return {
          ...user,
          meals: removeArrayItem(user.meals, id),
        };
      } else {
        return {
          ...user,
          workouts: removeArrayItem(user.workouts, id),
        };
      }
    } else {
      return {
        ...user,
      };
    }
  });

  return [...updatedUsersArray];
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
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          meals: addArrayItem([...state.currentUser.meals], action.payload),
        },
        users: addMealOrWorkoutToUser(state, action.payload, 'meals'),
      };
    case EDIT_MEAL:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          meals: updateArrayItem([...state.currentUser.meals], action.payload),
        },
        users: updateMealOrWorkoutInUser(state, action.payload, 'meals'),
      };
    case DELETE_MEAL:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          meals: removeArrayItem([...state.currentUser.meals], action.payload),
        },
        users: removeMealOrWorkoutInUser(state, action.payload, 'meals'),
      };
    case ADD_WORKOUT:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          workouts: addArrayItem([...state.currentUser.workouts], action.payload),
        },
        users: addMealOrWorkoutToUser(state, action.payload, 'workouts'),
      };
    case EDIT_WORKOUT:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          workouts: updateArrayItem([...state.currentUser.workouts], action.payload),
        },
        users: updateMealOrWorkoutInUser(state, action.payload, 'workouts'),
      };
    case DELETE_WORKOUT:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          workouts: removeArrayItem([...state.currentUser.workouts], action.payload),
        },
        users: removeMealOrWorkoutInUser(state, action.payload, 'workouts'),
      };
    default:
      return state;
  }
};

export default userReducer;
