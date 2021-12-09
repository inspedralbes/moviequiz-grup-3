<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');
    require_once(__DIR__ . "/../../server/accountSystem/AccountManager.php");
    /*========Save the info we got from POST==========*/
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    /*========We create the AccountManager Object==========*/
    $AccountManager = new AccountManager();
    /*========Set values to AccountManager==========*/
    $AccountManager->setUsername($username);
    $AccountManager->setEmail($email);
    $AccountManager->setPassword($password);

    /*========Check errors==========*/
    $data = ExecuteRegister();

    /*========JSON WE SEND BACK TO AJAX CALL==========*/
    echo json_encode($data);

    function ExecuteRegister(): array
    {
        if($GLOBALS['AccountManager']->getUsername() === null || $GLOBALS['AccountManager']->getPassword() === null  || $GLOBALS['AccountManager']->getEmail() === null)
        {
            return $GLOBALS['AccountManager']->errorAccount;
        }
        else if($GLOBALS['AccountManager']->select() != null)
        {
            return array("errorMsg" => "Cuenta ya creada");
        }
        /*========We call the database to receive the account==========*/
        $GLOBALS['AccountManager']->setUid(uniqid("", true));
        return $GLOBALS['AccountManager']->insert();
    }
?>