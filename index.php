<?php
error_reporting(-1);
ini_set('display_errors', 1);

session_start();

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
  <script src="bower_components/angulartics/dist/angulartics.min.js"></script>
  <script src="bower_components/angulartics-google-analytics/dist/angulartics-ga.min.js"></script>
  <script src="js/app.js"></script>
  <title>swiftLY | Generate a soundtrack for your day</title>
    
</head>

<body ng-app="formApp">

<header>
  <div class="logo left">
    <h1>swift<span>LY.</span></h1>
  </div>

  <?php include('includes/session-info.php'); ?>
</header>

<!-- views will be injected here -->
<div class="container">
  <?php if(isset($_SESSION['selections'])) { ?>
    <div class="form-wrapper">
      <div class="row form-padding">
        <div class="small-10 small-offset-1 medium-8 medium-offset-2"> 

          <div class="small-12 large-5 large-push-7 columns">
          <?php include('includes/track-generator.php'); ?>
            <p>Based on how your day has gone, here is your personal soundtrack to match your mood and activities. You can listen to the tracks here or save as a spotify playlist and listen anytime.</p>
            <a 
              href="http://www.swift-ly.co.uk/playlist-save.php?tracks=<?php foreach ($tracksArr as $track) { echo $track; echo ','; } ?>" 
              class="button" 
              class="btn btn-danger" 
              analytics-on="click"
              analytics-event="ButtonClick"
              analytics-category="SaveYourSoundtrack"
              analytics-label="SaveYourSoundtrack">Save your soundtrack</button>
            <a 
              href="/includes/restart.php" 
              class="button" 
              analytics-on="click"
              analytics-event="ButtonClick"
              analytics-category="StartFromBeginning"
              analytics-label="StartFromBeginning">Start from the beginning</a>
          </div>
          
          <div class="small-12 large-7 large-pull-5 columns">
            <?php include('includes/track-display.php'); ?>
          </div>

        </div>
      </div>
    </div>
  <?php } else { ?>
    <div ui-view class="form-wrapper"></div>
  <?php } ?>
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
