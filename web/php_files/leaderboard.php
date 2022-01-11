<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Content-type: application/json');
    require_once(__DIR__ . "/../../server/Managers/AccountManager.php");
    if ( session_id() === '' ) session_start();
    /*========We create the AccountManager Object==========*/
    $AccountManager = new AccountManager();
    $data = $AccountManager->selectLeaderboard(10);
    echo json_encode($AccountManager->selectLeaderboard(10));

?>