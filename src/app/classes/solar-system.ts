import { SolarBody } from './solar-body';
import * as THREE from 'three';
import { Callback } from '../interfaces/callback';

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

    addBody(body: SolarBody, callbacks?: Callback[]) {
        this.addToScene(body.name, body);

        THREE.EventDispatcher.call(body);
        if (callbacks) {
            callbacks.forEach(callback => {
                body.addEventListener(callback.type, callback.event);
            });
        }
    }

    get(value: string) {
        return this.sceneData.get(value);
    }
}
