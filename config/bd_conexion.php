<?php

    class BD{
        public static $instance = null;
        public static function createInstance(){
            
            if (!isset(self::$instance) ){
                $opciones[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
                self::$instance = new PDO('mysql:host=localhost;dbname=GalacticWhack','root', '0109115M', $opciones );
            }
            return self::$instance;

        }
    }

?>