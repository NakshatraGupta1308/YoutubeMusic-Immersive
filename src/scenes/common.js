import * as THREE from 'three';

let dot = null;
// Soft round sprite used for glowing points.
export function softDot() {
  if (dot) return dot;
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.35, 'rgba(255,255,255,0.45)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  dot = new THREE.CanvasTexture(c);
  return dot;
}

export function makeSpecTexture(w, h) {
  const data = new Uint8Array(w * h);
  const tex = new THREE.DataTexture(data, w, h, THREE.RedFormat, THREE.UnsignedByteType);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;
  return { data, tex };
}

export function parallax(camera, ctx, dt, strength, base) {
  const k = 1 - Math.exp(-dt * 2.5);
  camera.position.x += (ctx.pointer.x * strength - camera.position.x) * k;
  camera.position.y += (base.y + ctx.pointer.y * strength * 0.6 - camera.position.y) * k;
}

// Rolling spectrum history stored in a texture. Row 0 is the newest.
export class SpecHistory {
  constructor(W, H) {
    const t = makeSpecTexture(W, H);
    this.data = t.data;
    this.tex = t.tex;
    this.W = W;
    this.H = H;
    this.n = 0;
  }

  push(spec, every = 2) {
    if (++this.n % every) return;
    this.data.copyWithin(this.W, 0, this.W * (this.H - 1));
    for (let i = 0; i < this.W; i++) this.data[i] = Math.min(255, spec[i] * 255);
    this.tex.needsUpdate = true;
  }
}

export function makeDust(count, sx, sy, sz, zOff = 0) {
  const p = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    p[i * 3] = (Math.random() - 0.5) * sx;
    p[i * 3 + 1] = (Math.random() - 0.5) * sy;
    p[i * 3 + 2] = (Math.random() - 0.5) * sz + zOff;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(p, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.16,
    map: softDot(),
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  return { points: new THREE.Points(g, mat), mat };
}
