import * as THREE from 'three';
import { Object3D } from 'three';

export class Scene extends THREE.Scene {
  shadowMapSize: THREE.Vector2 = new THREE.Vector2(1024, 1024);
  sceneData: Map<string, Object3D> = new Map<string, Object3D>();

  constructor() {
    super();
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

  getObjectsByType = (type: string): THREE.Object3D[] => {
    const objects: THREE.Object3D[] = [];

    this.traverse((child) => {
      if (child.type === type) {
        objects.push(child);
      }
    });

    return objects;
  }
}
