import { Component, Input, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { Composer } from 'src/app/classes/3D/composer';
import { MaterialLibrary } from 'src/app/classes/3D/material-library';
import { MeshLoader } from 'src/app/classes/3D/mesh-loader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Scene } from 'three';
import { Renderer } from 'src/app/classes/3D/renderer';

@Component({
  selector: 'app-threejs',
  templateUrl: './threejs.component.html',
  styleUrls: ['./threejs.component.scss']
})
export class ThreejsComponent implements AfterViewInit {
  size: HTMLElement;
  @Input() canvas: HTMLCanvasElement;
  occupiedHeight = 0;

  // ThreeJS properties
  camera: THREE.PerspectiveCamera;
  materials: MaterialLibrary;
  renderer: Renderer;
  composer: Composer;
  scene: Scene;
  orbit: OrbitControls;
  meshLoader: MeshLoader;
  mouse: THREE.Vector2;

  raycaster: THREE.Raycaster = new THREE.Raycaster();

  constructor() {
  }

  ngAfterViewInit(): void {
    this.size = document.getElementById('dimensions') as HTMLElement;
    this.canvas = document.getElementById('threejs') as HTMLCanvasElement;

    (Array.prototype.slice.call(document.getElementsByClassName('render')) as HTMLElement[]).forEach(element => {
      this.occupiedHeight += element.offsetHeight;
    });

    // Camera
    const aspect = this.size.offsetWidth - 30 / window.innerHeight - this.occupiedHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 1, 10000);

    // Materials
    this.materials = new MaterialLibrary();

    // Renderer
    this.renderer = new Renderer(this.canvas, '#FFFFFF');
    this.composer = new Composer(this.scene, this.camera, this.renderer);
    this.updateCanvas();

    window.addEventListener('resize', () => this.updateCanvas());
  }

  updateCanvas() {
    this.composer.updateSize(this.size.offsetWidth, window.innerHeight - this.occupiedHeight);
    console.log('changed');
  }

  update = () => {
    requestAnimationFrame(this.update);
    this.composer.render();
  }
}
