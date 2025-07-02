import * as THREE from "three";

// Create a glowing star texture dynamically
function createStarTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;

  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "white");
  gradient.addColorStop(0.2, "rgba(255,255,255,0.8)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export default function getStarfield({ numStars = 100 } = {}) {
  const starVerts = [];
  const starColors = [];
  const starSizes = [];

  const starTexture = createStarTexture();

  for (let i = 0; i < numStars; i++) {
    const radius = Math.random() * 50 + 50; 
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    starVerts.push(x, y, z);

    // Color variation
    const color = new THREE.Color().setHSL(0.6, 0.4, Math.random() * 0.4 + 0.6);
    starColors.push(color.r, color.g, color.b);

    // Random size
    starSizes.push(Math.random() * 2.0 + 0.5);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(starVerts, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(starColors, 3));

  const material = new THREE.PointsMaterial({
    size: 1.5,
    map: starTexture,
    transparent: true,
    depthWrite: false,
    alphaTest: 0.1,
    vertexColors: true,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
  });

  const starfield = new THREE.Points(geometry, material);

  starfield.tick = () => {
    const time = performance.now() * 0.001;
    material.size = 1.5 + Math.sin(time * 0.8) * 0.2; 
  };

  return starfield;
}
