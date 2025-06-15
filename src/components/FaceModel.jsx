// FaceModel.jsx
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Face = ({ paused }) => {
  const { scene } = useGLTF('/RoboFace/scene.gltf');
  const groupRef = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState({ x: 1.5, y: 1.3, z: 1.4 });
  const wireframesRef = useRef([]);

  useEffect(() => {
    scene.scale.set(scale.x, scale.y, scale.z);
    scene.rotation.set(0, 0, 0);

    // Clean up existing wireframes first
    wireframesRef.current.forEach((mesh) => {
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) mesh.material.dispose();
      if (mesh.parent) mesh.parent.remove(mesh);
    });
    wireframesRef.current = [];

    const addedWireframes = [];

    scene.traverse((child) => {
      if (child.isMesh && child.geometry) {
        // Create wireframe material with correct settings
        const wireMaterial = new THREE.MeshBasicMaterial({
          color: 'grey', 
          wireframe: true,
          transparent: true,
          opacity: 0.8,
          side: THREE.DoubleSide
        });

        // Create wireframe mesh
        const wireframeMesh = new THREE.Mesh(child.geometry.clone(), wireMaterial);
        
        // Copy transform properties exactly
        wireframeMesh.position.copy(child.position);
        wireframeMesh.rotation.copy(child.rotation);
        wireframeMesh.scale.copy(child.scale);
        
        // Add wireframe to the same parent as the original mesh
        if (child.parent) {
          child.parent.add(wireframeMesh);
          addedWireframes.push(wireframeMesh);
        }
      }
    });

    wireframesRef.current = addedWireframes;

    return () => {
      // Cleanup function
      wireframesRef.current.forEach((mesh) => {
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) mesh.material.dispose();
        if (mesh.parent) mesh.parent.remove(mesh);
      });
      wireframesRef.current = [];
    };
  }, [scene, scale]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scale and position adjustment on resize
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

  useFrame(() => {
    if (paused || !groupRef.current) return;
    groupRef.current.rotation.y += (mouse.x * 0.6 - groupRef.current.rotation.y) * 0.1;
    groupRef.current.rotation.x += (mouse.y * 0.4 - groupRef.current.rotation.x) * 0.1;
  });

  return <group ref={groupRef}><primitive object={scene} /></group>;
};

const FaceModel = ({ paused }) => (
  <Canvas
    dpr={[1, 1.5]}
    className="absolute inset-0 pointer-events-none z-20"
    camera={{ position: [0, 0, 5], fov: 35 }}
    shadows
  >
    <ambientLight intensity={1} />
    <directionalLight position={[2, 2, 5]} intensity={1.2} />
    <Suspense fallback={null}>
      <Face paused={paused} />
    </Suspense>
  </Canvas>
);

export default FaceModel;