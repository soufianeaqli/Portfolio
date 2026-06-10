"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function ParticleSystem() {
  const ref = useRef<THREE.Points>(null!);
  
  // Create a spherical distribution of particles
  const positions = useMemo(() => {
    const count = 1500;
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Random coordinates inside a large cube to fill space
      array[i * 3] = (Math.random() - 0.5) * 40;     // x
      array[i * 3 + 1] = (Math.random() - 0.5) * 40; // y
      array[i * 3 + 2] = (Math.random() - 0.5) * 40; // z
    }
    return array;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Slow rotation for the entire starfield
      ref.current.rotation.x -= delta * 0.02;
      ref.current.rotation.y -= delta * 0.03;
    }
  });

  return (
    <group>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ff4444"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}
