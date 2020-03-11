import { Component, Input, AfterViewInit, HostListener } from '@angular/core';
import { DataController } from 'src/app/3D/data-controller';
import { Composer, Renderer } from 'src/app/3D/renderer';
import { Raycaster } from 'src/app/3D/raycaster';
import { Camera } from 'src/app/3D/camera';
import { HeroScene } from 'src/app/3D/scenes/hero-scene';

@Component({
  selector: 'app-threejs',
  templateUrl: './threejs.component.html',
  styleUrls: ['./threejs.component.scss']
})
export class ThreejsComponent implements AfterViewInit {
  size: HTMLElement;
  canvas: HTMLCanvasElement;
  camera: Camera;
  composer: Composer;
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
    DataController.scene = new HeroScene();

    this.composer = new Composer(DataController.scene, this.camera, new Renderer(this.canvas));
    this.raycaster = new Raycaster(this.camera, this.composer.renderer);
    DataController.scene.initialize(this.composer, this.camera);

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

    if((DataController.scene as HeroScene).mixer) {
      (DataController.scene as HeroScene).mixer.update(0.01)
    }
  }
}
