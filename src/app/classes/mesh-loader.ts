import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { Material } from './material';
import { BehaviorSubject } from 'rxjs';

export class MeshLoader {
    static loader: FBXLoader = new FBXLoader();
    data = new BehaviorSubject<any>(undefined);

    constructor() {
    }

    static SetMaterial(mesh: THREE.Mesh, material: Material) {
        if(material && mesh) {
            material.isVisible = true;
            mesh.material = material;
        }
    }

    loadFBX = (fileName: string) => {
        MeshLoader.loader.load('assets/meshes/' + fileName + '.FBX', (object: THREE.Group) => {
            this.data.next(object);
        });
    }
}
