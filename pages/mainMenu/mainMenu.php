<?php
    require("../../config/sessionVerif.php");
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
                <input class="newamsterdam orangeButton noSession" id="user" type="text" placeholder="usuario">
                <button class="newamsterdam orangeButton noSession" onclick="onLogin();">iniciar sesión</button>
                <a href="../mainMenu/escenarios.php" class="newamsterdam orangeButton withSession">JUGAR</a>
                <a href="../play/play.php" class="newamsterdam orangeButton withSession">MULTIJUGADOR</a>
                <a href="../scores/scores.php" class="newamsterdam orangeButton withSession">PUNTUACIONES</a>
                <a href="../settings/settings.php" class="newamsterdam orangeButton withSession">AJUSTES</a>
                <a href="../../config/cerrarSesion.php" class="newamsterdam orangeButton withSession">CERRAR SESIÓN</a>
            </div>
        </div>
    </div>
</section>

<script src="mainMenu.js"></script>
<?php include("../footer.php"); ?>