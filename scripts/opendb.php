<?php
$dbhost = 'collabotron.db.7585745.hostedresource.com';
$dbuser = 'collabotron';
$dbpass = 'Sm1thT0w3r';
$dbname = 'collabotron';

$conn = mysql_connect($dbhost, $dbuser, $dbpass) or die  ('Error connecting to mysql');

mysql_select_db($dbname);
?>
