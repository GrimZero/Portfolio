import { Component, OnInit, Input } from '@angular/core';
import * as THREE from 'three';
import { Composer, Renderer } from 'src/app/classes/composer';
import { MaterialLibrary } from 'src/app/classes/material-library';
import { MeshLoader } from 'src/app/classes/mesh-loader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Material } from 'src/app/classes/material';
import { DirectionalLight } from 'three';
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
  mouse: THREE.Vector2;

  raycaster: THREE.Raycaster = new THREE.Raycaster();
  orbiters: SolarBody[] = [];

  constructor() { }

  ngOnInit() {

    this.SetDimensions();
    this.canvas = document.getElementById('threejs') as HTMLCanvasElement;
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mousedown', this.onMouseDown);

    // Camera
    const aspect = this.width / this.height;
    this.perspectiveCamera = new THREE.PerspectiveCamera(45, aspect, 1, 10000);
    this.perspectiveCamera.position.set(0, -80, 40);

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
    this.orbit.update();

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
    const sun = new SolarBody('Sun', this.materialLibrary.getMaterial('Sun'), this.scene, 0, 2, 30, 0.01);

    const programming = new SolarBody('Programming', this.materialLibrary.getMaterial('Programming'), sun, 12, 1.5, 30, 0.25);
    new SolarBody('C#', this.materialLibrary.getMaterial('black'), programming, 4, 1, 70, 0.03);
    new SolarBody('Angular', this.materialLibrary.getMaterial('black'), programming, 6, 0.5, 160, 0.08);
    new SolarBody('C++', this.materialLibrary.getMaterial('black'), programming, 7.5, 0.3, 225, 0.06);
    new SolarBody('HTML', this.materialLibrary.getMaterial('black'), programming, 9, 0.2, 0, 0.01);

    const various = new SolarBody('Various', this.materialLibrary.getMaterial('Various'), sun, 27, 1, 300, 0.1);
    new SolarBody('Animation', this.materialLibrary.getMaterial('black'), various, 2, 0.2, 70, 0.03);
    new SolarBody('Modelling', this.materialLibrary.getMaterial('black'), various, 3, 0.5, 160, 0.08);
    new SolarBody('Rigging', this.materialLibrary.getMaterial('black'), various, 5, 1, 225, 0.06);

    const languages = new SolarBody('Languages', this.materialLibrary.getMaterial('Languages'), sun, 40, 1, 180, 0.04);
    new SolarBody('English', this.materialLibrary.getMaterial('black'), languages, 2.5, 1, 70, 0.03);
    new SolarBody('Dutch', this.materialLibrary.getMaterial('black'), languages, 4.5, 1, 160, 0.08);
    new SolarBody('French', this.materialLibrary.getMaterial('black'), languages, 6, 0.4, 225, 0.06);
    new SolarBody('German', this.materialLibrary.getMaterial('black'), languages, 7, 0.8, 0, 0.01);
    new SolarBody('Japanese', this.materialLibrary.getMaterial('black'), languages, 8.5, 0.6, 100, 0.03);

    const hobbies = new SolarBody('Hobbies', this.materialLibrary.getMaterial('Hobbies'), sun, 40, 1, 60, 0.04);
    new SolarBody('Anime', this.materialLibrary.getMaterial('black'), hobbies, 2, 0.7, 70, 0.03);
    new SolarBody('Gaming', this.materialLibrary.getMaterial('black'), hobbies, 4, 1, 160, 0.08);
    new SolarBody('Music', this.materialLibrary.getMaterial('black'), hobbies, 6, 0.2, 225, 0.06);
    new SolarBody('Fitness', this.materialLibrary.getMaterial('black'), hobbies, 7, 0.4, 225, 0.06);

    this.scene.traverse(child => {
      if (child.type === 'Object3D' && child.name !== '') {
        this.orbiters.push(child as SolarBody);
      }
    });

    this.orbit.target.set(sun.position.x, sun.position.y, sun.position.z);
    this.orbit.update();

    // Start update loop
    this.update();
  }

  SetDimensions() {
    this.width = window.innerWidth + 20 - (window.innerWidth / 12 * 4);
    this.height = window.innerHeight - this.occupiedHeight;

    console.log(this.width.toString() + " // " + this.height.toString());
  }

  update = () => {
    requestAnimationFrame(this.update);

    this.orbiters.forEach(element => {
      element.rotate(element.pivot, element.rotationSpeed);
    });

    this.composer.render();
  }

  onResize = () => {
    this.SetDimensions();

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
      intersects.forEach(element => {
        if (element.object.type === 'Mesh') {
          console.log(intersects[0].object.name);
          return;
        }
      });
    }
  }
}
