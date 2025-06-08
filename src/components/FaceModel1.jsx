import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const Face = () => {
  const { scene } = useGLTF('/shewolf/scene.gltf');
  const groupRef = useRef();

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

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
    // Set initial transforms
    scene.position.set(0, -11.4, 0);
    scene.scale.set(7, 6.5, 6.5);
    scene.rotation.set(0, 0.22, 0);
  }, [scene]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    const blinkDuration = 0.25;
    const blinkInterval = 4;     
    const blinkPhase = t % blinkInterval;

    let influence = 0;
    if (blinkPhase < blinkDuration) {
      influence = blinkPhase / blinkDuration;
    } else if (blinkPhase < blinkDuration * 2) {
      influence = 1 - (blinkPhase - blinkDuration) / blinkDuration;
    } else {
      influence = 0;
    }

    const mesh = scene.getObjectByName('Object_7');
    if (mesh && mesh.morphTargetInfluences && mesh.morphTargetInfluences.length > 0) {
      // Reset all morph targets to 0
      for (let i = 0; i < mesh.morphTargetInfluences.length; i++) {
        mesh.morphTargetInfluences[i] = 0;
      }
      mesh.morphTargetInfluences[0] = influence;
    }

    // Mouse-follow rotation with easing
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouse.x * 0.3 - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x += (mouse.y * 0.15 - groupRef.current.rotation.x) * 0.1;
    }
  });

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
