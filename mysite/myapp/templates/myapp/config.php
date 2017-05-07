<?php


//define php db connectivity constants and create a handle
define('SERVER','localhost');
define('USERNAME','root');
define('PASSWORD','gaurav');
define('DB_NAME','throwmeamovie');

//create a connection to the database.
//handle will be used in the files where db tables are used
$conn = mysqli_connect(SERVER, USERNAME, PASSWORD, DB_NAME) or die('error connecting to the database');

?>