import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import earcut from "earcut";

export default function ThreeGlobe() {
  const mountRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });
  const [countryData, setCountryData] = useState({});

  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const countryMeshesRef = useRef([]);

  const globeGroupRef = useRef(new THREE.Group());

  useEffect(() => {
    const handleResize = () => {
      if (mountRef.current) {
        const rect = mountRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch("/country_data.json")
      .then((res) => res.json())
      .then(setCountryData)
      .catch((err) => console.error("Failed to load fraud data:", err));
  }, []);

  const getCountryColor = (name) => {
    const info = countryData?.[name];
    if (!info) return new THREE.Color().setHSL(Math.random(), 0.6, 0.5); // Random fallback
    if (info.fraudRise === "High") return new THREE.Color(1, 0.2, 0.2);
    if (info.fraudRise === "Medium") return new THREE.Color(1, 0.5, 0.5);
    if (info.fraudRise === "Low") return new THREE.Color(1, 0.7, 0.7);
    return new THREE.Color(0.2, 0.7, 0.8); // default blueish
  };

  const latLngToVector3 = (lat, lng, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (-lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  useEffect(() => {
    if (!containerSize.width || !containerSize.height) return;

    const width = containerSize.width;
    const height = containerSize.height;
    const radius = 1.5;

    const backgroundScene = new THREE.Scene();
    backgroundScene.background = new THREE.Color(0x000011);

    const mainScene = new THREE.Scene();
    mainScene.add(globeGroupRef.current);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 3;
    cameraRef.current = camera;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    mainScene.add(ambientLight);

    // Starfield
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const starVertices = [];

    for (let i = 0; i < starCount; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 4));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.15,
      transparent: true,
      opacity: 0.8,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    backgroundScene.add(stars);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    if (mountRef.current) {
      mountRef.current.innerHTML = "";
      mountRef.current.appendChild(renderer.domElement);
    }

    // Globe (Ocean)
    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 64, 64),
      new THREE.MeshStandardMaterial({
        color: 0x003366,
        roughness: 1,
        metalness: 0,
        transparent: true,
        opacity: 1,
      })
    );
    globeGroupRef.current.add(globe);

    // Cloud Layer
    const cloudTexture = new THREE.TextureLoader().load("/cloud.webp");
    const cloudMaterial = new THREE.MeshLambertMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
    });
    const cloudMesh = new THREE.Mesh(
      new THREE.SphereGeometry(radius + 0.015, 64, 64),
      cloudMaterial
    );
    globeGroupRef.current.add(cloudMesh);

    // Countries
    fetch("/countries.geojson")
      .then((res) => res.json())
      .then((geoJson) => {
        geoJson.features.forEach((feature) => {
          const coords = feature.geometry.coordinates;
          const type = feature.geometry.type;
          const name = feature.properties.ADMIN || feature.properties.name;

          const drawPolygon = (polygon) => {
              const outerRing = polygon[0];
              const holes = polygon.slice(1);

              const vertices3D = [];
              const vertices2D = [];
              const holeIndices = [];

              // Outer ring
              outerRing.forEach(([lng, lat]) => {
                const v = latLngToVector3(lat, lng, radius + 0.09);
                vertices3D.push(v.x, v.y, v.z);
                const phi = (90 - lat) * (Math.PI / 180);
                const theta = (-lng + 180) * (Math.PI / 180);
                vertices2D.push((radius + 0.01) * Math.sin(phi) * Math.cos(theta));
                vertices2D.push((radius + 0.01) * Math.cos(phi));
              });

              // Holes
              holes.forEach((ring) => {
                holeIndices.push(vertices2D.length / 2); // each vertex is 2D
                ring.forEach(([lng, lat]) => {
                  const v = latLngToVector3(lat, lng, radius + 0.01);
                  vertices3D.push(v.x, v.y, v.z);
                  const phi = (90 - lat) * (Math.PI / 180);
                  const theta = (-lng + 180) * (Math.PI / 180);
                  vertices2D.push((radius + 0.01) * Math.sin(phi) * Math.cos(theta));
                  vertices2D.push((radius + 0.01) * Math.cos(phi));
                });
              });

              const indices = earcut(vertices2D, holeIndices);

              const geometry = new THREE.BufferGeometry();
              geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertices3D), 3));
              geometry.setIndex(indices);

              const material = new THREE.MeshBasicMaterial({
                color: getCountryColor(name),
                side: THREE.DoubleSide,
              });

              const mesh = new THREE.Mesh(geometry, material);
              mesh.userData.countryName = name;
              globeGroupRef.current.add(mesh);
              countryMeshesRef.current.push(mesh);
            };
          if (type === "Polygon") drawPolygon(coords);
          else if (type === "MultiPolygon") coords.forEach(drawPolygon);
        });
      });

    // Controls
    let isDragging = false;
    let lastMouse = { x: 0, y: 0 };
    let rotation = { x: 0, y: 0 };
    let autoRotate = true;

    const handleMouseDown = (e) => {
      isDragging = true;
      lastMouse = { x: e.clientX, y: e.clientY };
      autoRotate = false;
    };

    const handleMouseMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects(countryMeshesRef.current);

      if (intersects.length > 0) {
        const name = intersects[0].object.userData.countryName;
        const data = countryData?.[name];
        if (data?.fraudRise) {
          setSelectedCountry({ name, data });
          setHoverPosition({ x: e.clientX, y: e.clientY });
        } else {
          setSelectedCountry(null);
        }
      } else {
        setSelectedCountry(null);
      }

      if (isDragging) {
        const deltaX = e.clientX - lastMouse.x;
        const deltaY = e.clientY - lastMouse.y;
        rotation.y += deltaX * 0.005;
        rotation.x += deltaY * 0.005;
        rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotation.x));
        lastMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      setTimeout(() => (autoRotate = true), 500);
    };

    const canvas = renderer.domElement;
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    // Animation
    let animationId;
    const animate = () => {
  if (autoRotate && !isDragging) rotation.y += 0.0015;
  globeGroupRef.current.rotation.set(rotation.x, rotation.y, 0);

  const t = Date.now() * 0.001;
  cloudMesh.rotation.y += 0.0002;

  // 🌟 Add blinking/pulsing effect to stars
  starMaterial.opacity = 0.5 + 0.3 * Math.sin(t * 2); // between 0.2 and 0.8
  // Optional: starMaterial.size = 0.1 + 0.05 * Math.sin(t * 3);

  renderer.autoClear = false;
  renderer.clear();
  renderer.render(backgroundScene, camera);
  renderer.render(mainScene, camera);

  animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      renderer.dispose();
    };
  }, [countryData, containerSize]);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
      {selectedCountry && (
        <div
  style={{
    position: "fixed",
    top: hoverPosition.y + 10,
    left: hoverPosition.x + 10,
    background: "linear-gradient(145deg, #0a0f1f, #111827)", // dark blue gradient
    color: "#d1d5db", // light gray text
    padding: "14px 18px",
    borderRadius: "10px",
    fontSize: "14px",
    fontFamily: "'Orbitron', sans-serif", // futuristic font
    zIndex: 1000,
    border: "1px solid #00ffff", // neon blue edge
    boxShadow: "0 0 10px #00ffff, 0 0 20px #00ffff", // glowing effect
    transition: "all 0.3s ease-in-out",
  }}
>
  <strong style={{ color: "#00ffff" }}>{selectedCountry.name}</strong>
  <div style={{ marginTop: "6px" }}>
    <strong style={{ color: "#ffffff" }}>Fraud Rise:</strong> {selectedCountry.data.fraudRise}
    <br />
    <span style={{ color: "#9ca3af" }}>{selectedCountry.data.note}</span>
  </div>
</div>

      )}
    </div>
  );
}
