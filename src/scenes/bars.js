import * as THREE from 'three';
import { BANDS } from '../audio.js';

const COLS = 56;
const ROWS = 22;
const SP = 0.62;
const SPZ = 1.1;
const HIST = ROWS * 3 + 2;

export class BarsScene {
  constructor(ctx) {
    this.ctx = ctx;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(52, 1, 0.1, 120);
    this.history = Array.from({ length: HIST }, () => new Float32Array(BANDS));
    this.head = 0;
    this.tmp = new THREE.Color();

    this.mesh = new THREE.InstancedMesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshLambertMaterial(),
      COLS * ROWS
    );
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.frustumCulled = false;
    for (let i = 0; i < COLS * ROWS; i++) this.mesh.setColorAt(i, this.tmp.setRGB(0, 0, 0));
    this.scene.add(this.mesh);
    this.scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const sun = new THREE.DirectionalLight(0xffffff, 2.6);
    sun.position.set(5, 10, 8);
    this.scene.add(sun);

    this.bandOf = new Int16Array(COLS);
    for (let c = 0; c < COLS; c++) {
      const m = Math.abs(((c + 0.5) / COLS) * 2 - 1);
      this.bandOf[c] = Math.min(BANDS - 1, Math.floor(Math.pow(m, 0.9) * (BANDS - 1) * 0.92));
    }
  }

  resize(w, h) {
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  update(time, dt) {
    const { audio, colors, pointer } = this.ctx;
    this.head = (this.head + 1) % HIST;
    this.history[this.head].set(audio.spectrum);

    const arr = this.mesh.instanceMatrix.array;
    const A = colors[0], B = colors[1], C = colors[2];
    for (let r = 0; r < ROWS; r++) {
      const spec = this.history[(this.head - r * 3 + HIST * 4) % HIST];
      const depth = r / (ROWS - 1);
      for (let c = 0; c < COLS; c++) {
        const i = r * COLS + c;
        const e = spec[this.bandOf[c]];
        const h = 0.12 + Math.pow(e, 1.1) * 9 * (1 - depth * 0.45);
        const o = i * 16;
        arr[o] = SP * 0.78;
        arr[o + 5] = h;
        arr[o + 10] = SPZ * 0.7;
        arr[o + 12] = (c - COLS / 2 + 0.5) * SP;
        arr[o + 13] = h / 2;
        arr[o + 14] = -r * SPZ;
        arr[o + 15] = 1;
        this.tmp.copy(A).lerp(B, depth).lerp(C, Math.min(1, e * 1.3)).multiplyScalar(0.4 + e * 0.8);
        this.mesh.setColorAt(i, this.tmp);
      }
    }
    this.mesh.instanceMatrix.needsUpdate = true;
    this.mesh.instanceColor.needsUpdate = true;

    const ang = Math.sin(time * 0.15) * 0.55 + pointer.x * 0.25;
    this.camera.position.set(Math.sin(ang) * 15, 7.5 + pointer.y * 1.5 - audio.beat * 0.3, Math.cos(ang) * 11 + 3);
    this.camera.lookAt(0, 2.2, -11);
  }
}
