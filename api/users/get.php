<?php
  // Get the request method and assign it to variable
  $requestMethod = $_SERVER["REQUEST_METHOD"];

  // Include the Database.php file
  include('../class/Database.php');

  // Set api to a new Database object
  $api = new Database();

  // Check if method === get
  switch($requestMethod) {
    case 'GET':
      // Call the insert user method
      $api->getUser($_GET);
      break;
    default:
      // Send request header as Method Not Allowed
      header("HTTP/1.0 405 Method Not Allowed");
      break;
  }
?>
