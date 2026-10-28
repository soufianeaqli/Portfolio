"use client";

import React, { useEffect, useRef, useState, type HTMLAttributes } from "react";

type GalleryPhoto = {
  url: string;
  text: string;
  pos?: string;
  by: string;
};

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: GalleryPhoto;
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of auto-rotation when not scrolling. */
  autoRotateSpeed?: number;
  /** Called when a gallery card is clicked or activated from the keyboard. */
  onItemClick?: (item: GalleryItem, index: number) => void;
}

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(" ");

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  (
    {
      items,
      className,
      radius = 600,
      autoRotateSpeed = 0.02,
      onItemClick,
      ...props
    },
    ref,
  ) => {
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const animationFrameRef = useRef<number | null>(null);
    const dragRef = useRef({ pointerId: -1, lastX: 0, moved: false });
    const suppressClickRef = useRef(false);

    useEffect(() => {
      const autoRotate = () => {
        if (!isDragging) setRotation((previous) => previous + autoRotateSpeed);
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);
      return () => {
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isDragging, autoRotateSpeed]);

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.button !== 0 || (event.target instanceof Element && event.target.closest("button, a"))) return;
      dragRef.current = { pointerId: event.pointerId, lastX: event.clientX, moved: false };
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsDragging(true);
    };

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
      if (dragRef.current.pointerId !== event.pointerId) return;
      const deltaX = event.clientX - dragRef.current.lastX;
      if (Math.abs(deltaX) > 2) dragRef.current.moved = true;
      dragRef.current.lastX = event.clientX;
      setRotation((previous) => previous + deltaX * 0.5);
    };

    const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
      if (dragRef.current.pointerId !== event.pointerId) return;
      suppressClickRef.current = dragRef.current.moved;
      dragRef.current.pointerId = -1;
      setIsDragging(false);
    };

    const anglePerItem = items.length > 0 ? 360 / items.length : 0;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Galerie circulaire des projets"
        className={cn(
          "relative flex h-full w-full items-center justify-center touch-pan-y",
          isDragging ? "cursor-grabbing" : "cursor-grab",
          className,
        )}
        style={{ perspective: "2000px" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClickCapture={(event) => {
          if (!suppressClickRef.current) return;
          event.preventDefault();
          event.stopPropagation();
          suppressClickRef.current = false;
        }}
        {...props}
      >
        <div
          className="relative h-full w-full"
          style={{ transform: `rotateY(${rotation}deg)`, transformStyle: "preserve-3d" }}
        >
          {items.map((item, index) => {
            const itemAngle = index * anglePerItem;
            const relativeAngle = (itemAngle + (rotation % 360) + 360) % 360;
            const normalizedAngle = Math.abs(
              relativeAngle > 180 ? 360 - relativeAngle : relativeAngle,
            );
            const opacity = Math.max(0.3, 1 - normalizedAngle / 180);

            return (
              <div
                key={item.photo.url}
                role="group"
                aria-label={item.common}
                onClick={onItemClick ? () => onItemClick(item, index) : undefined}
                className={cn(
                  "absolute left-1/2 top-1/2 h-[400px] w-[300px] -ml-[150px] -mt-[200px] overflow-hidden rounded-2xl border border-white/15 bg-zinc-900 shadow-2xl",
                  onItemClick && "cursor-pointer",
                )}
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  opacity,
                  transition: "opacity 0.3s linear",
                }}
              >
                <img
                  src={item.photo.url}
                  alt={item.photo.text}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: item.photo.pos || "center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/15 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-5 pb-20 text-white">
                  <h3 className="text-xl font-bold leading-tight">{item.common}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/75">{item.binomial}</p>
                  <p className="mt-3 text-[11px] text-white/55">{item.photo.by}</p>
                </div>
                {onItemClick && (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onItemClick(item, index);
                    }}
                    className="absolute bottom-4 left-5 rounded-full border border-white/20 bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  >
                    Voir les détails
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

CircularGallery.displayName = "CircularGallery";

export { CircularGallery };
