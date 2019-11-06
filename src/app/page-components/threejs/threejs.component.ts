import { Component, OnInit } from '@angular/core';
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
export class ThreejsComponent implements OnInit {
  width: number;
  height: number;

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

  ngOnInit() {
    this.width = window.innerWidth;
    this.height = window.innerHeight - 170;

    this.canvas = document.getElementById('threejs') as HTMLCanvasElement;
    window.addEventListener('resize', this.onResize);

    // Camera
    const aspect = this.width / this.height;
    this.perspectiveCamera = new THREE.PerspectiveCamera(45, aspect, 1, 10000);
    this.perspectiveCamera.position.set(2101, 1181, -116);

    // Scene
    this.scene = new Scene();

    // Renderer
    this.composer = new Composer(this.scene, this.perspectiveCamera, this.canvas);
    this.composer.renderer.setSize(this.width, this.height);

    // Orbit
    this.orbit = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.orbit.target = this.initLookat;

    // Materials
    this.materialLibrary = new MaterialLibrary();
    this.loader = new MeshLoader();

    // const material = new Material('../../assets/textures');
    // this.loader.loadFBX('SM_House_1', material, this.scene);

    this.update();
  }

  onResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight - 170;

    this.composer.renderer.setSize(this.width, this.height);
    this.composer.updateRaycaster(this.width, this.height);

    this.perspectiveCamera.aspect = this.width / this.height;
    this.perspectiveCamera.updateProjectionMatrix();
  }

  update = () => {
    requestAnimationFrame(this.update);
    this.composer.render();
  }
}
