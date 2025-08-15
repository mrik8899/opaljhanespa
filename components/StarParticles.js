import { useEffect, useRef } from 'react';

export default function StarParticles({ count = 20, containerRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef?.current || document.documentElement;
    
    // Set canvas size
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height * 0.4; // Cover icon area
    };

    // Initial resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create stars
    const stars = Array.from({ length: count }, () => {
      const size = Math.random() * 2 + 1; // Consistent size
      return {
        x: 0,
        y: 0,
        size: size,
        speed: Math.random() * 0.2 + 0.1, // Slower movement
        opacity: Math.random() * 0.5 + 0.3, // More visible
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * 20 + 10, // Wider movement
        baseX: Math.random() * canvas.width,
        baseY: Math.random() * canvas.height * 0.8, // Focus on top 80% of container
        twinkleSpeed: Math.random() * 0.01 + 0.005, // Slower twinkle
        offsetX: (Math.random() - 0.5) * 20, // Random position offset
        offsetY: (Math.random() - 0.5) * 10
      };
    });

    // Animation
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        // Update position with smooth movement
        star.angle += star.speed * 0.01;
        const offsetX = Math.sin(star.angle * 0.5) * star.offsetX;
        const offsetY = Math.cos(star.angle * 0.7) * star.offsetY;
        star.x = star.baseX + Math.cos(star.angle) * star.distance * 0.5 + offsetX;
        star.y = star.baseY + Math.sin(star.angle) * star.distance * 0.3 + offsetY;
        
        // Draw star with glow
        const glow = star.size * 1.5;
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, glow
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(0.7, `rgba(255, 255, 255, ${star.opacity * 0.4})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        // Twinkle effect
        const twinkle = 0.5 + 0.5 * Math.sin(Date.now() * star.twinkleSpeed);
        
        // Draw glow
        ctx.beginPath();
        ctx.arc(star.x, star.y, glow, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };

    // Initialize base positions after first render
    setTimeout(() => {
      const rect = container.getBoundingClientRect();
      stars.forEach(star => {
        star.baseX = Math.random() * canvas.width;
        star.baseY = Math.random() * canvas.height;
      });
      animate();
    }, 100);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [count, containerRef]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          opacity: 0.6,
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0
        }}
      />
    </div>
  );
}
