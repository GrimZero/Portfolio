import * as THREE from 'three';
import { Object3D, MeshBasicMaterial, Vector3 } from 'three';

// class acts as pivot
export class SolarBody extends THREE.Object3D {
    initialRotation: number;
    mesh: THREE.Mesh;

    constructor(name: string, material: THREE.Material, parent: Object3D, distance: number = 0,
        radius: number = 1, initRotation: number = 0) {
        super();

        this.name = name;
        parent.add(this);

        const shape = new THREE.IcosahedronBufferGeometry(radius, 1);
        this.mesh = new THREE.Mesh(shape, material);

        this.add(this.mesh);
        this.mesh.name = name + '_mesh';

        this.mesh.position.set(distance, 0, 0);
        this.initialRotation = initRotation;
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
}
