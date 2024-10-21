import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

//Solo estilos de página
$(document).ready(function() {
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
                object.name = "Test";
                object.scale.copy(new THREE.Vector3(0.3, 0.3, 0.3))
                object.userData.moving = true;  
                resolve(object);
            }, undefined, reject);
        }, undefined, reject);
    });
}

const topPositionsAndKeys = [
    { position: { x: -3, y: -5, z: -3 }, key: 'w' }, // W
    { position: { x: -4.7, y: -1, z: -1 }, key: 'a' }, // A
    { position: { x: -1, y: -1, z: -1 }, key: 'd' }, // D
    { position: { x: -3, y: -1, z: 1 }, key: 's' }, // S
    { position: { x: 3, y: -1, z: -3 }, key: '6' }, // 6
    { position: { x: 4.7, y: -1, z: -1 }, key: '2' }, // 2
    { position: { x: 1, y: -1, z: -1 }, key: '8' }, // 8
    { position: { x: 3, y: -1, z: 1 }, key: '4' }    // 4
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
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

/*---Carga de modelo---*/
let MoleModel = [];
const numMole = 8;

topPositionsAndKeys.forEach(({ position, key }) =>{
    Load3DModel('../resources/Models/Mole').then((object) => {
       
        object.position.set(position.x, -2, position.z); 
        object.userData.speed = Math.random() * 2 + 0.5;
        object.userData.offset = Math.random() * Math.PI * 2; 
        object.userData.originalPosition = { ...position };
        object.userData.key = key;
        MoleModel.push(object);  
        scene.add(object);  
    }).catch((error) => {
        console.error('Error loading model:', error);
    });
});


/*---Carga de Plano con Textura y rotación---*/
const texture = new THREE.TextureLoader().load("../resources/TexturaPlaneta.png");

texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );
const material = new THREE.MeshLambertMaterial({ map: texture});

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const plane = new THREE.Mesh(planeGeometry, material);
plane.material.side = THREE.DoubleSide;
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

/*---Posicionamiento de camara---*/
camera.position.x = 0.01;
camera.position.y = 4.2;
camera.position.z = 2.4;

/*---Funcionamiento de órbita (Si deseas usarlo, comenta la linea donde se deshabilita---*/
orbit.update();
orbit.enabled = false;

/*---Luces---*/
const al = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(al);
const pl = new THREE.PointLight(0Xffffff, 10, 10, 2);
const plHelper = new THREE.PointLightHelper(pl);
scene.add(pl, plHelper);

/*---Grid---*/
const gridHelper = new THREE.GridHelper();
scene.add(gridHelper);

/*---Vector de posiciones generales---*/
var positions = new THREE.Vector3(0,0,-1);

/*---Fondo escena---*/
const loader = new THREE.TextureLoader();
const textureBackground = loader.load('../resources/space3.png');
scene.background = textureBackground;


animate();

function animate(){
    
    pl.position.set(positions.x, positions.y + 2, positions.z);
    box.position.set(positions.x, positions.y, positions.z);

    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    MoleModel.forEach((topo) => {
        if (topo && topo.userData.moving) {
            topo.position.y = Math.sin(time * topo.userData.speed + topo.userData.offset) * 0.5; 
        }
    });

    renderer.render( scene, camera );
}