// components/AromaTrails.js
import React, { useRef, useEffect } from 'react';

export default function AromaTrails() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];

    class Particle {
      constructor() {
        this.x = width / 2 + (Math.random() - 0.5) * 80;
        this.y = height - 120;
        this.radius = Math.random() * 6 + 4;
        this.opacity = Math.random() * 0.08 + 0.02;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = -Math.random() * 1 - 0.3;
        this.life = 0;
        this.maxLife = 120 + Math.random() * 60;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life++;
        this.opacity *= 0.995;
        if (this.life > this.maxLife || this.opacity <= 0) {
          const index = particles.indexOf(this);
          if (index > -1) particles.splice(index, 1);
        }
      }

      draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      if (particles.length < 40) {
        particles.push(new Particle());
      }

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
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
