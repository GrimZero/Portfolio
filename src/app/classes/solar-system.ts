import { SolarBody } from './solar-body';
import * as THREE from 'three';

export class SolarSystem extends THREE.Scene {
    sceneData: Map<string, SolarBody> = new Map<string, SolarBody>();

    private addToScene(name: string, body: SolarBody) {
        this.sceneData.set(name, body);
        body.name = name;
        super.add(body);
    }

    get(value: string) {
        return this.sceneData.get(value);
    }
}
