<?php
session_start();
include 'connect.php';

if (isset($_POST['login'])) {

      $username = $_POST['username'];
      $password = $_POST['password'];

      $result = mysqli_query($conn, "SELECT * FROM user WHERE username='$username' AND password='$password'  ");

      $data = mysqli_fetch_assoc($result);

            if (mysqli_num_rows($result) === 1) {
                  if ($data['username'] == "admin" && $data['level'] == 'admin') {
                        $_SESSION['admin'] = true;
                        $_SESSION['pengunjung'] = "admin";
                        $_SESSION['login'] = true;
                        header("Location: admin/index.php");
                        exit;
                  }else {
                        $_SESSION['user'] = true;
                        $_SESSION['admin'] = true;
                        $_SESSION['pengunjung'] = $username;
                        $_SESSION['login'] = true;
                        header("Location: user/home.php");
                        exit;
                  }
            } else {
                  $_SESSION["gagal"] = true;
                  header("Location: login.php");
            }
}