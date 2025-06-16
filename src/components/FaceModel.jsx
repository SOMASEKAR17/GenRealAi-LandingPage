// FaceModel.jsx
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Face = ({ paused, isVisible }) => {
  const { scene } = useGLTF('/RoboFace/scene.gltf');
  const groupRef = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState({ x: 1.4, y: 1.2, z: 1.2 });
  const wireframesRef = useRef([]);
  const sharedWireMaterial = useRef(null);

  // Create shared wireframe material once
  useEffect(() => {
    if (!sharedWireMaterial.current) {
      sharedWireMaterial.current = new THREE.MeshBasicMaterial({
        color: 'grey',
        wireframe: true,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });
    }
    
    return () => {
      if (sharedWireMaterial.current) {
        sharedWireMaterial.current.dispose();
        sharedWireMaterial.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Only create wireframes when visible
    if (!isVisible) return;
    
    scene.scale.set(scale.x, scale.y, scale.z);
    scene.rotation.set(0, 0, 0);

    // Clean up existing wireframes first
    wireframesRef.current.forEach((mesh) => {
      if (mesh.parent) mesh.parent.remove(mesh);
    });
    wireframesRef.current = [];

    const addedWireframes = [];

    scene.traverse((child) => {
      if (child.isMesh && child.geometry && !child.userData.hasWireframe) {
        // Create wireframe mesh using shared material and original geometry
        const wireframeMesh = new THREE.Mesh(child.geometry, sharedWireMaterial.current);
        
        // Copy transform properties exactly
        wireframeMesh.position.copy(child.position);
        wireframeMesh.rotation.copy(child.rotation);
        wireframeMesh.scale.copy(child.scale);
        
        // Add wireframe to the same parent as the original mesh
        if (child.parent) {
          child.parent.add(wireframeMesh);
          addedWireframes.push(wireframeMesh);
          child.userData.hasWireframe = true;
        }
      }
    });

    wireframesRef.current = addedWireframes;

    return () => {
      // Cleanup - only remove meshes, don't dispose shared resources
      wireframesRef.current.forEach((mesh) => {
        if (mesh.parent) mesh.parent.remove(mesh);
      });
      wireframesRef.current = [];
      
      // Reset userData flags
      scene.traverse((child) => {
        if (child.isMesh) {
          child.userData.hasWireframe = false;
        }
      });
    };
  }, [scene, scale, isVisible]);

  // Mouse tracking - only when visible
  useEffect(() => {
    if (!isVisible) return;
    
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible]);

  // Scale and position adjustment on resize
  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 768;
      setScale(isSmall ? { x: 1, y: 1, z: 1 } : { x: 1.4, y: 1.2, z: 1.2 });
      scene.position.set(0, isSmall ? -1 : -1.7, 0);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scene]);

  useFrame(() => {
    if (paused || !groupRef.current || !isVisible) return;
    groupRef.current.rotation.y += (mouse.x * 0.6 - groupRef.current.rotation.y) * 0.1;
    groupRef.current.rotation.x += (mouse.y * 0.4 - groupRef.current.rotation.x) * 0.1;
  });

  return <group ref={groupRef}><primitive object={scene} /></group>;
};

const FaceModel = ({ paused }) => {
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef();

  // Intersection Observer to detect visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '50px' // Start loading 50px before it comes into view
      }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current);
      }
    };
  }, []);

  return (
    <Canvas
      ref={canvasRef}
      dpr={[1, 1.5]}
      className="absolute inset-0 pointer-events-none z-20"
      camera={{ position: [0, 0, 5], fov: 35 }}
      shadows
    >
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 5]} intensity={1.2} />
      <Suspense fallback={null}>
        {isVisible && <Face paused={paused} isVisible={isVisible} />}
      </Suspense>
    </Canvas>
  );
};

export default FaceModel;