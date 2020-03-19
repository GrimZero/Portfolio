import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class Camera extends THREE.PerspectiveCamera {
    distanceToCenter: number;
    target: THREE.Vector3;
    lerpSpeed = 0.05;
    orbitControls: OrbitControls;

    constructor(aspect: number) {
        super(45, aspect, 0.1, 10000);
    }

    setTarget(position: THREE.Vector3) {
        this.target = position;
    }

    addOrbitControls(domElement: HTMLCanvasElement, zoom: boolean, pan: boolean, minAngle: number = undefined) {
        // camera controls
        this.orbitControls = new OrbitControls(this, domElement);

        this.orbitControls.enableZoom = zoom;
        this.orbitControls.enablePan = pan;
        this.orbitControls.maxPolarAngle = minAngle;
    }

    private moveToTarget() {
        if (this.target !== undefined) {
            this.position.lerp(this.target, this.lerpSpeed);
            if (this.position.distanceTo(this.target) <= 0.005) {
                this.target = undefined;
            }
        }
    }

    update() {
        // move to target when requested
        this.moveToTarget();

        // orbit around the object if defined
        if(this.orbitControls) {
            this.orbitControls.update();
        }
    }
}
