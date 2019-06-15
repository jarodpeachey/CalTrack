/* eslint-disable no-use-before-define */
class User {
  constructor (id, name, username, password, meals, workouts, caloriesGained, caloriesLost, netCalories) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.meals = meals;
    this.workouts = workouts;
    this.caloriesGained = caloriesGained;
    this.caloriesLost = caloriesLost;
    this.netCalories = netCalories;
  }
}

function createNewUser (name, username, password) {
  const users = getUsers();

  let ID;
  // Create ID
  if (users.length > 0) {
    ID = users[users.length - 1].id + 1;
  } else {
    ID = 0;
  }

  // Create user
  const newUser = new User(ID, name, username, password, [], [], 0, 0, 0);

  // Return new user
  return newUser;
}

function addUserToLocalStorage (user) {
  let usersArray;

  if (localStorage.getItem('users') === null) {
    usersArray = [];
  } else {
    usersArray = JSON.parse(localStorage.getItem('users'));
  }

  usersArray.push(user);

  localStorage.setItem('users', JSON.stringify(usersArray));
}

function setCurrentUser (userToSet) {
  localStorage.setItem('currentUser', JSON.stringify(userToSet));
}

function getCurrentUser () {
  return JSON.parse(localStorage.getItem('currentUser'));
}

function getUsers () {
  let users = [];
  if (JSON.parse(localStorage.getItem('users'))) {
    users = JSON.parse(localStorage.getItem('users'));
  } else {
    users = [];
  }

  console.log(users);

  return users;
}

function getTestValue () {
  return 'notTest';
}

export {
  createNewUser,
  addUserToLocalStorage,
  setCurrentUser,
  getCurrentUser,
  getTestValue,
};
