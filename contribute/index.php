<html>
  
<head>
<link href="https://fonts.googleapis.com/css?family=MedievalSharp" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="../styles.css">

<title>The Original GOT - Contribute</title>
</head>

<body>
  <h1>Contribute</h1>

  <h2>Have an idea for a connnection?</h2>

  <form method="post">
	<i>A Song of Ice and Fire</i> character:<br>
	<input type="text" name="asoiaf" maxlength="50"><br>
	<br>
	<i>The Accursed Kings</i> character:<br>
	<input type="text" name="tac" maxlength="50"><br>
	<br>
	Connections:<br>
	<textarea maxlength="250" name="connections"></textarea><br>
	<br>
	Your name:<br>
	<input type="text" name="name" maxlength="50"><br>
	<br>
	Email:<br>
	<input type="text" name="email" maxlength="50"><br>
	<br>
	How would you like to be cited (optional)?<br>
	<input type="text" name="citeas" maxlength="50" placeholder="Ex: Robert Baratheon, Robert, RobbyB, rbarath2@westeros.org, etc.  Keep it short."><br>
	<br>
	Link to your website (optional)?<br>
	<input type="text" name="link" maxlength="50" placeholder="Ex: http://robertbaratheon.com, http://facebook.com/robbyb, http://github.com/rbaratheon, etc."><br>
	<br>
	<input type="submit" name="submit">
  </form>

  <?php include_once "form_submitted.php" ?>
  
  <h2>General questions/comments?</h2>

  <!-- TODO: add form -->

  Also feel free to email me (<a href="mailto:smpcole@gmail.com">smpcole@gmail.com</a>) or make a pull request on  <a href="https://github.com/smpcole/asoiaf-vs-tac">GitHub</a>.
  
</body>

</html>
