// class User {
// 	constructor (id, name, username, password, meals, workouts, caloriesGained, caloriesLost, netCalories) {
// 		this.id = id,
// 		this.name = name,
// 		this.username = username,
// 		this.password = password,
// 		this.meals = meals,
// 		this.workouts = workouts,
// 		this.caloriesGained = caloriesGained,
// 		this.caloriesLost = caloriesLost,
// 		this.netCalories = netCalories,
// 	}
// }
  
export function getTestValue () {
	return true;
}


// class storageControl {
//   addNewUser (user) {
//     let usersArray;

//     if (localStorage.getItem('users') === null) {
//       usersArray = [];
//     } else {
//       usersArray = JSON.parse(localStorage.getItem('users'));
//     }

//     usersArray.push(user);

//     localStorage.setItem('users', JSON.stringify(usersArray));
//   }

//   getUsers () {
//     let users = [];
//     if (JSON.parse(localStorage.getItem('users'))) {
//       users = JSON.parse(localStorage.getItem('users'));
//     } else {
//       users = [];
//     }

//     console.log(users);

//     return users;
//   }

//   setCurrentUser (user) {
//     localStorage.setItem('currentUser', JSON.stringify(user));
//   }
// }