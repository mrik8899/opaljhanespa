// components/FlowerPetals.js
import React, { useEffect, useRef } from 'react';

export default function FlowerPetals() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let petals = Array.from({ length: 30 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 12 + 8,
      angle: Math.random() * 360,
      speed: Math.random() * 0.5 + 0.2,
      drift: Math.random() * 1.5 - 0.75,
      swing: Math.random() * 30 + 20,
      swingSpeed: Math.random() * 0.05 + 0.01
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255,192,203,0.6)'; // pink-like petal
      petals.forEach(petal => {
        ctx.beginPath();
        const sway = Math.sin(petal.angle) * petal.swing;
        ctx.ellipse(petal.x + sway, petal.y, petal.r, petal.r * 0.6, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();
        petal.y += petal.speed;
        petal.angle += petal.swingSpeed;
        if (petal.y > height) petal.y = -20;
      });
    }

    function animate() {
      draw();
      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
