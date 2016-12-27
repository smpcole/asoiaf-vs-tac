<?php
chdir("blurbs");
$paths = glob("*-*");
$edgeList = array();
for($i = 0; $i < count($paths); $i++) {
    $edge = explode("-", $paths[$i]);

    # Skip authors
    if($edge[0] == "md" || $edge[1] == "grrm")
        continue;
    
    array_push($edgeList, array("tac" => $edge[0], "asoiaf" => $edge[1]));
}
echo json_encode($edgeList);
chdir("..");
?>