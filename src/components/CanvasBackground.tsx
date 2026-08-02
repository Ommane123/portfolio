import React, { useEffect, useRef } from 'react';

interface CanvasBackgroundProps {
  isDarkMode: boolean;
}

export const CanvasBackground: React.FC<CanvasBackgroundProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 15000));

    // Handle Resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      baseSize: number = 0;
      size: number = 0;
      color: string = '';

      constructor() {
        this.reset(true);
      }

      reset(initAll = false) {
        this.x = Math.random() * canvas!.width;
        this.y = initAll ? Math.random() * canvas!.height : -10;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4 + 0.1; // slow drift downwards
        this.baseSize = Math.random() * 2 + 1;
        this.size = this.baseSize;
        
        // Cycle colors between neon blue and neon purple
        const r = Math.random();
        if (isDarkMode) {
          this.color = r > 0.5 ? 'rgba(0, 240, 255, 0.4)' : 'rgba(188, 59, 255, 0.4)';
        } else {
          this.color = r > 0.5 ? 'rgba(0, 150, 255, 0.25)' : 'rgba(150, 50, 220, 0.25)';
        }
      }

      update() {
        // Drift
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around boundaries
        if (this.x < 0 || this.x > canvas!.width || this.y > canvas!.height) {
          this.reset(false);
        }

        // Mouse interaction
        const dx = this.x - mouseRef.current.x;
        const dy = this.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
          const angle = Math.atan2(dy, dx);
          
          // Repel slightly
          this.x += Math.cos(angle) * force * 1.5;
          this.y += Math.sin(angle) * force * 1.5;
          this.size = this.baseSize * (1 + force * 1.2);
        } else {
          // Return to base size
          if (this.size > this.baseSize) {
            this.size -= 0.05;
          }
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const drawConnections = () => {
      const maxDistance = 100;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            if (isDarkMode) {
              ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            } else {
              ctx.strokeStyle = `rgba(188, 59, 255, ${alpha * 0.8})`;
            }
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initial setup
    resizeCanvas();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update & Draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      drawConnections();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
