import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  pulseSpeed: number;
  pulseOffset: number;
  color: string;
}

interface BurstParticle extends Particle {
  life: number;
  decay: number;
}

export default function SilverGlitterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Platinum, chrome, pure silver, and diamond sparkle colors
    const colors = [
      'rgba(200, 200, 200, 0.25)',  // Platinum Silver
      'rgba(248, 248, 248, 0.28)',  // Pearl White Chrome
      'rgba(255, 255, 255, 0.40)',  // High-brilliance diamond sparkle
      'rgba(192, 192, 192, 0.20)',  // Soft Silver Matte
    ];

    // Ambient floating elements
    const passiveGlitter: Particle[] = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * (height + 100) - 50,
      size: Math.random() * 2.5 + 1.0, // extremely fine classy diamond dust
      speedY: Math.random() * 0.18 + 0.08, // very slow graceful floating
      speedX: (Math.random() - 0.5) * 0.06,
      opacity: Math.random() * 0.45 + 0.2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.006,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulseOffset: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    // Burst particles for the cinematic opening trigger
    const burstGlitter: BurstParticle[] = Array.from({ length: 45 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5.0 + 1.8;
      return {
        x: width / 2,
        y: height / 2,
        size: Math.random() * 4.5 + 1.5,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed - 1.2, // slightly upwards
        opacity: Math.random() * 0.85 + 0.15,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.12,
        pulseSpeed: 0,
        pulseOffset: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1.0,
        decay: Math.random() * 0.011 + 0.007,
      };
    });

    const drawSparkle = (ctx: CanvasRenderingContext2D, p: Particle, currentOpacity: number) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      
      // Draw luxury diamond/sparkle star
      ctx.beginPath();
      const s = p.size;
      ctx.moveTo(0, -s * 1.6);
      ctx.quadraticCurveTo(0, 0, s * 1.6, 0);
      ctx.quadraticCurveTo(0, 0, 0, s * 1.6);
      ctx.quadraticCurveTo(0, 0, -s * 1.6, 0);
      ctx.quadraticCurveTo(0, 0, 0, -s * 1.6);
      
      ctx.fillStyle = p.color;
      ctx.globalAlpha = currentOpacity;
      ctx.fill();
      ctx.restore();
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Draw and process bursts
      for (let i = 0; i < burstGlitter.length; i++) {
        const bg = burstGlitter[i];
        if (bg.life <= 0) continue;

        bg.x += bg.speedX;
        bg.y += bg.speedY;

        bg.speedX *= 0.95;
        bg.speedY = (bg.speedY + 0.06) * 0.97; // descent with gravity
        bg.rotation += bg.rotationSpeed;
        bg.life -= bg.decay;

        if (bg.life > 0) {
          drawSparkle(ctx, bg, bg.opacity * bg.life);
        }
      }

      // Draw and process ambient
      for (let i = 0; i < passiveGlitter.length; i++) {
        const p = passiveGlitter[i];

        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time * 0.001 + p.pulseOffset) * 0.05;
        p.rotation += p.rotationSpeed;

        // Elegant loop
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        // Twinkle sparkle effect
        const dynamicOpacity = p.opacity * (0.55 + 0.45 * Math.sin(time * p.pulseSpeed + p.pulseOffset));
        drawSparkle(ctx, p, dynamicOpacity);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="silver-glitter-canvas"
      className="fixed inset-0 pointer-events-none z-35 w-full h-full"
    />
  );
}
