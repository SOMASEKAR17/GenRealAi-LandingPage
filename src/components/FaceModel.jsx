// components/FaceModel.js
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage } from '@react-three/drei';

const Face = () => {
  const { scene } = useGLTF('/face.glb');
  return <primitive object={scene} scale={2.5} />;
};

const FaceModel = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      className="absolute inset-0 z-20 pointer-events-none"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        <Stage environment="city" intensity={0.6}>
          <Face />
        </Stage>
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate />
    </Canvas>
  );
};

export default FaceModel;
