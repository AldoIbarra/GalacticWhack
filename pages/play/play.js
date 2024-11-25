import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

var session;

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

        if (specificTopo) {
            console.log(`¡Topo golpeado con la tecla ${tecla.toUpperCase()}!`);
            hitTopo(specificTopo); 
        }
    })

    let isKeyPressed = false;
    $(document).keydown(function(event){
        if(!isKeyPressed){
            pressDown(event.key);
            isKeyPressed = true;
        }
        console.log(event.key);
    });
    $(document).keyup(function(event) {
        isKeyPressed = false;
        pressUp(event.key);
    });
});


const socket = io('http://localhost:3000'); // URL del servidor Node.js

// Escuchar la conexión
socket.on('connect', () => {
    console.log('Conectado al servidor con ID:', socket.id);
});

// Ejemplo: escuchar actualizaciones de puntos
socket.on('updatePoints', (players) => {
    console.log('Puntos actualizados:', players);
});


//Golpe al topo
function hitTopo(specificTopo) {
    if (specificTopo && specificTopo.position.y > 0) {
        console.log('¡Topo golpeado, bajando!');
        specificTopo.userData.moving = false; 
        specificTopo.position.y = -1;

       
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
    { position: { x: 0, y: -1, z: 4 }, key: 's', player: 1  }, // S
    { position: { x: 0, y: -1, z: -1 }, key: '8', player: 2 }, // 8
    { position: { x: 2, y: -1, z: -2.5 }, key: '6', player: 2 }, // 6
    { position: { x: -2, y: -1, z: -2.5 }, key: '4', player: 2 }, // 4
    { position: { x: 0, y: -1, z: -4 }, key: '2', player: 2 }    // 2
];

const decorationPositions = [
    //Craters
    { position: { x: 0, y: 0, z: 1 }, name: 'crater_1', player: 1 },
    { position: { x: -2, y: 0, z: 2.5 }, name: 'crater_1', player: 1 },
    { position: { x: 2, y: 0, z: 2.5 }, name: 'crater_1', player: 1 },
    { position: { x: 0, y: 0, z: 4 }, name: 'crater_1', player: 1 },
    { position: { x: 0, y: 0, z: 1 }, name: 'crater_1', player: 2 },
    { position: { x: -2, y: 0, z: 2.5 }, name: 'crater_1', player: 2 },
    { position: { x: 2, y: 0, z: 2.5 }, name: 'crater_1', player: 2 },
    { position: { x: 0, y: 0, z: 4 }, name: 'crater_1', player: 2 },
    /*Plants*/
    //player 1 decorations
    { position: { x: 3.9, y: 0, z: 1.4 }, name: 'cucullus_1', player: 1 },
    { position: { x: -2, y: 0, z: 1 }, name: 'cucullus_2', player: 1 },
    { position: { x: -2.5, y: 0, z: 1.5 }, name: 'root_1', player: 1 },
    { position: { x: 3.9, y: 0, z: 4 }, name: 'root_1', player: 1 },
    { position: { x: -3, y: 0, z: 4 }, name: 'root_2', player: 1 },
    { position: { x: -3.3, y: 0, z: 4.5 }, name: 'cucullus_2', player: 1 },
    { position: { x: -2, y: 0, z: 3.5 }, name: 'cucullus_2', player: 1 },
    { position: { x: 2.5, y: 0, z: 4 }, name: 'cucullus_1', player: 1 },
    { position: { x: 2.9, y: 0, z: 0 }, name: 'roca', player: 1 },
    { position: { x: -11, y: 0, z: 4 }, name: 'roca', player: 1 },
    { position: { x: 6, y: 0, z: 3 }, name: 'roca', player: 1 },
    { position: { x: -6, y: 0, z: 3 }, name: 'roca', player: 1 },
    { position: { x: 7, y: 0, z: 0 }, name: 'root_2', player: 1 },
    { position: { x: 10.5, y: 0, z: 4.5 }, name: 'root_2', player: 1 },
    //player 2 decorations
    { position: { x: 3.9, y: 0, z: 1.4 }, name: 'cucullus_1', player: 2 },
    { position: { x: -2, y: 0, z: 1 }, name: 'cucullus_2', player: 2 },
    { position: { x: -2.5, y: 0, z: 1.5 }, name: 'root_1', player: 2 },
    { position: { x: 3.9, y: 0, z: 4 }, name: 'root_1', player: 2 },
    { position: { x: -3, y: 0, z: 4 }, name: 'root_2', player: 2 },
    { position: { x: -3.3, y: 0, z: 4.5 }, name: 'cucullus_2', player: 2 },
    { position: { x: -2, y: 0, z: 3.5 }, name: 'cucullus_2', player: 2 },
    { position: { x: 2.5, y: 0, z: 4 }, name: 'cucullus_1', player: 2 },
    { position: { x: 2.9, y: 0, z: 0 }, name: 'roca', player: 2 },
    { position: { x: -11, y: 0, z: 4 }, name: 'roca', player: 2 },
    { position: { x: 6, y: 0, z: 3 }, name: 'roca', player: 2 },
    { position: { x: -6, y: 0, z: 3 }, name: 'roca', player: 2 },
    { position: { x: 7, y: 0, z: 0 }, name: 'root_2', player: 2 },
    { position: { x: 10.5, y: 0, z: 4.5 }, name: 'root_2', player: 2 }
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
    Load3DModel('../resources/Models/' + name).then((object) => {
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

const mazo1 = await setModel({ position: { x: 0, y: 3, z: 0 }, name: 'MAZO', player: 1 });
const mazo2 = await setModel({ position: { x: 0, y: 3, z: 0 }, name: 'MAZO', player: 1 });

/*---Carga de Plano con Textura y rotación---*/
const texture = new THREE.TextureLoader().load("../resources/texturaEscenario1.jpg");

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
//Jugador 1
camera.position.x = 0.02722054735455402;
camera.position.y = 4.197563889034358;
camera.position.z = 6.447094644527979;

//Jugador 2
// camera.position.x = 0.02722054735455402;
// camera.position.y = 4.197563889034358;
// camera.position.z = -6.447094644527979;

/*---Funcionamiento de órbita (Si deseas usarlo, comenta la linea donde se deshabilita---*/
orbit.update();
orbit.enabled = true;

/*---Luces---*/
const al = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(al);
//Player 1 pointing light
const pl1 = new THREE.PointLight(0Xffffff, 30, 10, 2);
pl1.position.set(0, 4, 2.5)
const pl1Helper = new THREE.PointLightHelper(pl1);
scene.add(pl1, pl1Helper);
//Player 2 pointing light
const pl2 = new THREE.PointLight(0Xffffff, 30, 10, 2);
pl2.position.set(0, 4, -2.5)
const pl2Helper = new THREE.PointLightHelper(pl2);
scene.add(pl2, pl2Helper);

/*---Grid---*/
const gridHelper = new THREE.GridHelper();
scene.add(gridHelper);

/*---Vector de posiciones generales---*/
// var positions = new THREE.Vector3(0,0,-1);

/*---Fondo escena---*/
const loader = new THREE.TextureLoader();
const textureBackground = loader.load('../resources/space3.png');
scene.background = textureBackground;

/* Fuente */
const fontLoader = new FontLoader();

function generateText(text) {
    return new Promise((resolve, reject) => {
      fontLoader.load('../resources/gentilis_bold.typeface.json', function(font) {
        const textGeometry = new TextGeometry(text, {
          font: font,
          size: 0.8,          // Tamaño del texto
          height: 0.1,      // Profundidad del texto (grosor)
          curveSegments: 12, // Segmentos de curva para suavidad
          bevelEnabled: true,   // Habilitar bisel para efecto 3D
          bevelThickness: 0.03, // Grosor del bisel
          bevelSize: 0.02,      // Tamaño del bisel
          bevelOffset: 0,       // Desplazamiento del bisel
          bevelSegments: 5      // Segmentos del bisel
        });
        const textMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        resolve(textMesh);
      }, undefined, function(error) {
        reject(error);
      });
    });
  }
var W = new THREE.Mesh();
var A = new THREE.Mesh();
var S = new THREE.Mesh();
var D = new THREE.Mesh();
var EIGHT = new THREE.Mesh();
var TWO = new THREE.Mesh();
var SIX = new THREE.Mesh();
var FOUR = new THREE.Mesh();
generateText('W').then(textMesh => {
    textMesh.position.set(-3.3, 0, -1.5);
    textMesh.rotation.x = -0.5 * Math.PI;
    W = textMesh;
    //scene.add(W);
    }).catch(error => {
        console.error('Error al cargar la fuente:', error);
});

generateText('S').then(textMesh => {
    textMesh.position.set(-3.3, 0, 0.5);
    textMesh.rotation.x = -0.5 * Math.PI;
    S = textMesh;
    //scene.add(S);
    }).catch(error => {
        console.error('Error al cargar la fuente:', error);
});

generateText('A').then(textMesh => {
    textMesh.position.set(-4.1, 0, -0.6);
    textMesh.rotation.x = -0.5 * Math.PI;
    A = textMesh;
    //scene.add(A);
    }).catch(error => {
        console.error('Error al cargar la fuente:', error);
});

generateText('D').then(textMesh => {
    textMesh.position.set(-2.2, 0, -0.6);
    textMesh.rotation.x = -0.5 * Math.PI;
    D = textMesh;
    //scene.add(D);
    }).catch(error => {
        console.error('Error al cargar la fuente:', error);
});

generateText('4').then(textMesh => {
    textMesh.position.set(1.5, 0, -0.6);
    textMesh.rotation.x = -0.5 * Math.PI;
    FOUR = textMesh;
    //scene.add(FOUR);
    }).catch(error => {
        console.error('Error al cargar la fuente:', error);
});

generateText('6').then(textMesh => {
    textMesh.position.set(3.6, 0, -0.6);
    textMesh.rotation.x = -0.5 * Math.PI;
    SIX = textMesh;
    //scene.add(SIX);
    }).catch(error => {
        console.error('Error al cargar la fuente:', error);
});

generateText('8').then(textMesh => {
    textMesh.position.set(2.5, 0, -1.5);
    textMesh.rotation.x = -0.5 * Math.PI;
    EIGHT = textMesh;
    //scene.add(EIGHT);
    }).catch(error => {
        console.error('Error al cargar la fuente:', error);
});

generateText('2').then(textMesh => {
    textMesh.position.set(2.7, 0, 0.6);
    textMesh.rotation.x = -0.5 * Math.PI;
    TWO = textMesh;
    //scene.add(TWO);
    }).catch(error => {
        console.error('Error al cargar la fuente:', error);
});

animate();

function animate(){

    console.log(camera.position);

    mazo1.position.set(0, -8, 0);
    mazo2.position.set(0, -8, 0);
    
    // pl.position.set(positions.x, positions.y + 3.8, positions.z);

    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;
    // console.log('time: ' + time);

    MoleModel.forEach((topo) => {
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

function pressDown(tecla){
    switch (tecla) {
        case 'w' || 'W':
            W.position.set(-3.3, -0.1, -1.5);
            break;
        case 'a' || 'A':
            A.position.set(-4.1, -0.1, -0.6);
            break;
        case 's'  || 'S':
            S.position.set(-3.3, -0.1, 0.5);
            break;
        case 'd' || 'D':
            D.position.set(-2.2, -0.1, -0.6);
            break;
        case '8':
            EIGHT.position.set(2.5, -0.1, -1.5);
            break;
        case '4':
            FOUR.position.set(1.5, -0.1, -0.6);
            break;
        case '6':
            SIX.position.set(3.6, -0.1, -0.6);
            break;
        case '2':
            TWO.position.set(2.7, -0.1, 0.6);
            break;
        default:
          break;
    }
}

function pressUp(tecla){
    switch (tecla) {
        case 'w' || 'W':
            W.position.set(-3.3, 0, -1.5);
            break;
        case 'a' || 'A':
            A.position.set(-4.1, 0, -0.6);
            break;
        case 's'  || 'S':
            S.position.set(-3.3, 0, 0.5);
            break;
        case 'd' || 'D':
            D.position.set(-2.2, 0, -0.6);
            break;
        case '8':
            EIGHT.position.set(2.5, 0, -1.5);
            break;
        case '4':
            FOUR.position.set(1.5, 0, -0.6);
            break;
        case '6':
            SIX.position.set(3.6, 0, -0.6);
            break;
        case '2':
            TWO.position.set(2.7, 0, 0.6);
            break;
        default:
          break;
    }
}