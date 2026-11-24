import * as THREE from 'three';
import { BANDS } from '../audio.js';
import { parallax, softDot } from './common.js';

const RINGS = 7;
const PTS = 256;
const HIST = 48;
const DELAY = 5;
const BARS = 160;

function bandAt(spec, f) {
  // f in 0..1 around the circle, mirrored so both sides match
  const m = Math.abs(f * 2 - 1);
  const x = (1 - m) * (BANDS - 1) * 0.9;
  const i = Math.floor(x);
  const t = x - i;
  return spec[i] * (1 - t) + spec[Math.min(i + 1, BANDS - 1)] * t;
}

export class RingsScene {
  constructor(ctx) {
    this.ctx = ctx;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    this.base = { y: 0, z: 10 };
    this.camera.position.set(0, 0, this.base.z);

    this.history = Array.from({ length: HIST }, () => new Float32Array(BANDS));
    this.head = 0;

    this.rings = [];
    for (let k = 0; k < RINGS; k++) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(PTS * 3), 3));
      const lineMat = new THREE.LineBasicMaterial({
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const ptMat = new THREE.PointsMaterial({
        size: 0.14,
        map: softDot(),
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const group = new THREE.Group();
      group.add(new THREE.LineLoop(geo, lineMat));
      group.add(new THREE.Points(geo, ptMat));
      group.position.z = -k * 0.45;
      this.scene.add(group);
      this.rings.push({ group, geo, lineMat, ptMat });
    }

    const bgeo = new THREE.BufferGeometry();
    bgeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(BARS * 6), 3));
    bgeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(BARS * 6), 3));
    this.bars = new THREE.LineSegments(
      bgeo,
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    this.scene.add(this.bars);
  }

  resize(w, h) {
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  update(time, dt) {
    const { audio, colors } = this.ctx;
    this.head = (this.head + 1) % HIST;
    this.history[this.head].set(audio.spectrum);

    for (let k = 0; k < RINGS; k++) {
      const r = this.rings[k];
      const spec = this.history[(this.head - k * DELAY + HIST * 4) % HIST];
      const arr = r.geo.attributes.position.array;
      const base = 2.0 + k * 0.62;
      const amp = 1.5 - k * 0.12;
      const speed = 0.8 + k * 0.15;
      for (let i = 0; i < PTS; i++) {
        const f = i / PTS;
        const th = f * Math.PI * 2 + Math.PI / 2;
        const e = bandAt(spec, f);
        const rad = base + e * amp + 0.05 * Math.sin(th * 6 + time * speed + k);
        arr[i * 3] = Math.cos(th) * rad;
        arr[i * 3 + 1] = Math.sin(th) * rad;
        arr[i * 3 + 2] = 0;
      }
      r.geo.attributes.position.needsUpdate = true;
      const mix = k / (RINGS - 1);
      r.lineMat.color.copy(colors[0]).lerp(colors[1], mix);
      r.ptMat.color.copy(r.lineMat.color).lerp(new THREE.Color(1, 1, 1), 0.3);
      r.lineMat.opacity = 0.95 - mix * 0.6;
      r.ptMat.opacity = 0.9 - mix * 0.6;
      r.group.rotation.z += dt * 0.05 * (k % 2 ? 1 : -1) * (1 + audio.level * 2);
      r.group.scale.setScalar(1 + audio.beat * 0.05 * (1 - mix * 0.5));
    }

    const pos = this.bars.geometry.attributes.position.array;
    const col = this.bars.geometry.attributes.color.array;
    for (let j = 0; j < BARS; j++) {
      const f = j / BARS;
      const th = f * Math.PI * 2 + Math.PI / 2;
      const e = bandAt(audio.spectrum, f);
      const r0 = 1.05;
      const r1 = r0 + 0.05 + e * 1.4;
      const c = Math.cos(th), s = Math.sin(th);
      pos[j * 6] = c * r0; pos[j * 6 + 1] = s * r0; pos[j * 6 + 2] = 0;
      pos[j * 6 + 3] = c * r1; pos[j * 6 + 4] = s * r1; pos[j * 6 + 5] = 0;
      col[j * 6] = colors[1].r * 0.35; col[j * 6 + 1] = colors[1].g * 0.35; col[j * 6 + 2] = colors[1].b * 0.35;
      col[j * 6 + 3] = colors[2].r; col[j * 6 + 4] = colors[2].g; col[j * 6 + 5] = colors[2].b;
    }
    this.bars.geometry.attributes.position.needsUpdate = true;
    this.bars.geometry.attributes.color.needsUpdate = true;
    this.bars.rotation.z -= dt * 0.1;
    this.bars.scale.setScalar(1 + audio.beat * 0.08);

    parallax(this.camera, this.ctx, dt, 1.2, this.base);
    this.camera.position.z = this.base.z - audio.beat * 0.4;
    this.camera.lookAt(0, 0, 0);
  }
}
