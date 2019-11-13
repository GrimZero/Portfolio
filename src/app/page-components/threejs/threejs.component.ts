import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { Scene } from 'src/app/classes/Scene';
import { Composer, Renderer } from 'src/app/classes/composer';
import { MaterialLibrary } from 'src/app/classes/material-library';
import { MeshLoader } from 'src/app/classes/mesh-loader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Material } from 'src/app/classes/material';
import { Vector3, AmbientLight, DirectionalLight, MeshPhongMaterial, AnimationAction, DoubleSide, Object3D } from 'three';
import { Callback } from 'src/app/interfaces/callback';
import { MeshManipulator } from 'src/app/classes/mesh-manipulator';

@Component({
  selector: 'app-threejs',
  templateUrl: './threejs.component.html',
  styleUrls: ['./threejs.component.scss']
})
export class ThreejsComponent implements OnInit {
  width: number;
  height: number;

  canvas: HTMLCanvasElement;

  // ThreeJS properties
  perspectiveCamera: THREE.PerspectiveCamera;
  materialLibrary: MaterialLibrary;
  renderer: Renderer;
  composer: Composer;
  scene: Scene;
  orbit: OrbitControls;
  initLookat: THREE.Vector3 = new Vector3(0, 0, 0);

  constructor() { }

  ngOnInit() {
    this.width = window.innerWidth;
    this.height = window.innerHeight - 170;

    this.canvas = document.getElementById('threejs') as HTMLCanvasElement;
    window.addEventListener('resize', this.onResize);

    // Camera
    const aspect = this.width / this.height;
    this.perspectiveCamera = new THREE.PerspectiveCamera(45, aspect, 1, 10000);
    this.perspectiveCamera.position.set(2.3, 1.2, 0);

    // Scene
    this.scene = new Scene();

    // Renderer
    this.renderer = new Renderer(this.canvas);
    this.renderer.setSize(this.width, this.height);

    this.composer = new Composer(this.scene, this.perspectiveCamera, this.renderer);
    this.renderer.setSize(this.width, this.height);
    this.composer.setSize(this.width, this.height);

    // Lights
    this.scene.add(new AmbientLight('#F1DAA4', 0.2));
    const light = new DirectionalLight('#F1DAA4');
    light.position.set(0, 2, 3);
    light.castShadow = true;
    this.scene.add(light);

    // Orbit
    this.orbit = new OrbitControls(this.perspectiveCamera, this.composer.renderer.domElement);
    this.orbit.target = this.initLookat;
    this.orbit.enablePan = false;
    this.orbit.enableZoom = false;

    // Materials
    this.materialLibrary = new MaterialLibrary();

    // Material definition
    this.materialLibrary.add('planetCore', new Material({ color: '#FFFFA0', flatShading: true }));
    this.materialLibrary.add('cube', new Material({ emissive: '#999999', flatShading: true }));
    this.materialLibrary.add('planetWireframe', new Material({ wireframe: true, side: DoubleSide, emissive: 'white' }));

    // Mesh creation
    this.scene.addObject('planetCore',
      new THREE.Mesh(
        new THREE.IcosahedronBufferGeometry(0.3, 1),
        this.materialLibrary.getMaterial('planetCore')),
      {
        type: 'update', event: (callback: Callback) => {
          const target = callback.target as THREE.Object3D;

          target.rotateX(-0.002);
          target.rotateY(-0.003);
        }
      });

    this.scene.addObject('planetWire',
      new THREE.Mesh(
        new THREE.IcosahedronBufferGeometry(0.35, 1),
        this.materialLibrary.getMaterial('planetWireframe')),
      {
        type: 'update', event: (callback: Callback) => {
          const target = callback.target as THREE.Object3D;

          target.rotateX(-0.003);
          target.rotateY(0.002);
        }
      });

    this.update();
  }

  onResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight - 170;

    this.renderer.setSize(this.width, this.height);
    this.composer.setSize(this.width, this.height);
    this.composer.updateRaycaster(this.width, this.height);

    this.perspectiveCamera.aspect = this.width / this.height;
    this.perspectiveCamera.updateProjectionMatrix();
  }

  update = () => {
    requestAnimationFrame(this.update);
    this.composer.render();

    this.scene.dispatch('update');
  }
}
