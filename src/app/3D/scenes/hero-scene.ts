import { Composer } from 'src/app/3D/renderer';
import * as THREE from 'three';
import { Scene } from 'src/app/3D/Scene';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Camera } from '../camera';
import { Raycaster } from '../raycaster';
import { gsap } from 'gsap';
import { Vector3 } from 'three';

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

    public update() {
        if (this.mixer) {
            this.mixer.update(0.015);
        }
    }

    public initialize(composer: Composer, camera: Camera) {
        this.addDirectionalLight(new THREE.Vector3(-3, 8, 3), 0xFFFFFF, 1, true, 0, 1000);
        this.add(new THREE.AmbientLight(0xFFFFFF, 0.6));

        camera.addOrbitControls(composer.renderer.domElement, false, false, Math.PI / 2);
        camera.orbitControls.object.position.set(-7, 7, -1.5);
        camera.orbitControls.target = new THREE.Vector3(0, 0, 0);

        this.raycaster = new Raycaster(camera, composer.renderer);

        var manager = new THREE.LoadingManager();
        manager.onLoad = () => {
            this.add(this.scene);
            this.add(this.character);
        }

        var loader = new GLTFLoader(manager);

        loader.load('assets/meshes/scene.glb', (gltf: GLTF) => {
            gltf.scene.traverse((child: THREE.Mesh) => {
                if (child.isMesh) {
                    const material = child.material as THREE.MeshStandardMaterial;
                    material.metalness = 0;
                    material.roughness = 0.8;
                    child.receiveShadow = true;
                    child.castShadow = true;
                    material.flatShading = true;

                    // add events
                    child.addEventListener('click', () => { });
                    this.meshes.push(child);

                    switch (child.name) {
                        case 'SM_Prop_Whiteboard_02_Board_01':
                            child.addEventListener('click', () => {
                                gsap.fromTo(child.rotation, { x: 0 }, { x: Math.PI * 2, duration: 1 });
                            });
                            break;
                        case 'SM_Prop_Printer_3D_01':
                            break;
                        case 'SM_Prop_Drone_Quad_01':
                            child.addEventListener('click', () => {
                                if (child.position.y > -110) {
                                    gsap.to(child.position, { y: child.position.y - 50, duration: 7, ease: "power2 inout" });
                                }
                            });
                            break;

                    }

            gltf.scene.traverse((e) => {
                if (e.type === 'SkinnedMesh') {
                    const material = ((e as THREE.SkinnedMesh).material as THREE.MeshStandardMaterial);
                    material.flatShading = true;
                    material.roughness = 0.8;
                }
            })

                        gltf.scene.traverse((e) => {
                            if (e.type === 'SkinnedMesh') {
                                ((e as THREE.SkinnedMesh).material as THREE.MeshStandardMaterial).flatShading = true;
                            }
                        });

                        clips.forEach(clip => {
                            this.mixer.clipAction(clip).play();
                        });
                    });
                }
            });
        });
    }
}
