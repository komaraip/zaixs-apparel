<?php 
session_start();


session_destroy();

session_unset();

$_SESSION['login'] = '';

header("Location: login.php?pesan=oke");