"use client"
import { useRef, useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type SineWaveParticle = {
  x: number;
  y: number;
  phase: number;
  width: number;
  startTime: number;
};

type ClickSineWaveProps = {
  strokeColor?: string;
  waveSpeed?: number;
  expandSpeed?: number;
  amplitude?: number;
  lineWidth?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickSineWave({
  strokeColor = '#fff',
  waveSpeed = 0.2,
  expandSpeed = 4,
  amplitude = 20,
  lineWidth = 1,
  duration = 2000,
  children,
}: ClickSineWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<SineWaveParticle[]>([]);
  const animIdRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const syncSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    syncSize();
    window.addEventListener('resize', syncSize);
    return () => window.removeEventListener('resize', syncSize);
  }, [mounted]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => {
        const elapsed = timestamp - p.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const alpha = Math.max(0, 1 - progress);

        p.phase += waveSpeed;
        p.width += expandSpeed;

        ctx.beginPath();
        for (let w = -p.width; w <= p.width; w += 3) {
          const wy = p.y + Math.sin(w * 0.05 - p.phase) * amplitude * alpha;
          if (w === -p.width) ctx.moveTo(p.x + w, wy);
          else ctx.lineTo(p.x + w, wy);
        }
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeColor;
        ctx.globalAlpha = alpha;
        ctx.stroke();
        ctx.globalAlpha = 1;

        return true;
      });

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);
    return () => {
      if (animIdRef.current !== null) cancelAnimationFrame(animIdRef.current);
    };
  }, [mounted, strokeColor, duration, waveSpeed, expandSpeed, amplitude, lineWidth]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    particlesRef.current.push({
      x: e.clientX,
      y: e.clientY,
      phase: 0,
      width: 0,
      startTime: performance.now(),
    });
  }, []);

  return (
    <>
      <div style={{ display: 'contents' }} onClick={handleClick}>
        {children}
      </div>
      {mounted &&
        createPortal(
          <canvas
            ref={canvasRef}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              pointerEvents: 'none',
              zIndex: 9999,
            }}
          />,
          document.body
        )}
    </>
  );
}