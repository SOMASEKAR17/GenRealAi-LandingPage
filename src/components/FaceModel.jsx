// FaceModel.jsx
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// A utility function to recursively dispose of an object's resources
const disposeObject = (object) => {
  if (!object) return;

  // Dispose of children first
  object.children.forEach(disposeObject);

  // Dispose of geometry
  if (object.geometry) {
    object.geometry.dispose();
  }

  // Dispose of material(s)
  if (object.material) {
    if (Array.isArray(object.material)) {
      object.material.forEach((material) => material.dispose());
    } else {
      object.material.dispose();
    }
  }

  // Dispose of textures (if any)
  if (object.material?.map) object.material.map.dispose();
  if (object.material?.lightMap) object.material.lightMap.dispose();
  // ... and any other texture maps you might be using

  // Remove the object from its parent
  if (object.parent) {
    object.parent.remove(object);
  }
};

const Face = ({ paused, isVisible, disableTracking }) => {
  // We'll use a local variable to prevent 'scene' from being part of the dependency array
  const gltf = useGLTF('/RoboFace/scene.gltf');
  const groupRef = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState({ x: 1.5, y: 1.2, z: 1.2 });
  const wireframesRef = useRef([]);
  const sharedWireMaterial = useRef(null);

  // Initialize and dispose of the shared wireframe material
  useEffect(() => {
    sharedWireMaterial.current = new THREE.MeshBasicMaterial({
      color: 'grey',
      wireframe: true,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });

    return () => {
      // Cleanup: Dispose of the material
      if (sharedWireMaterial.current) {
        sharedWireMaterial.current.dispose();
        sharedWireMaterial.current = null;
      }
    };
  }, []);

  // Handle the GLTF scene and wireframes
  useEffect(() => {
    if (!isVisible || !gltf.scene) return;

    // Create a clone of the scene for manipulation
    // This is a key change! It ensures that we are not modifying the cached scene data.
    const sceneClone = gltf.scene.clone();
    groupRef.current.add(sceneClone);

    sceneClone.scale.set(scale.x, scale.y, scale.z);
    sceneClone.rotation.set(0, 0, 0);

    const addedWireframes = [];
    sceneClone.traverse((child) => {
      if (child.isMesh && child.geometry) {
        const wireframeMesh = new THREE.Mesh(child.geometry, sharedWireMaterial.current);
        wireframeMesh.position.copy(child.position);
        wireframeMesh.rotation.copy(child.rotation);
        wireframeMesh.scale.copy(child.scale);
        if (child.parent) {
          child.parent.add(wireframeMesh);
          addedWireframes.push(wireframeMesh);
        }
      }
    });
    wireframesRef.current = addedWireframes;

    return () => {
      // Cleanup: Remove and dispose of the cloned scene and wireframes
      if (groupRef.current) {
        groupRef.current.remove(sceneClone);
      }
      disposeObject(sceneClone);
      wireframesRef.current = [];
    };
  }, [isVisible, scale, gltf]); // Only depend on gltf, isVisible and scale

  // 🔥 Mouse tracking – only if visible and not disabled
  useEffect(() => {
    if (!isVisible || disableTracking) return;
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible, disableTracking]);

  // Handle resize and position
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newScale, newY;
      if (width < 480) {
        newScale = { x: 0.95, y: 0.8, z: 1 };
        newY = -0.85;
      } else if (width < 768) {
        newScale = { x: 1, y: 0.8, z: 1 };
        newY = -0.9;
      } else if (width < 1024) {
        newScale = { x: 1.3, y: 1, z: 1 };
        newY = -1.4;
      } else {
        newScale = { x: 1.45, y: 1.15, z: 1.1 };
        newY = -1.5;
      }
      setScale(newScale);
      if (groupRef.current) {
         groupRef.current.position.set(0, newY, 0);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame(() => {
    if (paused || !groupRef.current || !isVisible) return;
    groupRef.current.rotation.y += (mouse.x * 0.3 - groupRef.current.rotation.y) * 0.1;
    groupRef.current.rotation.x += (mouse.y * 0.1 - groupRef.current.rotation.x) * 0.1;
  });

  return <group ref={groupRef} />;
};

const FaceModel = ({ paused, disableTracking }) => {
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );
    if (canvasRef.current) observer.observe(canvasRef.current);
    return () => {
      if (canvasRef.current) observer.unobserve(canvasRef.current);
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
        {isVisible && (
          <Face paused={paused} isVisible={isVisible} disableTracking={disableTracking} />
        )}
      </Suspense>
    </Canvas>
  );
};

export default FaceModel;