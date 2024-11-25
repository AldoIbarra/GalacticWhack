<?php
include_once '../config/bd_conexion.php';
session_start();

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
}
