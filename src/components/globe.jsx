import createGlobe from "cobe";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";
import getStarfield from "./Starfield";

export default function Globe() {
  const globeCanvasRef = useRef(null);
  const starCanvasRef = useRef(null);
  const globeState = useRef({ phi: 0, theta: 0 });
  const pointerInteraction = useRef({ dragging: false, lastX: 0, velocity: 0 });
  const hovering = useRef(false);

  const [clickedInfo, setClickedInfo] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // === STARFIELD ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({
      canvas: starCanvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const starfield = getStarfield({ numStars: 300 });
    scene.add(starfield);

    let animationFrame;
    const animate = () => {
      starfield.rotation.y += 0.0005;
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  useLayoutEffect(() => {
    const canvas = globeCanvasRef.current;
    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    };

    resizeCanvas();

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: canvas.width,
      height: canvas.height,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [],
      onRender: (state) => {
        state.phi = globeState.current.phi;
        state.theta = globeState.current.theta;

        if (!pointerInteraction.current.dragging && !hovering.current) {
          globeState.current.phi += 0.001;
        }

        globeState.current.phi += pointerInteraction.current.velocity;
        pointerInteraction.current.velocity *= 0.95;
      },
    });
    const getLatLngFromClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const r = Math.min(rect.width, rect.height) / 2;

      const dx = (mouseX - cx) / r;
      const dy = -(mouseY - cy) / r;
      
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len > 1) return null; // outside the globe

      const dz = Math.sqrt(1 - dx * dx - dy * dy);
      const [x, y, z] = [dx, dy, dz];

      const lat = Math.asin(y) * (180 / Math.PI);
      const lng =
        Math.atan2(x, z) * (180 / Math.PI) - (globeState.current.phi * 180) / Math.PI;

      return [lat, ((lng + 540) % 360) - 180];
    };


    const reverseGeocode = async (lat, lng) => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();
        return data.address?.country || data.address?.continent || "Unknown";
      } catch (err) {
        return "Unknown";
      }
    };

    const handleClick = async (e) => {
      const coords = getLatLngFromClick(e);
      if (!coords) return;

      const [lat, lng] = coords;
      const name = await reverseGeocode(lat, lng);
      setClickedInfo({ name, lat, lng });
      setTooltipPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = (e) => {
      pointerInteraction.current.dragging = true;
      pointerInteraction.current.lastX = e.clientX;
    };

    const handleMouseMove = (e) => {
      if (pointerInteraction.current.dragging) {
        const deltaX = e.clientX - pointerInteraction.current.lastX;
        pointerInteraction.current.lastX = e.clientX;
        globeState.current.phi += deltaX * 0.005;
        pointerInteraction.current.velocity = deltaX * 0.0005;
      }
    };

    const handleMouseUp = () => {
      pointerInteraction.current.dragging = false;
    };

    const handleMouseEnter = () => {
      hovering.current = true;
    };

    const handleMouseLeave = () => {
      hovering.current = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      globe.destroy();
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={starCanvasRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />
      <canvas
        ref={globeCanvasRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          display: "block",
          cursor: "grab",
          zIndex: 1,
        }}
      />
      {clickedInfo && (
        <div
          style={{
            position: "fixed",
            top: tooltipPos.y + 10,
            left: tooltipPos.x + 10,
            background: "#111",
            color: "#fff",
            padding: "10px 14px",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            fontSize: "14px",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
          }}
        >
          🌍 <strong>{clickedInfo.name}</strong>
          <div style={{ fontSize: "12px", color: "#ccc" }}>
            Lat: {clickedInfo.lat.toFixed(2)}, Lng: {clickedInfo.lng.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}
