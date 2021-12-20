<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Content-type: application/json');
    require_once(__DIR__ . "/../../server/Managers/GamesManager.php");

    /*========We create the GamesManager Object==========*/
    $GamesManager = new GamesManager();

    /*========We call the database to recive the account==========*/
    $data = $GamesManager->PlayExistingGame();
    echo json_encode($data);