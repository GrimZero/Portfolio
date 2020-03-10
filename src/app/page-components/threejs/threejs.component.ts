import { Component, Input, AfterViewInit, HostListener } from '@angular/core';
import { DataController } from 'src/app/classes/3D/data-controller';
import { Composer, Renderer } from 'src/app/classes/3D/renderer';
import * as THREE from 'three';
import { Camera } from 'src/app/classes/3D/camera';
import { MeshStandardMaterial, Vector3 } from 'three';
import { Raycaster } from 'src/app/classes/3D/raycaster';
import { Scene } from 'src/app/classes/3D/scene';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

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

    // Scene
    DataController.scene = new Scene();

    // Renderer
    this.composer = new Composer(DataController.scene, this.camera, new Renderer(this.canvas));

    // Raycaster
    this.raycaster = new Raycaster(this.camera, this.composer.renderer);

    // add stuff to scene
    new GLTFLoader().load('assets/meshes/scene.glb', (gltf: GLTF) => {
      gltf.scene.children[0].traverse((child: THREE.Mesh) => {
        if (child.isMesh) {
          const material = ((child as THREE.Mesh).material as MeshStandardMaterial);
          material.metalness = 0;
          material.roughness = 0.8;
          child.receiveShadow = true;
          child.castShadow = true;
        }
      })
      DataController.scene.add(gltf.scene);
      gltf.scene.scale.set(0.01, 0.01, 0.01)
    })

    DataController.scene.addDirectionalLight(new Vector3(-3, 8, 3), 0xFFFFFF, 2, true, 0, 1000);

    this.camera.addOrbitControls(this.composer.renderer.domElement, false, false);
    this.camera.orbitControls.object.position.set(-7, 7, -1.5);
    this.camera.orbitControls.target = new THREE.Vector3(0, 0, 0);

    DataController.scene.add(new THREE.AmbientLight(0xFFFFFF, 0.6));

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
