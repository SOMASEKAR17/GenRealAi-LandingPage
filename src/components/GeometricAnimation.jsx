import React, { useEffect, useRef } from 'react';

const GeometricAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const getParticleCount = () => {
      const area = window.innerWidth * window.innerHeight;
      const baseCount = 150;
      // Reduce particle count on smaller screens
      if (area < 500000) return Math.floor(baseCount * 0.4); // Small screens
      if (area < 1000000) return Math.floor(baseCount * 0.7); // Medium screens
      return baseCount; // Large screens
    };

    const createParticles = () => {
      const particleCount = getParticleCount();
      particles = [];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          hue: Math.random() * 60 + 180,
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Regenerate particles with new count based on screen size
      createParticles();
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = (time) => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particleCount = particles.length;

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.save();
        ctx.globalAlpha = particle.opacity * (0.5 + 0.5 * Math.sin(time * 0.002 + index));
        ctx.fillStyle = `hsl(${particle.hue}, 70%, 60%)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        for (let j = index + 1; j < Math.min(index + 10, particleCount); j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const blendHue = ((particle.hue + other.hue + 360) % 360) / 2;
            ctx.save();
            ctx.globalAlpha = (1 - dist / 120) * 0.1;
            ctx.strokeStyle = `hsl(${blendHue}, 50%, 50%)`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

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