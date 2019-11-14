import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { Scene } from 'src/app/classes/Scene';
import { Composer, Renderer } from 'src/app/classes/composer';
import { MaterialLibrary } from 'src/app/classes/material-library';
import { MeshLoader } from 'src/app/classes/mesh-loader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Material } from 'src/app/classes/material';
import { Vector3, AmbientLight, DirectionalLight, DoubleSide } from 'three';
import { Callback } from 'src/app/interfaces/callback';
import { tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-threejs',
  templateUrl: './threejs.component.html',
  styleUrls: ['./threejs.component.scss']
})
export class ThreejsComponent implements OnInit {
  width: number;
  height: number;

  canvas: HTMLCanvasElement;

  // ThreeJS properties
  perspectiveCamera: THREE.PerspectiveCamera;
  materialLibrary: MaterialLibrary;
  renderer: Renderer;
  composer: Composer;
  scene: Scene;
  orbit: OrbitControls;
  meshLoader: MeshLoader;
  initLookat: THREE.Vector3 = new Vector3(0, 0, 0);

  raycaster: THREE.Raycaster = new THREE.Raycaster();

  constructor() { }

  ngOnInit() {
    this.width = window.innerWidth;
    this.height = window.innerHeight - 170;

    this.canvas = document.getElementById('threejs') as HTMLCanvasElement;
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mousedown', this.onMouseDown);

    // Camera
    const aspect = this.width / this.height;
    this.perspectiveCamera = new THREE.PerspectiveCamera(45, aspect, 1, 10000);
    this.perspectiveCamera.position.set(2.3, 1.2, 0);

    // Scene
    this.scene = new Scene();

    // Meshloader
    this.meshLoader = new MeshLoader();

    // Renderer
    this.renderer = new Renderer(this.canvas);
    this.renderer.setSize(this.width, this.height);

    this.composer = new Composer(this.scene, this.perspectiveCamera, this.renderer);
    this.renderer.setSize(this.width, this.height);
    this.composer.setSize(this.width, this.height);

    // Orbit
    this.orbit = new OrbitControls(this.perspectiveCamera, this.composer.renderer.domElement);
    this.orbit.target = this.initLookat;
    this.orbit.enableZoom = false;
    this.orbit.enablePan = false;

    // Lights
    this.scene.add(new AmbientLight('#F1DAA4', 0.6));
    const light = new DirectionalLight('#F1DAA4');
    light.position.set(0, 2, 3);
    light.castShadow = true;
    this.scene.add(light);

    // Materials
    this.materialLibrary = new MaterialLibrary();

    // Material definition
    this.materialLibrary.add('planetCore', new Material({ color: '#FFFFA0', flatShading: false }));
    this.materialLibrary.add('planetWireframe', new Material({ wireframe: true, side: DoubleSide, emissive: 'white' }));

    this.materialLibrary.add('HTML', new Material({ color: '#4060b8' }));
    this.materialLibrary.add('Angular', new Material({ color: '#2d8fb5' }));
    this.materialLibrary.add('C++', new Material({ color: '#435075' }));
    this.materialLibrary.add('C#', new Material({ color: '#8d97b3' }));

    this.materialLibrary.add('Unreal Engine 4', new Material({ color: '#b51414' }));
    this.materialLibrary.add('Unity', new Material({ color: '#ab5c5c' }));

    this.materialLibrary.add('Animation', new Material({ color: '#d47f17' }));
    this.materialLibrary.add('Modelling', new Material({ color: '#754d1b' }));
    this.materialLibrary.add('Rigging', new Material({ color: '#ffc47a' }));

    this.materialLibrary.add('Dutch', new Material({ color: '#28b3b8' }));
    this.materialLibrary.add('English', new Material({ color: '#3c7678' }));
    this.materialLibrary.add('French', new Material({ color: '#88cfd1' }));
    this.materialLibrary.add('German', new Material({ color: '#9dbebf' }));
    this.materialLibrary.add('Japanese', new Material({ color: '#489cb5' }));

    this.materialLibrary.add('Fitness', new Material({ color: '#b351b5' }));
    this.materialLibrary.add('Anime', new Material({ color: '#832a85' }));
    this.materialLibrary.add('Guitar', new Material({ color: '#9b849c' }));
    this.materialLibrary.add('Gaming', new Material({ color: '#734575' }));

    // Mesh creation
    this.meshLoader.loadFBX('polyhedronDivided');
    this.meshLoader.data.pipe(
      filter(x => x),
      tap(mesh => {
        this.scene.addObject('sphere', mesh, [{
          type: 'update', event: (callback: Callback) => {
            const target = callback.target as THREE.Object3D;
          }
        }]);
        mesh.children[0].children.forEach(element => {
          element.traverse((child: THREE.Mesh) => {
            MeshLoader.SetMaterial(child, this.materialLibrary.getMaterial(child.name));
          });
        });
      })).subscribe();

    this.scene.addObject('planetCore',
      new THREE.Mesh(
        new THREE.IcosahedronBufferGeometry(0.3, 1),
        this.materialLibrary.getMaterial('planetCore')),
      [{
        type: 'update', event: (callback: Callback) => {
          const target = callback.target as THREE.Object3D;

          target.rotateX(-0.002);
          target.rotateY(-0.003);
        }
      }]);

    this.scene.addObject('planetWire',
      new THREE.Mesh(
        new THREE.IcosahedronBufferGeometry(0.35, 1),
        this.materialLibrary.getMaterial('planetWireframe')),
      [{
        type: 'update', event: (callback: Callback) => {
          const target = callback.target as THREE.Object3D;

          target.rotateX(-0.003);
          target.rotateY(0.002);
        }
      }]);

    this.update();
    this.scene.dispatch('start');
  }



  onResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight - 170;

    this.perspectiveCamera.aspect = this.width / this.height;
    this.renderer.setSize(this.width, this.height);
    this.composer.setSize(this.width, this.height);
    this.composer.updateRaycaster(this.width, this.height);
    this.perspectiveCamera.updateProjectionMatrix();
  }

  onMouseMove = (event: { clientX: number; clientY: number; }) => {
    const rect = this.composer.renderer.domElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const mouse = new THREE.Vector2((x / this.canvas.clientWidth) * 2 - 1,
      (y / this.canvas.clientHeight) * - 2 + 1);

    this.perspectiveCamera.updateMatrixWorld();
    this.raycaster.setFromCamera(mouse, this.perspectiveCamera);
  }

  onMouseDown = () => {
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);
    if (intersects.length > 0) {
      console.log(intersects[0].object.name);
    }
  }

  update = () => {
    requestAnimationFrame(this.update);
    this.composer.render();

    this.scene.dispatch('update');
  }
}
