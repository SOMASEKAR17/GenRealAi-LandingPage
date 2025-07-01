import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export default function ThreeGlobe() {
  const mountRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });
  const [countryData, setCountryData] = useState({});

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const countryMeshesRef = useRef([]); // Used for raycasting
  const countryLinesRef = useRef([]);  // Used for visible lines

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

  useEffect(() => {
    if (!containerSize.width || !containerSize.height || !countryData) return;

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
      mountRef.current.innerHTML = "";
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
            scene.add(line);
            countryLinesRef.current.push(line);

            // For raycasting: create flat mesh on YZ plane (orthographic)
            if (points.length >= 3) {
              const shape = new THREE.Shape();
              shape.moveTo(points[0].x, points[0].y);
              for (let i = 1; i < points.length; i++) {
                shape.lineTo(points[i].x, points[i].y);
              }

              const shapeGeometry = new THREE.ShapeGeometry(shape);
              const invisibleMaterial = new THREE.MeshBasicMaterial({
                visible: false,
                side: THREE.DoubleSide,
              });
              const mesh = new THREE.Mesh(shapeGeometry, invisibleMaterial);
              mesh.userData.countryName = name;
              mesh.position.z = points[0].z; // approximate curve depth
              scene.add(mesh);
              countryMeshesRef.current.push(mesh);
            }
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

    // Drag Interaction - Only horizontal
    let isDragging = false;
    let lastMouseX = 0;
    let rotationY = 0;
    let autoRotate = true;

    const handleMouseDown = (e) => {
      isDragging = true;
      lastMouseX = e.clientX;
      autoRotate = false;
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - lastMouseX;
        rotationY += deltaX * 0.005;
        lastMouseX = e.clientX;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      setTimeout(() => {
        autoRotate = true;
      }, 500);
    };

    const handleClick = (e) => {
      if (isDragging) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(countryMeshesRef.current);

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

    const canvas = renderer.domElement;
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("click", handleClick);

    let animationId;
    const animate = () => {
      if (autoRotate && !isDragging) {
        rotationY += 0.0015;
      }

      scene.rotation.set(0, rotationY, 0); // Rotate only on Y-axis
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
            top: clickPosition.y + 10,
            left: clickPosition.x + 10,
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
