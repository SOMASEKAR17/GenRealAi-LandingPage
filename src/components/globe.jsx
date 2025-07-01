import createGlobe from "cobe";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Globe() {
  const canvasRef = useRef(null);
  const globeState = useRef({ phi: 0 });
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const markers = [
    { location: [37.7595, -122.4367], size: 0.03, label: "San Francisco" },
    { location: [40.7128, -74.006], size: 0.1, label: "New York" },
  ];

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;

    function resizeCanvas() {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    resizeCanvas(); // Set correct canvas size

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: canvas.width,
      height: canvas.height,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: markers.map((m) => ({
        location: m.location,
        size: m.size,
      })),
      onRender: (state) => {
        state.phi = globeState.current.phi;
        globeState.current.phi += 0.001;
      },
    });

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const r = Math.min(rect.width, rect.height) / 2;

      let found = null;
      for (const marker of markers) {
        const [lat, lng] = marker.location;

        const latRad = (lat * Math.PI) / 180;
        const lngRad = (lng * Math.PI) / 180 + globeState.current.phi;

        const x = Math.cos(latRad) * Math.sin(lngRad);
        const y = Math.sin(latRad);
        const z = Math.cos(latRad) * Math.cos(lngRad);

        // 2D projection
        const screenX = cx + x * r;
        const screenY = cy - y * r;

        const dx = screenX - mouseX;
        const dy = screenY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 10) {
          found = marker;
          break;
        }
      }

      setHoveredMarker(found);
      setTooltipPos({ x: event.clientX, y: event.clientY });
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      globe.destroy();
      canvas.removeEventListener("mousemove", handleMouseMove);
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
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
      {hoveredMarker && (
        <div
          style={{
            position: "fixed",
            top: tooltipPos.y + 10,
            left: tooltipPos.x + 10,
            background: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "6px 10px",
            borderRadius: "4px",
            pointerEvents: "none",
            fontSize: "14px",
            zIndex: 1000,
          }}
        >
          {hoveredMarker.label}
        </div>
      )}
    </div>
  );
}
