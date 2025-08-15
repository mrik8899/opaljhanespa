import { useRef, useEffect, useCallback } from 'react';

// You can tweak these values to change the look and feel
const MOUSE_RADIUS = 75; // The area around the mouse that affects particles
const PARTICLE_COLOR = 'rgba(175, 220, 236, 0.7)'; // A soft, light blue
const LINE_COLOR = 'rgba(175, 220, 236, 0.15)'; // Very faint lines

export default function InteractiveBackground() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null, radius: MOUSE_RADIUS });
  
  // Using useCallback to prevent re-creation of this function on every render
  const handleMouseMove = useCallback((event) => {
    if (mouse.current) {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
    }
  }, []);

  const handleTouchMove = useCallback((event) => {
    if (mouse.current && event.touches.length > 0) {
      mouse.current.x = event.touches[0].clientX;
      mouse.current.y = event.touches[0].clientY;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particlesArray = [];

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Handle window resizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init(); // Re-initialize particles on resize
    };
    window.addEventListener('resize', handleResize);

    // Event listeners for interaction
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    // When mouse leaves, reset its position so particles return to normal
    window.addEventListener('mouseout', () => {
        mouse.current.x = null;
        mouse.current.y = null;
    });

    // Particle class
    class Particle {
      constructor(x, y, directionX, directionY, size) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = PARTICLE_COLOR;
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        // Mouse collision detection
        let dx = mouse.current.x - this.x;
        let dy = mouse.current.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.current.radius + this.size) {
          if (mouse.current.x < this.x && this.x < canvas.width - this.size * 10) {
            this.x += 5;
          }
          if (mouse.current.x > this.x && this.x > this.size * 10) {
            this.x -= 5;
          }
          if (mouse.current.y < this.y && this.y < canvas.height - this.size * 10) {
            this.y += 5;
          }
          if (mouse.current.y > this.y && this.y > this.size * 10) {
            this.y -= 5;
          }
        }

        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    // Create particles
    function init() {
      particlesArray = [];
      // Adjust particle count based on screen size for performance
      let numberOfParticles = (canvas.height * canvas.width) / 9000;
      if (window.innerWidth < 768) {
        numberOfParticles = (canvas.height * canvas.width) / 12000; // Fewer particles on mobile
      }

      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        particlesArray.push(new Particle(x, y, directionX, directionY, size));
      }
    }

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, innerWidth, innerHeight);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    }

    // Draw lines between particles
    function connect() {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance =
            ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
            ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            opacityValue = 1 - (distance / 20000);
            ctx.strokeStyle = `rgba(175, 220, 236, ${opacityValue * 0.15})`; // Use the opacity to fade lines
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    init();
    animate();

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseout', () => {
        mouse.current.x = null;
        mouse.current.y = null;
      });
      cancelAnimationFrame(animationFrameId);
    };
  }, [handleMouseMove, handleTouchMove]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3C1F76] to-[#2a0e5a]"
    />
  );
}