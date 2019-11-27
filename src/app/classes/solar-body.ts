import * as THREE from 'three';
import { Object3D, MeshBasicMaterial, Vector3 } from 'three';

// class acts as pivot
export class SolarBody extends THREE.Object3D {
    mesh: THREE.Mesh;
    pivot: THREE.Object3D;
    rotationSpeed: number;


    constructor(name: string, material: THREE.Material, parent: Object3D, distance: number = 0,
        radius: number = 1, initRotation: number = 0, rotationSpeed: number = 0) {
        super();

        this.pivot = new Object3D();

        this.name = name;
        parent.add(this.pivot);
        this.pivot.add(this);

        const shape = new THREE.IcosahedronBufferGeometry(radius, 2);
        this.mesh = new THREE.Mesh(shape, material);

        this.add(this.mesh);
        this.mesh.name = name;

        this.position.x += distance;
        this.pivot.rotateZ(THREE.Math.degToRad(initRotation));
        this.rotationSpeed = rotationSpeed;

        const path = this.getOrbit(this);
        if(path) {
            path.name = name;
            this.pivot.parent.add(path);
        }
    }

    rotate(pivot: Object3D, speed: number) {
        ((pivot as SolarBody).rotateZ(THREE.Math.degToRad(speed)));
    }


    getOrbit(body: SolarBody) {

        const distance = body.position.distanceTo(body.parent.position);

        if (distance > 0) {
            const curve = new THREE.EllipseCurve(0, 0, distance, distance, 0, 2 * Math.PI, false, 0);
            const circle = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(50)),
                new MeshBasicMaterial({ color: '#ffffff' }));
            circle.name = 'path';

            return circle;
        }
    }
}
