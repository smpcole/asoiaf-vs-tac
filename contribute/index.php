<?php include_once "form_submitted.php";?>

<html>
  
<head>
<link href="https://fonts.googleapis.com/css?family=MedievalSharp" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="../styles.css">
<link rel="icon" type="image/png" href="../favicon.png"/>


<title>The Original GOT - Contribute</title>
</head>

<body>
  <h1>Contribute</h1>

  <?php echo $response; ?>

  <form method="post">
	<i>A Song of Ice and Fire</i> character:<br>
	<input type="text" name="asoiaf" maxlength="50" value="<?php echo $asoiaf; ?>"><br>
	<br>
	<i>The Accursed Kings</i> character:<br>
	<input type="text" name="tak" maxlength="50" value="<?php echo $tak; ?>"><br>
	<br>
	Connections:<br>
	<textarea maxlength="250" name="connections"><?php echo $connections; ?></textarea><br>
	<br>
	Your name:<br>
	<input type="text" name="name" maxlength="50" value="<?php echo $name; ?>"><br>
	<br>
	Email:<br>
	<input type="text" name="email" maxlength="50" value="<?php echo $email; ?>"><br>
	<br>
	How would you like to be cited (optional)?<br>
	<input type="text" name="citeas" maxlength="50" placeholder="Ex: Robert Baratheon, Robert, RobbyB, rbarath2@westeros.org, etc.  Keep it short." value="<?php echo $citeas; ?>"><br>
	<br>
	Link to your website (optional)?<br>
	<input type="text" name="link" maxlength="50" placeholder="Ex: http://robertbaratheon.com, http://facebook.com/robbyb, http://github.com/rbaratheon, etc." value="<?php echo $link; ?>"><br>
	<br>
	<input type="submit" name="submit" value="Submit">
  </form>
  
  <h2>Other ways to contribute</h2>
  
  <ul>
    <li>Email me any questions, comments, suggestions, death threats, etc. at <a href="mailto:smpcole@gmail.com">smpcole@gmail.com</a></li>
    <li>Make a pull request on  <a href="https://github.com/smpcole/theoriginalgot" target="_blank">GitHub</a></li>
    <li>
	    <!-- PayPal donate button -->
		<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
			Help cover the ~$120/year it costs to keep this site running<br>
			<input type="hidden" name="cmd" value="_s-xclick">
			<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
			">
			<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
			<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"> 
		</form>
	</li>
  <ul>
  
</body>

</html>
