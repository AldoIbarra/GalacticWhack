<?php
    require("../../config/sessionVerif.php");
    $titlename = "Seleccionar Escenario";
    $stylename = "mainmenu.scss";
   
    require_once("../header.php");
?>

<section id="seleccion-escenarios">
    <div class="container">
        <h2 class="bungee">Selecciona un escenario</h2>
        <form action="escenario.php" method="post">
            <select name="escenario" id="escenario" class="newamsterdam orangeButton">
                <option value="singlePlayer">Planeta rojo - fácil</option>
                <option value="singlePlayer2">Mutantes - intermedio</option>
                <option value="singlePlayer3">El fin del mundo - dificil</option>
            </select>
            <input class="newamsterdam" type="submit" value="Jugar">
        </form>
    </div>
</section>

<?php include("../footer.php"); ?>
