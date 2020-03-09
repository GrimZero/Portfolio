import * as THREE from 'three';
import { Text } from './text';
import { DataController } from './data-controller';
import { Subject } from 'rxjs';

export class WorldSpaceUI {
    static text: Text = new Text('./assets/fonts/helvetiker_bold.typeface.json');

    static createLine(length: number, material: string, position: THREE.Vector3, direction: THREE.Vector3) {
        const endSize = 0.01;
        const lineGeom = new THREE.BoxBufferGeometry(endSize, length - endSize * 2, endSize);
        const line = new THREE.Mesh(lineGeom, DataController.materialLibrary.get(material));

        const cornerGeom = new THREE.BoxBufferGeometry(0.04, endSize, endSize);
        const cornerLeft = new THREE.Mesh(cornerGeom, DataController.materialLibrary.get(material));
        cornerLeft.applyMatrix4(new THREE.Matrix4().makeTranslation(0, (length - endSize) / 2, 0));
        line.add(cornerLeft);

        const cornerRight = new THREE.Mesh(cornerGeom, DataController.materialLibrary.get(material));
        cornerRight.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -(length - endSize) / 2, 0));
        line.add(cornerRight);

        line.position.set(position.x, position.y, position.z);
        line.rotateX(new THREE.Vector3(0, 1, 0).angleTo(direction));
        return line;
    }

    static createButton(shape: THREE.Object3D, position: THREE.Vector3, onclick: () => void) {
        shape.position.set(position.x, position.y, position.z);
        shape.addEventListener('click', onclick);
        DataController.scene.add(shape);

        return shape;
    }

    static createCircle(radius: number, segments: number = 20) {
        const circle = new THREE.Mesh(
            new THREE.CircleBufferGeometry(radius, segments),
            new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
        circle.add(this.createPlus(radius));

        return circle;
    }

    static createPlus(size: number) {
        const shape = new THREE.BoxBufferGeometry(size, size / 4, 0.02);

        var horizontal = new THREE.Mesh(shape, new THREE.MeshStandardMaterial({ color: 0x433F81 }));
        var vertical = horizontal.clone();
        horizontal.add(vertical);
        vertical.rotateZ(Math.PI / 2);

        return horizontal;
    }
}
