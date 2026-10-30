"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// ===== CONFIG =====
const CONFIG = {
  IMG_ASPECT: 1024 / 1066,
  IMG_W: 1024,
  IMG_H: 1066,

  DEPTH_HEAD_STRENGTH: 0.18,
  DEPTH_BODY_STRENGTH: 0.05,

  EYE_L_IMG: { x: 420, y: 259.5 },
  EYE_R_IMG: { x: 557, y: 254.8 },

  distVirtuelleFactor: 0.9,
  angleSaturation: 0.8,
  maxIrisX: 9,
  maxIrisY: 5,
  irisEllipticClamp: true,

  maxHeadYaw: 15,
  maxHeadPitch: 8,
  headFollowRatio: 0.4,
  headPivot: new THREE.Vector3(0, -0.02, 0),
  BODY_ROT_MAX_Y: 2,
  BODY_ROT_MAX_X: 1,

  kIris: 10,
  kHead: 5.5,

  IDLE_NO_MOVE_STAY: 2000,
  LEAVE_KEEP_DIR: 1000,

  saccadeAmp: 0.3,
  saccadeMinInterval: 1000,
  saccadeMaxInterval: 3000,
};

// ===== SHADERS =====
const vertDepth = `
  uniform sampler2D uDepth;
  uniform float uStrength;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    float d = texture2D(uDepth, uv).r;
    vec3 pos = position;
    pos.z += (d - 0.5) * uStrength;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragSimple = `
  uniform sampler2D uMap;
  varying vec2 vUv;
  void main() {
    vec4 c = texture2D(uMap, vUv);
    gl_FragColor = c;
  }
`;

const fragIris = `
  uniform sampler2D uIris;
  uniform sampler2D uMask;
  uniform vec2 uOffset;
  varying vec2 vUv;
  void main() {
    vec2 uvOff = vUv - uOffset;
    vec4 iris = texture2D(uIris, uvOff);
    vec4 mask = texture2D(uMask, vUv);
    float a = iris.a * mask.a;
    gl_FragColor = vec4(iris.rgb, a);
  }
