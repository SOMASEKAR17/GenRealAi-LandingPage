import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Face = () => {
  const { scene } = useGLTF('/RoboFace/scene.gltf');
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
    scene.position.set(0, -1.7, 0);
    scene.scale.set(1.4, 1.2, 1.2);
    scene.rotation.set(0, 0, 0);

    scene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        const wireMaterial = new THREE.MeshBasicMaterial({
          color: 'grey',
          wireframe: true,
        });

        const wireframeMesh = new THREE.Mesh(child.geometry.clone(), wireMaterial);
        wireframeMesh.position.copy(child.position);
        wireframeMesh.rotation.copy(child.rotation);
        wireframeMesh.scale.copy(child.scale);
        child.parent.add(wireframeMesh);
      }
    });
  }, [scene]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouse.x * 0.6 - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x += (mouse.y * 0.4 - groupRef.current.rotation.x) * 0.1;
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
    <OrbitControls enableZoom={true} enablePan={true} />
  </Canvas>
);

export default FaceModel;
