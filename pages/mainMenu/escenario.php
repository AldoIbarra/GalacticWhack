<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $escenarioSeleccionado = $_POST['escenario'];

    // Redirigir según el escenario seleccionado
    if ($escenarioSeleccionado == "singlePlayer") {
        header("Location: ../singlePlay/singlePlay.php");
        exit();
    } elseif ($escenarioSeleccionado == "singlePlayer2") {
        header("Location: ../singlePlay/singlePlay2.php");
        exit();
    } elseif ($escenarioSeleccionado == "singlePlayer3") {
        header("Location: ../singlePlay/singlePlay3.php");
        exit();
    }

        else {
        echo "Escenario no válido.";
    }
}
?>
