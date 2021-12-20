<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Content-type: application/json');
    require_once(__DIR__ . "/../../server/Managers/AccountManager.php");
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
        $GLOBALS['AccountManager']->insert();
	    return array("error" => false);
    }
?>