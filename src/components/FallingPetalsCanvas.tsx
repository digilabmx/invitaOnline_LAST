import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  rotation: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotationSpeed: number;
  swayAmplitude: number;
  swaySpeed: number;
  swayOffset: number;
  color: string;
}

interface BurstPetal extends Petal {
  life: number;          // 0 to 1 life progress
  decay: number;         // decay speed per frame
}

export default function FallingPetalsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle resizing efficiently, keeping drawing clean on zoom or orientation rotation
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Initialize very subtle pink-peach-white rose petals
    const petalColors = [
      'rgba(250, 232, 232, 0.15)', // ultra soft light pink
      'rgba(245, 214, 214, 0.18)', // extremely subtle warm rose
      'rgba(253, 244, 245, 0.15)', // delicate off-white rose
    ];

    // Create 6 slow, passive background drifting elements (reduced for extremely high mobile performance)
    const passivePetals: Petal[] = Array.from({ length: 6 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * (height + 200) - 100, // staggered initial state
      size: Math.random() * 5 + 5, // smaller size to keep elegant focus
      rotation: Math.random() * Math.PI * 2,
      speedY: Math.random() * 0.10 + 0.10, // ultra slow vertical speed
      speedX: (Math.random() - 0.5) * 0.05,
      opacity: Math.random() * 0.08 + 0.06, // extremely soft opacity
      rotationSpeed: (Math.random() - 0.5) * 0.002, // ultra slow rotation
      swayAmplitude: Math.random() * 0.6 + 0.2,
      swaySpeed: Math.random() * 0.003 + 0.001,
      swayOffset: Math.random() * Math.PI * 2,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));

    // Create 18 dynamic burst/explosion petals launched from the center upon click/activation
    const burstPetals: BurstPetal[] = Array.from({ length: 18 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3.5 + 1.5; // explosive speed radial outwards
      return {
        x: width / 2,
        y: height / 2 + 100, // centered on envelope click seal area
        size: Math.random() * 8 + 6,
        rotation: Math.random() * Math.PI * 2,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed - 1.2, // bias upwards
        opacity: Math.random() * 0.45 + 0.35, // higher opacity for initial gorgeous pop
        rotationSpeed: (Math.random() - 0.5) * 0.06, // fast rotational spin
        swayAmplitude: 0,
        swaySpeed: 0,
        swayOffset: 0,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        life: 1.0,
        decay: Math.random() * 0.008 + 0.007, // dynamic decay (fades out in ~120-150 frames)
      };
    });

    // Draw an elegant organic leaf/petal path using Bezier curves
    const drawPetal = (ctx: CanvasRenderingContext2D, p: Petal, currentOpacity: number) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.beginPath();
      
      // Dual-bezier curve for high-performance organic leaf shape
      ctx.moveTo(0, -p.size / 2);
      ctx.quadraticCurveTo(p.size * 0.55, -p.size * 0.25, 0, p.size / 2);
      ctx.quadraticCurveTo(-p.size * 0.55, -p.size * 0.25, 0, -p.size / 2);
      
      ctx.fillStyle = p.color;
      ctx.globalAlpha = currentOpacity;
      ctx.fill();

      // Soft light-colored leaf vein line representing organic botanical rose petal
      ctx.beginPath();
      ctx.moveTo(0, -p.size / 2);
      ctx.quadraticCurveTo(p.size * 0.12, 0, 0, p.size / 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // 1. Process and animate the active burst petals (non-looping, decays completely)
      for (let i = 0; i < burstPetals.length; i++) {
        const bp = burstPetals[i];
        if (bp.life <= 0) continue;

        // Apply friction and gravity vectors
        bp.x += bp.speedX;
        bp.y += bp.speedY;

        // Decelerate speed gradually (air friction)
        bp.speedX *= 0.96;
        bp.speedY = (bp.speedY + 0.04) * 0.98; // soft gravity drag
        bp.rotation += bp.rotationSpeed;
        bp.life -= bp.decay;

        if (bp.life > 0) {
          drawPetal(ctx, bp, bp.opacity * bp.life);
        }
      }

      // 2. Process and draw passive ambient background petals (gentle slow loop)
      for (let i = 0; i < passivePetals.length; i++) {
        const p = passivePetals[i];
        
        // Gentle drift and wind updates
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time * p.swaySpeed + p.swayOffset) * 0.05;
        p.rotation += p.rotationSpeed;

        // Loop top to bottom when falling out of viewport bounds
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
          p.rotation = Math.random() * Math.PI * 2;
        }
        
        // Horizontal wrap bounds check
        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;

        drawPetal(ctx, p, p.opacity);
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
      id="petals-canvas"
      className="fixed inset-0 pointer-events-none z-30 w-full h-full"
    />
  );
}
