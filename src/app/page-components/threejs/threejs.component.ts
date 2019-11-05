import { Component, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { Scene } from 'src/app/classes/Scene';
import { Composer } from 'src/app/classes/composer';
import { MaterialLibrary } from 'src/app/classes/material-library';
import { MeshLoader } from 'src/app/classes/mesh-loader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Material } from 'src/app/classes/material';
import { Vector3 } from 'three';

@Component({
  selector: 'app-threejs',
  templateUrl: './threejs.component.html',
  styleUrls: ['./threejs.component.scss']
})
export class ThreejsComponent implements AfterViewInit {

  canvas: HTMLCanvasElement;

  // ThreeJS properties
  perspectiveCamera: THREE.PerspectiveCamera;
  materialLibrary: MaterialLibrary;
  loader: MeshLoader;
  composer: Composer;
  scene: Scene;
  orbit: OrbitControls;

  initLookat: THREE.Vector3 = new Vector3(0, 0, 0);

  constructor() { }

  ngAfterViewInit() {
    this.canvas = document.getElementById('threejs') as HTMLCanvasElement;

    // Camera
    const aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.perspectiveCamera = new THREE.PerspectiveCamera(45, aspect, 1, 10000);
    this.perspectiveCamera.position.set(2101, 1181, -116);

    // Scene
    this.scene = new Scene();

    // Renderer
    this.composer = new Composer(this.scene, this.perspectiveCamera, this.canvas);

    // Orbit
    this.orbit = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.orbit.target = this.initLookat;

    // Materials
    this.materialLibrary = new MaterialLibrary();
    this.loader = new MeshLoader();

    const material = new Material('../../assets/textures');
    this.loader.loadFBX('SM_House_1', material, this.scene);

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.6);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFFFFFF, 1);
    dirLight.castShadow = true;
    this.scene.add(dirLight);

    this.update();
  }

  update = () => {
    requestAnimationFrame(this.update);
    this.composer.render();
  }
}
