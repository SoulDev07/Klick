"use client"
import { useRef, useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

type SpectrumParticle = {
  x: number;
  y: number;
  bars: number[];
  r: number;
  startTime: number;
};

type ClickSpectrumProps = {
  strokeColor?: string;
  barCount?: number;
  minBarHeight?: number;
  maxBarHeight?: number;
  barDecay?: number;
  ringSpeed?: number;
  lineWidth?: number;
  duration?: number;
  children?: ReactNode;
};

export default function ClickSpectrum({
  strokeColor = '#fff',
  barCount = 16,
  minBarHeight = 10,
  maxBarHeight = 30,
  barDecay = 0.92,
  ringSpeed = 1.5,
  lineWidth = 2,
  duration = 2000,
  children,
}: ClickSpectrumProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<SpectrumParticle[]>([]);
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

        p.r += ringSpeed;

        ctx.beginPath();
        for (let i = 0; i < p.bars.length; i++) {
          p.bars[i] *= barDecay;
          const angle = i * ((Math.PI * 2) / p.bars.length);
          const innerX = p.x + Math.cos(angle) * p.r;
          const innerY = p.y + Math.sin(angle) * p.r;
          const outerX = p.x + Math.cos(angle) * (p.r + p.bars[i] * alpha);
          const outerY = p.y + Math.sin(angle) * (p.r + p.bars[i] * alpha);
          ctx.moveTo(innerX, innerY);
          ctx.lineTo(outerX, outerY);
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
  }, [mounted, strokeColor, duration, barDecay, ringSpeed, lineWidth]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const bars = Array.from({ length: barCount }, () =>
        minBarHeight + Math.random() * (maxBarHeight - minBarHeight)
      );
      particlesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        bars,
        r: 10,
        startTime: performance.now(),
      });
    },
    [barCount, minBarHeight, maxBarHeight]
  );

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