<?php
session_start();

$errors = array();
$data = array();

$selections = array($_POST['one'], $_POST['onea'], $_POST['two'], $_POST['twoa'], $_POST['threea'], $_POST['threeb'], $_POST['threeab'], $_POST['four'], $_POST['five'], $_POST['six']);

$_SESSION['selections'] = $selections;
?>
