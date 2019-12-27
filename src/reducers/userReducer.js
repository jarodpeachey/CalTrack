import axios from 'axios';
import {
  GET_USER,
  SET_USER,
  UPDATE_USER,
  ADD_MEAL,
  EDIT_MEAL,
  DELETE_MEAL,
  ADD_WORKOUT,
  EDIT_WORKOUT,
  DELETE_WORKOUT,
  REMOVE_USER,
  // UPDATE_CALORIES,
} from '../actions/types';

const initialState = {
  user: {},
};

const updateCalories = (state, type, actionPayload) => {
  let userCalories = { ...state.user.calories };

  const userMeals = [...state.user.meals];
  const userWorkouts = [...state.user.workouts];

  let { gained, lost, net } = userCalories;

  switch (type) {
    case 'addMeal':
      gained += actionPayload.calories;
      break;
    case 'editMeal':
      userMeals.forEach((meal) => {
        if (meal.mealID === actionPayload.id) {
          gained -= meal.mealCalories;
        }
      });
      gained += actionPayload.calories;
      break;
    case 'deleteMeal':
      userMeals.forEach((meal) => {
        if (meal.mealID === actionPayload.id) {
          gained -= meal.mealCalories;
        }
      });
      break;
    case 'addWorkout':
      lost += actionPayload.calories;
      break;
    case 'editWorkout':
      userWorkouts.forEach((workout) => {
        if (workout.workoutID === actionPayload.id) {
          lost -= workout.workoutCalories;
        }
      });
      lost += actionPayload.calories;
      break;
    case 'deleteWorkout':
      userWorkouts.forEach((workout) => {
        if (workout.workoutID === actionPayload.id) {
          lost -= workout.workoutCalories;
        }
      });
      break;
    default:
      gained = gained;
  }

  net = gained - lost;

  userCalories = {
    net,
    gained,
    lost,
  };

  return {
    ...userCalories,
  };
};

const addArrayItem = (array, newItem) => {
  const newArray = [...array];

  newArray.push(newItem);

  return [...newArray];
};

const updateMealItem = (array, updatedItem) => {
  const newArray = [...array];

  console.log("UpdatedItem: ", updatedItem);

  return newArray.map((item) => {
    if (item.mealID !== updatedItem.mealID) {
      return item;
    }

    return {
      ...item,
      ...updatedItem,
    };
  });
};

const updateWorkoutItem = (array, updatedItem) => {
  const newArray = [...array];

  return newArray.map((item) => {
    if (item.workoutID !== updatedItem.workoutID) {
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

const getUpdatedUserFromAPI = (userID) => {
  let user = {};

  axios({
    method: 'GET',
    url: `${this.props.apiURL}/users/get.php`,
    config: {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  })
    .then((res) => {
      user = res.data.user;
    })
    .catch((err) => {
      console.log('Error.', err);
    });

  return user;
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: state.user,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case REMOVE_USER:
      return {
        ...state,
        user: {},
      };
    case UPDATE_USER:
      return {
        ...state,
        user: getUpdatedUserFromAPI(),
      };
    case ADD_MEAL:
      return {
        ...state,
        user: {
          ...state.user,
          meals: addArrayItem([...state.user.meals], action.payload),
          // calories: updateCalories(state, 'addMeal', action.payload),
        },
      };
    case EDIT_MEAL:
      return {
        ...state,
        user: {
          ...state.user,
          meals: updateMealItem([...state.user.meals], action.payload),
          // calories: updateCalories(state, 'editMeal', action.payload),
        },
      };
    case DELETE_MEAL:
      return {
        ...state,
        user: {
          ...state.user,
          meals: removeArrayItem(
            [...state.user.meals],
            action.payload.id,
          ),
          // calories: updateCalories(state, 'deleteMeal', action.payload),
        },
      };
    case ADD_WORKOUT:
      return {
        ...state,
        user: {
          ...state.user,
          workouts: addArrayItem(
            [...state.user.workouts],
            action.payload,
          ),
          // calories: updateCalories(state, 'addWorkout', action.payload),
        },
      };
    case EDIT_WORKOUT:
      return {
        ...state,
        user: {
          ...state.user,
          workouts: updateWorkoutItem(
            [...state.user.workouts],
            action.payload,
          ),
          // calories: updateCalories(state, 'editWorkout', action.payload),
        },
      };
    case DELETE_WORKOUT:
      return {
        ...state,
        user: {
          ...state.user,
          workouts: removeArrayItem(
            [...state.user.workouts],
            action.payload.id,
          ),
          // calories: updateCalories(state, 'deleteWorkout', action.payload),
        },
      };
    default:
      return state;
  }
};

export default userReducer;
