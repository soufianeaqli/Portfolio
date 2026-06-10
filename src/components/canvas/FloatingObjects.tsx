"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Icosahedron, Torus, Octahedron } from "@react-three/drei";
import * as THREE from "three";

export default function FloatingObjects() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Global slow continuous rotation
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x += delta * 0.02;

      // Sinusoidal floating animation (up and down)
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 1.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Red wireframe core shape */}
      <Icosahedron args={[1.5, 0]} position={[-4, 2, 2]}>
        <meshStandardMaterial color="#ff0000" wireframe roughness={0.1} metalness={0.8} emissive="#660000" emissiveIntensity={0.5} />
      </Icosahedron>
      
      {/* Solid dark premium shapes */}
      <Torus args={[1.2, 0.15, 16, 32]} position={[5, -2, -2]} rotation={[Math.PI / 4, 0, 0]}>
        <meshStandardMaterial color="#111111" roughness={0.1} metalness={1} />
      </Torus>

      {/* Background small glowing shapes */}
      <Octahedron args={[0.5, 0]} position={[-2, -5, -8]}>
        <meshStandardMaterial color="#ff3333" roughness={0.5} metalness={0.5} emissive="#ff0000" emissiveIntensity={1} />
      </Octahedron>

      <Octahedron args={[0.8, 0]} position={[6, 5, -5]}>
        <meshStandardMaterial color="#222222" wireframe />
      </Octahedron>

      <Icosahedron args={[0.4, 0]} position={[0, -3, 6]}>
        <meshStandardMaterial color="#ff1111" roughness={0.2} metalness={0.8} />
      </Icosahedron>
    </group>
  );
}
