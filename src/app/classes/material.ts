import * as THREE from 'three';

export class Material extends THREE.MeshToonMaterial {
    isVisible: boolean;

    constructor(params: THREE.MeshToonMaterialParameters = {}) {
        super(params);
    }
}
