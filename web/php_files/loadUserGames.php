<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Content-type: application/json');
    require_once(__DIR__ . "/../../server/Managers/GamesManager.php");

    /*========We create the GamesManager Object==========*/
    $GamesManager = new GamesManager();

    /*========We call the database to load the user games==========*/
    if(isset($_SESSION['uid']))
    {
        $data = $GamesManager->selectUserGames();
        echo json_encode($data);
    }
    else
    {
        $data = array();
        echo json_encode($data);
    }