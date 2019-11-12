import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import * as THREE from 'three';

export class Renderer extends THREE.WebGLRenderer {
    constructor(htmlCanvas: HTMLCanvasElement) {
        super({ canvas: htmlCanvas, alpha: true });

        this.setPixelRatio(window.devicePixelRatio);
        this.shadowMap.enabled = true;
        this.shadowMap.type = THREE.PCFSoftShadowMap;
    }
}

export class Composer extends EffectComposer {
    outlinePass: OutlinePass;
    private renderPass: RenderPass;
    private FXAAPass: ShaderPass;

    constructor(scene: THREE.Scene, perspectiveCamera: THREE.PerspectiveCamera, renderer: Renderer) {
        super(renderer);

        const size = new THREE.Vector2();
        this.renderer.getDrawingBufferSize(size);

        this.outlinePass = new OutlinePass(size, scene, perspectiveCamera);
        this.renderPass = new RenderPass(scene, perspectiveCamera);
        this.FXAAPass = new ShaderPass(FXAAShader);

        // tslint:disable-next-line: no-string-literal
        this.FXAAPass.uniforms['resolution'].value.set(1 / size.x, 1 / size.y);

        this.addPass(this.renderPass);
        // this.addPass(this.outlinePass);
        this.addPass(this.FXAAPass);
    }

    updateRaycaster(sizeX: number, sizeY: number) {
        this.outlinePass.resolution = new THREE.Vector2(sizeX, sizeY);
    }

    toggleAntiAliasing() {
        this.FXAAPass.enabled = !this.FXAAPass.enabled;
    }

    getSelectedObject() {
        return this.outlinePass.selectedObjects[0];
    }
}
