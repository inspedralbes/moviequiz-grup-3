<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Content-type: application/json');
    require_once(__DIR__ . "/../../server/Managers/MoviesManager.php");
    /*========We create the AccountManager Object==========*/
    $MoviesManager = new MoviesManager();
    
    echo json_encode($MoviesManager->selectMyMovies());