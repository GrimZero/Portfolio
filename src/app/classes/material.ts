import * as THREE from 'three';
import { MeshPhongMaterialParameters } from 'three';

export class Material extends THREE.MeshPhongMaterial {

    private static textureLoader: THREE.TextureLoader;
    textureTiling: THREE.Vector2 = new THREE.Vector2(1, 1);
    isVisible: boolean;

    constructor(params: MeshPhongMaterialParameters = {}) {
        super(params);

        if (!Material.textureLoader) {
            Material.textureLoader = new THREE.TextureLoader();
        }
    }

    protected LoadTexture(fileName: string, extension: string = '.png'): THREE.Texture {
        return Material.textureLoader.load(fileName + extension);
    }
}
