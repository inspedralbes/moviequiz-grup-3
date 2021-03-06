<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Content-type: application/json');
    require_once(__DIR__ . "/../../server/Managers/AccountManager.php");

    $score = $_POST['score'];
    /*========We create the AccountManager Object==========*/
    $AccountManager = new AccountManager();

    /*========We call the database to update the score==========*/
    $data = $AccountManager->updateUserScore($score);
    echo json_encode($data);