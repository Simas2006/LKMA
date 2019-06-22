<?php
$page = $_GET["page"];
$path = "../templates/" . $page . ".html";
$obj = @fopen($path,"r") or die("Bad Request");
echo fread($obj,filesize($path));
fclose($obj);
?>
