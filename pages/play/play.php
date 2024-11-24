<?php
    $titlename = "Jugar";
    $stylename = "play.css";
    $javascript = "play.js";
   
    require_once("../header.php");
?>


<section id="main">
    <div id="pause-button-container">
        <button id="pause"><i class="fa fa-pause"></i></button>
    </div>
    <div class="container game" id="game-display">
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
                    <button class="newamsterdam orangeButton" id="backToGame">VOLVER</button>
                    <a href="../settings/settings.php" class="newamsterdam orangeButton">AJUSTES</a>
                    <a href="../mainMenu/mainMenu.php" class="newamsterdam orangeButton">MENU PRINCIPAL</a>
                </div>
            </div>
        </div>
    </div>
</section>
<script src="https://cdn.socket.io/4.5.0/socket.io.min.js"></script>
<script src="play.js"></script>


<?php include("../footer.php"); ?>