import * as THREE from 'three';
import { BANDS } from '../audio.js';
import { makeDust, makeSpecTexture, parallax } from './common.js';

const VERT = /* glsl */ `
uniform sampler2D uSpec;
uniform float uTime, uBeat;
varying vec3 vPos;
varying float vE;
void main() {
  vec3 dir = normalize(position);
  float lon = atan(dir.z, dir.x);
  float band = clamp(abs(dir.y) * 0.85 + 0.05 * sin(lon * 4.0 + uTime * 0.7), 0.0, 1.0);
  float e = texture2D(uSpec, vec2(band, 0.5)).r;
  float r = 2.1 * (1.0 + e * 0.55 + uBeat * 0.1 + 0.04 * sin(dir.x * 6.0 + uTime) * sin(dir.y * 5.0 - uTime));
  vE = e;
  vec4 mv = modelViewMatrix * vec4(dir * r, 1.0);
  vPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
}`;

const FACES = /* glsl */ `
uniform vec3 uA, uB, uC;
varying vec3 vPos;
varying float vE;
void main() {
  vec3 n = normalize(cross(dFdx(vPos), dFdy(vPos)));
  float fres = pow(1.0 - abs(n.z), 1.6);
  float light = max(dot(n, normalize(vec3(0.4, 0.7, 0.6))), 0.0);
  vec3 col = mix(uA, uB, n.y * 0.5 + 0.5) * (0.22 + light * 0.9) + uC * fres * 1.3;
  gl_FragColor = vec4(col * (0.75 + vE * 0.9), 1.0);
}`;

const WIRE = /* glsl */ `
uniform vec3 uC;
varying vec3 vPos;
varying float vE;
void main() {
  gl_FragColor = vec4(mix(uC, vec3(1.0), 0.55) * (0.18 + vE * 0.85), 1.0);
}`;

export class CrystalScene {
  constructor(ctx) {
    this.ctx = ctx;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    this.base = { y: 0, z: 9 };
    this.camera.position.set(0, 0, this.base.z);

    const spec = makeSpecTexture(BANDS, 1);
    this.specData = spec.data;
    this.specTex = spec.tex;

    const uniforms = {
      uSpec: { value: this.specTex },
      uTime: { value: 0 },
      uBeat: { value: 0 },
      uA: { value: ctx.colors[0] },
      uB: { value: ctx.colors[1] },
      uC: { value: ctx.colors[2] },
    };
    const geo = new THREE.IcosahedronGeometry(1, 6);
    this.solid = new THREE.Mesh(geo, new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FACES, uniforms }));
    this.wire = new THREE.Mesh(
      geo,
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: WIRE,
        uniforms,
        wireframe: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    this.group = new THREE.Group();
    this.group.add(this.solid, this.wire);
    this.scene.add(this.group);
    this.uniforms = uniforms;

    const d = makeDust(2200, 44, 26, 30, -4);
    this.dust = d.points;
    this.dustMat = d.mat;
    this.scene.add(this.dust);
  }

  resize(w, h) {
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  update(time, dt) {
    const { audio, colors } = this.ctx;
    for (let i = 0; i < BANDS; i++) this.specData[i] = Math.min(255, audio.spectrum[i] * 255);
    this.specTex.needsUpdate = true;
    this.uniforms.uTime.value = time;
    this.uniforms.uBeat.value = audio.beat;

    this.group.rotation.y += dt * (0.18 + audio.level * 0.7);
    this.group.rotation.x = Math.sin(time * 0.3) * 0.35;
    this.dust.rotation.y += dt * 0.02;
    this.dustMat.color.copy(colors[0]).lerp(new THREE.Color(1, 1, 1), 0.3);
    this.dustMat.opacity = 0.3 + audio.treble * 0.6;

    parallax(this.camera, this.ctx, dt, 1.2, this.base);
    this.camera.position.z = this.base.z - audio.beat * 0.6;
    this.camera.lookAt(0, 0, 0);
  }
}
