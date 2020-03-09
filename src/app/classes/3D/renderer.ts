import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { Camera } from './camera';

export class Renderer extends THREE.WebGLRenderer {
    constructor(threeCanvas: HTMLCanvasElement) {
        super({ canvas: threeCanvas, alpha: true });

        this.setPixelRatio(window.devicePixelRatio);
        this.setSize(threeCanvas.clientWidth, threeCanvas.clientHeight);
        this.setClearColor('#000000', 0);
        this.shadowMap.enabled = true;
        this.shadowMap.type = THREE.PCFSoftShadowMap;
    }
}

export class Composer extends EffectComposer {
    private renderPass: RenderPass;
    private FXAAPass: ShaderPass;
    private camera: Camera;

    constructor(scene: THREE.Scene, perspectiveCamera: Camera, renderer: Renderer) {
        super(renderer);

        this.camera = perspectiveCamera;

        // Get size from canvas
        const size = new THREE.Vector2(renderer.domElement.clientWidth, renderer.domElement.clientHeight);
        renderer.setSize(size.x, size.y);
        this.setSize(size.x, size.y);

        this.renderPass = new RenderPass(scene, perspectiveCamera);
        this.FXAAPass = new ShaderPass(FXAAShader);
        // tslint:disable-next-line: no-string-literal
        this.FXAAPass.uniforms['resolution'].value.set(1 / size.x, 1 / size.y);

        this.addPass(this.renderPass);
        this.addPass(this.FXAAPass);
    }

    // Apply viewport changed to canvas
    update(width: number, height: number) {
        this.renderer.setSize(width, width);
        this.setSize(width, width);

        this.camera.aspect = this.renderer.domElement.clientWidth / this.renderer.domElement.clientHeight;
        this.camera.updateProjectionMatrix();
    }
}
