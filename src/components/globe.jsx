import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export default function ThreeGlobe() {
  const mountRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const countryLinesRef = useRef([]);
  const [countryData] = useState({
    "United States": { fraudRise: "15%", note: "Increase in online fraud" },
    "China": { fraudRise: "8%", note: "Mobile payment fraud rising" },
    "India": { fraudRise: "22%", note: "Digital fraud surge" },
    "Brazil": { fraudRise: "18%", note: "Banking fraud increase" }
  });

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
    if (!containerSize.width || !containerSize.height) return;

    const width = containerSize.width;
    const height = containerSize.height;
    const radius = 1.4;

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
      while (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      mountRef.current.appendChild(renderer.domElement);
    }

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x111133, transparent: true, opacity: 0.3 })
    );
    scene.add(globe);

    scene.add(new THREE.AmbientLight(0xffffff, 1.2));

    const latLngToVector3 = (lat, lng, r = radius + 0.01) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    const drawGeoJSONBorders = (geoJson) => {
      geoJson.features.forEach((feature) => {
        const name = feature.properties.ADMIN || feature.properties.name;
        const hasData = countryData?.[name]?.fraudRise;
        const color = hasData ? 0xff4444 : 0x00ffff;

        const coords = feature.geometry.coordinates;
        const type = feature.geometry.type;

        const drawPolygon = (polygon) => {
          polygon.forEach((ring) => {
            const points = ring.map(([lng, lat]) => latLngToVector3(lat, lng));
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ color });
            const line = new THREE.Line(geometry, material);
            line.userData.countryName = name;
            countryLinesRef.current.push(line);
            scene.add(line);
          });
        };

        if (type === "Polygon") drawPolygon(coords);
        else if (type === "MultiPolygon") coords.forEach(drawPolygon);
      });
    };

    fetch("/countries.geojson")
      .then((res) => res.json())
      .then(drawGeoJSONBorders)
      .catch((err) => console.error("Failed to load GeoJSON:", err));

    // Mouse interactions
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotation = { x: 0, y: 0 };
    let currentRotation = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        targetRotation.y += deltaX * 0.005;
        targetRotation.x += deltaY * 0.005;
        targetRotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotation.x));
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleClick = (e) => {
      if (isDragging) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(countryLinesRef.current);

      if (intersects.length > 0) {
        const countryName = intersects[0].object.userData.countryName;
        const countryInfo = countryData?.[countryName];
        if (countryInfo?.fraudRise) {
          setSelectedCountry({ name: countryName, data: countryInfo });
          setClickPosition({ x: e.clientX, y: e.clientY });
        }
      } else {
        setSelectedCountry(null);
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.002;
      camera.position.z = Math.max(1.8, Math.min(6, camera.position.z));
    };

    const canvas = renderer.domElement;
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("wheel", handleWheel, { passive: false });

    let autoRotation = 0;
    let animationId;
    const animate = () => {
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.1;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.1;
      if (!isDragging && !isHovering) {
        autoRotation += 0.003;
        targetRotation.y = autoRotation;
      }

      scene.rotation.x = currentRotation.x;
      scene.rotation.y = currentRotation.y;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("wheel", handleWheel);
      renderer.dispose();
    };
  }, [countryData, containerSize, isHovering]);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
      {selectedCountry && (
        <div
          style={{
            position: "fixed",
            top: clickPosition.y + 10,
            left: clickPosition.x + 10,
            background: "rgba(0, 0, 0, 0.9)",
            color: "white",
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            zIndex: 1000
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{selectedCountry.name}</strong>
            <button onClick={() => setSelectedCountry(null)} style={{ marginLeft: 10 }}>
              ×
            </button>
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
