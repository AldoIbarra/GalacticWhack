<?php
    require("../../config/sessionVerif.php");
    $titlename = "Puntuaciones";
    $stylename = "scores.css";
    $javascript = "scores.js";
   
    require_once("../header.php");

    if(!$_SESSION){
        header("Location:../mainMenu/mainMenu.php");
    }
?>


<section id="main">
    <div class="container">
        <div class="row scores-container">
            <div class="col-12 title">
                <h1 class="bungee">PUNTUACIONES</h1>
            </div>
            <div class="col-12 scores-body">
                <div id="headers">
                    <h3 class="newamsterdam">NOMBRE</h3>
                    <h3 class="newamsterdam">PUNTUACION</h3>
                </div>
                <div id="scores-content">
                    <table class="newamsterdam" id="scoreTable">
                    </table>
                </div>
            </div>
            <div class="col-12 back">
                <a href="../mainMenu/mainMenu.php" class="newamsterdam orangeButton">VOLVER</a>
            </div>
        </div>
    </div>
</section>

<?php include("../footer.php"); ?>