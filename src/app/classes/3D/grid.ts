import * as THREE from 'three';
import { DataController } from './data-controller';
import { Object3D } from 'three';

export class Grid {
    static createGround(rowCount: number, colCount: number, cellSize: THREE.Vector2, material: THREE.Material) {
        const plane = new Object3D();

        const lineGeomVertical = new THREE.Geometry();
        lineGeomVertical.vertices.push(new THREE.Vector3(0, 0, -(cellSize.y * colCount) / 2));
        lineGeomVertical.vertices.push(new THREE.Vector3(0, 0, (cellSize.y * colCount) / 2));
        const lineVertical = new THREE.Line(lineGeomVertical, DataController.materialLibrary.get('dottedLine'));
        lineVertical.computeLineDistances();
        lineVertical.position.y = 0.005;
        lineVertical.position.x = -cellSize.x / 2;

        for (let index = -1; index < colCount; index++) {
            const l = lineVertical.clone();
            l.position.x = lineVertical.position.x + cellSize.x * index;
            plane.add(l);
        }

        const lineGeom = new THREE.Geometry();
        lineGeom.vertices.push(new THREE.Vector3(-(cellSize.x * colCount) / 2, 0, 0));
        lineGeom.vertices.push(new THREE.Vector3((cellSize.x * colCount) / 2, 0, 0));
        const line = new THREE.Line(lineGeom, DataController.materialLibrary.get('dottedLine'));
        line.computeLineDistances();
        line.position.y = 0.005;
        line.position.z = -cellSize.y / 2;

        for (let index = -1; index < colCount; index++) {
            const l = line.clone();
            l.position.z = line.position.z + cellSize.y * index;
            plane.add(l);
        }

        plane.receiveShadow = true;
        return plane;
    }
}
