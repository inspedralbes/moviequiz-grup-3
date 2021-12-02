<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');
    require_once(__DIR__."/../server/accountSystem/AccountManager.php");
    /*========Save the info we got from POST==========*/
    $email = $_POST["email"];
    $password = $_POST["password"];
    /*========We create the AccountManager Object==========*/
    $AccountManager = new AccountManager();
    /*========Set the email to AccountManager==========*/
    $AccountManager->setEmail($email);
    /*========We call the database to recive the account==========*/
    $data = $AccountManager->LogIn();
    echo json_encode($data);
?>