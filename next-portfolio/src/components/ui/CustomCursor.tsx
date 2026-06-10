"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is touch or mobile
    const checkMobile = () => {
      const match = window.matchMedia("(pointer: coarse)");
      setIsMobile(match.matches || window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (isMobile) return;

    // Move cursor logic
    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && cursorDotRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.6,
          ease: "power3.out",
        });
        
        gsap.to(cursorDotRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out",
        });
      }
    };

    // Hover logic on clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        gsap.to(cursorRef.current, {
          scale: 2,
          backgroundColor: "rgba(239, 68, 68, 0.1)", // hover glow
          borderColor: "rgba(239, 68, 68, 0.5)",
          duration: 0.3,
        });
        gsap.to(cursorDotRef.current, {
          opacity: 0,
          duration: 0.2,
        });
      }
    };

    const handleMouseOut = () => {
      gsap.to(cursorRef.current, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(255, 255, 255, 0.3)",
        duration: 0.3,
      });
      gsap.to(cursorDotRef.current, {
        opacity: 1,
        duration: 0.2,
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] hidden md:block"
        style={{ transformOrigin: "center center" }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[10000] hidden md:block"
      />
    </>
  );
}
