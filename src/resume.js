import * as THREE from 'three';

let renderer, scene, camera, cube;

init()
animate()

function init() {
  initRenderer();
  initScene();
  initCamera();
  initResume();
  initLights()
}

function animate() {
  renderer.render(scene, camera);

  // https://threejs.org/manual/#en/fundamentals
  function render(time) {
    time *= 0.001; // convert time to seconds

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cube.rotation.x = 2 * time;
    cube.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

// https://threejs.org/manual/#en/responsive
function resizeRendererToDisplaySize(renderer, maxPixelCount = 3840 * 2160) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  let width = Math.floor(canvas.clientWidth * pixelRatio);
  let height = Math.floor(canvas.clientHeight * pixelRatio);
  const pixelCount = width * height;
  const renderScale =
    pixelCount > maxPixelCount ? Math.sqrt(maxPixelCount / pixelCount) : 1;
  width = Math.floor(width * renderScale);
  height = Math.floor(height * renderScale);

  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function initRenderer() {
  const canvas = document.querySelector('#c');
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
}

function initScene() {
  scene = new THREE.Scene();
}

function initCamera() {
  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 100;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 15;
}

function initResume() {
  const loader = new THREE.TextureLoader();

  const geometry = new THREE.BoxGeometry(9, 9, 0.1);

  const resume = new THREE.MeshPhongMaterial({
    map: loadColorTexture('assets/images/resume.jpg', loader),
  });

  const edge = new THREE.MeshPhongMaterial({
    color: 0x222222,
  });

  const back = new THREE.MeshPhongMaterial({
    color: 0xffffff,
  });

  const materials = [edge, edge, edge, edge, resume, back];

  cube = new THREE.Mesh(geometry, materials);

  scene.add(cube);
}

function loadColorTexture(path, loader) {
  const texture = loader.load(path);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function initLights() {
  const color = 0xffffff;
  const intensity = 3;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
}