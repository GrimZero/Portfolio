import * as THREE from 'three';
import { MeshToonMaterialParameters } from 'three';

export class Material extends THREE.MeshPhysicalMaterial {

    private static textureLoader: THREE.TextureLoader;
    textureTiling: THREE.Vector2 = new THREE.Vector2(1, 1);
    private folderPath: string;
    isVisible: boolean;

    constructor(folderPath: string, params: MeshToonMaterialParameters = {}) {
        super(params);

        if (folderPath === undefined) {
            return;
        }

        if (!Material.textureLoader) {
            Material.textureLoader = new THREE.TextureLoader();
        }

        this.folderPath = folderPath + '/';

        Material.textureLoader = Material.textureLoader.setPath(this.folderPath);

        // Set textures
        this.map = this.LoadTexture('tex');
    }

    protected LoadTexture(fileName: string, extension: string = '.png'): THREE.Texture {
        return Material.textureLoader.load(fileName + extension);
    }
}
