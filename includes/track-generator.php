<?php
//show categories //categories consist of lots of playlists
$categories = $api->getCategoriesList(array('limit' => 50));

$selections = array_diff($_SESSION['selections'], array(NULL));

//function to generate each track based on answers
foreach($selections as $selection){
    
    $catUse = '';

    if($selection == 'happy'){
        $catUse = 'indie_alt';
    }
    elseif($selection == 'motivated' || $selection == 'school' || $selection == 'work' || $selection == 'hobby' || $selection == 'craft' ){
        $catUse = 'focus';
    }
    elseif($selection == 'excited' || $selection == 'errands' || $selection == 'exercise' || $selection == 'sport'){
        $catUse = 'workout';
    }
    elseif($selection == 'relaxed' || $selection == 'relax'){
        $catUse = 'chill';
    }
    elseif($selection == 'sad' || $selection == 'raining' || $selection == 'windy' || $selection == 'chores'){
        $catUse = 'blues';
    }
    elseif($selection == 'angry'){
        $catUse = 'punk';
    }
    elseif($selection == 'stressed' || $selection == 'rushed'){
        $catUse = 'metal';
    }
    elseif($selection == 'sunny' || $selection == 'weekend'){
        $catUse = 'reggae';
    }
    elseif($selection == 'crisp' || $selection == 'dark' || $selection == 'cold' || $selection == 'bored'){
        $catUse = 'mood';
    }
    elseif($selection == 'dayoff'){
        $catUse = 'travel';
    }
    elseif($selection == 'busy' || $selection == 'practical'){
        $catUse = 'rock';
    }
    elseif($selection == 'musical'){
        $catUse = 'jazz';
    }
    elseif($selection == 'techy'){
        $catUse = 'funk';
    }
    elseif($selection == 'friends' || $selection == 'night'){
        $catUse = 'pop';
    }
    elseif($selection == 'evening' || $selection == 'dinner'){
        $catUse = 'dinner';
    }
    elseif($selection == 'party'){
        $catUse = 'edm_dance';
    }
    elseif($selection == 'tired' || $selection == 'sleep'){
        $catUse = 'sleep';
    }

    //list playlists in specific category
    //category will change based on user selections
    $playlists = $api->getCategoryPlaylists($catUse);

    //count number of playlists in array and use as max
    //get random playlist from choosen category
    $max = count($playlists->playlists->items);
    $pl = rand(0, $max - 1);

    //get random playlists id and owner id
    $pid = $playlists->playlists->items[$pl]->id;
    $puid = $playlists->playlists->items[$pl]->owner->id;

    //use id and owner id to get tracks
    $tracks = $api->getUserPlaylistTracks($puid, $pid);


    $tracksArray = array();
    //foreach loop to show tracks within random playlist
    foreach($tracks->items as $track){
        $popularity = $track->track->popularity;

        //check there are some tracks with popularity over 50
        //skip all tracks under 50 popularity
        if($popularity < 50){
            continue;
        }else{
            //add all other track ids to array
            $trackID = $track->track->id;
            $tracksArray[] = $trackID;
        }
    }

    //pick random track from playlist array
    $count = count($tracksArray);
    $rand = rand(0, $count - 1);

    $track = $tracksArray[$rand];
    $track = $api->getTrack($track);

    $imgURL = $track->album->images[0]->url;
    $artist = $track->artists[0]->name;
    $trName = $track->name;
    $trURL = ($track->preview_url);

    ?>
    <!-- styles and layout here for track listings -->
    <div class="track-item">
        <img src="<?php echo $imgURL ?>" width="80" height="80"/>
        <div class="track-info">
            <p><?php echo $artist ?><br/><?php echo $trName ?></p>
        </div>
        <div class="track">
            <audio controls>
                <source src="<?php echo $trURL ?>" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio> 
        </div>
    </div>
<?php } ?>