<?php
    if(session_status()==PHP_SESSION_NONE){
        session_start();
    }
    session_destroy();

    header("location:../pages/mainMenu/mainMenu.php");
    //header("location:testecho.php");
    exit();
?>
