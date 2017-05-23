<?php
session_start();

//var_dump($_SESSION['selections']);

$selections = array_diff($_SESSION['selections'], array(NULL));
?>
<div class="generate-wrapper">
    <h2 class="text-center">Generating your soundtrack<i class="fa fa-cog fa-spin" aria-hidden="true"></i></h2>
</div>
<script>
location.reload(); 
</script>