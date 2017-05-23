<?php
$api = new SpotifyWebAPI\SpotifyWebAPI();

$session->requestAccessToken($_GET['code']);
$accessToken = $session->getAccessToken();

$api->setAccessToken($accessToken);
?>