`;

// ===== UTILS =====
function tanh(x: number) {
  const e2 = Math.exp(2 * x);
  return (e2 - 1) / (e2 + 1);
}

function expSmooth(current: number, target: number, k: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-k * dt));
}

function clampElliptic(x: number, y: number, maxX: number, maxY: number) {
  if (maxX <= 0 || maxY <= 0) return { x: 0, y: 0 };
  const nx = x / maxX;
  const ny = y / maxY;
  const len2 = nx * nx + ny * ny;
  if (len2 <= 1) return { x, y };
  const len = Math.sqrt(len2);
  return { x: (nx / len) * maxX, y: (ny / len) * maxY };
}

// ===== COMPONENTS =====
function Layer({
  texture,
  depthMap,
  strength = 0,
  renderOrder = 0,
  depthWrite = false,
  transparent = true,
}: {
  texture: THREE.Texture;
  depthMap?: THREE.Texture;
  strength?: number;
  renderOrder?: number;
  depthWrite?: boolean;
  transparent?: boolean;
}) {
  const uniforms = useMemo(() => {
    return {
      uMap: { value: texture },
      uDepth: { value: depthMap || texture },
      uStrength: { value: strength },
    };
  }, [texture, depthMap, strength]);

  const mat = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader:
        strength > 0
          ? vertDepth
          : `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: fragSimple,
      transparent,
      depthWrite,
      depthTest: true,
    });
  }, [uniforms, strength, transparent, depthWrite]);

  return (
    <mesh renderOrder={renderOrder}>
      <planeGeometry args={[CONFIG.IMG_ASPECT, 1, 256, 266]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

function IrisLayer({
  irisTex,
  maskTex,
  depthMap,
  strength,
  renderOrder,
  offsetRef,
}: {
  irisTex: THREE.Texture;
  maskTex: THREE.Texture;
  depthMap: THREE.Texture;
  strength: number;
  renderOrder: number;
  offsetRef: React.MutableRefObject<THREE.Vector2>;
}) {
  const uniforms = useMemo(
    () => ({
      uIris: { value: irisTex },
      uMask: { value: maskTex },
      uDepth: { value: depthMap },
      uStrength: { value: strength },
      uOffset: { value: new THREE.Vector2() },
    }),
    [irisTex, maskTex, depthMap, strength]
  );

  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader: vertDepth,
        fragmentShader: fragIris,
        transparent: true,
        depthWrite: false,
        depthTest: true,
      }),
    [uniforms]
  );

  useFrame(() => {
    if (mat.uniforms.uOffset) {
      mat.uniforms.uOffset.value.copy(offsetRef.current);
    }
  });

  return (
    <mesh renderOrder={renderOrder}>
      <planeGeometry args={[CONFIG.IMG_ASPECT, 1, 256, 266]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

function PortraitGroup({
  textures,
  pointer,
}: {
  textures: Record<string, THREE.Texture>;
  pointer: React.MutableRefObject<{
    x: number;
    y: number;
    lastMove: number;
    lastSeen: number;
    inWindow: boolean;
    hasPointer: boolean;
  }>;
}) {
  const { gl } = useThree();
  const headGroup = useRef<THREE.Group>(null);
  const bodyGroup = useRef<THREE.Group>(null);

  const irisLTarget = useRef(new THREE.Vector2());
  const irisRTarget = useRef(new THREE.Vector2());
  const irisLSmooth = useRef(new THREE.Vector2());
  const irisRSmooth = useRef(new THREE.Vector2());
  const irisL = useRef(new THREE.Vector2());
  const irisR = useRef(new THREE.Vector2());

  const headTargetYaw = useRef(0);
  const headTargetPitch = useRef(0);
  const headYaw = useRef(0);
  const headPitch = useRef(0);

  const reduced = useRef(false);

  const saccadeTimer = useRef(0);
  const saccadeNext = useRef(1500);
  const saccadeOffset = useRef(new THREE.Vector2());

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    saccadeNext.current = CONFIG.saccadeMinInterval + Math.random() * (CONFIG.saccadeMaxInterval - CONFIG.saccadeMinInterval);
  }, []);

  useFrame((_, dt) => {
    const now = performance.now();
    const p = pointer.current;
    const f = reduced.current ? 0.5 : 1;

    let gazeActive = p.inWindow && p.hasPointer;
    if (!gazeActive) {
      if (now - p.lastSeen < CONFIG.LEAVE_KEEP_DIR) {
        gazeActive = true;
      } else {
        gazeActive = false;
      }
    }

    const canvas = gl.domElement;
    const rect = canvas.getBoundingClientRect();

    const scaleX = rect.width / CONFIG.IMG_W;
    const scaleY = rect.height / CONFIG.IMG_H;
    const eyeLx = rect.left + CONFIG.EYE_L_IMG.x * scaleX;
    const eyeLy = rect.top + CONFIG.EYE_L_IMG.y * scaleY;
    const eyeRx = rect.left + CONFIG.EYE_R_IMG.x * scaleX;
    const eyeRy = rect.top + CONFIG.EYE_R_IMG.y * scaleY;

    const distVirt = Math.max(1, window.innerWidth * CONFIG.distVirtuelleFactor);

    let angYL = 0;
    let angXL = 0;
    let angYR = 0;
    let angXR = 0;

    if (gazeActive) {
      const px = p.x;
      const py = p.y;

      const dxL = px - eyeLx;
      const dyL = py - eyeLy;
      const dxR = px - eyeRx;
      const dyR = py - eyeRy;

      angYL = Math.atan2(dxL, distVirt);
      angXL = Math.atan2(dyL, distVirt);
      angYR = Math.atan2(dxR, distVirt);
      angXR = Math.atan2(dyR, distVirt);
    } else {
      angYL = angYR = angXL = angXR = 0;
    }

    const mapAng = (ang: number, maxPx: number) => {
      const a = ang / CONFIG.angleSaturation;
      const val = tanh(a) * maxPx;
      return val;
    };

    let oxL = mapAng(angYL, CONFIG.maxIrisX) * f;
    let oyL = mapAng(angXL, CONFIG.maxIrisY) * f;
    let oxR = mapAng(angYR, CONFIG.maxIrisX) * f;
    let oyR = mapAng(angXR, CONFIG.maxIrisY) * f;

    if (CONFIG.irisEllipticClamp) {
      const cL = clampElliptic(oxL, oyL, CONFIG.maxIrisX * f, CONFIG.maxIrisY * f);
      const cR = clampElliptic(oxR, oyR, CONFIG.maxIrisX * f, CONFIG.maxIrisY * f);
      oxL = cL.x;
      oyL = cL.y;
      oxR = cR.x;
      oyR = cR.y;
    }

    irisLTarget.current.set(oxL / CONFIG.IMG_W, -oyL / CONFIG.IMG_H);
    irisRTarget.current.set(oxR / CONFIG.IMG_W, -oyR / CONFIG.IMG_H);

    const timeSinceMove = now - p.lastMove;
    if (gazeActive && timeSinceMove > CONFIG.IDLE_NO_MOVE_STAY) {
      saccadeTimer.current += dt * 1000;
      if (saccadeTimer.current > saccadeNext.current) {
        const sa = CONFIG.saccadeAmp * f;
        saccadeOffset.current.set((Math.random() - 0.5) * 2 * sa, (Math.random() - 0.5) * 2 * sa);
        saccadeTimer.current = 0;
        saccadeNext.current = CONFIG.saccadeMinInterval + Math.random() * (CONFIG.saccadeMaxInterval - CONFIG.saccadeMinInterval);
      }
    } else {
      saccadeOffset.current.set(0, 0);
      saccadeTimer.current = 0;
    }

    irisLSmooth.current.x = expSmooth(irisLSmooth.current.x, irisLTarget.current.x, CONFIG.kIris, dt);
    irisLSmooth.current.y = expSmooth(irisLSmooth.current.y, irisLTarget.current.y, CONFIG.kIris, dt);
    irisRSmooth.current.x = expSmooth(irisRSmooth.current.x, irisRTarget.current.x, CONFIG.kIris, dt);
    irisRSmooth.current.y = expSmooth(irisRSmooth.current.y, irisRTarget.current.y, CONFIG.kIris, dt);

    irisL.current.set(irisLSmooth.current.x + saccadeOffset.current.x / CONFIG.IMG_W, irisLSmooth.current.y + saccadeOffset.current.y / CONFIG.IMG_H);
    irisR.current.set(irisRSmooth.current.x + saccadeOffset.current.x / CONFIG.IMG_W, irisRSmooth.current.y + saccadeOffset.current.y / CONFIG.IMG_H);

    const angYAvg = (angYL + angYR) * 0.5;
    const angXAvg = (angXL + angXR) * 0.5;
    const headAngY = tanh(angYAvg / CONFIG.angleSaturation) * CONFIG.maxHeadYaw * CONFIG.headFollowRatio * f;
    const headAngX = tanh(angXAvg / CONFIG.angleSaturation) * CONFIG.maxHeadPitch * CONFIG.headFollowRatio * f;

    headTargetYaw.current = headAngY;
    headTargetPitch.current = headAngX;

    headYaw.current = expSmooth(headYaw.current, headTargetYaw.current, CONFIG.kHead, dt);
    headPitch.current = expSmooth(headPitch.current, headTargetPitch.current, CONFIG.kHead, dt);

    if (headGroup.current) {
      headGroup.current.rotation.y = THREE.MathUtils.degToRad(headYaw.current);
      headGroup.current.rotation.x = THREE.MathUtils.degToRad(headPitch.current);
    }
    if (bodyGroup.current) {
      bodyGroup.current.rotation.y = THREE.MathUtils.degToRad(headYaw.current * (CONFIG.BODY_ROT_MAX_Y / CONFIG.maxHeadYaw));
      bodyGroup.current.rotation.x = THREE.MathUtils.degToRad(headPitch.current * (CONFIG.BODY_ROT_MAX_X / CONFIG.maxHeadPitch));
    }
  });

  const bg = textures.bg;
  const body = textures.body;
  const eyeWl = textures.ewl;
  const eyeWr = textures.ewr;
  const irisLtex = textures.il;
  const irisRtex = textures.ir;
  const maskL = textures.ml;
  const maskR = textures.mr;
  const head = textures.head;
  const depth = textures.depth;

  return (
    <group>
      <Layer texture={bg} renderOrder={0} depthWrite={false} />
      <group ref={bodyGroup}>
        <Layer texture={body} depthMap={depth} strength={CONFIG.DEPTH_BODY_STRENGTH} renderOrder={1} depthWrite={false} />
      </group>
      <group ref={headGroup} position={[CONFIG.headPivot.x, CONFIG.headPivot.y, CONFIG.headPivot.z]}>
        <Layer texture={eyeWl} depthMap={depth} strength={CONFIG.DEPTH_HEAD_STRENGTH} renderOrder={2} depthWrite={false} />
        <Layer texture={eyeWr} depthMap={depth} strength={CONFIG.DEPTH_HEAD_STRENGTH} renderOrder={3} depthWrite={false} />
        <IrisLayer irisTex={irisLtex} maskTex={maskL} depthMap={depth} strength={CONFIG.DEPTH_HEAD_STRENGTH} renderOrder={4} offsetRef={irisL} />
        <IrisLayer irisTex={irisRtex} maskTex={maskR} depthMap={depth} strength={CONFIG.DEPTH_HEAD_STRENGTH} renderOrder={5} offsetRef={irisR} />
        <Layer texture={head} depthMap={depth} strength={CONFIG.DEPTH_HEAD_STRENGTH} renderOrder={6} depthWrite={false} />
      </group>
    </group>
  );
}

