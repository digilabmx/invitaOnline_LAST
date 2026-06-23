import React, { useEffect, useRef } from 'react';

export default function SparkleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle representation
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;
      color: string;
      wobble: number;
      wobbleSpeed: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 65; // Balanced density

    // Palettes of luxury golds / ambers
    const colors = [
      'rgba(212, 175, 55, ',  // Soft Gold
      'rgba(244, 215, 123, ', // Champagne Gold
      'rgba(197, 168, 128, ', // Antique Gold
      'rgba(255, 235, 180, ', // Light Glow Gold
      'rgba(255, 248, 220, ', // Cornsilk White/Amber
    ];

    const createParticle = (initY = false): Particle => {
      const size = Math.random() * 2.8 + 0.6;
      return {
        x: Math.random() * width,
        y: initY ? Math.random() * height : height + 10,
        size,
        speedY: -(Math.random() * 1.2 + 0.4),
        speedX: Math.random() * 0.6 - 0.3,
        opacity: Math.random() * 0.5 + 0.2,
        fadeSpeed: Math.random() * 0.003 + 0.001,
        color: colors[Math.floor(Math.random() * colors.length)],
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.01
      };
    };

    // Initialize particles across the full screen initially
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update particle physics
        p.y += p.speedY;
        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.2;

        // If particle goes off screen or disappears, re-spawn it
        if (p.y < -10 || p.x < -10 || p.x > width + 10) {
          particles[i] = createParticle(false);
          continue;
        }

        // Beautiful soft radial glow circle drawing
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, p.color + p.opacity + ')');
        gradient.addColorStop(0.5, p.color + (p.opacity * 0.4) + ')');
        gradient.addColorStop(1, p.color + '0)');
        
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    // Resize handling
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Dynamic scroll nudge
    const handleScroll = () => {
      // Adding a subtle push to gold particles when scroll happens
      const scrollDiff = window.scrollY;
      particles.forEach((p) => {
        p.y -= Math.abs(p.speedY) * 0.5; // push up slightly faster
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
      id="sparkle-gold-canopy"
    />
  );
}
