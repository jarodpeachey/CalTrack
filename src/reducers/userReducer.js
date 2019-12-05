import {
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
  REMOVE_CURRENT_USER,
  // UPDATE_CALORIES,
} from '../actions/types';

const initialState = {
  currentUser: {},
};

const updateCalories = (state, type, actionPayload) => {
  let currentUserCalories = { ...state.currentUser.calories };

  const currentUserMeals = [...state.currentUser.meals];
  const currentUserWorkouts = [...state.currentUser.workouts];

  let { gained, lost, net } = currentUserCalories;

  switch (type) {
    case 'addMeal':
      gained += actionPayload.calories;
      break;
    case 'editMeal':
      currentUserMeals.forEach((meal) => {
        if (meal.id === actionPayload.id) {
          gained -= meal.calories;
        }
      });
      gained += actionPayload.calories;
      break;
    case 'deleteMeal':
      currentUserMeals.forEach((meal) => {
        if (meal.id === actionPayload.id) {
          gained -= meal.calories;
        }
      });
      break;
    case 'addWorkout':
      lost += actionPayload.calories;
      break;
    case 'editWorkout':
      currentUserWorkouts.forEach((workout) => {
        if (workout.id === actionPayload.id) {
          lost -= workout.calories;
        }
      });
      lost += actionPayload.calories;
      break;
    case 'deleteWorkout':
      currentUserWorkouts.forEach((workout) => {
        if (workout.id === actionPayload.id) {
          lost -= workout.calories;
        }
      });
      break;
    default:
      gained = gained;
  }

  net = gained - lost;

  currentUserCalories = {
    net,
    gained,
    lost,
  };

  return {
    ...currentUserCalories,
  };
};

const addArrayItem = (array, newItem) => {
  const newArray = [...array];

  newArray.push(newItem);

  return [...newArray];
};

const updateArrayItem = (array, updatedItem) => {
  const newArray = [...array];

  return newArray.map((item) => {
    if (item.id !== updatedItem.id) {
      return item;
    }

    return {
      ...item,
      ...updatedItem,
    };
  });
};

const removeArrayItem = (array, id) => {
  const newArray = [...array];

  return newArray.filter(item => item.id !== id);
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case DELETE_USER:
      return {
        ...state,
        currentUser: {},
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
    case REMOVE_CURRENT_USER:
      return {
        ...state,
        currentUser: {},
      };
    case ADD_MEAL:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          meals: addArrayItem([...state.currentUser.meals], action.payload),
          calories: updateCalories(state, 'addMeal', action.payload),
        },
      };
    case EDIT_MEAL:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          meals: updateArrayItem([...state.currentUser.meals], action.payload),
          calories: updateCalories(state, 'editMeal', action.payload),
        },
      };
    case DELETE_MEAL:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          meals: removeArrayItem([...state.currentUser.meals], action.payload.id),
          calories: updateCalories(state, 'deleteMeal', action.payload),
        },
      };
    case ADD_WORKOUT:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          workouts: addArrayItem([...state.currentUser.workouts], action.payload),
          calories: updateCalories(state, 'addWorkout', action.payload),
        },
      };
    case EDIT_WORKOUT:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          workouts: updateArrayItem([...state.currentUser.workouts], action.payload),
          calories: updateCalories(state, 'editWorkout', action.payload),
        },
      };
    case DELETE_WORKOUT:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          workouts: removeArrayItem([...state.currentUser.workouts], action.payload.id),
          calories: updateCalories(state, 'deleteWorkout', action.payload),
        },
      };
    default:
      return state;
  }
};

export default userReducer;
