<html>
  
<head>
<link href="https://fonts.googleapis.com/css?family=MedievalSharp" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="../styles.css">

<title>The Original GOT - Contribute</title>
</head>

<body>
  <h1>Contribute</h1>

  <?php include_once "form_submitted.php"; ?>

  <form method="post">
	<i>A Song of Ice and Fire</i> character:<br>
	<input type="text" name="asoiaf" maxlength="50" value="<?php echo $asoiaf; ?>"><br>
	<br>
	<i>The Accursed Kings</i> character:<br>
	<input type="text" name="tac" maxlength="50" value="<?php echo $tac; ?>"><br>
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

  <?php echo $response; ?>
  
  <h2>Other ways to contribute</h2>
  
  <ul>
    <li>Email me any questions, comments, suggestions, death threats, etc. at <a href="mailto:smpcole@gmail.com">smpcole@gmail.com</a></li>
    <li>Make a pull request on  <a href="https://github.com/smpcole/asoiaf-vs-tac" target="_blank">GitHub</a></li>
    <!-- TODO: donate link here -->
  <ul>
  
</body>

</html>
