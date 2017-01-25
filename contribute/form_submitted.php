<?php

if(isset($_POST["submit"])) {
	// TODO: protect against multiple submission

	// Check for empty connections
	$connections = get_input("connections");
	if(empty($connections)) {
		error("Please write something in the \"connections\" box.");
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