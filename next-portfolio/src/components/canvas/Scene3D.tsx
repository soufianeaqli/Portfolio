"use client";

import { Canvas } from "@react-three/fiber";
import CameraRig from "./CameraRig";
import FloatingObjects from "./FloatingObjects";
import ParticleSystem from "./ParticleSystem";
import LightsAndEffects from "./LightsAndEffects";
import { Suspense } from "react";

export default function Scene3D() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-90 mix-blend-screen bg-black">
      {/* 
        Optimization: 
        - dpr clamped to [1, 1.5] to avoid performance drops on retina displays 
        - antialias disabled because post-processing often overrides it and saves perf
      */}
      <Canvas 
        dpr={1} 
        gl={{ 
          antialias: false, 
          alpha: true, 
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: true
        }}
      >
        <Suspense fallback={null}>
          <CameraRig />
          <LightsAndEffects />
          <FloatingObjects />
          <ParticleSystem />
        </Suspense>
      </Canvas>
    </div>
  );
}
