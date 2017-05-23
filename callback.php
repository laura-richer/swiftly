<?php 
session_start();

require 'vendor/autoload.php';

$session = new SpotifyWebAPI\Session('4741073d687b495eb89b3eec754ccfba', '9dfe49b200e44dbbac18fd43b9ef8ae1', 'http://localhost:8888/spotify-web-api-php-master/callback.php');
$api = new SpotifyWebAPI\SpotifyWebAPI();

// Request a access token using the code from Spotify
$session->requestAccessToken($_GET['code']);
$accessToken = $session->getAccessToken();

// Set the access token on the API wrapper
$_SESSION["ac"] = $accessToken;

header('Location: http://localhost:8888/spotify-web-api-php-master/');

?>