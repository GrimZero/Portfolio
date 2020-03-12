import { DataController } from 'src/app/3D/data-controller';
import { Composer } from 'src/app/3D/renderer';
import * as THREE from 'three';
import { Scene } from 'src/app/3D/Scene';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Camera } from '../camera';
import { Raycaster } from '../raycaster';

export class HeroScene extends Scene {
    raycaster: Raycaster;
    meshes: THREE.Mesh[] = [];
    mixer: THREE.AnimationMixer;
    loader: GLTFLoader;

    scene: THREE.Object3D;
    character: THREE.Object3D;

    constructor() {
        super();
    }

    public initialize(composer: Composer, camera: Camera) {
        this.addDirectionalLight(new THREE.Vector3(-3, 8, 3), 0xFFFFFF, 2, true, 0, 1000);
        this.add(new THREE.AmbientLight(0xFFFFFF, 0.6));

        camera.addOrbitControls(composer.renderer.domElement, false, false, Math.PI / 2);
        camera.orbitControls.object.position.set(-7, 7, -1.5);
        camera.orbitControls.target = new THREE.Vector3(0, 0, 0);

        this.raycaster = new Raycaster(camera, composer.renderer);

        var manager = new THREE.LoadingManager();
        manager.onLoad = () => {
            DataController.scene.add(this.scene);
            DataController.scene.add(this.character);
        }

        var loader = new GLTFLoader(manager);

        loader.load('assets/meshes/scene.glb', (gltf: GLTF) => {
            gltf.scene.children[0].traverse((child: THREE.Mesh) => {
                if (child.isMesh) {
                    const material = child.material as THREE.MeshStandardMaterial;
                    material.metalness = 0;
                    material.roughness = 0.8;
                    child.receiveShadow = true;
                    child.castShadow = true;
                    material.color.set(0xAAAAAA);

                    // add events
                    child.addEventListener('click', () => console.log(child.name));
                    this.meshes.push(child);
                }
            })
            this.scene = gltf.scene;

            this.raycaster.setTargets(this.meshes).subscribe(intersection => {
                intersection.object.dispatchEvent({ type: 'click' });
            })
        });

        loader.load('assets/meshes/character.glb', (gltf: GLTF) => {
            gltf.scene.position.add(new THREE.Vector3(-1.3, 0.2, -0.5));
            gltf.scene.rotateY(-Math.PI / 2);
            this.character = gltf.scene;
            this.mixer = new THREE.AnimationMixer(gltf.scene);
            const clips = gltf.animations;

            gltf.scene.traverse((e) => {
                if (e.type === 'SkinnedMesh') {
                    ((e as THREE.SkinnedMesh).material as THREE.MeshStandardMaterial).color.set(0x777777)
                }
            })

            clips.forEach(clip => {
                this.mixer.clipAction(clip).play();
            });
        });
    }
}
