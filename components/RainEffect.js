// components/RainEffect.js
import React, { useRef, useEffect } from 'react';

export default function RainEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let raindrops = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 15 + 10,
      speed: Math.random() * 4 + 2,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    let ripples = [];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;

      raindrops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();
      });

      // Draw ripples
      ripples.forEach((ripple, index) => {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity})`;
        ctx.stroke();
        ripple.radius += 0.5;
        ripple.opacity -= 0.01;
        if (ripple.opacity <= 0) ripples.splice(index, 1);
      });
    };

    const update = () => {
      raindrops.forEach((drop) => {
        drop.y += drop.speed;
        if (drop.y > height) {
          ripples.push({ x: drop.x, y: height -10, radius: 1, opacity: 0.3 });
          drop.y = 0;
          drop.x = Math.random() * width;
        }
      });
    };

    const animate = () => {
      draw();
      update();
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-1 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
