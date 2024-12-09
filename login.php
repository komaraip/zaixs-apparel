<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
	
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">	
	<link rel="icon" type="image/png" href="assets/images/icons/favicon.ico"/>
	<link rel="stylesheet" type="text/css" href="assets/vendor/bootstrap_new/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="assets/fonts/Linearicons-Free-v1.0.0/icon-font.min.css">
	<link rel="stylesheet" type="text/css" href="assets/vendor/animate/animate.css">
	<link rel="stylesheet" type="text/css" href="assets/vendor/css-hamburgers/hamburgers.min.css">
	<link rel="stylesheet" type="text/css" href="assets/vendor/animsition/css/animsition.min.css">
	<link rel="stylesheet" type="text/css" href="assets/vendor/select2/select2.min.css">
	<link rel="stylesheet" type="text/css" href="assets/vendor/daterangepicker/daterangepicker.css">
	<link rel="stylesheet" type="text/css" href="assets/css/util.css">
	<link rel="stylesheet" type="text/css" href="assets/css/main.css">

    <title>Zaixs Store - Login</title>

</head>
<body>

	<div class="limiter">
		<div class="container-login100">
			<!-- #################################################################### -->
            <?php if (isset($_SESSION["gagal"])) { ?>
            <div class="alert alert-danger" role="alert">
                Username/Password salah!!
            </div>
            <?php } ?>
            <?php if (isset($_GET['pesan'])){ ?>
            <div class="alert alert-danger" role="alert">
                Logout Berhasil!!
		    </div>
            <?php } ?>
            <?php session_unset(); ?>

			<!-- #################################################################### -->
			<div class="wrap-login100">
				<div class="login100-form-title" style="background-image: url(assets/images/wlp1.jpg);">
					<span class="login100-form-title-1">LOGIN</span>
				</div>
				<form class="login100-form validate-form" method="POST" action="cek_login.php">
					<div class="wrap-input100 validate-input m-b-26" data-validate="Username is required">
					    <label for="username">Username</label>
						<input class="input100" type="text" name="username" placeholder="Enter Username">
						<span class="focus-input100"></span>
					</div>
					<div class="wrap-input100 validate-input m-b-18" data-validate = "Password is required">
					    <label for="password">Password</label>
						<input class="input100" type="password" name="password" placeholder="Enter Password">
						<span class="focus-input100"></span>
					</div>
					<div class="flex-sb-m w-full p-b-30">
						<div>
							<a href="register.php" class="txt1">
							    Dont Have an Account? Register Here
							</a>
						</div>
						<div>
							<a href="home.php" class="txt1">
							    Back to Home
							</a>
						</div>
					</div>
					<div class="container-login100-form-btn">
					    <button class="login100-form-btn" name="login" >Submit</button>
				    </div>
				</form>
			</div>
		</div>
	</div>
	
	<script src="assets/vendor/jquery/jquery-3.2.1.min.js"></script>
	<script src="assets/vendor/animsition/js/animsition.min.js"></script>
	<script src="assets/vendor/bootstrap_new/js/popper.js"></script>
	<script src="assets/vendor/bootstrap_new/js/bootstrap.min.js"></script>
	<script src="assets/vendor/select2/select2.min.js"></script>
	<script src="assets/vendor/daterangepicker/moment.min.js"></script>
	<script src="assets/vendor/daterangepicker/daterangepicker.js"></script>
	<script src="assets/vendor/countdowntime/countdowntime.js"></script>
	<script src="assets/js/main.js"></script>

</body>
</html>