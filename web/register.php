<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');
    require_once(__DIR__."/../server/accountSystem/AccountManager.php");
    /*========Save the info we got from POST==========*/
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    /*========We create the AccountManager Object==========*/
    $AccountManager = new AccountManager();
    /*========Set values to AccountManager==========*/
    $AccountManager->setUsername($username);
    $AccountManager->setEmail($email);
    $AccountManager->setPassword($password);
    /*========We call the database to receive the account==========*/
    $data = $AccountManager->Register();

?>