function PortraitScene({ pointer }: { pointer: React.MutableRefObject<any> }) {
  const textures = useTexture([
    "/layers/10_background_plate.png",
    "/layers/20_body_neck_reconstructed.png",
    "/layers/31_eye_white_L.png",
    "/layers/31_eye_white_R.png",
    "/layers/32_iris_pupil_L.png",
    "/layers/32_iris_pupil_R.png",
    "/layers/33_eye_opening_mask_L.png",
    "/layers/33_eye_opening_mask_R.png",
    "/layers/40_head_frame.png",
    "/layers/depth.png",
  ]);

  useEffect(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.generateMipmaps = false;
    });
  }, [textures]);

  const map = useMemo(
    () => ({
      bg: textures[0],
      body: textures[1],
      ewl: textures[2],
      ewr: textures[3],
      il: textures[4],
      ir: textures[5],
      ml: textures[6],
      mr: textures[7],
      head: textures[8],
      depth: textures[9],
    }),
    [textures]
  );

  return <PortraitGroup textures={map} pointer={pointer} />;
}

export default function Portrait3D({ className = "relative aspect-[1024/1066] w-full" }: { className?: string }) {
  const pointer = useRef({
    x: 0,
    y: 0,
    lastMove: 0,
    lastSeen: 0,
    inWindow: true,
    hasPointer: false,
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const now = performance.now();
    pointer.current.lastMove = now;
    pointer.current.lastSeen = now;

    const onMove = (e: PointerEvent | TouchEvent) => {
      pointer.current.hasPointer = true;
      pointer.current.inWindow = true;
      pointer.current.lastSeen = performance.now();
      pointer.current.lastMove = performance.now();

      let x = 0,
        y = 0;
      if ("touches" in e && e.touches[0]) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else if ("clientX" in e) {
        x = (e as PointerEvent).clientX;
        y = (e as PointerEvent).clientY;
      }
      pointer.current.x = x;
      pointer.current.y = y;
    };

    const onLeave = () => {
      pointer.current.inWindow = false;
      pointer.current.lastSeen = performance.now();
    };

    const onEnter = () => {
      pointer.current.inWindow = true;
      pointer.current.lastSeen = performance.now();
    };

    const onBlur = () => {
      pointer.current.inWindow = false;
      pointer.current.lastSeen = performance.now();
    };

    window.addEventListener("pointermove", onMove as EventListener, { passive: true });
    window.addEventListener("touchmove", onMove as EventListener, { passive: true });
    window.addEventListener("pointerenter", onEnter);
    window.addEventListener("mouseenter", onEnter);
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onBlur);
    window.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove as EventListener);
      window.removeEventListener("touchmove", onMove as EventListener);
      window.removeEventListener("pointerenter", onEnter);
      window.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <div className={className}>
      {!loaded && <img src="/layers/10_background_plate.png" alt="" className="absolute inset-0 w-full h-full" />}
      <Canvas gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 2.4], fov: 25 }} dpr={[1, 2]} frameloop="always">
        <Suspense fallback={null}>
          <PortraitScene pointer={pointer} />
        </Suspense>
      </Canvas>
    </div>
  );
}
