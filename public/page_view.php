<?php
$page = $_GET["page"];
$path = "../templates/" . $page . ".html";
$obj = @fopen($path,"r") or die("Bad Request");
$data = fread($obj,filesize($path));
fclose($obj);

$path = "../templates/translations/" . $_GET["file"] . ".json";
$obj = @fopen($path,"r") or die("Bad Request");
$translationData = json_decode(fread($obj,filesize($path))) -> {$page};
fclose($obj);
$keys = array_keys((array) $translationData);

foreach ( $keys as $value ) {
  $data = str_replace("{" . $value . "}",$translationData -> {$value},$data);
}
echo $data;
?>
