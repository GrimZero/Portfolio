import * as THREE from 'three';
import { Composer } from './renderer';
import { Camera } from './camera';

export abstract class Scene extends THREE.Scene {
    shadowMapSize: THREE.Vector2 = new THREE.Vector2(2048, 2048);

    constructor() {
        super();
    }

    addDirectionalLight(position: THREE.Vector3, color: string | number | THREE.Color = 0xFFFFFF, intensity: number = 1,
                        castShadow: boolean = false, nearClip: number = 0.1, farClip: number = 1000,
                        size: THREE.Vector2 = new THREE.Vector2(100, 100), bias: number = 0) {
        const light = new THREE.DirectionalLight(color, intensity);

        if (castShadow) {
            light.castShadow = true;
            light.shadow.camera.near = nearClip;
            light.shadow.camera.far = farClip;
            light.shadow.mapSize = this.shadowMapSize;
            light.shadow.bias = bias;
        }

        light.position.set(position.x, position.y, position.z);
        this.add(light);

        return light;
    }

    public abstract initialize(composer: Composer, camera: Camera);
    public abstract update();
}
