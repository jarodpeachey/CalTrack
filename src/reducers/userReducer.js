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

const updateMealCalories = (state, type, actionPayload) => {
  const userMeals = [...state.user.meals];
  // const userWorkouts = [...state.user.workouts];

  let gained = parseInt(state.user.calories.gained);
  let lost = parseInt(state.user.calories.lost);
  let net = parseInt(state.user.calories.net);

  switch (type) {
    case 'add':
      console.log(actionPayload);
      gained += parseInt(actionPayload.mealCalories);
      break;
    case 'edit':
      userMeals.forEach((meal) => {
        if (meal.mealID === actionPayload.mealID) {
          gained -= parseInt(meal.mealCalories);
        }
      });
      gained += parseInt(actionPayload.mealCalories);
      break;
    case 'delete':
      userMeals.forEach((meal) => {
        if (meal.mealID === actionPayload) {
          gained -= parseInt(meal.mealCalories);
        }
      });
      break;
    default:
      gained = gained;
  }

  net = gained - lost;

  const caloriesToSendToAPI = {
    name: state.user.name,
    email: state.user.email,
    userID: state.user.userID,
    caloriesGained: gained,
    caloriesLost: lost,
    netCalories: net,
  };

  axios({
    method: 'PUT',
    url: `http://localhost/caltrack_db/api/users/${state.user.userID}`,
    config: {
      headers: { 'Content-Type': 'application/json' },
    },
    data: { ...caloriesToSendToAPI },
  })
    .then((res) => {
      console.log('Sent! Response: ', res);
      if (res.data.success) {
        // this.props.updatseUser();
      }
    })
    .catch((err) => {
      console.log('Error: ', err);
    });

  return {
    gained,
    lost,
    net,
  };
};

const updateWorkoutCalories = (state, type, actionPayload) => {
  const userWorkouts = [...state.user.workouts];
  // const userWorkouts = [...state.user.workouts];

  let gained = parseInt(state.user.calories.gained);
  let lost = parseInt(state.user.calories.lost);
  let net = parseInt(state.user.calories.net);

  switch (type) {
    case 'add':
      console.log(actionPayload);
      lost += parseInt(actionPayload.workoutCalories);
      break;
    case 'edit':
      userWorkouts.forEach((workout) => {
        if (workout.workoutID === actionPayload.workoutID) {
          lost -= parseInt(workout.workoutCalories);
        }
      });
      lost += parseInt(actionPayload.workoutCalories);
      break;
    case 'delete':
      userWorkouts.forEach((workout) => {
        if (workout.workoutID === actionPayload) {
          lost -= parseInt(workout.workoutCalories);
        }
      });
      break;
    default:
      lost = lost;
  }

  net = gained - lost;

  const caloriesToSendToAPI = {
    name: state.user.name,
    email: state.user.email,
    userID: state.user.userID,
    caloriesGained: gained,
    caloriesLost: lost,
    netCalories: net,
  };

  axios({
    method: 'PUT',
    url: `http://localhost/caltrack_db/api/users/${state.user.userID}`,
    config: {
      headers: { 'Content-Type': 'application/json' },
    },
    data: { ...caloriesToSendToAPI },
  })
    .then((res) => {
      console.log('Sent! Response: ', res);
      if (res.data.success) {
        // this.props.updatseUser();
      }
    })
    .catch((err) => {
      console.log('Error: ', err);
    });

  return {
    gained,
    lost,
    net,
  };
};

const addArrayItem = (array, newItem) => {
  const newArray = [...array];

  newArray.push(newItem);

  return [...newArray];
};

const updateMealItem = (array, updatedItem) => {
  const newArray = [...array];

  console.log('UpdatedItem: ', updatedItem);

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

  console.log('UpdatedItem: ', updatedItem);

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


const removeMeal = (meals, mealID) => {
  const newArray = [...meals];

  return newArray.filter(meal => meal.mealID !== mealID);
};

const removeWorkout = (workouts, workoutID) => {
  const newArray = [...workouts];

  return newArray.filter(workout => workout.workoutID !== workoutID);
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
          calories: updateMealCalories(state, 'add', action.payload),
        },
      };
    case EDIT_MEAL:
      return {
        ...state,
        user: {
          ...state.user,
          meals: updateMealItem([...state.user.meals], action.payload),
          calories: updateMealCalories(state, 'edit', action.payload),
        },
      };
    case DELETE_MEAL:
      return {
        ...state,
        user: {
          ...state.user,
          meals: removeMeal([...state.user.meals], action.payload),
          calories: updateMealCalories(state, 'delete', action.payload),
        },
      };
    case ADD_WORKOUT:
      return {
        ...state,
        user: {
          ...state.user,
          workouts: addArrayItem([...state.user.workouts], action.payload),
          calories: updateWorkoutCalories(state, 'add', action.payload),
        },
      };
    case EDIT_WORKOUT:
      return {
        ...state,
        user: {
          ...state.user,
          workouts: updateWorkoutItem([...state.user.workouts], action.payload),
          calories: updateWorkoutCalories(state, 'edit', action.payload),
        },
      };
    case DELETE_WORKOUT:
      return {
        ...state,
        user: {
          ...state.user,
          workouts: removeWorkout([...state.user.workouts], action.payload),
          calories: updateWorkoutCalories(state, 'delete', action.payload),
        },
      };
    default:
      return state;
  }
};

export default userReducer;
