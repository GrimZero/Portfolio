import * as THREE from 'three';
import { Vector3, Object3D, MeshBasicMaterial } from 'three';
import { Callback } from '../interfaces/callback';

export class SolarBody extends THREE.Object3D {

    subPivot: Object3D;

    constructor(name: string, material: THREE.Material, distance: number = 0, scale: number = 1, initRotation: number = 0, callbacks?: Callback[]) {
        super();

        const shape = new THREE.IcosahedronBufferGeometry(scale, 1);
        const mesh = new THREE.Mesh(shape, material);

        const pivot = new Object3D();
        this.name = name;
        pivot.name = 'pivot';

        THREE.EventDispatcher.call(this);
        if (callbacks) {
            callbacks.forEach(callback => {
                this.addEventListener(callback.type, callback.event);
            });
        }

        var curve = new THREE.EllipseCurve(0, 0, distance, distance, 0, 2 * Math.PI, false, 0);
        var circle = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(50)), new MeshBasicMaterial({ color: '#ffffff' }));
        circle.name = 'path';

        mesh.position.set(distance, 0, 0);
        pivot.add(mesh);
        this.add(pivot);
        // this.add(circle);

        pivot.rotation.z = THREE.Math.degToRad(initRotation);
        this.subPivot = pivot;
    }
    addOrbital(solarBody: SolarBody, offset: number = 10) {
        this.subPivot.add(solarBody);
        solarBody.position.add(new THREE.Vector3(0, offset, 0));
    }
}
