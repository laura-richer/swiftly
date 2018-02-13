<?php
    
  foreach($tracksArr as $track) {
  
  $trackItem = $api->getTrack($track);

?>

<!-- styles and layout here for track listings -->
<div class="track-item">
  <img src="<?php echo $trackItem->album->images[0]->url?>" width="80" height="80"/>

  <div class="track-info">
    <p><?php echo $trackItem->artists[0]->name?><br/><?php echo $trackItem->name ?></p>
  </div>

  <div class="track">
    <audio controls>
      <source src="<?php echo $trackItem->preview_url ?>" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio> 
  </div>

</div>
<?php } ?>