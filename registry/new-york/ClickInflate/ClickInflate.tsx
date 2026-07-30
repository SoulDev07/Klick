"use client"
import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type InflateParticle = {
  x: number;
  y: number;
  r: number;
  targetR: number;
  startTime: number;
};

type ClickInflateProps = {
  strokeColor?: string;
  targetRadius?: number;
  lerpSpeed?: number;
  deflateAt?: number;
  lineWidth?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickInflate({
  strokeColor = '#fff',
  targetRadius = 60,
  lerpSpeed = 0.15,
  deflateAt = 0.5,
  lineWidth = 1.5,
  duration = 2500,
  children,
}: ClickInflateProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<InflateParticle[]>([]);
  const animIdRef = useRef<number | null>(null);

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
  }, []);

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

        if (progress >= deflateAt) p.targetR = 2;

        p.r += (p.targetR - p.r) * lerpSpeed;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, p.r), 0, Math.PI * 2);
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
  }, [strokeColor, duration, lerpSpeed, deflateAt, lineWidth]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      particlesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        r: 2,
        targetR: targetRadius,
        startTime: performance.now(),
      });
    },
    [targetRadius]
  );

  return (
    <>
      <div style={{ display: 'contents' }} onClick={handleClick}>
        {children}
      </div>
      {typeof window !== 'undefined' &&
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