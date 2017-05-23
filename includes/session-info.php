<?php
require 'vendor/autoload.php';

    $session = new SpotifyWebAPI\Session('4741073d687b495eb89b3eec754ccfba', '9dfe49b200e44dbbac18fd43b9ef8ae1', 'http://localhost:8888/spotify-web-api-php-master/callback.php');
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

$me = $api->me();
$uid = $me->id;
?>

<div class="sp-prof right">
        <p>Hi There <strong><?php echo $me->display_name ?></strong> <?php echo '<img class="profile-img" src="'.$me->images[0]->url.'" width="50" height="50"/>' ?></p>
</div>