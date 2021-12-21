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
    /*========We create the AccountManager Object==========*/
    $MoviesManager = new MoviesManager();
    /*========Set values to AccountManager==========*/
    $MoviesManager->setMid($mid);
    $MoviesManager->setTitle($title);
    $MoviesManager->setYear($year);
    $MoviesManager->setimg_path($imgPath);
    //$MoviesManager->setRating();
    /*========We call the database to recive the account==========*/
    if($_POST["type"] == 'add')
        $data = $MoviesManager->AddMovie();
    else if($_POST["type"] == 'remove')
        $data = $MoviesManager->RemoveMovie();
    echo json_encode($data);
    //echo json_encode(array("id" => $mid, "title" => $title, "year" => $year, "path" => $imgPath));
