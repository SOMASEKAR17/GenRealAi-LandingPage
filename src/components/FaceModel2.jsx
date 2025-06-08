import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Face = () => {
  const { scene } = useGLTF('/RobotExpressive.glb');
  const groupRef = useRef();
  const wireframeRef = useRef();
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
    scene.position.set(0, -0.5, 0);
    scene.scale.set(0.5, 0.5, 0.5);
    scene.rotation.set(0, 0, 0);

    const originalMesh = scene.getObjectByName('LeePerrySmith');
    if (originalMesh) {
      const wireGeometry = originalMesh.geometry.clone();
      const wireMaterial = new THREE.MeshBasicMaterial({
        color: 'grey',
        wireframe: true,
      });

      const wireframeMesh = new THREE.Mesh(wireGeometry, wireMaterial);
      wireframeMesh.name = 'wireframe';
      wireframeMesh.position.copy(originalMesh.position);
      wireframeMesh.rotation.copy(originalMesh.rotation);
      wireframeMesh.scale.copy(originalMesh.scale);

      wireframeRef.current = wireframeMesh;

      originalMesh.parent.add(wireframeMesh);
    }
  }, [scene]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const blinkDuration = 0.25;
    const blinkInterval = 3;
    const blinkPhase = t % blinkInterval;

    let influence = 0;
    if (blinkPhase < blinkDuration) {
      influence = blinkPhase / blinkDuration;
    } else if (blinkPhase < blinkDuration * 2) {
      influence = 1 - (blinkPhase - blinkDuration) / blinkDuration;
    } else {
      influence = 0;
    }

    const mesh = scene.getObjectByName('LeePerrySmith');
    if (mesh?.morphTargetInfluences?.length) {
      for (let i = 0; i < mesh.morphTargetInfluences.length; i++) {
        mesh.morphTargetInfluences[i] = 0;
      }
      mesh.morphTargetInfluences[0] = influence;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y += (mouse.x * 0.3 - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x += (mouse.y * 0.15 - groupRef.current.rotation.x) * 0.1;
    }
  });

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