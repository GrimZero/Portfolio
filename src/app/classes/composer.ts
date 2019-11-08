import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import * as THREE from 'three';
import { Vector2 } from 'three';

export class Renderer extends THREE.WebGLRenderer {
    constructor(threeCanvas: HTMLCanvasElement) {
        super({ canvas: threeCanvas });

        this.setPixelRatio(window.devicePixelRatio);
        this.setSize(threeCanvas.clientWidth, threeCanvas.clientHeight);
        this.setClearColor('#777777');
        this.shadowMap.enabled = true;
        this.shadowMap.type = THREE.PCFSoftShadowMap;
    }
}

export class Composer extends EffectComposer {
    outlinePass: OutlinePass;
    private renderPass: RenderPass;
    private FXAAPass: ShaderPass;

    constructor(scene: THREE.Scene, perspectiveCamera: THREE.PerspectiveCamera, canvas: HTMLCanvasElement) {
        super(new Renderer(canvas));

        const size = new THREE.Vector2(this.renderer.domElement.clientWidth, this.renderer.domElement.clientHeight);

        this.renderer.setSize(size.x, size.y);
        this.outlinePass = new OutlinePass(size, scene, perspectiveCamera);
        this.renderPass = new RenderPass(scene, perspectiveCamera);
        this.FXAAPass = new ShaderPass(FXAAShader);
        // tslint:disable-next-line: no-string-literal
        this.FXAAPass.uniforms['resolution'].value.set(1 / canvas.clientWidth, 1 / canvas.clientHeight);

        this.addPass(this.renderPass);
        // this.addPass(this.outlinePass);
        this.addPass(this.FXAAPass);
    }

    updateRaycaster(sizeX: number, sizeY: number) {
        this.outlinePass.resolution = new Vector2(sizeX, sizeY);
    }

    toggleAntiAliasing() {
        this.FXAAPass.enabled = !this.FXAAPass.enabled;
    }

    getSelectedObject() {
        return this.outlinePass.selectedObjects[0];
    }
}
