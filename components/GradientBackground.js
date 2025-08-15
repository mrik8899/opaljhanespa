'use client';

import { useEffect, useRef } from 'react';

export default function GradientBackground({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = (time) => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      const t = time * 0.0005;
      
      // Subtle color shifts
      const h1 = (Math.sin(t) * 0.5 + 0.5) * 10 + 160;
      const h2 = (Math.cos(t * 0.7) * 0.5 + 0.5) * 10 + 200;
      
      gradient.addColorStop(0, `hsla(${h1}, 100%, 50%, 0.03)`);
      gradient.addColorStop(0.5, `hsla(${h2}, 100%, 50%, 0.03)`);
      gradient.addColorStop(1, `hsla(${h1}, 100%, 50%, 0.02)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      resizeCanvas();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', handleResize);
    resizeCanvas();
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
