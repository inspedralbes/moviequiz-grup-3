<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Content-type: application/json');
    require_once(__DIR__ . "/../../server/Managers/AccountManager.php");
    $AccountManager = new AccountManager();
    if ( session_id() === '' ) session_start();
    if(isset($_SESSION["uid"]))
    {
        $GLOBALS['AccountManager']->setUid($_SESSION["uid"]);
        $data = $GLOBALS['AccountManager']->selectById();
        echo json_encode(array("isLogged" => true, "user" => $data));
    }
    else
    {
        echo json_encode(array("isLogged" => false));
    }
    die();