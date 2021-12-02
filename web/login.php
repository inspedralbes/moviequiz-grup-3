
<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');
    $email = $_POST["email"];
    $password = $_POST["password"];
    $array = array("email"=>$email, "password"=>$password);
    echo json_encode($array);
?>