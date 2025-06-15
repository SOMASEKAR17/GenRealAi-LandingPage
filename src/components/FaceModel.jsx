import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Face = ({ paused }) => {
  const { scene } = useGLTF('/RoboFace/scene.gltf');
  const groupRef = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState({ x: 1.4, y: 1.2, z: 1.2 });
  const wireframesRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 768;
      setScale(isSmall ? { x: 1, y: 1, z: 1 } : { x: 1.5, y: 1.3, z: 1.3 });
      scene.position.set(0, isSmall ? -1 : -1.7, 0);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scene]);

  // Delay wireframe creation until next frame to ensure transforms are updated
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      scene.scale.set(scale.x, scale.y, scale.z);
      scene.rotation.set(0, 0, 0);

      const wireframeColor = new THREE.Color('grey');
      const wireframes = [];

      scene.traverse((child) => {
        if (child.isMesh && child.geometry && !child.userData.hasWireframe) {
          const edges = new THREE.EdgesGeometry(child.geometry);
          const lineMaterial = new THREE.LineBasicMaterial({
            color: wireframeColor,
            transparent: true,
            opacity: 0.4,
            depthTest: false,
          });

          const wireframe = new THREE.LineSegments(edges, lineMaterial);

          wireframe.position.copy(child.position);
          wireframe.rotation.copy(child.rotation);
          wireframe.scale.copy(child.scale);

          child.add(wireframe); // attach wireframe to mesh itself

          child.userData.hasWireframe = true;
          wireframes.push(wireframe);
        }
      });

      wireframesRef.current = wireframes;
    });

    return () => {
      cancelAnimationFrame(id);
      wireframesRef.current.forEach((line) => {
        line.geometry.dispose();
        line.material.dispose();
        line.parent?.remove(line);
      });
      wireframesRef.current = [];
    };
  }, [scene, scale]);

  useFrame(() => {
    if (paused || !groupRef.current) return;
    groupRef.current.rotation.y += (mouse.x * 0.6 - groupRef.current.rotation.y) * 0.1;
    groupRef.current.rotation.x += (mouse.y * 0.4 - groupRef.current.rotation.x) * 0.1;
  });

  return <group ref={groupRef}><primitive object={scene} /></group>;
};


const FaceModel = ({ paused }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    const el = document.getElementById('hero-canvas');
    if (el) observer.observe(el);
    return () => el && observer.unobserve(el);
  }, []);

  return (
    <div id="hero-canvas" className="absolute inset-0 pointer-events-none z-20">
      {isVisible && (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 35 }}
          shadows
          frameloop="always"
        >
          <ambientLight intensity={1} />
          <directionalLight position={[2, 2, 5]} intensity={1.2} />
          <Suspense fallback={null}>
            <Face paused={paused} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default FaceModel;
