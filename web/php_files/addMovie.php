<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Content-type: application/json');
    require_once(__DIR__ . "/../../server/Managers/MoviesManager.php");
    /*========Save the info we got from POST==========*/
    $mid = $_POST["id"];
    $title = $_POST["title"];
    $year = $_POST["year"];
    $imgPath = $_POST["imgPath"];
    /*========We create the MoviesManager Object==========*/
    $MoviesManager = new MoviesManager();
    /*========Set values to MoviesManager==========*/
    $MoviesManager->setMid($mid);
    $MoviesManager->setTitle($title);
    $MoviesManager->setYear($year);
    $MoviesManager->setimg_path($imgPath);
    /*========We call the database to add/remove the movie==========*/
    if($_POST["type"] == 'add')
        $data = $MoviesManager->AddMovie();
    else if($_POST["type"] == 'remove')
        $data = $MoviesManager->RemoveMovie();
    echo json_encode($data);
