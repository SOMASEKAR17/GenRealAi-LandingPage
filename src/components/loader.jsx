import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loader = ({ onFinish, faceModelLoaded }) => {
  const progressRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let progress = { value: 0 };
    let tween;

    if (faceModelLoaded) {
      // Only start the progress animation when face model is loaded
      tween = gsap.to(progress, {
        value: 100,
        duration: 1.5,         // Slightly faster since model is already loaded
        ease: 'power1.out',
        onUpdate: () => {
          if (progressRef.current) {
            progressRef.current.textContent = `${Math.floor(progress.value)}%`;
          }
        },
        onComplete: () => {
          // Animate shrink + fade out
          gsap.to(containerRef.current, {
            scale: 1.1,
            translateY: '6%',
            opacity: 0.5,
            duration: 1,
            ease: 'power2.inOut',
            onComplete: onFinish,
          });
        },
      });
    } else {
      // Show loading progress up to 90% while waiting for face model
      tween = gsap.to(progress, {
        value: 90,
        duration: 3,
        ease: 'power1.out',
        onUpdate: () => {
          if (progressRef.current) {
            progressRef.current.textContent = `${Math.floor(progress.value)}%`;
          }
        },
      });
    }

    return () => {
      if (tween) tween.kill();
    };
  }, [onFinish, faceModelLoaded]);

  return (
    <div
      ref={containerRef}
      className="fixed scale-90 inset-0 bg-black text-cyan-400 flex items-center justify-center z-[9999] pointer-events-none"
      style={{ transformOrigin: 'center center' }}
    >
      <div className="text-center">
        <div className="absolute -translate-y-8 h-[70vh] inset-0 flex pointer-events-none flex-col items-center justify-center text-center z-10 bg-transparent bg-opacity-50">
        <h1 className="text-[10vw] text-white leading-[9vw] md:text-[5vw] lg:leading-[5vw] font-bold">
          Welcome to<br />
          <span className="bg-gradient-to-r from-[#6EE5F5] via-[#29A3B3] to-[#1397A9] bg-clip-text text-transparent">
            GenReal
          </span>.AI
        </h1>
        <p className="mt-4 text-lg text-gray-300">Discover the new age of security</p>
      </div>
        <div
          ref={progressRef}
          className="text-4xl mt-10 font-bold"
          style={{ userSelect: 'none' }}
        >
          0%
        </div>
        <div className="mt-2 text-white text-sm select-none">Loading GenReal.AI...</div>
      </div>
    </div>
  );
};

export default Loader