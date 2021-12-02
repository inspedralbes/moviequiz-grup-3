
<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');

    require_once  "../server/accountSystem/AccountSystem.php";
    $accountSystem = new AccountSystem();
    $accountSystem->$username = $_POST['username'];
    $accountSystem->$email =  $_POST['email'];
    $accountSystem->$password =  $_POST['password'];
    $data = $accountSystem->select($accountSystem->$email); 
    $myJSON = json_encode($data);
    echo $myJSON;
?>