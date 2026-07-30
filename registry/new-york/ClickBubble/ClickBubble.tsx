"use client"
import { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type BubbleParticle = {
  x: number;
  y: number;
  r: number;
  vr: number;
  popped: boolean;
  startTime: number;
};

type ClickBubbleProps = {
  strokeColor?: string;
  fillOpacity?: number;
  wobbleFreq?: number;
  wobbleAmp?: number;
  growSpeed?: number;
  growFriction?: number;
  popThreshold?: number;
  mistCount?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickBubble({
  strokeColor = '#fff',
  fillOpacity = 0.15,
  wobbleFreq = 6,
  wobbleAmp = 2,
  growSpeed = 2.5,
  growFriction = 0.92,
  popThreshold = 0.2,
  mistCount = 8,
  duration = 3000,
  children,
}: ClickBubbleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<BubbleParticle[]>([]);
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

        if (!p.popped) {
          p.r += p.vr;
          p.vr *= growFriction;
          if (p.vr < popThreshold) p.popped = true;

          ctx.beginPath();
          for (let a = 0; a < Math.PI * 2; a += 0.2) {
            const wobble = Math.sin(a * wobbleFreq + progress * 15) * wobbleAmp;
            const bx = p.x + Math.cos(a) * (p.r + wobble);
            const by = p.y + Math.sin(a) * (p.r + wobble);
            if (a === 0) ctx.moveTo(bx, by);
            else ctx.lineTo(bx, by);
          }
          ctx.closePath();
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = 1;
          ctx.globalAlpha = alpha;
          ctx.stroke();
          ctx.fillStyle = strokeColor;
          ctx.globalAlpha = alpha * fillOpacity;
          ctx.fill();
          ctx.globalAlpha = 1;
        } else {
          for (let i = 0; i < mistCount; i++) {
            const angle = i * (Math.PI / (mistCount / 2));
            const dist = p.r + (1 - alpha) * 30;
            const mx = p.x + Math.cos(angle) * dist;
            const my = p.y + Math.sin(angle) * dist;
            ctx.beginPath();
            ctx.arc(mx, my, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = strokeColor;
            ctx.globalAlpha = alpha;
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        }

        return true;
      });

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);
    return () => {
      if (animIdRef.current !== null) cancelAnimationFrame(animIdRef.current);
    };
  }, [
    strokeColor,
    fillOpacity,
    wobbleFreq,
    wobbleAmp,
    growFriction,
    popThreshold,
    mistCount,
    duration,
  ]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      particlesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        r: 5,
        vr: growSpeed,
        popped: false,
        startTime: performance.now(),
      });
    },
    [growSpeed]
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