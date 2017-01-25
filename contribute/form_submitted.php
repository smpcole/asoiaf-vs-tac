<?php

if(isset($_POST["submit"])) {
	// TODO: protect against multiple submission
	echo "Form submitted";
}

function get_input($name) {
    return htmlspecialchars(stripslashes(trim($_POST[$name])));
}

?>