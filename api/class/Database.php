<?php
  // Start a session
  session_start();

  // Database class
  class Database {
    // Database variables
    private $host  = 'localhost';
    private $user  = 'root'; // Change this
    private $password   = "root"; // Change this
    private $database  = "samex_login";      
    private $table = 'users';
    private $dbConnect = false;
    private $loggedInUser;

    // Constructor
    public function __construct(){
      if(!$this->dbConnect){ 
          $conn = new mysqli($this->host, $this->user, $this->password, $this->database);
          if($conn->connect_error){
              die("Error failed to connect to MySQL: " . $conn->connect_error);
          }else{
              $this->dbConnect = $conn;
          }
      }
    }

    function createUser($userData){
      //Set variables from form
      $userName = $userData['name'];
      $userEmail = $userData['email'];
      $userPassword = password_hash($userData['password'], PASSWORD_DEFAULT);

      // Check if email already exists in db
      $checkEmailQuery = "SELECT * FROM users WHERE email='$userEmail'";

      // Set response
      $response = mysqli_query($this->dbConnect, $checkEmailQuery);

      // Check if the response exists
      if(mysqli_num_rows($response) > 0) {
        // Email exists - terminate and send email_used as true
        echo json_encode(["email_used" => true]);
      } else {
        // Email does not exist - insert user
        $insertUserQuery = "INSERT INTO users (username, email, hashpassword)
          VALUES ('$userName', '$userEmail', '$userPassword');";

        // Check if query succeeded and send response
        if (mysqli_query($this->dbConnect, $insertUserQuery)) {
          echo json_encode(["email_used" => false, "success" => true]);
        } else {
          echo json_encode(["email_used" => false, "success" => false]);
        }
      }
    
      header('Content-Type: application/json');
    } // End createUser()

    function verifyUser ($userData) {
      //Set variables from form
      $userEmail = $userData['email'];
      $userPassword = $userData['password'];

      // Check if email already exists in db
      $checkEmailQuery = "SELECT * FROM users WHERE email='$userEmail'";

      // Set response
      $response = mysqli_query($this->dbConnect, $checkEmailQuery);

      // Check if response exists
      if($response->num_rows > 0) {
        // While there is a row, fetch the data from the response
        while ($row = $response->fetch_assoc()) {

          // Check password against hash from db
          if (password_verify("$userPassword", $row['hashpassword'])) {
            // Passwords match - set session variable loggedInUser
            $_SESSION['loggedInUser'] = [
              "name" => $row['username'],
              "email" => $row['email']
            ];

            // Send response data
            echo json_encode(["match" => true]);
          } else {
            // Passwords do not match - send response data
            echo json_encode(["match" => false, "other" => "Password does not match"]);
          }
        }
      } else {
        // No rows exist with that email, send response data
        echo json_encode(["match" => false]);
      }

      header('Content-Type: application/json');
    } // End verifyUser

    function getUser ($getUserData) {
      // Return loggedInUser session variable
      echo json_encode($_SESSION['loggedInUser']);
    } // End getUser()
  }
?>

