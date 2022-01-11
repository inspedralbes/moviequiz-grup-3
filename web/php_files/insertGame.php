<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Content-type: application/json');
    require_once(__DIR__ . "/../../server/Managers/GamesManager.php");

    $games_json = $_POST['games_json'];
    $results_json = $_POST['results_json'];

    
    /*========We create the GamesManager Object==========*/
    $GamesManager = new GamesManager();
    
    /*========We call the database to insert or update the game==========*/
    if($_POST["new_game"] == "true")
    {
        $data = $GamesManager->InsertGame($games_json, $results_json);
    }
    else
    {
        $data = $GamesManager->UpdateGame($games_json, $results_json);
    }
    echo json_encode($data);