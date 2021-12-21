<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Content-type: application/json');
    require_once(__DIR__ . "/../../server/Managers/MoviesManager.php");



    /*========We create the AccountManager Object==========*/
    $MoviesManager = new MoviesManager();
    $MoviesManager->setMid($_POST["id_movie"]);
    $MoviesManager->setComment($_POST["comment"]);
    $MoviesManager->setRating($_POST["rating"]);
    /*========We call the database to recive the account==========*/
    $data = $MoviesManager->UpdateMovieFeedback();
    echo json_encode($data);