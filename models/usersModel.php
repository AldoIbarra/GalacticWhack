<?php
include_once '../config/bd_conexion.php';
if(session_status()==PHP_SESSION_NONE){
    session_start();
}

class UserClass {

    private static $connection;

    public static function initializeConnection() {
        if (!self::$connection) {
            self::$connection = BD::createInstance();
        }
    }

    public static function signUp($UserName) {
        self::initializeConnection();

        try {
            $sqlInsert = "INSERT INTO Users (UserName, MaxScore) VALUES (:UserName, :MaxScore)";
            $consultaInsert = self::$connection->prepare($sqlInsert);
            $consultaInsert->execute([
                ':UserName' => $UserName,
                ':MaxScore' => 0
            ]);

            return self::logIn($UserName);
        } catch (PDOException $e) {
            if ($e->errorInfo[1] == 1062) {
                return [false, "El usuario ya ha sido agregado."];
            }
            return [false, "Error al agregar usuario: " . $e->getMessage()];
        }
    }

    public static function logIn($UserName) {
        self::initializeConnection();

        try {
            $sqlSelect = "SELECT * FROM Users WHERE UserName = :UserName";
            $consultaSelect = self::$connection->prepare($sqlSelect);
            $consultaSelect->execute([
                ':UserName' => $UserName
            ]);

            $user = $consultaSelect->fetch();

            if (!$user) {
                return self::signUp($UserName);
            }

            $_SESSION['UserName'] = $user['UserName'];
            $_SESSION['MaxScore'] = $user['MaxScore'];

            return [true, $user];
        } catch (PDOException $e) {
            return [false, "Error al iniciar sesión: " . $e->getMessage()];
        }
    }

    public static function getScores() {
        self::initializeConnection();
    
        try {
            $sqlSelect = "SELECT * FROM Users ORDER BY MaxScore DESC";
            $consultaSelect = self::$connection->prepare($sqlSelect);
            $consultaSelect->execute();
            $users = $consultaSelect->fetchAll(PDO::FETCH_ASSOC);
    
            return [true, $users];
        } catch (PDOException $e) {
            return [false, "Error al iniciar sesión: " . $e->getMessage()];
        }
    }

    public static function getUserScore($UserName, $points) {
        self::initializeConnection();
    
        try {
            // Consultar al usuario por nombre
            $sqlSelect = "SELECT * FROM Users WHERE UserName = :UserName";
            $consultaSelect = self::$connection->prepare($sqlSelect);
            $consultaSelect->execute([':UserName' => $UserName]);
    
            $user = $consultaSelect->fetch(PDO::FETCH_ASSOC);

            // Si el usuario no existe, devolver un error
            if (!$user) {
                return [false, "El usuario no existe."];
            }
    
            // Obtener el puntaje actual
            $currentMaxScore = $user['MaxScore'];
    
            // Comparar puntos y actualizar si es necesario
            if ($points > $currentMaxScore) {
                $updateResponse = self::updateUserScore($UserName, $points);
    
                if ($updateResponse[0]) {
                    $_SESSION['MaxScore'] = $points; // Actualizar la sesión
                } else {
                    return [false, "Error al actualizar el puntaje: " . $updateResponse[1]];
                }
            }
    
            return [true, $user];
        } catch (PDOException $e) {
            return [false, "Error al obtener el puntaje del usuario: " . $e->getMessage()];
        }
    }

    public static function updateUserScore($UserName, $points) {
        try {
            $sqlUpdate = "UPDATE Users SET MaxScore = :MaxScore WHERE UserName = :UserName";
            $consultaUpdate = self::$connection->prepare($sqlUpdate);
            $consultaUpdate->execute([
                ':MaxScore' => $points,
                ':UserName' => $UserName
            ]);
    
            if ($consultaUpdate->rowCount() > 0) {
                return [true, "Puntaje actualizado correctamente"];
            } else {
                return [false, "No se pudo actualizar el puntaje. Puede que no haya cambios."];
            }
        } catch (PDOException $e) {
            return [false, "Error al actualizar el puntaje: " . $e->getMessage()];
        }
    }
    
}
