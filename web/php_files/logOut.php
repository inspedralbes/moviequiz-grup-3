<?php
    if ( session_id() === '' ) session_start();
    $_SESSION = array();
    session_destroy();
    echo json_encode(array("loggedOut" => true));
?>