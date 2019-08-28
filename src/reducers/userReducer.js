import update from 'immutability-helper';
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
      // const newCurrentUserMeals = [...state.currentUser.meals];
      // newCurrentUserMeals.push(action.payload);


      const newUsersMeals = [...state.users];

      newUsersMeals.forEach((user) => {
        if (user.id === state.currentUser.id) {
          user.meals.push(action.payload);
        }
      });

      // const updatedCurrentUserMeals = {
      //   ...state.currentUser,
      //   meals: newCurrentUserMeals,
      // };

      // const newMealsArray = update(state.currentUser.meals, {$push: [action.payload]});

      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          meals: [
            ...state.currentUser.meals,
            action.payload,
          ],
        },
        users: newUsersMeals,
      };
    case EDIT_MEAL:
      const newCurrentUserMealsEditMode = [...state.currentUser.meals];
      newCurrentUserMealsEditMode.forEach((meal) => {
        if (meal.id === action.payload.id) {
          meal.id = action.payload.id;
          meal.name = action.payload.name;
          meal.calories = action.payload.calories;
          meal.description = action.payload.description;
          meal.date = action.payload.date;
        }
      });

      const newUsersMealsEditMeal = [...state.users];
      newUsersMealsEditMeal.forEach((user) => {
        if (user.id === state.currentUser.id) {
          user.meals.forEach((meal) => {
            if (meal.id === action.payload.id) {
              meal.id = action.payload.id;
              meal.name = action.payload.name;
              meal.calories = action.payload.calories;
              meal.description = action.payload.description;
              meal.date = action.payload.date;
            }
          });
        }
      });

      const updatedCurrentUserMealsEditMeal = {
        ...state.currentUser,
        meals: newCurrentUserMealsEditMode,
      };

      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          meals: [
            ...state.currentUser.meals,
            updateObjectInArray(state.currentUser.meals, action),
          ],
        },
      };
    case DELETE_MEAL:
      state.currentUser.meals.filter(meals => meals.id !== action.payload.id);
      state.users.forEach((user) => {
        if (user.id === state.currentUser.id) {
          user.meals.filter(meals => meals.id !== action.payload.id);
        }
      });
      return {
        ...state,
        users: state.users,
        currentUser: state.currentUser,
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
