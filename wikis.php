<?php
$handle = rawurlencode($_GET["handle"]);
$domain = $_GET["domain"];
if($domain != "en.wikipedia.org/w" && $domain != "awoiaf.westeros.org")
    return;
$url = "http://" . $domain . "/api.php?action=query&redirects&format=json&titles=" . $handle . "&prop=extracts&utf8&exintro&exsentences=3&explaintext";
echo file_get_contents($url);
?>