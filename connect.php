<?php

$db_host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "project_zaixsapparel";

$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

// // test connection

// if (mysqli_error($conn)) {
//     echo "Koneksi bermasalah";
// } else {
//     echo "Koneksi Aman";
// }