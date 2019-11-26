import * as THREE from 'three';
import { Object3D, MeshBasicMaterial, Vector3 } from 'three';

export class SolarBody extends THREE.Object3D {

    subPivot: Object3D;

    constructor(name: string, material: THREE.Material, distance: number = 0, scale: number = 1, initRotation: number = 0) {
        super();

        const shape = new THREE.IcosahedronBufferGeometry(scale, 1);
        const mesh = new THREE.Mesh(shape, material);
        this.add(mesh);

        this.subPivot = new Object3D();

        this.name = name + '_base';
        this.subPivot.name = name + '_pivot';
        mesh.name = name + '_mesh';

        this.position.set(distance, 0, 0);

        if (this.parent && this.parent.type !== 'Scene') {
            (this.parent as SolarBody).subPivot.add(this);
            (this.parent as SolarBody).subPivot.rotation.z = THREE.Math.degToRad(initRotation);
        }

        this.add(this.subPivot);
    }

    getOrbit(body: SolarBody) {

        const distance = body.position.distanceTo(body.parent.position);

        if (distance > 0) {
            const curve = new THREE.EllipseCurve(0, 0, distance, distance, 0, 2 * Math.PI, false, 0);
            const circle = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(10)),
                new MeshBasicMaterial({ color: '#ffffff' }));
            circle.name = 'path';

            return circle;
        }
    }

    addOrbital(solarBody: SolarBody) {
        this.subPivot.add(solarBody);
    }
}
