import * as THREE from 'three';
import { BANDS } from '../audio.js';
import { SpecHistory, parallax } from './common.js';

const L = 60;

const VERT = /* glsl */ `
uniform sampler2D uHist;
uniform float uAmp, uTime;
varying vec2 vUv;
varying float vH;
void main() {
  vUv = uv;
  float a = abs(fract(uv.x + 0.5) * 2.0 - 1.0);
  float band = pow(a, 0.9) * 0.92;
  float h = pow(texture2D(uHist, vec2(band, uv.y)).r, 1.3);
  vec2 d = normalize(position.xy);
  float r = 4.2 + h * uAmp + 0.25 * sin(uv.y * 18.0 - uTime * 2.0 + uv.x * 18.8496);
  vH = h;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(d * r, position.z, 1.0);
}`;

const FRAG = /* glsl */ `
uniform vec3 uA, uB, uC;
uniform float uTime, uBeat;
varying vec2 vUv;
varying float vH;
void main() {
  vec2 g = vec2(vUv.x * 64.0, vUv.y * 44.0 + uTime * 2.2);
  vec2 gw = fwidth(g);
  vec2 l = abs(fract(g - 0.5) - 0.5) / gw;
  float line = 1.0 - min(min(l.x, l.y), 1.0);
  vec3 col = mix(uA, uB, clamp(vUv.y * 1.3, 0.0, 1.0));
  col = mix(col, uC, clamp(vH * 1.7, 0.0, 1.0));
  float fade = (1.0 - smoothstep(0.05, 1.0, vUv.y)) * smoothstep(0.0, 0.05, vUv.y);
  float a = (line + 0.04) * fade;
  gl_FragColor = vec4(col * a * (1.0 + vH * 1.8 + uBeat * 0.4), 1.0);
}`;

export class TunnelScene {
  constructor(ctx) {
    this.ctx = ctx;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.05, 100);
    this.base = { y: 0, z: 0 };
    this.hist = new SpecHistory(BANDS, 80);

    const geo = new THREE.CylinderGeometry(1, 1, L, 128, 80, true);
    geo.rotateX(-Math.PI / 2);
    this.mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uHist: { value: this.hist.tex },
        uAmp: { value: 3.2 },
        uTime: { value: 0 },
        uBeat: { value: 0 },
        uA: { value: ctx.colors[0] },
        uB: { value: ctx.colors[1] },
        uC: { value: ctx.colors[2] },
      },
    });
    this.mesh = new THREE.Mesh(geo, this.mat);
    this.mesh.position.z = -L / 2 + 3;
    this.mesh.rotation.z = Math.PI / 2;
    this.scene.add(this.mesh);
  }

  resize(w, h) {
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  update(time, dt) {
    const { audio, pointer } = this.ctx;
    this.hist.push(audio.spectrum, 2);
    this.mat.uniforms.uTime.value = time;
    this.mat.uniforms.uBeat.value = audio.beat;
    this.camera.rotation.z += dt * (0.08 + audio.level * 0.35);
    this.camera.position.x += (pointer.x * 0.5 - this.camera.position.x) * 0.05;
    this.camera.position.y += (pointer.y * 0.35 - this.camera.position.y) * 0.05;
    this.camera.fov = 75 + audio.beat * 7;
    this.camera.updateProjectionMatrix();
  }
}
