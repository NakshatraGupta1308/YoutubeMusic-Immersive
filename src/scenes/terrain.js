import * as THREE from 'three';
import { BANDS } from '../audio.js';
import { makeSpecTexture, parallax } from './common.js';

const W = BANDS;
const H = 64;

const VERT = /* glsl */ `
uniform sampler2D uHist;
uniform float uAmp;
varying vec2 vUv;
varying float vH;
varying float vFog;
void main() {
  vUv = uv;
  float mx = abs(uv.x - 0.5) * 2.0;
  float band = pow(mx, 0.9) * 0.92;
  float h = texture2D(uHist, vec2(band, uv.y)).r;
  h = pow(h, 1.35) * uAmp * (1.0 - uv.y * 0.55);
  vec3 p = position;
  p.y += h;
  vH = h;
  vFog = smoothstep(0.0, 1.0, uv.y);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`;

const FRAG = /* glsl */ `
uniform vec3 uA, uB, uC;
uniform float uAmp;
varying vec2 vUv;
varying float vH;
varying float vFog;
void main() {
  vec2 g = vUv * vec2(96.0, 56.0);
  vec2 gw = fwidth(g);
  vec2 l = abs(fract(g - 0.5) - 0.5) / gw;
  float line = 1.0 - min(min(l.x, l.y), 1.0);
  float t = clamp(vH / uAmp * 1.8, 0.0, 1.0);
  vec3 col = mix(uA, uB, vUv.y);
  col = mix(col, uC, t);
  float a = line * (1.0 - vFog * 0.92) + 0.035 * (1.0 - vFog);
  gl_FragColor = vec4(col * a * (1.0 + t * 1.6), 1.0);
}`;

const SUN_FRAG = /* glsl */ `
uniform vec3 uA, uB;
uniform float uBeat, uBass, uTime;
varying vec2 vUv;
void main() {
  vec2 p = (vUv - 0.5) * 2.0;
  float d = length(p);
  float disc = smoothstep(1.0, 0.97, d);
  float stripes = step(0.5, fract(p.y * 7.0 - uTime * 0.12));
  float cut = mix(1.0, stripes, smoothstep(0.15, -0.75, p.y));
  vec3 col = mix(uB, uA, (p.y + 1.0) * 0.5);
  float glow = exp(-d * 2.2) * 0.55;
  gl_FragColor = vec4(col * (disc * cut * (0.65 + uBass * 0.6) + glow * (0.35 + uBeat)), 1.0);
}`;

export class TerrainScene {
  constructor(ctx) {
    this.ctx = ctx;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(58, 1, 0.1, 120);
    this.base = { y: 3.4, z: 12 };
    this.camera.position.set(0, this.base.y, this.base.z);

    const hist = makeSpecTexture(W, H);
    this.hist = hist.data;
    this.histTex = hist.tex;
    this._frame = 0;

    const geo = new THREE.PlaneGeometry(56, 40, 96, 56);
    geo.rotateX(-Math.PI / 2);
    this.mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uHist: { value: this.histTex },
        uAmp: { value: 7.5 },
        uA: { value: ctx.colors[0] },
        uB: { value: ctx.colors[1] },
        uC: { value: ctx.colors[2] },
      },
    });
    this.mesh = new THREE.Mesh(geo, this.mat);
    this.mesh.position.set(0, 0, -8);
    this.scene.add(this.mesh);

    this.sunMat = new THREE.ShaderMaterial({
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: SUN_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uA: { value: ctx.colors[2] },
        uB: { value: ctx.colors[1] },
        uBeat: { value: 0 },
        uBass: { value: 0 },
        uTime: { value: 0 },
      },
    });
    this.sun = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), this.sunMat);
    this.sun.position.set(0, 6.2, -30);
    this.scene.add(this.sun);
  }

  resize(w, h) {
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  update(time, dt) {
    const { audio } = this.ctx;
    this._frame++;
    if (this._frame % 2 === 0) {
      this.hist.copyWithin(W, 0, W * (H - 1));
      for (let i = 0; i < W; i++) this.hist[i] = Math.min(255, audio.spectrum[i] * 255);
      this.histTex.needsUpdate = true;
    }

    const u = this.sunMat.uniforms;
    u.uBeat.value = audio.beat;
    u.uBass.value = audio.bass;
    u.uTime.value = time;
    this.sun.scale.setScalar(1 + audio.beat * 0.06 + audio.bass * 0.05);

    parallax(this.camera, this.ctx, dt, 2.2, this.base);
    this.camera.position.z = this.base.z - audio.beat * 0.4;
    this.camera.lookAt(0, 1.6, -8);
  }
}
