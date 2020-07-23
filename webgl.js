import random from 'canvas-sketch-util/random';
import palettes from 'nice-color-palettes';
import { WebGLRenderer, OrthographicCamera, DirectionalLight, AmbientLight, Scene, BoxGeometry, MeshStandardMaterial, Mesh, Vector3} from 'three';
import eases from 'eases';
// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

//random.setSeed(10);

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const palette = random.shuffle(
  random.pick(palettes)
).slice(0, 2);
console.log(palette);

const settings = {
  dimesions: [512, 512],
  fps: 24,
  duration: 6,
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",

  attributes: {antialias: true},
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  renderer.setClearColor("hsl(0, 0%, 95%)", 1.0);

  // Setup a camera
  // const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
  // camera.position.set(0, 0, -4);
  // camera.lookAt(new THREE.Vector3());

  const camera = new OrthographicCamera();

  // Setup camera controller
  // const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new Scene();

  // Setup a geometry
  // const geometry = new THREE.SphereGeometry(1, 32, 16);

  const geometry = new BoxGeometry(1, 1, 1);
  // Setup a mesh with geometry + material
  for (let i = 0; i < 40; i++) {
    // Setup a material
    const material = new MeshStandardMaterial({
      color: random.pick(palette),
      // wireframe: true
    });
    const mesh = new Mesh(geometry, material);
    mesh.position.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1)
    );
    mesh.scale.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1)
      );
    mesh.scale.multiplyScalar(0.2);
    scene.add(mesh);
  }

  const light = new DirectionalLight('white', 1);
  light.position.set(2, 2, 4);
  scene.add(light);
  scene.add(new AmbientLight('hsl(0, 0%, 20%)'));

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      const aspect = viewportWidth / viewportHeight;
      camera.aspect = aspect;

      // Ortho zoom
      const zoom = 3.0;

      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far = 100;

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new Vector3());

      // Update the camera
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time, playhead }) {
      // controls.update();
      const t = Math.sin(playhead * Math.PI);
      scene.rotation.y = eases.expoInOut(t); //time * 0.4;
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      // controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
