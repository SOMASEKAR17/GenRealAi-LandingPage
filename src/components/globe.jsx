import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import earcut from "earcut";

export default function ThreeGlobe() {
  const mountRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });
  const [countryData, setCountryData] = useState({});

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const countryMeshesRef = useRef([]);

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

  const getCountryColor = (countryName) => {
    const info = countryData?.[countryName];
    if (!info) return 0x00ffff;
    if (info.fraudRise === "High") return 0xff0000;
    if (info.fraudRise === "Medium") return 0xffa500;
    if (info.fraudRise === "Low") return 0x00ff00;
    return 0x999999;
  };

  const latLngToVector3 = (lat, lng, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  useEffect(() => {
    if (!containerSize.width || !containerSize.height || !countryData) return;

    const width = containerSize.width;
    const height = containerSize.height;
    const radius = 1.5;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000011);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 3;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    if (mountRef.current) {
      mountRef.current.innerHTML = "";
      mountRef.current.appendChild(renderer.domElement);
    }

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x111133, transparent: true, opacity: 0.3 })
    );
    scene.add(globe);
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));

    fetch("/countries.geojson")
      .then((res) => res.json())
      .then((geoJson) => {
        geoJson.features.forEach((feature) => {
          const coords = feature.geometry.coordinates;
          const type = feature.geometry.type;
          const name = feature.properties.ADMIN || feature.properties.name;
          const color = getCountryColor(name);

          const drawPolygon = (polygon) => {
            polygon.forEach((ring) => {
              if (ring.length < 3) return;

              // Flatten ring for earcut in lat/lng space
              const flat = ring.flat();
              const indices = earcut(flat);

              const geometry = new THREE.BufferGeometry();
              const vertices = [];

              for (let i = 0; i < indices.length; i++) {
                const idx = indices[i];
                const lng = ring[idx][0];
                const lat = ring[idx][1];
                const vertex = latLngToVector3(lat, lng, radius + 0.01);
                vertices.push(vertex.x, vertex.y, vertex.z);
              }

              geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vertices), 3));
              geometry.computeVertexNormals();
              const material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide });
              const mesh = new THREE.Mesh(geometry, material);
              mesh.userData.countryName = name;
              scene.add(mesh);
              countryMeshesRef.current.push(mesh);
            });
          };

          if (type === "Polygon") drawPolygon(coords);
          else if (type === "MultiPolygon") coords.forEach(drawPolygon);
        });
      });

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
        const maxX = Math.PI / 2;
        const minX = -Math.PI / 2;
        rotation.x = Math.max(minX, Math.min(maxX, rotation.x));
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

    let animationId;
    const animate = () => {
      if (autoRotate && !isDragging) rotation.y += 0.0015;
      scene.rotation.set(rotation.x, rotation.y, 0);
      renderer.render(scene, camera);
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
            background: "rgba(0, 0, 0, 0.9)",
            color: "white",
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            zIndex: 1000,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{selectedCountry.name}</strong>
          </div>
          <div>
            <strong>Fraud Rise:</strong> {selectedCountry.data.fraudRise}
            <br />
            {selectedCountry.data.note}
          </div>
        </div>
      )}
    </div>
  );
}
