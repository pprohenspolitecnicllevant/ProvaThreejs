import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from 'three/examples/jsm/Addons.js';

const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.setAnimationLoop(animate)
renderer.shadowMap.enabled = true;
document.querySelector('body').appendChild(renderer.domElement)

//const textureLoader = new THREE.TextureLoader();

const hdriLoader = new RGBELoader()
hdriLoader.load("hdri/curves.hdr", (fons) => {
  fons.mapping = THREE.EquirectangularReflectionMapping;
  scene.background=fons;
  scene.environment = fons;
})

const modelLoader = new GLTFLoader()

const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000)
const scene = new THREE.Scene()

//controls
const controls = new OrbitControls(camera, renderer.domElement);

//pla
const plaGeo = new THREE.PlaneGeometry(10,10)
const plaMaterial = new THREE.MeshStandardMaterial({color:0xcccccc})
const pla = new THREE.Mesh(plaGeo, plaMaterial)
pla.receiveShadow = true
//scene.add(pla)
pla.position.set(0, -5, 0)
pla.rotateX(-90 * Math.PI/4)


// // //Textura
// const albedo = "textures/mosaic/mosaic_diff.jpg"
// const normal = "textures/mosaic/mosaic_nor.jpg"

// const albedoTexture = textureLoader.load(albedo);
// const normalTexture = textureLoader.load(normal);

// // // cub
// const cubeGeo = new THREE.BoxGeometry(4, 4, 4)
// const cubeMat = new THREE.MeshStandardMaterial({
//   map: albedoTexture,
//   normalMap: normalTexture,
//   normalScale: new THREE.Vector2(2,2)
// })
// const cube = new THREE.Mesh(cubeGeo, cubeMat)
// cube.castShadow = true
// scene.add(cube)

modelLoader.load('models/spray/spray_paint_bottles_02_2k.gltf', 
  (gltf)=>{
    const model = gltf.scene
    scene.add(model)
    model.scale.set(10,10,10)
    // això se crida quan el model està carregat
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    // això es crida quan hi ha un error en la cárrega
  }
 )

// modelLoader.load('models/camera/camera.gltf', 
// (gltf) =>{
//   const model = gltf.scene;
//   scene.add(model)
//   model.position.set(0,0,0)
//   model.scale.set(10,10,10)
//   model.castShadow = true;
//   camera.lookAt(model.position)
// },
// (xhr) => {
//   // Aquesta funció de callback es crida mentre es carrega el model
//   // i podem mostrar el progrés de càrrega
//   console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
// },
// (error) => {
//   // Callback per quan hi ha un error. El podem mostrar per consola.
//   // console.error(error);
// })

camera.position.set(0, 5, 5)

const llumGlobal = new THREE.DirectionalLight(0xffffff, 5)
llumGlobal.castShadow = true;
llumGlobal.rotateX(60)
llumGlobal.rotateY(60)
scene.add(llumGlobal)

const ambientLight = new THREE.AmbientLight( 0x404040, 4 ); // soft white light
scene.add( ambientLight );

let time = Date.now();
function animate() {
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;
  ///////////
  // cube.rotateX(0.0001 * deltaTime)
  // cube.rotateY(0.0001 * deltaTime)
  /////////
  renderer.render(scene, camera)
}

// event javascript per redimensionar de forma responsive
window.addEventListener("resize", () => {
  //actualitzem tamany del renderer, de l'aspect ratio de la càmera, i
  //la matriu de projecció.
  //finalment limitem el pixel ratio a 2 per temes de rendiment
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

