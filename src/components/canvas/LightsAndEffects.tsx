// @ts-nocheck
"use client";

import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";

export default function LightsAndEffects() {
  return (
    <>
      {/* Core illumination */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      
      {/* Dramatic red rim/fill lighting */}
      <directionalLight position={[-10, -10, -5]} intensity={3} color="#ff0000" />
      <pointLight position={[0, 0, -10]} intensity={2} color="#ff2222" />
      
      {/* Post-processing pipeline */}
      <EffectComposer disableNormalPass multisampling={0}>
        {/* Glow effect for emissive materials and particles - Optimized resolution */}
        {/* @ts-ignore */}
        <Bloom 
          luminanceThreshold={0.8} 
          luminanceSmoothing={0.9} 
          height={200} 
          intensity={1.0} 
        />
      </EffectComposer>
    </>
  );
}
