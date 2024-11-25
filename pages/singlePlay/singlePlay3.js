import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

var points = 0;
let instructionsTime = 10;
let gameTime = 60;
var animating = true;
var session;
var mazoMoving = false;
//Solo estilos de página
$(document).ready(function() {
    /* Info de sesión */
    $.ajaxSetup({cache: false})
    $.get('../../api/getsession.php', function (data) {
        session = JSON.parse(data);
        console.log(session);
        console.log(session.UserName);
    });

    /*---Ocultar menu al inicio---*/
    $('.pause-container').hide();

 //Validacion de teclas
    $(document).keypress(function(e) {
        const tecla = String.fromCharCode(e.which).toLowerCase(); 

        const specificTopo = MoleModel.find(topo => topo.userData.key === tecla);

        console.log(specificTopo);

        if(!mazoMoving){
            mazo1.position.set(specificTopo.position.x, 3, specificTopo.position.z+2);
            mazoMoving = true;
        }

        if (specificTopo) {
            console.log(`¡Topo golpeado con la tecla ${tecla.toUpperCase()}!`);
            hitTopo(specificTopo); 
        }
    })
});

function updateScore(){
    points++;
    $('#playerScore').text(`Puntuación: ${points}`);
}


//Golpe al topo
function hitTopo(specificTopo) {
    if (specificTopo && specificTopo.position.y > 0) {
        console.log('¡Topo golpeado, bajando!');
        specificTopo.userData.moving = false; 
        specificTopo.position.y = -1;
        updateScore();
       
        setTimeout(() => {
            specificTopo.position.y = -2; 
            specificTopo.userData.offset = Math.random() * Math.PI * 2; 
            specificTopo.userData.moving = true; 
            console.log('¡Topo restaurado desde debajo del suelo!');
        }, 500);
    }
}
/*---Menu de pausa---*/
$("#pause").click(function(){
    pause();
});

$("#backToGame").click(function(){
    backToGame();
});

function pause(){
    $('#pause-button-container').hide();
    $('.game').hide();
    $('.pause-container').show();
}

function backToGame(){
    $('.pause-container').hide();
    $('#pause-button-container').show();
    $('.game').show();
}


/*---Funcionamiento de carga de modelos---*/
const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ){
    console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
}

manager.onLoad = function ( ) {
    console.log( ' Loading Complete' );
}

manager.onProgress = function ( url, itemsLoaded, itemsTotal ){
    console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files. ');
}

manager.onError = function ( url ){
    console.log(' There was an error loading ' + url );
}

function Load3DModel(path) {
    const loaderModel = new OBJLoader(manager);
    const mtlModel = new MTLLoader(manager);

    return new Promise((resolve, reject) => {
        mtlModel.load(path + '.mtl', function (materials) {
            materials.preload();
            loaderModel.setMaterials(materials);
            loaderModel.load(path + '.obj', function (object) {
                object.scale.copy(new THREE.Vector3(0.3, 0.3, 0.3));
                resolve(object);
            }, undefined, reject);
        }, undefined, reject);
    });
}

