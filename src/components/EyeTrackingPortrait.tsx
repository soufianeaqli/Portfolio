"use client";

/**
 * EyeTrackingPortrait
 */

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  maxWidth?: number;
};

const IMG_BASE = 1024;

const IRIS_LEFT_REST = { x: 420, y: 259.5 };
const IRIS_RIGHT_REST = { x: 557, y: 254.8 };

const IRIS_MAX_X_PX = 10;
const IRIS_MAX_Y_PX = 6;

const HEAD_MAX_ROT_Y = 10;
const HEAD_MAX_ROT_X = 6;
const HEAD_MAX_TRANSLATE_PX = 5;

const BODY_PARALLAX_PX = 2;
const BG_PARALLAX_PX = 4;

const LERP_IRIS = 0.2;
const LERP_HEAD = 0.16;

const IDLE_TIMEOUT = 2000;

export default function EyeTrackingPortrait({ className = "", maxWidth = 520 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef(1);

  const bgRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  const irisLWrapRef = useRef<HTMLDivElement>(null);
  const irisRWrapRef = useRef<HTMLDivElement>(null);

  const targetPtr = useRef({ x: 0, y: 0 });
  const curPtr = useRef({ x: 0, y: 0 });
  const lastMove = useRef(performance.now());
  const rafId = useRef<number | null>(null);
  const reduced = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width || maxWidth;
      scaleRef.current = w / IMG_BASE;
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(container);

    const onPointerMove = (e: PointerEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      let clientX = 0;
      let clientY = 0;
      if ("touches" in e && e.touches[0]) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = (e as PointerEvent).clientX;
        clientY = (e as PointerEvent).clientY;
      }

      const dx = clientX - cx;
      const dy = clientY - cy;

      const nx = Math.max(-1, Math.min(1, dx / (rect.width * 0.35)));
      const ny = Math.max(-1, Math.min(1, dy / (rect.height * 0.25)));

      targetPtr.current.x = nx;
      targetPtr.current.y = ny;
      lastMove.current = performance.now();
    };

    const onPointerLeave = () => {
      targetPtr.current.x = 0;
      targetPtr.current.y = 0;
      lastMove.current = performance.now();
    };

    window.addEventListener("pointermove", onPointerMove as EventListener, { passive: true });
    window.addEventListener("touchmove", onPointerMove as EventListener, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("blur", onPointerLeave);

    const loop = () => {
      const now = performance.now();
      const idle = now - lastMove.current > IDLE_TIMEOUT;

      if (idle) {
        targetPtr.current.x *= 0.92;
        targetPtr.current.y *= 0.92;
        if (Math.abs(targetPtr.current.x) < 0.001) targetPtr.current.x = 0;
        if (Math.abs(targetPtr.current.y) < 0.001) targetPtr.current.y = 0;
      }

      curPtr.current.x += (targetPtr.current.x - curPtr.current.x) * LERP_IRIS;
      curPtr.current.y += (targetPtr.current.y - curPtr.current.y) * LERP_IRIS;

      const px = curPtr.current.x;
      const py = curPtr.current.y;

      const factor = reduced.current ? 0.5 : 1;
      const s = scaleRef.current;

      const irisTx = px * IRIS_MAX_X_PX * factor * s;
      const irisTy = py * IRIS_MAX_Y_PX * factor * s;

      if (irisLWrapRef.current) {
        irisLWrapRef.current.style.transform = `translate3d(${irisTx}px, ${irisTy}px, 0)`;
      }
      if (irisRWrapRef.current) {
        irisRWrapRef.current.style.transform = `translate3d(${irisTx}px, ${irisTy}px, 0)`;
      }

      if (headRef.current) {
        const rotY = px * HEAD_MAX_ROT_Y * factor;
        const rotX = py * HEAD_MAX_ROT_X * factor;
        const tX = px * HEAD_MAX_TRANSLATE_PX * factor * s;
        const tY = py * (HEAD_MAX_TRANSLATE_PX * 0.6) * factor * s;
        headRef.current.style.transform = `perspective(1000px) rotateY(${rotY}deg) rotateX(${rotX}deg) translate3d(${tX}px, ${tY}px, 0)`;
      }

      if (bodyRef.current) {
        const bx = -px * BODY_PARALLAX_PX * factor * s;
        const by = -py * (BODY_PARALLAX_PX * 0.4) * factor * s;
        bodyRef.current.style.transform = `translate3d(${bx}px, ${by}px, 0)`;
      }

      if (bgRef.current) {
        const gx = -px * BG_PARALLAX_PX * factor * s;
        const gy = -py * (BG_PARALLAX_PX * 0.3) * factor * s;
        bgRef.current.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("pointermove", onPointerMove as EventListener);
      window.removeEventListener("touchmove", onPointerMove as EventListener);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      ro.disconnect();
    };
  }, [maxWidth]);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[1024/1066] w-full select-none pointer-events-none ${className}`}
      style={{ maxWidth: `${maxWidth}px` }}
    >
      <div ref={bgRef} className="absolute inset-0 will-change-transform" style={{ transformOrigin: "50% 50%" }}>
        <img src="/layers/10_background_plate.png" alt="" draggable={false} className="absolute inset-0 h-full w-full select-none pointer-events-none" />
      </div>

      <div ref={bodyRef} className="absolute inset-0 will-change-transform" style={{ transformOrigin: "50% 50%" }}>
        <img src="/layers/20_body_neck_reconstructed.png" alt="" draggable={false} className="absolute inset-0 h-full w-full select-none pointer-events-none" />
      </div>

      <div ref={headRef} className="absolute inset-0 will-change-transform" style={{ transformOrigin: "49% 47%", transformStyle: "preserve-3d", pointerEvents: "none" }}>
        <img src="/layers/31_eye_white_L.png" alt="" draggable={false} className="absolute inset-0 h-full w-full select-none pointer-events-none" />
        <img src="/layers/31_eye_white_R.png" alt="" draggable={false} className="absolute inset-0 h-full w-full select-none pointer-events-none" />

        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage: "url(/layers/33_eye_opening_mask_L.png)",
            maskImage: "url(/layers/33_eye_opening_mask_L.png)",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        >
          <div ref={irisLWrapRef} className="absolute inset-0 will-change-transform" style={{ transformOrigin: `${IRIS_LEFT_REST.x / IMG_BASE * 100}% ${IRIS_LEFT_REST.y / IMG_BASE * 100}%` }}>
            <img src="/layers/32_iris_pupil_L.png" alt="" draggable={false} className="absolute inset-0 h-full w-full select-none pointer-events-none" />
          </div>
        </div>

        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage: "url(/layers/33_eye_opening_mask_R.png)",
            maskImage: "url(/layers/33_eye_opening_mask_R.png)",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        >
          <div ref={irisRWrapRef} className="absolute inset-0 will-change-transform" style={{ transformOrigin: `${IRIS_RIGHT_REST.x / IMG_BASE * 100}% ${IRIS_RIGHT_REST.y / IMG_BASE * 100}%` }}>
            <img src="/layers/32_iris_pupil_R.png" alt="" draggable={false} className="absolute inset-0 h-full w-full select-none pointer-events-none" />
          </div>
        </div>

        <img src="/layers/40_head_frame.png" alt="Portrait de Soufiane Aqli" draggable={false} className="absolute inset-0 h-full w-full select-none pointer-events-none" />
      </div>
    </div>
  );
}
