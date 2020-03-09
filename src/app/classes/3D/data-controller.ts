import { Scene } from './scene';
import { MeshStandardMaterialParameters, MeshStandardMaterial } from 'three';

export class DataController {
    public static scene: Scene;
    public static textParams: THREE.TextGeometryParameters = {
        size: 0.1,
        height: 0.0,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelSegments: 0.1
    };
    private static materialLibrary: Map<string, THREE.Material> = new Map<string, THREE.MeshStandardMaterial>();

    public static getMaterial(material: string) {
        return this.materialLibrary.get(material);
    }

    public static setMaterial(name: string, material: MeshStandardMaterial)
    {
        this.materialLibrary.set(name, material);
    }
}
