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

export default function GoldGlitterCanvas() {
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

    // Champagne gold, Cartier gold, white pearls colors
    const colors = [
      'rgba(212, 175, 55, 0.22)',  // Metallic Gold Champagne
      'rgba(244, 230, 184, 0.25)',  // Soft Light Gold
      'rgba(255, 248, 235, 0.20)',  // White Pearl warm
      'rgba(212, 175, 55, 0.35)',  // High brilliance sparkle gold
    ];

    // Passive luxury ambient floating elements
    const passiveGlitter: Particle[] = Array.from({ length: 15 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * (height + 100) - 50,
      size: Math.random() * 2.8 + 1.2, // fine high-society sparkles
      speedY: Math.random() * 0.15 + 0.1, // very slow graceful descent
      speedX: (Math.random() - 0.5) * 0.08,
      opacity: Math.random() * 0.4 + 0.2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.005,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulseOffset: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    // Burst particles created for the opening sequence
    const burstGlitter: BurstParticle[] = Array.from({ length: 30 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4.5 + 1.5;
      return {
        x: width / 2,
        y: height / 2,
        size: Math.random() * 4 + 2,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed - 1.5, // slightly upwards
        opacity: Math.random() * 0.8 + 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        pulseSpeed: 0,
        pulseOffset: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1.0,
        decay: Math.random() * 0.009 + 0.006,
      };
    });

    const drawSparkle = (ctx: CanvasRenderingContext2D, p: Particle, currentOpacity: number) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      
      // Draw standard diamond luxury stars
      ctx.beginPath();
      const s = p.size;
      ctx.moveTo(0, -s * 1.5);
      ctx.quadraticCurveTo(0, 0, s * 1.5, 0);
      ctx.quadraticCurveTo(0, 0, 0, s * 1.5);
      ctx.quadraticCurveTo(0, 0, -s * 1.5, 0);
      ctx.quadraticCurveTo(0, 0, 0, -s * 1.5);
      
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

        bg.speedX *= 0.96;
        bg.speedY = (bg.speedY + 0.05) * 0.98; // natural descent gravity
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
        p.x += p.speedX + Math.sin(time * 0.001 + p.pulseOffset) * 0.06;
        p.rotation += p.rotationSpeed;

        // Elegant loop
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        // Shimmer twinkle effect
        const dynamicOpacity = p.opacity * (0.6 + 0.4 * Math.sin(time * p.pulseSpeed + p.pulseOffset));
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
      id="gold-glitter-canvas"
      className="fixed inset-0 pointer-events-none z-35 w-full h-full"
    />
  );
}
