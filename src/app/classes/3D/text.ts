import * as THREE from 'three';
import { ReplaySubject } from 'rxjs';
import { DataController } from './data-controller';

export class Text {
    observable: ReplaySubject<THREE.Font> = new ReplaySubject(1);
    material: THREE.Material = new THREE.MeshBasicMaterial({ color: '#433F81' });

    constructor(path: string) {
        new THREE.FontLoader().load(path, (f) => {
            this.observable.next(f);
            this.observable.complete();
        }, undefined,
            (err) => this.observable.error(err));
    }

    write(text: string, position: THREE.Vector3 = new THREE.Vector3(),
        rotation: THREE.Vector3 = new THREE.Vector3()) {
        if (!this.observable.hasError) {
            this.observable.subscribe((f) => {
                DataController.textParams.font = f;

                // Create text geometry
                const geometry = new THREE.TextGeometry(text, DataController.textParams);

                // Calculate bounding box halfsize
                geometry.computeBoundingBox();
                const halfSize = new THREE.Vector3();
                geometry.boundingBox.getSize(halfSize);
                halfSize.multiplyScalar(0.5);

                // Center the pivot for the text
                geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(-halfSize.x, -halfSize.y, -halfSize.z));

                // Create the scene object
                const object = new THREE.Mesh(geometry, this.material);
                object.position.set(position.x, position.y, position.z);
                object.rotation.set(THREE.MathUtils.degToRad(rotation.x),
                    THREE.MathUtils.degToRad(rotation.y), THREE.MathUtils.degToRad(rotation.z));
                object.name = text;
                DataController.scene.add(object);
            });

        }
    }
}
