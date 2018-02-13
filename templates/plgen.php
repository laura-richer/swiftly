<?php
session_start();

$selections = array_diff($_SESSION['selections'], array(NULL));
?>
<div class="block-height">
	<div class="generate-wrapper">
	  <h2 class="text-center">Generating your soundtrack<i class="fa fa-cog fa-spin" aria-hidden="true"></i></h2>
	</div>
</div>

<script>
	location.reload(); 
</script>