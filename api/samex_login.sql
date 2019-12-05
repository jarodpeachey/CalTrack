CREATE DATABASE caltrack;

USE caltrack;

CREATE TABLE users (
  userID INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  hashpassword VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE meals (
  mealID INT AUTO_INCREMENT PRIMARY KEY,
  mealName VARCHAR(255) NOT NULL,
  calories int NOT NULL,
  userID INT,
  CONSTRAINT caltrack_meal
  FOREIGN KEY (userID)
    REFERENCES users(userID)
);

CREATE TABLE workouts (
  workoutID INT AUTO_INCREMENT PRIMARY KEY,
  workoutName VARCHAR(255) NOT NULL,
  calories int NOT NULL,
  userID INT,
  CONSTRAINT caltrack_workout
  FOREIGN KEY (userID)
    REFERENCES users(userID)
);
