import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
import { Object3D } from 'three';

export class Scene extends THREE.Scene {
  shadowMapSize: THREE.Vector2 = new THREE.Vector2(1024, 1024);
  sceneData: Map<string, Object3D> = new Map<string, Object3D>();

  constructor() {
    super();
    RectAreaLightUniformsLib.init();
  }

  getObjectsByName = (name: string): THREE.Object3D[] => {
    const objects: THREE.Object3D[] = [];

    this.traverse((child) => {
      if (child.name === name) {
        objects.push(child);
      }
    });

    return objects;
  }

  add(object: Object3D): any {
    this.sceneData.set(object.name, object);
    super.add(object);
  }

  addRange(objects: THREE.Object3D[]) {
    objects.forEach(element => {
      this.add(element);
    });
  }

  SetTime = (time: boolean) => {
    if (time) {
      this.SetTimeDay();
    } else { this.SetTimeDusk(); }
  }

  SetTimeDay = () => {
    this.remove(this.getObjectByName('night'));

    const dirLight = new THREE.DirectionalLight(0x404040, 2);
    dirLight.castShadow = true;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 350;
    dirLight.position.set(-150, 80, -120);
    dirLight.castShadow = true;
    dirLight.shadow.camera.left = -130;
    dirLight.shadow.camera.right = 190;
    dirLight.shadow.camera.top = 190;
    dirLight.shadow.camera.bottom = -190;
    dirLight.shadow.mapSize = this.shadowMapSize;
    dirLight.name = 'day';
    this.add(dirLight);

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.3);
    dirLight.add(ambientLight);
  }

  SetTimeDusk = () => {

    this.remove(this.getObjectByName('day'));

    const ambientLight = new THREE.AmbientLight(0xF07E07, 0.4);
    ambientLight.name = 'night';
    this.add(ambientLight);

    const pointLight = new THREE.PointLight(0xF07E07, 0.3);
    pointLight.position.set(50, 71, 0);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize = this.shadowMapSize;
    ambientLight.add(pointLight);
  }
}
