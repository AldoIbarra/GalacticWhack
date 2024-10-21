import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

//Solo estilos de página
$(document).ready(function() {
    /*---Ocultar menu al inicio---*/
    $('.pause-container').hide();

    /*---Deteccion de botones---*/
    $(document).keypress(function(e){
        var tecla = String.fromCharCode(e.which);
        if((tecla=='a' || tecla=='A')){
            console.log('A');
        }
        if((tecla=='D' || tecla=='d')){
            console.log('D');
        }
        if((tecla=='w' || tecla=='W')){
            console.log('W');
        }
        if((tecla=='s' || tecla=='S')){
            console.log('S');
        }
        if(tecla=='2'){
            console.log('2');
        }
        if(tecla=='8'){
            console.log('8');
        }
        if(tecla=='6'){
            console.log('6');
        }
        if(tecla=='4'){
            console.log('4');
        }
    })
});

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

function Load3DModel(path){
    const loaderModel = new OBJLoader(manager);
    var mtlModel = new MTLLoader(manager);

    mtlModel.load(path+'.mtl', function(materials){
        materials.preload();
        loaderModel.setMaterials(materials);
        loaderModel.load(path+'.obj',
            function( object ){
                object.name="Test";
                object.scale.copy( new THREE.Vector3( 0.7, 0.7, 0.7));
                scene.add(object);
            }
        );
    });
}
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
Load3DModel("../resources/Models/Mole");

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
    renderer.render( scene, camera );
}