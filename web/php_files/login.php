<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');
    require_once(__DIR__ . "/../../server/accountSystem/AccountManager.php");
    /*========Save the info we got from POST==========*/
    $email = $_POST["email"];
    $password = $_POST["password"];
    /*========We create the AccountManager Object==========*/
    $AccountManager = new AccountManager();
    /*========Set values to AccountManager==========*/
    $AccountManager->setEmail($email);
    $AccountManager->setPassword($password);
    /*========We call the database to recive the account==========*/
    $data = ExecuteLogin();
    echo json_encode($data);

    function ExecuteLogin(): array
    {
        $data = $GLOBALS['AccountManager']->select();
        if (password_verify($GLOBALS['password'], $data[0]['password'])) {
            session_start();
            $_SESSION["uid"] = $data[0]['id'];
            return $data;
        }
        else{
            return array("Correct"=>$data[0]['password'], "Sent"=>$GLOBALS['password']);
            //return array("Exito" => false);
        }
    }


?>