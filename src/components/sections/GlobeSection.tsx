"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export function GlobeSection({ markers }: { markers: { location: [number, number], size: number }[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0.3,
      dark: 1, // dark mode looks best
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1], // white base
      markerColor: [0.1, 0.8, 1], // cyan markers
      glowColor: [1, 1, 1],
      markers: markers,
      onRender: (state: any) => {
        // Rotate globe automatically
        state.phi = phi;
        phi += 0.003;
      }
    } as any);

    return () => {
      globe.destroy();
    };
  }, [markers]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[60vh] relative overflow-hidden">
      <div className="absolute inset-0 bg-background/50 z-10 pointer-events-none" style={{ maskImage: "radial-gradient(circle at center, transparent 30%, black 100%)", WebkitMaskImage: "radial-gradient(circle at center, transparent 30%, black 100%)" }} />
      <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center opacity-90 transition-opacity duration-1000">
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            contain: "layout paint size",
            opacity: 1,
            transition: "opacity 1s ease",
          }}
        />
      </div>
    </div>
  );
}
