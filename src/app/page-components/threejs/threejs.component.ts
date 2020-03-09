import { Component, Input, AfterViewInit, HostListener } from '@angular/core';
import { DataController } from 'src/app/classes/3D/data-controller';
import { Composer, Renderer } from 'src/app/classes/3D/renderer';
import * as THREE from 'three';
import { Camera } from 'src/app/classes/3D/camera';
import { DirectionalLight } from 'three';
import { Raycaster } from 'src/app/classes/3D/raycaster';

@Component({
  selector: 'app-threejs',
  templateUrl: './threejs.component.html',
  styleUrls: ['./threejs.component.scss']
})
export class ThreejsComponent implements AfterViewInit {
  size: HTMLElement;
  canvas: HTMLCanvasElement;
  occupiedHeight = 0;
  camera: Camera;
  composer: Composer;
  mouse: THREE.Vector2;
  raycaster: Raycaster;

  @Input() maxSize;

  @HostListener('window:resize', ['$event']) onResize() {
    this.updateCanvas();
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.size = document.getElementById('dimensions') as HTMLElement;
    this.canvas = document.getElementById('threejs') as HTMLCanvasElement;

    // Camera
    const aspect = this.size.offsetWidth / this.size.offsetHeight;
    this.camera = new Camera(aspect);

    // Materials
    DataController.setMaterial('cube', new THREE.MeshStandardMaterial({ color: '#F31F46' }));

    // Renderer
    this.composer = new Composer(DataController.scene, this.camera, new Renderer(this.canvas));

    // Raycaster
    this.raycaster = new Raycaster(this.camera, this.composer.renderer);

    // add stuff to scene
    var mesh = new THREE.Mesh(new THREE.BoxGeometry(), DataController.getMaterial('cube'));
    DataController.scene.add(mesh);

    var light = new DirectionalLight(0xFFFFFF, 0.4);
    light.position.set(0, 1, 1);
    DataController.scene.add(light);

    this.camera.addOrbitControls(this.composer.renderer.domElement, false, false);
    this.camera.orbitControls.object.position.set(2, 2, 2);
    this.camera.orbitControls.target = new THREE.Vector3(0, 0, 0);

    DataController.scene.add(new THREE.AmbientLight(0xFFFFFF, 1));

    this.updateCanvas();
    this.update();
  }

  updateCanvas() {
    this.composer.update(this.size.offsetWidth, this.size.offsetWidth);
    if (this.size.offsetWidth > this.maxSize) {
      this.composer.update(this.maxSize, this.maxSize);
    }
  }

  update = () => {
    requestAnimationFrame(this.update);
    this.composer.render();
    this.camera.update();
  }
}
