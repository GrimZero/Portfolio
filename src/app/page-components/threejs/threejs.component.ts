import { Component, OnInit, Input } from '@angular/core';
import * as THREE from 'three';
import { Composer, Renderer } from 'src/app/classes/composer';
import { MaterialLibrary } from 'src/app/classes/material-library';
import { MeshLoader } from 'src/app/classes/mesh-loader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Material } from 'src/app/classes/material';
import { Vector3, AmbientLight, DirectionalLight, DoubleSide, Object3D } from 'three';
import { SolarSystem } from 'src/app/classes/solar-system';
import { SolarBody } from 'src/app/classes/solar-body';
import { skipUntil } from 'rxjs/operators';

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
  orbiters: SolarBody[] = [];

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
    this.perspectiveCamera.position.set(0, -50, 50);

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

    // this.orbit.enableZoom = false;
    // this.orbit.enablePan = false;

    // Lights
    const light = new DirectionalLight('#F1DAA4');
    light.position.set(0, 2, 3);
    light.castShadow = true;
    this.scene.add(light);

    // Materials
    this.materialLibrary = new MaterialLibrary();

    // Material definition
    this.materialLibrary.add('Sun', new Material({ emissive: '#ffff00' }));

    this.materialLibrary.add('Programming', new Material({ color: '#c22727' }));
    this.materialLibrary.add('Languages', new Material({ color: '#47a847' }));
    this.materialLibrary.add('Various', new Material({ color: '#005eff' }));
    this.materialLibrary.add('Hobbies', new Material({ color: '#00FFFF' }));

    this.materialLibrary.add('black', new Material({ color: '#000000' }));

    // Create Solar system
    const sun = new SolarBody('Sun', this.materialLibrary.getMaterial('Sun'), this.scene, 0, 1.3, 30, 0.01);
    sun.position.y += 8;
    sun.position.z += 2;

    const programming = new SolarBody('Programming', this.materialLibrary.getMaterial('Programming'), sun, 7, 1, 30, 0.05);
    new SolarBody('Csharp', this.materialLibrary.getMaterial('black'), programming, 2, 0.5, 70, 0.03);
    new SolarBody('Angular', this.materialLibrary.getMaterial('black'), programming, 3, 0.3, 160, 0.08);
    new SolarBody('C++', this.materialLibrary.getMaterial('black'), programming, 4, 0.3, 225, 0.06);
    new SolarBody('HTML', this.materialLibrary.getMaterial('black'), programming, 5, 0.3, 0, 0.01);

    const languages = new SolarBody('Languages', this.materialLibrary.getMaterial('Languages'), sun, 26, 1, 180, 0.05);
    new SolarBody('English', this.materialLibrary.getMaterial('black'), languages, 2, 0.3, 70, 0.03);
    new SolarBody('Dutch', this.materialLibrary.getMaterial('black'), languages, 3, 0.3, 160, 0.08);
    new SolarBody('French', this.materialLibrary.getMaterial('black'), languages, 4, 0.3, 225, 0.06);
    new SolarBody('German', this.materialLibrary.getMaterial('black'), languages, 5, 0.3, 0, 0.01);
    new SolarBody('Japanese', this.materialLibrary.getMaterial('black'), languages, 6, 0.3, 100, 0.03);

    const various = new SolarBody('Various', this.materialLibrary.getMaterial('Various'), sun, 16, 1, 300, 0.05);
    new SolarBody('Animation', this.materialLibrary.getMaterial('black'), various, 2, 0.3, 70, 0.03);
    new SolarBody('Modelling', this.materialLibrary.getMaterial('black'), various, 3, 0.3, 160, 0.08);
    new SolarBody('Rigging', this.materialLibrary.getMaterial('black'), various, 4, 0.3, 225, 0.06);

    const hobbies = new SolarBody('Hobbies', this.materialLibrary.getMaterial('Hobbies'), sun, 33, 1, 300, 0.05);
    new SolarBody('Animation', this.materialLibrary.getMaterial('black'), hobbies, 2, 0.3, 70, 0.03);
    new SolarBody('Modelling', this.materialLibrary.getMaterial('black'), hobbies, 3, 0.3, 160, 0.08);
    new SolarBody('Rigging', this.materialLibrary.getMaterial('black'), hobbies, 4, 0.3, 225, 0.06);

    this.scene.traverse(child => {
      if (child.type === 'Object3D' && child.name !== '') {
        this.orbiters.push(child as SolarBody);
      }
    });

    // Start update loop
    this.update();
  }

  update = () => {
    requestAnimationFrame(this.update);

    this.orbiters.forEach(element => {
      element.rotate(element.pivot, element.rotationSpeed)
    });

    this.composer.render();
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
    const intersects = this.raycaster.intersectObjects(this.orbiters, true);
    if (intersects.length > 0) {
      // Interaction logic
    }
  }
}
