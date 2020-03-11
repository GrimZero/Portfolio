import { DataController } from 'src/app/3D/data-controller';
import { Composer } from 'src/app/3D/renderer';
import * as THREE from 'three';
import { Scene } from 'src/app/3D/Scene';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Camera } from '../camera';

export class HeroScene extends Scene {
    constructor() {
        super();
        // add stuff to scene
        new GLTFLoader().load('assets/meshes/scene.glb', (gltf: GLTF) => {
            gltf.scene.children[0].traverse((child: THREE.Mesh) => {
                if (child.isMesh) {
                    const material = ((child as THREE.Mesh).material as THREE.MeshStandardMaterial);
                    material.metalness = 0;
                    material.roughness = 0.8;
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            })
            DataController.scene.add(gltf.scene);
            gltf.scene.scale.set(0.01, 0.01, 0.01)
        })

        
        this.addDirectionalLight(new THREE.Vector3(-3, 8, 3), 0xFFFFFF, 2, true, 0, 1000);
        this.add(new THREE.AmbientLight(0xFFFFFF, 0.6));
    }

    public initialize(composer: Composer, camera: Camera) {
        camera.addOrbitControls(composer.renderer.domElement, false, false, Math.PI / 2);
        camera.orbitControls.object.position.set(-7, 7, -1.5);
        camera.orbitControls.target = new THREE.Vector3(0, 0, 0);
    }
}
