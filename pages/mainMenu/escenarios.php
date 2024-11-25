<?php
    require("../../config/sessionVerif.php");
    $titlename = "Seleccionar Escenario";
    $stylename = "mainmenu.scss";
   
    require_once("../header.php");
?>

<section id="seleccion-escenarios">
    <div class="container">
        <h2>Selecciona un escenario</h2>
        <form action="escenario.php" method="post">
            <label for="escenario">Selecciona un escenario:</label>
            <select name="escenario" id="escenario">
                <option value="singlePlayer">Escenario 1</option>
                <option value="singlePlayer2">Escenario 2</option>
                <option value="singlePlayer3">Escenario 3</option>
            </select>
            <input type="submit" value="Jugar">
        </form>
    </div>
</section>

<?php include("../footer.php"); ?>
