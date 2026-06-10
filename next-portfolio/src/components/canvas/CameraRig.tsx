"use client";

import { useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import * as THREE from "three";

export default function CameraRig() {
  const { scrollYProgress } = useScroll();
  const vec = new THREE.Vector3();

  useFrame((state, delta) => {
    // scroll ranges from 0 (top) to 1 (bottom)
    const scroll = scrollYProgress.get(); 
    
    // Parallax logic based on mouse pointer
    const targetX = state.pointer.x * 3;
    const targetY = state.pointer.y * 3;

    // Camera movement based on scroll
    // Start slightly back, move forward as user scrolls
    const cameraZ = 12 - (scroll * 18); 
    const cameraRotationX = scroll * -0.15; // slight downward tilt when plunging into scene

    // Smooth position interpolation
    vec.set(targetX, targetY, cameraZ);
    state.camera.position.lerp(vec, delta * 3);

    // Smooth rotation interpolation
    const targetRotation = new THREE.Euler(
      cameraRotationX + (state.pointer.y * -0.1), 
      (state.pointer.x * -0.1), 
      0
    );
    
    state.camera.rotation.x += (targetRotation.x - state.camera.rotation.x) * delta * 3;
    state.camera.rotation.y += (targetRotation.y - state.camera.rotation.y) * delta * 3;
  });

  return null;
}
