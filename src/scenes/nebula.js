import * as THREE from 'three';
import { BANDS } from '../audio.js';
import { makeSpecTexture, parallax, softDot } from './common.js';

const VERT = /* glsl */ `
attribute vec2 aSeed;
uniform float uTime, uBeat, uBass, uSize, uPR;
uniform sampler2D uSpec;
uniform vec3 uA, uB, uC;
varying vec3 vColor;
varying float vE;
void main() {
  vec3 dir = normalize(position);
  float len = length(position);
  float lon = atan(dir.z, dir.x);
  float band = clamp(pow(abs(dir.y), 0.85) * 0.85 + aSeed.x * 0.12 + 0.03 * sin(lon * 3.0 + uTime * 0.5), 0.0, 1.0);
  float e = texture2D(uSpec, vec2(band, 0.5)).r;
  float wob = sin(dir.x * 5.0 + uTime * 1.3) * sin(dir.y * 4.0 - uTime * 1.1) * sin(dir.z * 5.0 + uTime * 0.9);
  float radius = len * (1.0 + 0.10 * wob + e * 0.75 * (0.4 + aSeed.y) + uBeat * 0.10 + uBass * 0.12);
  vec4 mv = modelViewMatrix * vec4(dir * radius, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * uPR * (0.5 + e * 2.2 + uBeat * 0.6) * (8.0 / -mv.z) * (0.6 + aSeed.x * 0.8);
  vec3 base = mix(uA, uB, aSeed.x);
  vColor = mix(base, uC, clamp(e * 1.4, 0.0, 1.0));
  vE = e;
}`;

const FRAG = /* glsl */ `
varying vec3 vColor;
varying float vE;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  a *= a;
  gl_FragColor = vec4(vColor * a * (0.75 + vE * 1.5), 1.0);
}`;

export class NebulaScene {
  constructor(ctx) {
    this.ctx = ctx;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    this.base = { y: 0, z: 9 };
    this.camera.position.set(0, 0, this.base.z);

    const spec = makeSpecTexture(BANDS, 1);
    this.specData = spec.data;
    this.specTex = spec.tex;

    const N = 24000;
    const pos = new Float32Array(N * 3);
    const seed = new Float32Array(N * 2);
    for (let i = 0; i < N; i++) {
      const u = Math.random() * 2 - 1;
      const a = Math.random() * Math.PI * 2;
      const r = Math.sqrt(1 - u * u);
      const rad = Math.random() < 0.65 ? 2.4 + (Math.random() - 0.5) * 0.3 : 1.2 + Math.random() * 2.2;
      pos[i * 3] = r * Math.cos(a) * rad;
      pos[i * 3 + 1] = u * rad;
      pos[i * 3 + 2] = r * Math.sin(a) * rad;
      seed[i * 2] = Math.random();
      seed[i * 2 + 1] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 2));

    this.mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uBeat: { value: 0 },
        uBass: { value: 0 },
        uSize: { value: 4.4 },
        uPR: { value: ctx.renderer.getPixelRatio() },
        uSpec: { value: this.specTex },
        uA: { value: ctx.colors[0] },
        uB: { value: ctx.colors[1] },
        uC: { value: ctx.colors[2] },
      },
    });
    this.orb = new THREE.Points(geo, this.mat);
    this.scene.add(this.orb);

    this.core = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: softDot(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.5 })
    );
    this.core.scale.setScalar(4);
    this.scene.add(this.core);

    const M = 2600;
    const dp = new Float32Array(M * 3);
    for (let i = 0; i < M; i++) {
      dp[i * 3] = (Math.random() - 0.5) * 50;
      dp[i * 3 + 1] = (Math.random() - 0.5) * 30;
      dp[i * 3 + 2] = (Math.random() - 0.5) * 40 - 6;
    }
    const dg = new THREE.BufferGeometry();
    dg.setAttribute('position', new THREE.BufferAttribute(dp, 3));
    this.dustMat = new THREE.PointsMaterial({
      size: 0.18,
      map: softDot(),
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.dust = new THREE.Points(dg, this.dustMat);
    this.scene.add(this.dust);
  }

  resize(w, h) {
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.mat.uniforms.uPR.value = this.ctx.renderer.getPixelRatio();
  }

  update(time, dt) {
    const { audio, colors } = this.ctx;
    for (let i = 0; i < BANDS; i++) this.specData[i] = Math.min(255, audio.spectrum[i] * 255);
    this.specTex.needsUpdate = true;

    const u = this.mat.uniforms;
    u.uTime.value = time;
    u.uBeat.value = audio.beat;
    u.uBass.value = audio.bass;

    this.orb.rotation.y += dt * (0.08 + audio.level * 0.5 + audio.beat * 0.25);
    this.orb.rotation.x = Math.sin(time * 0.2) * 0.25;
    this.dust.rotation.y -= dt * 0.012;
    this.core.material.color.copy(colors[2]);
    this.core.material.opacity = 0.28 + audio.bass * 0.4 + audio.beat * 0.2;
    this.core.scale.setScalar(4.2 + audio.bass * 2.2 + audio.beat * 1.2);
    this.dustMat.color.copy(colors[1]).lerp(new THREE.Color(1, 1, 1), 0.35);
    this.dustMat.opacity = 0.35 + audio.treble * 0.5;

    parallax(this.camera, this.ctx, dt, 1.4, this.base);
    this.camera.position.z = this.base.z - audio.beat * 0.5;
    this.camera.lookAt(0, 0, 0);
  }
}
