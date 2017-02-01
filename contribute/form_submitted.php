<?php

$asoiaf = $tac = $connections = $name = $email = $citeas = $link = $response = "";

if(isset($_POST["submit"])) {
	// TODO: protect against multiple submission

	$asoiaf = get_input("asoiaf");
    $tac = get_input("tac");
    $connections = get_input("connections");
    $name = get_input("name");
   	$email = get_input("email");
    $citeas = get_input("citeas");
    $link = get_input("link");

	// Check for empty connections
	if(empty($connections)) {
		$response = error("Please write something in the \"connections\" box.");
		return;
	}

	// Validate email address
	if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		$response = error("Please enter a valid email address.");
		return;
    }

    $msg = compose_msg($asoiaf, $tac, $connections, $name, $email, $citeas, $link);

    $header = "From: The Original GOT <maester@theoriginalgot.com>\r\n" . 
    "Reply-To: smpcole@gmail.com\r\n" . 
    "Cc: smpcole@gmail.com\r\n" .
    "Content-type: text/html; charset=UTF-8";

    $subject = "Your submission to The Original GOT";

    if(mail($email, $subject, $msg, $header)) {
    	// Redirect to thank you page.  This protects against duplicate submission of form
    	header("Location: thankyou.html");
    }
    else
    	$response = error("Uh oh!  Your submission could not be delivered for some reason.");
}

function compose_msg($asoiaf, $tac, $connections, $name, $email, $citeas, $link) {
	$msg = "<html><body>";

	$msg .= "<p>Dear " . $name . ",</p><p>Thank you for contributing to <a href=\"http://theoriginalgot.com\">The Original GOT</a>!  I'll get back you as soon as I can.</p><p>See ya,</p><p>Sam</p><hr>";

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
	return "<p><b><font color=\"red\">" . $msg . "</font></b></p>";
}

function get_input($name) {
    return htmlspecialchars(stripslashes(trim($_POST[$name])));
}

?>