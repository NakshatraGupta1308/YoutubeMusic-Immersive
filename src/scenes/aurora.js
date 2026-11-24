import * as THREE from 'three';
import { BANDS } from '../audio.js';
import { makeSpecTexture } from './common.js';

const VERT = 'void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }';

const FRAG = /* glsl */ `
uniform float uTime, uBass, uMid, uTreble, uBeat;
uniform vec2 uRes;
uniform vec3 uA, uB, uC;
uniform sampler2D uSpec;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.02 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.14;
  vec3 col = vec3(0.0);
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float s = texture2D(uSpec, vec2((fi + 0.5) / 4.0 * 0.7, 0.5)).r;
    vec2 p = uv * vec2(1.3, 1.0);
    float w = fbm(p * 1.5 + vec2(t * (1.0 + fi * 0.3), fi * 3.1) + fbm(p * 2.0 - t));
    float y = p.y + (w - 0.5) * (0.95 + uBass * 0.9) - (fi - 1.5) * 0.3;
    float band = exp(-abs(y) * (8.5 - s * 3.5));
    vec3 c = fi < 1.5 ? mix(uA, uB, fi / 1.5) : mix(uB, uC, (fi - 1.5) / 1.5);
    col += c * band * (0.35 + s * 1.6 + uBeat * 0.4);
  }
  float star = step(0.9975, hash(floor(gl_FragCoord.xy / 2.0)));
  col += vec3(star) * 0.45 * (0.4 + uTreble);
  col = 1.0 - exp(-col * 1.15);
  gl_FragColor = vec4(col, 1.0);
}`;

export class AuroraScene {
  constructor(ctx) {
    this.ctx = ctx;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 10);
    const spec = makeSpecTexture(BANDS, 1);
    this.specData = spec.data;
    this.specTex = spec.tex;
    this.res = new THREE.Vector2(1, 1);
    this.mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uBass: { value: 0 },
        uMid: { value: 0 },
        uTreble: { value: 0 },
        uBeat: { value: 0 },
        uRes: { value: this.res },
        uSpec: { value: this.specTex },
        uA: { value: ctx.colors[0] },
        uB: { value: ctx.colors[1] },
        uC: { value: ctx.colors[2] },
      },
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.mat);
    quad.frustumCulled = false;
    this.scene.add(quad);
  }

  resize(w, h) {
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  update(time) {
    const { audio, renderer } = this.ctx;
    for (let i = 0; i < BANDS; i++) this.specData[i] = Math.min(255, audio.spectrum[i] * 255);
    this.specTex.needsUpdate = true;
    renderer.getDrawingBufferSize(this.res);
    const u = this.mat.uniforms;
    u.uTime.value = time;
    u.uBass.value = audio.bass;
    u.uMid.value = audio.mid;
    u.uTreble.value = audio.treble;
    u.uBeat.value = audio.beat;
  }
}
