import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Simple starfield function
const getStarfield = ({ numStars = 500 }) => {
  const positions = new Float32Array(numStars * 3);
  
  for (let i = 0; i < numStars; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 2000;
    positions[i3 + 1] = (Math.random() - 0.5) * 2000;
    positions[i3 + 2] = (Math.random() - 0.5) * 2000;
  }
  
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 2,
    sizeAttenuation: false,
  });
  
  return new THREE.Points(geometry, material);
};

const Globe = () => {
  const mountRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const w = mountRef.current.clientWidth;
    const h = mountRef.current.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    
    // Append to the component's div
    mountRef.current.appendChild(renderer.domElement);

    // Earth group setup
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = -23.4 * Math.PI / 180; // Earth's axial tilt
    scene.add(earthGroup);

    // Geometry and material
    const detail = 12;
    const geometry = new THREE.IcosahedronGeometry(1, detail);

    // Earth material with basic texture
    const material = new THREE.MeshPhongMaterial({
      color: 0x2233ff,
      shininess: 100,
    });

    // If you have access to textures, uncomment these lines:
    // const loader = new THREE.TextureLoader();
    // material.map = loader.load("/textures/00_earthmap1k.jpg");
    // material.specularMap = loader.load("/textures/02_earthspec1k.jpg");
    // material.bumpMap = loader.load("/textures/01_earthbump1k.jpg");
    // material.bumpScale = 0.04;

    const earthMesh = new THREE.Mesh(geometry, material);
    earthGroup.add(earthMesh);

    // Stars background
    const stars = getStarfield({ numStars: 2000 });
    scene.add(stars);

    // Lighting
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(-2, 0.5, 1.5);
    scene.add(sunLight);

    // Add ambient light for better visibility
    const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
    scene.add(ambientLight);

    // Animation loop
    function animate() {
      animationIdRef.current = requestAnimationFrame(animate);

      // Rotate earth
      earthMesh.rotation.y += 0.002;
      
      // Slowly rotate stars
      stars.rotation.y -= 0.0002;

      renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    function handleWindowResize() {
      const width = mountRef.current?.clientWidth || window.innerWidth;
      const height = mountRef.current?.clientHeight || window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener('resize', handleWindowResize, false);

    // Cleanup function
    return () => {
      // Cancel animation
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      // Remove event listener
      window.removeEventListener('resize', handleWindowResize, false);

      // Clean up Three.js objects
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose of geometries and materials
      geometry.dispose();
      material.dispose();

      // Dispose of renderer
      renderer.dispose();

      // Clear scene
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100%', 
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000'
      }} 
    />
  );
};

export default Globe;