import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import {GLTFLoader} from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);
// console.log(controls);
const clock = new THREE.Clock();
let mixer;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xcfff04 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const gloader = new GLTFLoader();
gloader.load('./Rover/scene.gltf', (rover) => {
    console.log('THREE: ',THREE)
    mixer = new THREE.AnimationMixer(rover.scene);
    rover.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
    });

    scene.add(rover.scene);
});

const light = new THREE.AmbientLight(0xCCCCCC);
scene.add(light);


const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
    './textures/arid_ft.jpg',
    './textures/arid_bk.jpg',
    './textures/arid_up.jpg',
    './textures/arid_dn.jpg',
    './textures/arid_rt.jpg',
    './textures/arid_lf.jpg',
]);
scene.background = texture;



function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    let delta = clock.getDelta();
    if (mixer) {
    mixer.update(delta);
    }
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}
animate();