const topPositionsAndKeys = [
    { position: { x: 0, y: -1, z: 1 }, key: 'w', player: 1  }, // W
    { position: { x: -2, y: -1, z: 2.5 }, key: 'a', player: 1  }, // A
    { position: { x: 2, y: -1, z: 2.5 }, key: 'd', player: 1  }, // D
    { position: { x: 0, y: -1, z: 4 }, key: 's', player: 1  } // S
];

    const decorationPositions = [
    //Craters
    { position: { x: 0, y: 0, z: 1 }, name: 'crater_1', player: 1 },
    { position: { x: -2, y: 0, z: 2.5 }, name: 'crater_1', player: 1 },
    { position: { x: 2, y: 0, z: 2.5 }, name: 'crater_1', player: 1 },
    { position: { x: 0, y: 0, z: 4 }, name: 'crater_1', player: 1 },
    /*Plants*/
    //player 1 decorations
    { position: { x: 3.9, y: 0, z: 1.4 }, name: 'flora_1', player: 1 },
    { position: { x: -2, y: 0, z: 1 }, name: 'flora_2', player: 1 },
    { position: { x: -2.5, y: 0, z: 1.5 }, name: 'hongo', player: 1 },
    { position: { x: 3.9, y: 0, z: 4 }, name: 'hongo', player: 1 },
    { position: { x: -3, y: 0, z: 4 }, name: 'hongo', player: 1 },
    { position: { x: -3.3, y: 0, z: 4.5 }, name: 'hongo', player: 1 },
    { position: { x: -2, y: 0, z: 3.5 }, name: 'hongo', player: 1 },
    { position: { x: 2.5, y: 0, z: 4 }, name: 'hongo', player: 1 },
    { position: { x: 2.9, y: 0, z: 0 }, name: 'rock', player: 1 },
    { position: { x: -11, y: 0, z: 4 }, name: 'rock', player: 1 },
    { position: { x: 6, y: 0, z: 3 }, name: 'rock', player: 1 },
    { position: { x: -6, y: 0, z: 3 }, name: 'rock', player: 1 },
    { position: { x: 7, y: 0, z: 0 }, name: 'hongo', player: 1 },
    { position: { x: 10.5, y: 0, z: 4.5 }, name: 'hongo', player: 1 },
    //player 2 decorations
    { position: { x: 3.9, y: 0, z: 1.4 }, name: 'flora_1', player: 2 },
    { position: { x: -2, y: 0, z: 1 }, name: 'flora_2', player: 2 },
    { position: { x: -2.5, y: 0, z: 1.5 }, name: 'hongo', player: 2 },
    { position: { x: 3.9, y: 0, z: 4 }, name: 'hongo', player: 2 },
    { position: { x: -3, y: 0, z: 4 }, name: 'hongo', player: 2 },
    { position: { x: -3.3, y: 0, z: 4.5 }, name: 'hongo', player: 2 },
    { position: { x: -2, y: 0, z: 3.5 }, name: 'hongo', player: 2 },
    { position: { x: 2.5, y: 0, z: 4 }, name: 'hongo', player: 2 },
    { position: { x: 2.9, y: 0, z: 0 }, name: 'rock', player: 2 },
    { position: { x: -11, y: 0, z: 4 }, name: 'rock', player: 2 },
    { position: { x: 6, y: 0, z: 3 }, name: 'rock', player: 2 },
    { position: { x: -6, y: 0, z: 3 }, name: 'rock', player: 2 },
    { position: { x: 7, y: 0, z: 0 }, name: 'hongo', player: 2 },
    { position: { x: 10.5, y: 0, z: 4.5 }, name: 'hongo', player: 2 },
];

/*---Configuración de escena---*/
const display = document.getElementById( 'game-display' );
const displayWidth = display.clientWidth*1.459;
const displayHeight = display.clientHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, displayWidth / displayHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( displayWidth, displayHeight );

display.appendChild( renderer.domElement );

/*---Configuración de orbita---*/
const orbit = new OrbitControls(camera, renderer.domElement);

/*---Carga de caja---*/
//Eliminado

/*---Carga de modelo---*/
let MoleModel = [];
const numMole = 8;

topPositionsAndKeys.forEach(({ position, key, player }) =>{
    Load3DModel('../resources/Models/Mole1').then((object) => {
        object.name = "Test";
        object.position.set(position.x, -2, position.z);
        object.userData.speed = Math.random() * 2 + 0.5;
        object.userData.offset = Math.random() * Math.PI * 2; 
        object.userData.originalPosition = { ...position };
        object.userData.key = key;
        object.userData.moving = true;
        object.userData.movementType = Math.floor(Math.random() * 3) + 1;
        object.userData.restingTime = 0;
        object.userData.lastTime = 0;
        object.userData.player = player;
        if(player == 2){
            object.rotation.y = 1 * Math.PI;
        }
        MoleModel.push(object);
        scene.add(object);
        console.log('topo.speed: ' + object.userData.speed);
        console.log('topo.offset: ' + object.userData.offset);
    }).catch((error) => {
        console.error('Error loading model:', error);
    });
});

decorationPositions.forEach(({ position, name, player }) =>{
    Load3DModel('../resources/level3/' + name).then((object) => {
        object.position.set(position.x, position.y, position.z);
        if(player == 2){
            object.rotation.y = 1 * Math.PI;
            object.position.x = position.x * -1;
            object.position.z = position.z * -1;
        }
        scene.add(object);
        console.log(object);
    }).catch((error) => {
        console.error('Error loading model:', error);
    });
});

async function setModel({ position, name, player }) {
    try {
        const object = await Load3DModel('../resources/Models/' + name);
        object.position.set(position.x, position.y, position.z);

        if (player === 2) {
            object.rotation.y = 1 * Math.PI;
            object.position.x = position.x * -1;
            object.position.z = position.z * -1;
        }

        scene.add(object); // Añadirlo a la escena
        return object; // Retornar el modelo
    } catch (error) {
        console.error('Error loading model:', error);
        return null; // Retornar null en caso de error
    }
}

const mazo1 = await setModel({ position: { x: 0, y: -8, z: 0 }, name: 'MAZO', player: 1 });
mazo1.rotation.x = -0.5 * Math.PI;

