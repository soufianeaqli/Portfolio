"use client";

import dynamic from "next/dynamic";

// Dynamically import the heavy R3F Scene3D and explicitly disable SSR
// We do this in a Client Component wrapper to comply with Next.js App Router rules.
const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export default function GlobalSceneWrapper() {
  return <Scene3D />;
}
