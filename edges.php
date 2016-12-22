<?php
chdir("blurbs");
$edgeList = glob("*-*");
for($i = 0; $i < count($edgeList); $i++) {
    $edge = explode("-", $edgeList[$i]);
    $edgeList[$i] = array("tac" => $edge[0], "asoiaf" => $edge[1]);
}
echo json_encode($edgeList);
chdir("..");
?>