import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//Solo estilos de página
$(document).ready(function() {
    $('.pause-container').hide();
});

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

//Funcionamiento de Three.js
function executeThree(){
    
}
const display = document.getElementById( 'game-display' );
const displayWidth = display.clientWidth*1.459;
const displayHeight = display.clientHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, displayWidth / displayHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( displayWidth, displayHeight );
console.log(displayWidth);
console.log(window.innerWidth);
console.log(displayWidth*1.459);
console.log(displayHeight);
console.log(window.innerHeight);
console.log(displayHeight*1.459);

display.appendChild( renderer.domElement );

const orbit = new OrbitControls(camera, renderer.domElement);
const lambers = new THREE.MeshNormalMaterial({opacity: 1, depthTest: true, depthWrite: true, alphaTest: 0, visible: true, side: THREE.FrontSide, wireframe: false});

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const texture = new THREE.TextureLoader().load("../resources/TexturaPlaneta.png");

texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );
const material = new THREE.MeshLambertMaterial({ map: texture});

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
const plane = new THREE.Mesh(planeGeometry, material);
plane.material.side = THREE.DoubleSide;
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

camera.position.x = 0.01;
camera.position.y = 4.2;
camera.position.z = 2.4;
orbit.update();
orbit.enabled = false;

const al = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(al);
const pl = new THREE.PointLight(0Xffffff, 10, 10, 2);
const plHelper = new THREE.PointLightHelper(pl);
scene.add(pl, plHelper);

const gridHelper = new THREE.GridHelper();
scene.add(gridHelper);

var positions = new THREE.Vector3(0,0,-1);

//Fondo escena
const loader = new THREE.TextureLoader();
const textureBackground = loader.load('../resources/space3.png');

scene.background = textureBackground;


animate();

function animate(){
    
    pl.position.set(positions.x, positions.y + 2, positions.z);
    box.position.set(positions.x, positions.y, positions.z);

    console.log(camera.position);
    console.log(camera);

    requestAnimationFrame(animate);
    renderer.render( scene, camera );
}