import { SolarBody } from './solar-body';
import * as THREE from 'three';

export class SolarSystem extends THREE.Scene {
    sceneData: Map<string, SolarBody> = new Map<string, SolarBody>();

    dispatch(event: string) {
        this.sceneData.forEach(element => {
            element.dispatchEvent({ type: event });
        });
    }

    private addToScene(name: string, body: SolarBody) {
        this.sceneData.set(name, body);
        body.name = name;
        super.add(body);
    }

    addBody(body: SolarBody, orbitals?: SolarBody[]) {
        this.addToScene(body.name, body);
        if (orbitals !== undefined) {
            orbitals.forEach(element => {
                body.add(element);
            });
        }
    }

    get(value: string) {
        return this.sceneData.get(value);
    }
}
