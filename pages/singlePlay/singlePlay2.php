<?php
    require("../../config/sessionVerif.php");
    $titlename = "Jugar";
    $stylename = "singlePlay.css";
    $javascript = "singlePlay2.js";
   
    require_once("../header.php");

    if(!$_SESSION){
        header("Location:../mainMenu/mainMenu.php");
    }
?>


<section id="main">
    <div id="pause-button-container">
        <button id="pause"><i class="fa fa-pause"></i></button>
    </div>
    <div class="container game" id="game-display">
        <div class="row">
            <div class="col-12">
                <div id="score">
                    <h1 class="bungee"><?= $_SESSION['UserName'];?></h1>
                    <h4 id="playerScore">Puntuación: 0</h4>
                </div>
                <div id="timeContainer">
                    <h1 id="timeInstructions" class="bungee">10</h1>
                    <h1 id="time" class="bungee">10</h1>
                </div>
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
<script src="singlePlay2.js"></script>


<?php include("../footer.php"); ?>