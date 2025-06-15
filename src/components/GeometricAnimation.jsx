import React, { useEffect, useRef } from 'react';

const GeometricAnimation = ({ paused }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationIdRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    const createParticles = () => {
      const count = (() => {
        const area = window.innerWidth * window.innerHeight;
        if (area < 500000) return 100;
        if (area < 1000000) return 150;
        return 150;
      })();

      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        hue: Math.random() * 60 + 180,
      }));
    };

    const animate = (time) => {
      if (paused) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = p.opacity * (0.5 + 0.5 * Math.sin(time * 0.002 + i));
        ctx.fillStyle = `hsl(${p.hue}, 70%, 60%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [paused]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-80 z-10"
      style={{ background: 'transparent' }}
      aria-hidden="true"
    />
  );
};

export default GeometricAnimation;