/*---Carga de Plano con Textura y rotación---*/
const texture = new THREE.TextureLoader().load("../resources/escenario3.jpg");

texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );
const material = new THREE.MeshLambertMaterial({ map: texture});

const planeGeometry = new THREE.PlaneGeometry(30, 10);
const plane = new THREE.Mesh(planeGeometry, material);
plane.material.side = THREE.DoubleSide;
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

/*---Posicionamiento de camara---*/
camera.position.x = 0.02722054735455402;
camera.position.y = 4.197563889034358;
camera.position.z = 6.447094644527979;

/*---Funcionamiento de órbita (Si deseas usarlo, comenta la linea donde se deshabilita---*/
orbit.update();
orbit.enabled = false;

/*---Luces---*/
const al = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(al);
//Player 1 pointing light
const pl1 = new THREE.PointLight(0Xffffff, 30, 10, 2);
pl1.position.set(0, 4, 2.5)
scene.add(pl1);

/*---Grid---*/
const gridHelper = new THREE.GridHelper();
scene.add(gridHelper);

/*---Vector de posiciones generales---*/
// var positions = new THREE.Vector3(0,0,-1);

/*---Fondo escena---*/
const loader = new THREE.TextureLoader();
const textureBackground = loader.load('../resources/space3.png');
scene.background = textureBackground;

/* Comienzo de timers */

function startInstructionsTimer() {
    const timerInterval = setInterval(() => {
        if (instructionsTime > 0) {
            instructionsTime--;
            $('#timeInstructions').text(instructionsTime);
        } else {
            // Detiene el timer cuando llega a 0
            $('#timeInstructions').css('display', 'none');
            $('#time').css('display', 'block');
            clearInterval(timerInterval); 
            console.log('¡Tiempo terminado!');
            animate();
            startGameTimer();
        }
    }, 1000);
}

startInstructionsTimer();

function startGameTimer() {
    const timerGameInterval = setInterval(() => {
        if (gameTime > 0) {
            gameTime--;
            $('#time').text(gameTime);
        } else {
             // Detiene el timer cuando llega a 0
            clearInterval(timerGameInterval);
            console.log('¡Tiempo terminado!');
            animating = false;
            //setScores(points);
        }
    }, 1000);
}

function animate(){

    //console.log(camera.position);

    

    if(animating)
        requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    MoleModel.forEach((topo) => {
        if(mazoMoving){
            mazo1.position.y -= 0.01;
            if(mazo1.position.y <= 1.8){
                mazoMoving = false;
            }
        }
        if (topo && topo.userData.moving) {
            // Si el topo está descansando, verifica si debe volver a moverse
            if (topo.userData.restingTime > 0) {
                if (time - topo.userData.lastTime > topo.userData.restingTime) {
                    topo.userData.restingTime = 0; // Termina el descanso
                } else {
                    return; // Continúa descansando
                }
            }

            // Movimiento según el tipo
            switch (topo.userData.movementType) {
                case 1: // Movimiento suave (sin + cos)
                    topo.position.y = Math.sin(time * topo.userData.speed) +
                                      Math.cos(time * topo.userData.speed * 0.5) - 0.2;
                    break;

                case 2: // Movimiento rápido de entrada/salida
                    topo.position.y = Math.sin(time * (topo.userData.speed * 2)) +
                                        Math.cos(time * (topo.userData.speed * 2)) - 0.2;
                    break;

                case 3: // Movimiento abrupto con pausa arriba
                    if (time % 2 < 1) {
                        topo.position.y = 1; // Mantente arriba por 1 segundo
                    } else {
                        topo.position.y = -0.6; // Baja abruptamente
                    }
                    break;

                default:
                    topo.position.y = 0; // Movimiento seguro
                    break;
            }

            // Si el topo está bajo tierra, inicia el descanso
            if (topo.position.y <= -0.6) {
                topo.userData.restingTime = Math.random() * 2; // Descanso aleatorio entre 1 y 3 segundos
                topo.userData.lastTime = time; // Registrar el tiempo de inicio del descanso
                topo.userData.movementType = Math.floor(Math.random() * 3) + 1; // Cambiar movimiento
                //console.log(`Topo descansando. Nuevo movimiento: ${topo.userData.movementType}`);
            }
        }
    });

    renderer.render( scene, camera );
}

function setScores(points) {
    $.ajax({
        type: "POST",
        url: "../../api/usersController.php",
        data: {
            points: points,
            userName: session.UserName,
            option: 'setScore'
        },
        success: function(data) {
          console.log(data);
        },
        error: function(xhr, status, error) {
          console.log(error);
            alert('Error.');
            console.log('error');
        },
    });
}