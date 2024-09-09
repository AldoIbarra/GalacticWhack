<?php
    $titlename = "Jugar";
    $stylename = "play.css";
    $javascript = "play.js";
   
    require_once("../header.php");
?>


<section id="main">
    <div id="pause-button-container">
        <button onclick="pause()"><i class="fa fa-pause"></i></button>
    </div>
    <div class="container game">
        <div class="row">
            <div class="col-12">
            </div>
        </div>
    </div>
    <div class="container pause-container">
        <div class="row">
            <div class="col-12 pause-body">
                <div id="title">
                    <h1 class="bungee">PAUSA</h1>
                </div>
                <div id="options">
                    <button class="newamsterdam orangeButton" onclick="backToGame()">VOLVER</button>
                    <a href="../settings/settings.php" class="newamsterdam orangeButton">AJUSTES</a>
                    <a href="../mainMenu/mainMenu.php" class="newamsterdam orangeButton">MENU PRINCIPAL</a>
                </div>
            </div>
        </div>
    </div>
</section>

<?php include("../footer.php"); ?>