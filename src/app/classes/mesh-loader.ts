import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { Material } from './material';
import { Scene } from './Scene';

export class MeshLoader {

  static loader: FBXLoader = new FBXLoader();

  constructor() { }

  loadFBX = (name: string, material: Material, scene: Scene) => {
    scene.sceneData.set(name, undefined);
    MeshLoader.loader.load('../../assets/meshes/' + name + '.FBX', (object: THREE.Group) => {
        object.traverse((child: THREE.Mesh) => {
            if (child.isMesh) {
                child.material = material;
                child.castShadow = true;
                child.receiveShadow = true;

                material.isVisible = true;
            }
        });
        object.name = name;
        scene.add(object);
    });
}

}
