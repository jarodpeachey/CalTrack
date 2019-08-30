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
  REMOVE_CURRENT_USER,
  // UPDATE_CALORIES,
} from '../actions/types';

const initialState = {
  users: [],
  currentUser: {},
};

const updateCalories = (state, type, actionPayload) => {
  let currentUserCalories = { ...state.currentUser.calories };

  const currentUserMeals = [...state.currentUser.meals];
  const currentUserWorkouts = [...state.currentUser.workouts];

  let { caloriesGained, caloriesBurned, netCalories } = currentUserCalories;

  switch (type) {
    case 'addMeal':
      caloriesGained += actionPayload.calories;
      break;
    case 'editMeal':
      currentUserMeals.forEach((meal) => {
        if (meal.id === actionPayload.id) {
          caloriesGained -= meal.calories;
        }
      });
      caloriesGained += actionPayload.calories;
      break;
    case 'deleteMeal':
      currentUserMeals.forEach((meal) => {
        if (meal.id === actionPayload.id) {
          caloriesGained -= meal.calories;
        }
      });
      break;
    case 'addWorkout':
      caloriesBurned += actionPayload.calories;
      break;
    case 'editWorkout':
      currentUserWorkouts.forEach((workout) => {
        if (workout.id === actionPayload.id) {
          caloriesBurned -= workout.calories;
        }
      });
      caloriesBurned += actionPayload.calories;
      break;
    case 'deleteWorkout':
      currentUserWorkouts.forEach((workout) => {
        if (workout.id === actionPayload.id) {
          caloriesBurned -= workout.calories;
        }
      });
      break;
    default:
      caloriesGained = caloriesGained;
  }

  netCalories = caloriesGained - caloriesBurned;

  currentUserCalories = {
    netCalories,
    caloriesGained,
    caloriesBurned,
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

const addMealOrWorkoutToUser = (state, newItem, type) => {
  const newUsersArray = [...state.users];

  const updatedUsersArray = newUsersArray.map((user) => {
    if (user.id === state.currentUser.id) {
      if (type === 'meals') {
        return {
          ...user,
          meals: addArrayItem(user.meals, newItem),
          calories: updateCalories(state, 'addMeal', newItem),
        };
      } else {
        return {
          ...user,
          workouts: addArrayItem(user.workouts, newItem),
          calories: updateCalories(state, 'addWorkout', newItem),
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

const updateMealOrWorkoutInUser = (state, updatedItem, type) => {
  const newUsersArray = [...state.users];

  const updatedUsersArray = newUsersArray.map((user) => {
    if (user.id === state.currentUser.id) {
      if (type === 'meals') {
        return {
          ...user,
          meals: updateArrayItem(user.meals, updatedItem),
          calories: updateCalories(state, 'editMeal', updatedItem),
        };
      } else {
        return {
          ...user,
          workouts: updateArrayItem(user.workouts, updatedItem),
          calories: updateCalories(state, 'editWorkout', updatedItem),
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

const removeMealOrWorkoutInUser = (state, id, type, itemToRemove) => {
  const newUsersArray = [...state.users];
  const updatedUsersArray = newUsersArray.map((user) => {
    if (user.id === state.currentUser.id) {
      if (type === 'meals') {
        return {
          ...user,
          meals: removeArrayItem(user.meals, id),
          calories: updateCalories(state, 'deleteMeal', itemToRemove),
        };
      } else {
        return {
          ...user,
          workouts: removeArrayItem(user.workouts, id),
          calories: updateCalories(state, 'deleteWorkout', itemToRemove),
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
        users: removeArrayItem([...state.users], action.payload),
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
      }
    case ADD_MEAL:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          meals: addArrayItem([...state.currentUser.meals], action.payload),
          calories: updateCalories(state, 'addMeal', action.payload),
        },
        users: addMealOrWorkoutToUser(state, action.payload, 'meals'),
      };
    case EDIT_MEAL:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          meals: updateArrayItem([...state.currentUser.meals], action.payload),
          calories: updateCalories(state, 'editMeal', action.payload),
        },
        users: updateMealOrWorkoutInUser(state, action.payload, 'meals'),
      };
    case DELETE_MEAL:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          meals: removeArrayItem([...state.currentUser.meals], action.payload.id),
          calories: updateCalories(state, 'deleteMeal', action.payload),
        },
        users: removeMealOrWorkoutInUser(state, action.payload.id, 'meals', action.payload),
      };
    case ADD_WORKOUT:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          workouts: addArrayItem([...state.currentUser.workouts], action.payload),
          calories: updateCalories(state, 'addWorkout', action.payload),
        },
        users: addMealOrWorkoutToUser(state, action.payload, 'workouts'),
      };
    case EDIT_WORKOUT:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          workouts: updateArrayItem([...state.currentUser.workouts], action.payload),
          calories: updateCalories(state, 'editWorkout', action.payload),
        },
        users: updateMealOrWorkoutInUser(state, action.payload, 'workouts'),
      };
    case DELETE_WORKOUT:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          workouts: removeArrayItem([...state.currentUser.workouts], action.payload.id),
          calories: updateCalories(state, 'deleteWorkout', action.payload),
        },
        users: removeMealOrWorkoutInUser(state, action.payload.id, 'workouts', action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;
