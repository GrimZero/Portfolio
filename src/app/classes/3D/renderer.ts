import * as THREE from 'three';

export class Renderer extends THREE.WebGLRenderer {
    constructor(htmlCanvas: HTMLCanvasElement, color?: string) {
        super({ canvas: htmlCanvas, alpha: color === undefined });

        if (color) {
            this.setClearColor(color);
        }

        this.shadowMap.type = THREE.PCFSoftShadowMap;
        this.setPixelRatio(window.devicePixelRatio);
        this.shadowMap.enabled = true;
    }
}
