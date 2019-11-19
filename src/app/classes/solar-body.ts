import * as THREE from 'three';
import { Vector3, Object3D } from 'three';

export class SolarBody extends THREE.Object3D {
    constructor(name: string, material: THREE.Material, offset: number = 0, scale: number = 1) {
        super();

        const shape = new THREE.IcosahedronBufferGeometry(scale, 1);
        const mesh = new THREE.Mesh(shape, material);

        const pivot = new Object3D();
        const newPos = new Vector3(offset, 0, 0);
        mesh.name = name;

        mesh.position.set(newPos.x, newPos.y, newPos.z);
        pivot.add(mesh);
        this.add(pivot);
    }
}
