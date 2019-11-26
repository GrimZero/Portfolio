import * as THREE from 'three';
import { Object3D, MeshBasicMaterial } from 'three';
import { Callback } from '../interfaces/callback';

export class SolarBody extends THREE.Object3D {

    subPivot: Object3D;

    constructor(name: string, material: THREE.Material, distance: number = 0, scale: number = 1,
        // tslint:disable-next-line: align
        initRotation: number = 0, callbacks?: Callback[]) {
        super();

        const shape = new THREE.IcosahedronBufferGeometry(scale, 1);
        const mesh = new THREE.Mesh(shape, material);

        this.subPivot = new Object3D();
        this.position.set(distance, 0, 0);

        this.name = name;
        mesh.name = name + '_mesh';
        this.subPivot.name = name + '_pivot';

        THREE.EventDispatcher.call(this);
        if (callbacks) {
            callbacks.forEach(callback => {
                this.addEventListener(callback.type, callback.event);
            });
        }

        if (distance !== 0) {
            const curve = new THREE.EllipseCurve(0, 0, distance, distance, 0, 2 * Math.PI, false, 0);
            const circle = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(10)),
                new MeshBasicMaterial({ color: '#ffffff' }));
            circle.name = 'path';
            circle.position.set(this.position.x, this.position.y, this.position.z);
            this.add(circle);
        }

        mesh.position.set(distance, 0, 0);

        if (this.parent && this.parent.type !== 'Scene') {
            (this.parent as SolarBody).subPivot.add(this);
        }

        this.add(this.subPivot);

        this.subPivot.rotation.z = THREE.Math.degToRad(initRotation);
    }
    addOrbital(solarBody: SolarBody, offset: number = 10) {
        this.subPivot.add(solarBody);
        solarBody.subPivot.position.add(new THREE.Vector3(offset, 0, 0));
    }
}
