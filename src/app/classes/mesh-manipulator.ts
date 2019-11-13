import { Vector3, Object3D } from 'three';

export class MeshManipulator {
    static duplicate(template: THREE.Object3D, position: THREE.Vector3) {
        if (template === undefined) {
            console.log('object could not be duplicated because it does not exist.');
            return;
        }

        const copy = template.clone();
        copy.position.set(position.x, position.y, position.z);
        return copy;
    }

    static array(template: THREE.Object3D, amount: number, offset: THREE.Vector3) {
        const arr: THREE.Object3D[] = [];
        for (let index = 1; index <= amount; index++) {
            const newPos = new Vector3(offset.x * index, offset.y * index, offset.z * index);
            arr.push(this.duplicate(template, newPos));
        }
        return arr;
    }
}
