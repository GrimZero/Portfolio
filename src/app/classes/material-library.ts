import { Material } from './material';


export class MaterialLibrary {
    private data: Map<string, Material> = new Map<string, Material>();
    activeMaterials: THREE.MeshPhysicalMaterial[] = [];

    getMaterial = (name: string) => {
        if (this.data.has(name)) {
            return this.data.get(name);
        } else { return undefined; }
    }

    add = (name: string, material: Material) => {
        this.data.set(name, material);
    }

    updateMaterials = () => {
        this.data.forEach(value => {
            if (value.isVisible) {
                value.needsUpdate = true;
            }
        });
    }
}
