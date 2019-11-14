import * as THREE from 'three';
import { Object3D } from 'three';
import { Callback } from '../interfaces/callback';

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

  addObject(name: string, object: THREE.Object3D, callbacks?: Callback[]): THREE.Object3D {
    this.sceneData.set(name, object);
    super.add(object);

    if (callbacks) {
      THREE.EventDispatcher.call(object);
      callbacks.forEach(callback => {
        object.addEventListener(callback.type, callback.event);
      });
    }

    return object;
  }

  dispatch(event: string) {
    this.sceneData.forEach(element => {
      element.dispatchEvent({ type: event });
    });
  }
}
