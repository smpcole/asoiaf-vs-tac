<?php

if(isset($_POST["submit"])) {
	// TODO: protect against multiple submission

	// Check for empty connections
	$connections = get_input("connections");
	if(empty($connections)) {
		error("Please write something in the \"connections\" box.");
		return;
	}

	// Validate email address
	$email = get_input("email");
	if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		error("Please enter a valid email address.");
		return;
    }
}

function error($msg) {
	echo "<font color=\"red\">" . $msg . "</font>";
}

function get_input($name) {
    return htmlspecialchars(stripslashes(trim($_POST[$name])));
}

?>