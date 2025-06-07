import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const Face = () => {
  const { scene } = useGLTF('/shewolf/scene.gltf');
  const groupRef = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth face movement based on mouse
  useFrame(() => {
    if (!groupRef.current) return;

    const maxYaw = 0.3; // left-right
    const maxPitch = 0.3; // up-down

    const targetYaw = mouse.x * maxYaw;
    const targetPitch = mouse.y * maxPitch;

    groupRef.current.rotation.y += (targetYaw - groupRef.current.rotation.y) * 0.1;
    groupRef.current.rotation.x += (targetPitch - groupRef.current.rotation.x) * 0.1;
  });

  // Adjust model's internal position to center it
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // Center the model
    scene.position.set(0, -10.5, 0); 
    scene.scale.set(6, 6, 6);
  }, [scene]);

  return <group ref={groupRef}><primitive object={scene} /></group>;
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
