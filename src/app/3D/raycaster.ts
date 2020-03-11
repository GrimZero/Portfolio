import * as THREE from 'three';
import { fromEvent, Subject } from 'rxjs';
import { Renderer } from './renderer';

export class Raycaster extends THREE.Raycaster {
    private mouse: THREE.Vector2 = new THREE.Vector2();
    private array: THREE.Object3D[] = [];

    result = new Subject<THREE.Intersection>();

    constructor(camera: THREE.PerspectiveCamera, renderer: Renderer) {
        super();

        // store mouse position
        fromEvent(renderer.domElement, 'mousemove').subscribe((event: MouseEvent) => {
            const canvasBounds = renderer.domElement.getBoundingClientRect();
            this.mouse.x = ((event.clientX - canvasBounds.left) / (canvasBounds.right - canvasBounds.left)) * 2 - 1;
            this.mouse.y = - ((event.clientY - canvasBounds.top) / (canvasBounds.bottom - canvasBounds.top)) * 2 + 1;
        });

        // process raycast
        fromEvent(renderer.domElement, 'click').subscribe((event: MouseEvent) => {
            this.setFromCamera(this.mouse, camera);

            if (this.array.length > 0) {
                const intersections = this.intersectObjects(this.array);
                if (intersections && intersections.length > 0) {
                    this.result.next(intersections[0]);
                }
            }
        });
    }

    setTargets(array: THREE.Object3D[]) {
        this.array = array;
        return this.result;
    }
}
