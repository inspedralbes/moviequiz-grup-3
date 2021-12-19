<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Content-type: application/json');
    require_once(__DIR__ . "/../../server/Managers/GamesManager.php");

    //$data = array($_POST['games_json'], $_POST['results_json']);
    $games_json = $_POST['games_json'];
    $results_json = $_POST['results_json'];

    
    /*========We create the GamesManager Object==========*/
    $GamesManager = new GamesManager();
    
    /*========Know which is the score==========*/
    
    
    /*========We call the database to recive the account==========*/
    $data = $GamesManager->InsertGame($games_json, $results_json);
    echo json_encode($data);