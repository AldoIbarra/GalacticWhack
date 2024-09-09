<?php
    $titlename = "Videojuego";
    $stylename = "mainmenu.css";
    $javascript = "mainMenu.js";
   
    require_once("../header.php");
?>


<section id="main">
    <div class="container">
        <div class="row">
            <div class="col-6 title">
                <h1 class="bungee">GALACTIC</h1><h1 class="bungee">WHACK</h1>
            </div>
            <div class="col-6 options">
                <a href="../play/play.php" class="newamsterdam orangeButton">JUGAR</a>
                <a href="../play/play.php" class="newamsterdam orangeButton">MULTIJUGADOR</a>
                <a href="../scores/scores.php" class="newamsterdam orangeButton">PUNTUACIONES</a>
                <a href="../settings/settings.php" class="newamsterdam orangeButton">AJUSTES</a>
            </div>
        </div>
    </div>
</section>

<?php include("../footer.php"); ?>