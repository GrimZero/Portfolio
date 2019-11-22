import * as THREE from 'three';
import { Vector3, Object3D, MeshBasicMaterial } from 'three';

export class SolarBody extends THREE.Object3D {
    constructor(name: string, material: THREE.Material, distance: number = 0, scale: number = 1, initRotation: number = 0) {
        super();

        const shape = new THREE.IcosahedronBufferGeometry(scale, 1);
        const mesh = new THREE.Mesh(shape, material);

        const pivot = new Object3D();
        const newPos = new Vector3(distance, 0, 0);
        mesh.name = name;

        var curve = new THREE.EllipseCurve(0, 0, distance, distance, 0, 2 * Math.PI, false, 0);
        var circle = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(50)), new MeshBasicMaterial({ color: '#ffffff' }));

        mesh.position.set(newPos.x, newPos.y, newPos.z);
        pivot.add(mesh);
        this.add(pivot);
        this.add(circle);

        pivot.rotation.z = THREE.Math.degToRad(initRotation);
    }
}
