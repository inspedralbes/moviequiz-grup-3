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
            $_SESSION["uid"] = $data[0]['id_user'];
            return array("user" => $data, "session_id" => $_SESSION["uid"]);
        }
        else{
            return array("login" => "failed");
        }
    }


?>