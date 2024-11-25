<?php
    include "../models/usersModel.php";
    session_start();

    if($_POST['option'] == 'logIn'){
        $username = $_POST['userName'];

        $data = json_decode(file_get_contents('php://input'), true);
        if(empty($username)){
            http_response_code(400);
            echo json_encode(array("status" => "error", "message" => "algun dato vacio"));
        }
        $response = UserClass::logIn($username);
        if ($response[0]) {
            echo "Inicio de sesión exitoso: ";
            print_r($response[1]); // Datos del usuario
        } else {
            echo "Error: " . $response[1];
        }
    }

    
?>