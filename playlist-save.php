<?php
error_reporting(-1);
ini_set('display_errors', 1);

session_start();

$tracks = $_GET['tracks'];

require 'vendor/autoload.php';
$session = new SpotifyWebAPI\Session('4741073d687b495eb89b3eec754ccfba', '9dfe49b200e44dbbac18fd43b9ef8ae1', 'http://www.swift-ly.co.uk/callback.php');

$scopes = array(
  'playlist-read-private',
  'user-read-private',
  'user-library-modify',
  'playlist-modify',
  'playlist-modify-private',
  'playlist-modify-public'
);

$authorizeUrl = $session->getAuthorizeUrl(array(
  'scope' => $scopes
));

if(isset($_SESSION['ac'])) { 

  $api = new SpotifyWebAPI\SpotifyWebAPI();
  $api->setAccessToken($_SESSION["ac"]);

  $me = $api->me();
  $uid = $me->id;
  $today = date("d/m/Y");

  // Create new playlist
  $api->createUserPlaylist($uid, [
    'name' => 'Daily Soundtrack ' . $today . ' - (SwiftLY)',
    'description' => 'Using swiftLY I have created a personal soundtrack for my day. swift-ly.co.uk'
  ]);

  $playID = $api->getUserPlaylists($uid, [])->items[0]->id;
  $playURL = $api->getUserPlaylists($uid, [])->items[0]->external_urls->spotify;

  // Create Array for adding tracks to new playlist
  $tracks = rtrim($tracks, ',');
  $tracksArr = explode(',', $tracks);

  // Add tracks to playlist
  $api->addUserPlaylistTracks($uid, $playID, $tracksArr);
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="stylesheets/app.css">

  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.10/angular-ui-router.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-animate.min.js"></script>
  <script src="js/app.js"></script>
  <title>swiftLY | Generate a soundtrack for your day</title>
    
</head>

<body>

<header>
  <div class="logo left">
    <h1>swift<span>LY.</span></h1>
  </div>

  <?php include('includes/session-info.php'); ?>
</header>

<div class="container">
  <div class="success">
    <div class="form-wrapper">
      <div class="row form-padding">
        <div class="small-10 small-offset-1 large-6 large-offset-3">

          <h2>Your personal soundtrack has been saved to Spotify</h2>
          <a 
            href="<?php echo $playURL ?>" 
            class="button" 
            target="blank" 
            analytics-on="click"
            analytics-event="ButtonClick"
            analytics-category="Listen"
            analytics-label="Listen">Listen here</a>
          <a 
            href="/includes/restart.php" 
            class="button"
            analytics-on="click"
            analytics-event="ButtonClick"
            analytics-category="StartFromBeginning-AfterSave"
            analytics-label="StartFromBeginning-AfterSave">Start again</a>
                    
          <p>If you like your soundtrack give it a share on social media so your friends can hear your own personal soundtrack.</p>
          <ul class="social-share">
            <li>
              <a 
                href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $playURL ?>" 
                target="blank" 
                analytics-on="click"
                analytics-event="ButtonClick"
                analytics-category="FacebookShare"
                analytics-label="FacebookShare"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
            <li>
              <a 
                href="https://twitter.com/home?status=<?php echo $playURL ?>" 
                target="blank" 
                analytics-on="click"
                analytics-event="ButtonClick"
                analytics-category="TwitterShare"
                analytics-label="TwitterShare"
                ><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
          </ul>

        </div>
      </div>
    </div>
  </div>
</div>

<div style="clear:both"></div>

<footer>
  <p class="text-center">Developed by <strong>Laura Richer</strong><br/><a href="http://www.lauraricher.co.uk" target="blank"><strong>www.lauraricher.co.uk</strong></a><br/>&copy; <?php echo date("Y"); ?></p>
</footer>

<!-- Global Site Tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-106592974-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)};
  gtag('js', new Date());

  gtag('config', 'UA-106592974-1');
</script>

</body>
</html>

<?php } else { 
    header('Location: ' . $authorizeUrl);
    die();
} ?>