import { Component, OnInit, Input } from '@angular/core';
import * as THREE from 'three';
import { Composer, Renderer } from 'src/app/classes/composer';
import { MaterialLibrary } from 'src/app/classes/material-library';
import { MeshLoader } from 'src/app/classes/mesh-loader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Material } from 'src/app/classes/material';
import { Vector3, AmbientLight, DirectionalLight, DoubleSide, Object3D } from 'three';
import { Callback } from 'src/app/interfaces/callback';
import { SolarSystem } from 'src/app/classes/solar-system';
import { SolarBody } from 'src/app/classes/solar-body';

@Component({
  selector: 'app-threejs',
  templateUrl: './threejs.component.html',
  styleUrls: ['./threejs.component.scss']
})
export class ThreejsComponent implements OnInit {
  @Input() width: number;
  @Input() occupiedHeight: number;
  height: number;

  canvas: HTMLCanvasElement;

  // ThreeJS properties
  perspectiveCamera: THREE.PerspectiveCamera;
  materialLibrary: MaterialLibrary;
  renderer: Renderer;
  composer: Composer;
  scene: SolarSystem;
  orbit: OrbitControls;
  meshLoader: MeshLoader;
  initLookat: THREE.Vector3 = new Vector3(0, 0, 0);
  mouse: THREE.Vector2;

  raycaster: THREE.Raycaster = new THREE.Raycaster();

  constructor() { }

  ngOnInit() {
    this.width = (window.innerWidth / 12) * 8;
    this.height = window.innerHeight - this.occupiedHeight;

    this.canvas = document.getElementById('threejs') as HTMLCanvasElement;
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mousedown', this.onMouseDown);

    // Camera
    const aspect = this.width / this.height;
    this.perspectiveCamera = new THREE.PerspectiveCamera(45, aspect, 1, 10000);
    this.perspectiveCamera.position.set(0, 0, 60);

    // Scene
    this.scene = new SolarSystem();

    // Meshloader
    this.meshLoader = new MeshLoader();

    // Renderer
    this.renderer = new Renderer(this.canvas);
    this.renderer.setSize(this.width, this.height);

    this.composer = new Composer(this.scene, this.perspectiveCamera, this.renderer);
    this.renderer.setSize(this.width, this.height);
    this.composer.setSize(this.width, this.height);

    // Orbit
    this.orbit = new OrbitControls(this.perspectiveCamera, this.composer.renderer.domElement);
    this.orbit.target = this.initLookat;
    this.orbit.enableZoom = false;
    this.orbit.enablePan = false;

    // Lights
    this.scene.add(new AmbientLight('#F1DAA4', 0.6));
    const light = new DirectionalLight('#F1DAA4');
    light.position.set(0, 2, 3);
    light.castShadow = true;
    this.scene.add(light);

    // Materials
    this.materialLibrary = new MaterialLibrary();

    // Material definition
    this.materialLibrary.add('planetCore', new Material({ color: '#FFFFA0', flatShading: false }));
    this.materialLibrary.add('planetWireframe', new Material({ wireframe: true, side: DoubleSide, emissive: 'white' }));

    this.materialLibrary.add('HTML', new Material({ color: '#4060b8' }));
    this.materialLibrary.add('Angular', new Material({ color: '#2d8fb5' }));
    this.materialLibrary.add('C++', new Material({ color: '#435075' }));
    this.materialLibrary.add('C#', new Material({ color: '#8d97b3' }));

    this.materialLibrary.add('Unreal Engine 4', new Material({ color: '#b51414' }));
    this.materialLibrary.add('Unity', new Material({ color: '#ab5c5c' }));

    this.materialLibrary.add('Animation', new Material({ color: '#d47f17' }));
    this.materialLibrary.add('Modelling', new Material({ color: '#754d1b' }));
    this.materialLibrary.add('Rigging', new Material({ color: '#ffc47a' }));

    this.materialLibrary.add('Dutch', new Material({ color: '#28b3b8' }));
    this.materialLibrary.add('English', new Material({ color: '#3c7678' }));
    this.materialLibrary.add('French', new Material({ color: '#88cfd1' }));
    this.materialLibrary.add('German', new Material({ color: '#9dbebf' }));
    this.materialLibrary.add('Japanese', new Material({ color: '#489cb5' }));

    this.materialLibrary.add('Fitness', new Material({ color: '#b351b5' }));
    this.materialLibrary.add('Anime', new Material({ color: '#832a85' }));
    this.materialLibrary.add('Guitar', new Material({ color: '#9b849c' }));
    this.materialLibrary.add('Gaming', new Material({ color: '#734575' }));

    // Create Solar system
    this.scene.addBody(new SolarBody('Sun', this.materialLibrary.getMaterial('planetWireframe')), [{
      type: 'orbit', event: (callback: Callback) => {
        this.rotate(callback.target.children[0] as THREE.Object3D, 0.1);
      }
    }]);

    this.scene.addBody(new SolarBody('Languages', this.materialLibrary.getMaterial('planetWireframe'), 5, 1, 140), [{
      type: 'orbit', event: (callback: Callback) => {
        this.rotate(callback.target.children[0] as THREE.Object3D, 0.1);
      }
    }]);

    this.scene.addBody(new SolarBody('Programming', this.materialLibrary.getMaterial('planetWireframe'), 12, 1, 65), [{
      type: 'orbit', event: (callback: Callback) => {
        this.rotate(callback.target.children[0] as THREE.Object3D, 0.3);
      }
    }]);

    this.scene.addBody(new SolarBody('Artistic', this.materialLibrary.getMaterial('planetWireframe'), 15, 1, 300), [{
      type: 'orbit', event: (callback: Callback) => {
        this.rotate(callback.target.children[0] as THREE.Object3D, 0.2);
      }
    }]);

    this.scene.addBody(new SolarBody('Hobbies', this.materialLibrary.getMaterial('planetWireframe'), 20, 1, 180), [{
      type: 'orbit', event: (callback: Callback) => {
        this.rotate(callback.target.children[0] as THREE.Object3D, 0.1);
      }
    }]);
    this.update();
  }

  rotate(pivot: Object3D, speed: number) {
    (pivot.rotateZ(THREE.Math.degToRad(speed)));
  }

  onResize = () => {
    this.width = window.innerWidth / 2;
    this.height = window.innerHeight - this.occupiedHeight;

    this.perspectiveCamera.aspect = this.width / this.height;
    this.renderer.setSize(this.width, this.height);
    this.composer.setSize(this.width, this.height);
    this.composer.updateRaycaster(this.width, this.height);
    this.perspectiveCamera.updateProjectionMatrix();
  }

  onMouseMove = (event: { clientX: number; clientY: number; }) => {
    const rect = this.composer.renderer.domElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.mouse = new THREE.Vector2((x / this.canvas.clientWidth) * 2 - 1,
      (y / this.canvas.clientHeight) * - 2 + 1);

    this.perspectiveCamera.updateMatrixWorld();
  }

  onMouseDown = () => {
    this.raycaster.setFromCamera(this.mouse, this.perspectiveCamera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);
    if (intersects.length > 0) {
    }
  }

  update = () => {
    requestAnimationFrame(this.update);
    this.composer.render();

    this.scene.dispatch('orbit');
  }
}
