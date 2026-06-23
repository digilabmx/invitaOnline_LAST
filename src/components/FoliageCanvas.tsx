import React, { useEffect, useRef } from 'react';

export default function FoliageCanvas() {
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

    // Leaf definition
    interface Leaf {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      angle: number;
      spinSpeed: number;
      opacity: number;
      color: string; // Grayscale elegant shades
      curveFactor: number;
    }

    const leafColors = [
      'rgba(26, 26, 26, 0.12)',   // Elegant charcoal
      'rgba(143, 124, 110, 0.15)', // Soft warm taupe
      'rgba(255, 255, 255, 0.5)',  // Translucent white
      'rgba(180, 180, 180, 0.25)', // Silver gray
    ];

    const leaves: Leaf[] = Array.from({ length: 22 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 0.7 + 0.4,
      speedX: Math.random() * 0.5 - 0.25,
      angle: Math.random() * Math.PI * 2,
      spinSpeed: (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      opacity: Math.random() * 0.5 + 0.3,
      color: leafColors[Math.floor(Math.random() * leafColors.length)],
      curveFactor: Math.random() * 0.4 + 0.6,
    }));

    const drawLeaf = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      angle: number,
      color: string,
      curve: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.fillStyle = color;

      // Draw a highly elegant organic willow leaf outline with a center vein line
      context.beginPath();
      context.moveTo(0, -size);
      // Right curve
      context.quadraticCurveTo(size * curve, -size * 0.1, 0, size);
      // Left curve
      context.quadraticCurveTo(-size * curve, -size * 0.1, 0, -size);
      context.closePath();
      context.fill();

      // Delicate center vein
      context.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      if (color.includes('255, 255, 255')) {
        context.strokeStyle = 'rgba(0, 0, 0, 0.06)';
      }
      context.lineWidth = 0.5;
      context.beginPath();
      context.moveTo(0, -size);
      context.lineTo(0, size * 0.8);
      context.stroke();

      context.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      leaves.forEach((leaf) => {
        leaf.y += leaf.speedY;
        leaf.x += leaf.speedX + Math.sin(leaf.y * 0.01) * 0.2;
        leaf.angle += leaf.spinSpeed;

        // Reset if goes off screen
        if (leaf.y > height + 20) {
          leaf.y = -20;
          leaf.x = Math.random() * width;
          leaf.size = Math.random() * 8 + 6;
          leaf.speedY = Math.random() * 0.7 + 0.4;
          leaf.speedX = Math.random() * 0.5 - 0.25;
          leaf.angle = Math.random() * Math.PI * 2;
        }

        if (leaf.x > width + 20) {
          leaf.x = -20;
        } else if (leaf.x < -20) {
          leaf.x = width + 20;
        }

        drawLeaf(ctx, leaf.x, leaf.y, leaf.size, leaf.angle, leaf.color, leaf.curveFactor);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="foliage-canvas"
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
}
