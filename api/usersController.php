<?php
include "../models/usersModel.php";
if(session_status()==PHP_SESSION_NONE){
    session_start();
}

try {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'POST':
            if ($_POST['option'] == 'logIn') {
                $username = $_POST['userName'];

                if (empty($username)) {
                    http_response_code(400);
                    echo json_encode(["status" => "error", "message" => "Algún dato vacío"]);
                    break;
                }

                $response = UserClass::logIn($username);
                if ($response[0]) {
                    echo json_encode(["status" => "success", "data" => $response[1]]);
                } else {
                    echo json_encode(["status" => "error", "message" => $response[1]]);
                }
            }
            if ($_POST['option'] == 'setScore') {
                $username = $_POST['userName'];
                $points = $_POST['points'];

                if (empty($username) || empty($points)) {
                    http_response_code(400);
                    echo json_encode(["status" => "error", "message" => "Algún dato vacío"]);
                    break;
                }

                $response = UserClass::getUserScore($username, (int)$points);
                if ($response[0]) {
                    echo json_encode(["status" => "success", "data" => $response[1]]);
                } else {
                    echo json_encode(["status" => "error", "message" => $response[1]]);
                }
            }
            break;

        case 'GET':
            if (isset($_GET['scores'])) {
                $response = UserClass::getScores();
                if ($response[0]) {
                    echo json_encode(["status" => "success", "data" => $response[1]]);
                } else {
                    header('Content-Type: application/json');
                    echo json_encode(['success' => false, 'error' => $response[1]]);
                }
            }
            break;

        default:
            http_response_code(405); // Método no permitido
            echo json_encode(['success' => false, 'message' => 'Método HTTP no soportado.']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error en el servidor: ' . $e->getMessage()]);
}
?>
