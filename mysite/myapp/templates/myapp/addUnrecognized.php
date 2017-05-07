<?php

include("config.php");

$data = $_GET['data'];

$query = "insert into unrecognized(json_string) values('".$data."')";

mysqli_query($conn, $query);

?>