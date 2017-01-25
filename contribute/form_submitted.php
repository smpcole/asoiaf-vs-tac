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

    $asoiaf = get_input("asoiaf");
    $tac = get_input("tac");
    $name = get_input("name");
    $citeas = get_input("citeas");
    $link = get_input("link");

    $msg = compose_msg($asoiaf, $tac, $connections, $name, $email, $citeas, $link);
}

function compose_msg($asoiaf, $tac, $connections, $name, $email, $citeas, $link) {
	$msg = "<html><body>";

	$msg .= "<p>Dear " . $name . ",</p><p>Thank you for contributing to The Original GOT!  I'll get back you as soon as I can.</p><p>See ya,</p><p>Sam</p><hr>";

	$msg .= "<b><i>A Song of Ice and Fire</i> character:</b> " . $asoiaf . "<br><br>";

	$msg .= "<b><i>The Accursed Kings</i> character:</b> " . $tac . "<br><br>";

	$connections = str_replace("\n", "</p><p>", $connections);
	$msg .= "<b>Connections:</b><p>" . $connections . "</p>";

	$msg .= "<b>Submitted by:</b><br>" . $name;
	$msg .= "<br><a href=\"mailto:" . $email . "\">" . $email . "</a><br><br>";

	$msg .= "<b>Cite as:</b><br>" . $citeas . "<br><a href=\"" . $link . "\">" . $link . "</a>";

	$msg .= "</body></html>";
	return $msg;
}

function error($msg) {
	echo "<font color=\"red\">" . $msg . "</font>";
}

function get_input($name) {
    return htmlspecialchars(stripslashes(trim($_POST[$name])));
}

?>