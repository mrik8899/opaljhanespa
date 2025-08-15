import { useRef, useEffect, useCallback } from 'react';

// This component is purely for the particle animation on canvas
export default function InteractiveParticles({ mousePosition }) {
  const canvasRef = useRef(null);

  const draw = useCallback((ctx, frameCount, particlesArray) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update(ctx, mousePosition);
    }
  }, [mousePosition]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frameCount = 0;
    let animationFrameId;
    let particlesArray = [];

    class Particle {
      constructor(x, y, dirX, dirY, size, color) {
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
        this.size = size;
        this.color = color;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
      }
      draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      update(ctx, mouse) {
        // Repel from mouse
        if (mouse.x && mouse.y) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirX = dx / distance;
          let forceDirY = dy / distance;
          let maxDist = mouse.radius;
          let force = (maxDist - distance) / maxDist;
          let dirX = forceDirX * force * this.density * 0.6;
          let dirY = forceDirY * force * this.density * 0.6;

          if (distance < mouse.radius) {
            this.x -= dirX;
            this.y -= dirY;
          } else {
            // Return to base position
            if (this.x !== this.baseX) {
              let dx = this.x - this.baseX;
              this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
              let dy = this.y - this.baseY;
              this.y -= dy / 10;
            }
          }
        }
        this.draw(ctx);
      }
    }

    const init = () => {
      particlesArray = [];
      const numberOfParticles = window.innerWidth > 768 ? 200 : 75;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 1.5 + 0.5;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let dirX = 0; // Particles don't move on their own
        let dirY = 0;
        let color = `rgba(190, 253, 115, ${Math.random() * 0.5 + 0.2})`; // BEFD73 with random opacity
        particlesArray.push(new Particle(x, y, dirX, dirY, size, color));
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const render = () => {
      frameCount++;
      draw(ctx, frameCount, particlesArray);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [draw]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-20" />;
}