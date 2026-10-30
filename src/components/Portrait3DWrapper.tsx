"use client";

import dynamic from "next/dynamic";

const Portrait3D = dynamic(() => import("./Portrait3D"), { ssr: false });

export default function Portrait3DWrapper({ className }: { className?: string }) {
  return <Portrait3D className={className} />;
}
