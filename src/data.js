const User = (id, name, username, password, meals, workouts, caloriesGained, caloriesLost, netCalories) => {
  this.id = id;
  this.name = name;
  this.username = username;
  this.password = password;
  this.meals = meals;
  this.workouts = workouts;
  this.caloriesGained = caloriesGained;
  this.caloriesLost = caloriesLost;
  this.netCalories = netCalories;
};

class mainDataControl {
  createUser (name, username, password) {
    const users = storageControl.getUsers();
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

  setCurrentUser (user) {
    storageControl.setCurrentUser(user);
  }

  getCurrentUser () {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  clearCurrentUser () {
    localStorage.removeItem('currentUser');
    window.location.href = 'main.html';
  }

  deleteAccount (userToDelete) {
    if (!userToDelete) {
      document.write(
        '<h2>There is no user to delete.  Please <a href="login.html">login to your account</a> and delete it again.</h2>',
      );
    } else {
      const usersArray = storageControl.getUsers();

      usersArray.forEach((user, index) => {
        if (userToDelete.username == user.username) {
          usersArray.splice(index, 1);
        }
      });

      mainDataControl.clearCurrentUser();

      localStorage.setItem('users', JSON.stringify(usersArray));
    }
  }

  getUserByUsername (username) {
    const users = storageControl.getUsers();
    let found = null;

    users.forEach((user) => {
      if (user.username == username) {
        found = user;
      }
    });

    return found;
  }

  updateUserMeals (newMeal) {
    const currentUser = mainDataControl.getCurrentUser();
    const usersArray = storageControl.getUsers();

    usersArray.forEach((user) => {
      if (user.name == currentUser.name) {
        user.meals.push(newMeal);
        currentUser.meals.push(newMeal);
      }
    });

    localStorage.setItem('users', JSON.stringify(usersArray));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  updateUserWorkouts (newWorkout) {
    const currentUser = mainDataControl.getCurrentUser();
    const usersArray = storageControl.getUsers();

    usersArray.forEach((user) => {
      if (user.name == currentUser.name) {
        user.workouts.push(newWorkout);
        currentUser.workouts.push(newWorkout);
      }
    });

    localStorage.setItem('users', JSON.stringify(usersArray));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  updateUserCalories () {
    const {meals} = mainDataControl.getCurrentUser();
    const {workouts} = mainDataControl.getCurrentUser();

    let caloriesGained = 0;
    let caloriesLost = 0;

    meals.forEach((meal) => {
      caloriesGained += meal.calories;
    });

    workouts.forEach((workout) => {
      caloriesLost += workout.calories;
    });

    const netCalories = caloriesGained - caloriesLost;

    const currentUser = mainDataControl.getCurrentUser();
    const usersArray = storageControl.getUsers();

    usersArray.forEach((user) => {
      if (user.name == currentUser.name) {
        user.caloriesGained = caloriesGained;
        user.caloriesLost = caloriesLost;
        user.netCalories = netCalories;

        currentUser.caloriesGained = caloriesGained;
        currentUser.caloriesLost = caloriesLost;
        currentUser.netCalories = netCalories;
      }
    });

    localStorage.setItem('users', JSON.stringify(usersArray));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    console.log(JSON.parse(localStorage.getItem('currentUser')));
  }

  getCaloriesGained () {
    const currentUser = mainDataControl.getCurrentUser();

    const calories = currentUser.caloriesGained;

    return calories;
  }

  getCaloriesLost () {
    const currentUser = mainDataControl.getCurrentUser();

    const calories = currentUser.caloriesLost;

    return calories;
  }

  updateMeal (updatedMeal) {
    const currentUser = mainDataControl.getCurrentUser();
    const usersArray = storageControl.getUsers();

    usersArray.forEach((user) => {
      user.meals.forEach(function(meal, index) {
        if (meal.id == updatedMeal.id) {
          user.meals[index].name = updatedMeal.name;
          user.meals[index].calories = updatedMeal.calories;

          currentUser.meals[index].name = updatedMeal.name;
          currentUser.meals[index].calories = updatedMeal.calories;
        }
      });
    });

    localStorage.setItem('users', JSON.stringify(usersArray));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  deleteMeal (mealToDelete) {
    const currentUser = mainDataControl.getCurrentUser();
    const usersArray = storageControl.getUsers();

    usersArray.forEach((user) => {
      user.meals.forEach(function(meal, index) {
        if (meal.id == mealToDelete.id) {
          user.meals.splice(index, 1);
          currentUser.meals.splice(index, 1);
        }
      });
    });

    localStorage.setItem('users', JSON.stringify(usersArray));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  deleteAllMeals () {
    const currentUser = mainDataControl.getCurrentUser();
    const usersArray = storageControl.getUsers();

    usersArray.forEach((user) => {
      if (user.id == currentUser.id) {
        user.meals = [];
        currentUser.meals = [];
      }
    });

    localStorage.setItem('users', JSON.stringify(usersArray));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  updateWorkout (updatedWorkout) {
    const currentUser = mainDataControl.getCurrentUser();
    const usersArray = storageControl.getUsers();

    usersArray.forEach((user) => {
      user.workouts.forEach(function(workout, index) {
        if (workout.id == updatedWorkout.id) {
          user.workouts[index].name = updatedWorkout.name;
          user.workouts[index].calories = updatedWorkout.calories;

          currentUser.workouts[index].name = updatedWorkout.name;
          currentUser.workouts[index].calories = updatedWorkout.calories;
        }
      });
    });

    localStorage.setItem('users', JSON.stringify(usersArray));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  deleteWorkout (workoutToDelete) {
    const currentUser = mainDataControl.getCurrentUser();
    const usersArray = storageControl.getUsers();

    usersArray.forEach((user) => {
      user.workouts.forEach(function(workout, index) {
        if (workout.id == workoutToDelete.id) {
          user.workouts.splice(index, 1);
          currentUser.workouts.splice(index, 1);
        }
      });
    });

    localStorage.setItem('users', JSON.stringify(usersArray));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  deleteAllWorkouts () {
    const currentUser = mainDataControl.getCurrentUser();
    const usersArray = storageControl.getUsers();

    usersArray.forEach((user) => {
      if (user.id == currentUser.id) {
        user.workouts = [];
        currentUser.workouts = [];
      }
    });

    localStorage.setItem('users', JSON.stringify(usersArray));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  loadEventListeners (e) {
    document
      .getElementById('mobileMenu')
      .addEventListener('click', (e) => {
        const menu = document.getElementById('mobileSubmenu');

        if (menu.classList.contains('unclicked')) {
          menu.classList.add('clicked');
          menu.classList.remove('unclicked');
        } else {
          menu.classList.add('unclicked');
          menu.classList.remove('clicked');
        }

        e.preventDefault();
      });

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('logout')) {
        if (confirm('Are you sure you want to log out?')) {
          mainDataControl.clearCurrentUser();
        }
      }
    });

    document.addEventListener('touchstart', (e) => {
      if (e.target.classList.contains('logout')) {
        if (confirm('Are you sure you want to log out?')) {
          mainDataControl.clearCurrentUser();
        }
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('deleteAccount')) {
        if (
          confirm('Are you sure you want to permanantly delete your account?')
        ) {
          mainDataControl.deleteAccount(mainDataControl.getCurrentUser());
        }
      }
    });

    document.addEventListener('touchstart', (e) => {
      if (e.target.classList.contains('deleteAccount')) {
        if (confirm('Are you sure you want to permanantly delete your account?')) {
          mainDataControl.deleteAccount(mainDataControl.getCurrentUser());
        }
      }
    });
  }
}

class storageControl {
  addNewUser (user) {
    let usersArray;

    if (localStorage.getItem('users') === null) {
      usersArray = [];
    } else {
      usersArray = JSON.parse(localStorage.getItem('users'));
    }

    usersArray.push(user);

    localStorage.setItem('users', JSON.stringify(usersArray));
  }

  getUsers () {
    let users = [];
    if (JSON.parse(localStorage.getItem('users'))) {
      users = JSON.parse(localStorage.getItem('users'));
    } else {
      users = [];
    }

    console.log(users);

    return users;
  }

  setCurrentUser (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}

export default mainDataControl;
