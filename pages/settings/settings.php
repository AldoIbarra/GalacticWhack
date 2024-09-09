<?php
    $titlename = "Ajustes";
    $stylename = "settings.css";
    $javascript = "settings.js";
   
    require_once("../header.php");
?>


<section id="main">
    <div class="container">
        <div class="row settings-container">
            <div class="col-12 title">
                <h1 class="bungee">AJUSTES</h1>
            </div>
            <div class="col-12 settings-body">
                <div id="musicRange">
                    <label for="volume" class="newamsterdam">VOLUMEN DE LA MUSICA</label>
                    <input type="range" min="1" max="100" value="50" name="volume" id="slider">
                </div>
                <div id="otherOptions">
                    <h3 class="newamsterdam">OTRAS OPCIONES CON EL MISMO ESTILO</h3>
                </div>
            </div>
            <div class="col-12 back">
                <a href="../mainMenu/mainMenu.php" class="newamsterdam orangeButton">VOLVER</a>
            </div>
        </div>
    </div>
</section>

<?php include("../footer.php"); ?>