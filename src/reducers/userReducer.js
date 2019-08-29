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
} from '../actions/types';

const initialState = {
  users: [],
  currentUser: {},
};

const addArrayItem = (array, newItem) => {
  const newArray = [...array];

  newArray.push(newItem);

  return [
    ...newArray,
  ];
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

const addMealInUsersArray = (state, newItem) => {
  const newUsersArray = [...state.users];

  const updatedUsersArray = newUsersArray.map((user) => {
    if (user.id === state.currentUser.id) {
      return {
        ...user,
        meals: addArrayItem(user.meals, newItem),
      };
    } else {
      return {
        ...user,
      };
    };
  });

  return [
    ...updatedUsersArray,
  ];
}

const updateMealInUsersArray = (state, newItem) => {
  const newUsersArray = [...state.users];

  const updatedUsersArray = newUsersArray.map((user) => {
    if (user.id === state.currentUser.id) {
      return {
        ...user,
        meals: updateArrayItem(user.meals, newItem),
      };
    } else {
      return {
        ...user,
      };
    }
  });

  return [
    ...updatedUsersArray,
  ];
};

const removeMealInUsersArray = (state, id) => {
  const newUsersArray = [...state.users];
  const updatedUsersArray = newUsersArray.map((user) => {
    if (user.id === state.currentUser.id) {
      return {
        ...user,
        meals: removeArrayItem(user.meals, id),
      };
    } else {
      return {
        ...user,
      };
    }
  });

  return [
    ...updatedUsersArray,
  ];
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
      // const newUsersMeals = [...state.users];

      // newUsersMeals.forEach((user) => {
      //   if (user.id === state.currentUser.id) {
      //     user.meals.push(action.payload);
      //   }
      // });

      // return {
      //   ...state,
      //   currentUser: {
      //     ...state.currentUser,
      //     meals: [...state.currentUser.meals, action.payload],
      //   },
      //   users: newUsersMeals,
      // };
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          meals: addArrayItem([...state.currentUser.meals], action.payload),
        },
        users: addMealInUsersArray(state, action.payload),
      };
    case EDIT_MEAL:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          meals: updateArrayItem([...state.currentUser.meals], action.payload),
        },
        users: updateMealInUsersArray(state, action.payload),
      };
    case DELETE_MEAL:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          meals: removeArrayItem([...state.currentUser.meals], action.payload),
        },
        users: removeMealInUsersArray(state, action.payload),
      };
    case ADD_WORKOUT:
      const newCurrentUserWorkouts = [...state.currentUser.workouts];
      newCurrentUserWorkouts.push(action.payload);

      const newUserWorkouts = [...state.users];
      newUserWorkouts.forEach((user) => {
        if (user.id === state.currentUser.id) {
          user.workouts.push(action.payload);
        }
      });

      const updatedCurrentUserWorkouts = {
        ...state.currentUser,
        workouts: newCurrentUserWorkouts,
      };

      return {
        ...state,
        currentUser: updatedCurrentUserWorkouts,
        users: newUserWorkouts,
      };
    case DELETE_WORKOUT:
      state.currentUser.workouts.filter(
        workouts => workouts.id !== action.payload.id,
      );
      state.users.forEach((user) => {
        if (user.id === state.currentUser.id) {
          user.workouts.filter(workouts => workouts.id !== action.payload.id);
        }
      });
      return {
        ...state,
        users: state.users,
        currentUser: state.currentUser,
      };
    default:
      return state;
  }
};

export default userReducer;
