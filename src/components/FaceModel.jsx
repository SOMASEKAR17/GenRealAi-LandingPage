import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const Face = () => {
  const { scene } = useGLTF('/shewolf/scene.gltf');
  const groupRef = useRef();

  // Track mouse position normalized between -1 and 1
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = ((event.clientY / window.innerHeight) * 2 - 1);
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      // Rotate model based on mouse position with some easing/smoothing
      groupRef.current.rotation.y += (mouse.x * 0.3 - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x += (mouse.y * 0.15 - groupRef.current.rotation.x) * 0.1;
    }
  });

  useEffect(() => {
    // Set initial position, scale, rotation for the scene
    scene.position.set(0, -11.2, 0);
    scene.scale.set(6.5, 6.5, 6.5);
    scene.rotation.set(0, 0.22, 0);
  }, [scene]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
};

const FaceModel = () => (
  <Canvas
    className="absolute inset-0 pointer-events-none z-20"
    camera={{ position: [0, 0, 5], fov: 35 }}
    shadows
  >
    <ambientLight intensity={1} />
    <directionalLight position={[2, 2, 5]} intensity={1.2} />
    <Suspense fallback={null}>
      <Face />
    </Suspense>
  </Canvas>
);

export default FaceModel;
