import React, { useEffect, useRef } from 'react';
import { useAppTheme } from '../providers/ThemeProvider';

export const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { themeMode } = useAppTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates tracker
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Subtle particles definition (smaller and fewer for minimal design)
    const particleCount = 20;
    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.0 + 0.5
      });
    }

    // 3D wireframe mesh plane representing printing bed
    const meshPoints: { x: number; y: number; z: number }[] = [];
    const size = 100;
    const stepsCount = 7; // Exactly 7 points along each dimension
    
    for (let i = 0; i < stepsCount; i++) {
      const x = -size + (i * size * 2) / (stepsCount - 1);
      for (let j = 0; j < stepsCount; j++) {
        const z = -size + (j * size * 2) / (stepsCount - 1);
        meshPoints.push({ x, y: 30 + Math.sin((x * z) / 2000) * 10, z });
      }
    }

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Spotlight follow-glow accent
      const spotlightRadius = themeMode === 'dark' ? 320 : 220;
      const gradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        10,
        mouseX,
        mouseY,
        spotlightRadius
      );
      
      if (themeMode === 'dark') {
        gradient.addColorStop(0, 'rgba(234, 88, 12, 0.04)'); // Soft Orange glow
        gradient.addColorStop(1, 'transparent');
      } else {
        gradient.addColorStop(0, 'rgba(234, 88, 12, 0.02)');
        gradient.addColorStop(1, 'transparent');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw subtle technical nodes
      ctx.fillStyle = themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.03)';
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw rotating 3D Wireframe Mesh bed
      ctx.strokeStyle = themeMode === 'dark' ? 'rgba(255, 255, 255, 0.015)' : 'rgba(15, 23, 42, 0.01)';
      ctx.lineWidth = 1;
      
      angle += 0.0005; // Extremely slow camera float
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      
      const pitch = ((mouseY - height / 2) / height) * 0.2;
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);

      const centerX = width * 0.8; 
      const centerY = height * 0.45;

      const projectedPoints: { x: number; y: number }[] = [];

      meshPoints.forEach((pt) => {
        let x1 = pt.x * cosA - pt.z * sinA;
        let z1 = pt.x * sinA + pt.z * cosA;
        
        let y1 = pt.y * cosP - z1 * sinP;
        let z2 = pt.y * sinP + z1 * cosP;

        const dist = 300;
        const scale = dist / (dist + z2);
        const px = centerX + x1 * scale;
        const py = centerY + y1 * scale;

        projectedPoints.push({ x: px, y: py });
      });

      const totalSteps = stepsCount;
      
      // Horizontal connections
      for (let i = 0; i < totalSteps; i++) {
        ctx.beginPath();
        for (let j = 0; j < totalSteps; j++) {
          const idx = i * totalSteps + j;
          const pt = projectedPoints[idx];
          if (j === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      // Vertical connections
      for (let j = 0; j < totalSteps; j++) {
        ctx.beginPath();
        for (let i = 0; i < totalSteps; i++) {
          const idx = i * totalSteps + j;
          const pt = projectedPoints[idx];
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      animationId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.cancelAnimationFrame(animationId);
    };
  }, [themeMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none select-none overflow-hidden"
    />
  );
};

export default CanvasBackground;
