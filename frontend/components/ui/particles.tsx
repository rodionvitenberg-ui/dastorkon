"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ParticlesProps {
  color?: string;
  particleCount?: number;
  particleSize?: number;
  animate?: boolean;
  className?: string;
}

/**
 * Deterministic pseudo-random based on a seed (simple mulberry32).
 * Produces the same sequence on server and client, avoiding hydration mismatch
 * from Math.random().
 */
function seededRandom(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Soft circular sprite generated in-memory so we don't depend on public assets. */
function createDiscTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const half = size / 2;
    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.4, "rgba(255,255,255,0.8)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function Particles({
  color = "#ff3366",
  particleCount = 10000,
  particleSize = 35,
  animate = true,
  className = "",
}: ParticlesProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Only mount canvas on client — avoids SSR/CSR canvas DOM mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const container = mountRef.current;
    if (!container) return;

    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let material: THREE.PointsMaterial;
    let geometry: THREE.BufferGeometry | undefined;
    let sprite: THREE.Texture | undefined;
    let renderer: THREE.WebGLRenderer | undefined;
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const init = (): THREE.WebGLRenderer | undefined => {
      try {
        camera = new THREE.PerspectiveCamera(
          55,
          window.innerWidth / window.innerHeight,
          2,
          2000,
        );
        camera.position.z = 1000;

        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.001);

        geometry = new THREE.BufferGeometry();
        const vertices: number[] = [];
        const rng = seededRandom(42); // fixed seed for deterministic positions

        for (let i = 0; i < particleCount; i++) {
          vertices.push(
            2000 * rng() - 1000,
            2000 * rng() - 1000,
            2000 * rng() - 1000,
          );
        }

        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(vertices, 3),
        );

        // In-memory disc — no dependency on /assets/disc.png
        sprite = createDiscTexture();
        material = new THREE.PointsMaterial({
          size: particleSize,
          sizeAttenuation: true,
          map: sprite,
          alphaTest: 0.1,
          transparent: true,
          depthWrite: false,
        });
        material.color.setStyle(color);

        const particlesMesh = new THREE.Points(geometry, material);
        scene.add(particlesMesh);

        const webglRenderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
        });
        webglRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        webglRenderer.setSize(window.innerWidth, window.innerHeight);
        webglRenderer.setClearColor(0x000000, 0);
        container.appendChild(webglRenderer.domElement);

        return webglRenderer;
      } catch (err) {
        // WebGL not available (headless, software rendering, disabled driver, etc.)
        // Fall back silently — the component renders as an empty div.
        console.warn(
          "[Particles] WebGL is not available — falling back to empty canvas.",
          err,
        );
        return undefined;
      }
    };

    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.isPrimary) {
        mouseX = event.clientX - window.innerWidth / 2;
        mouseY = event.clientY - window.innerHeight / 2;
      }
    };

    const animateScene = () => {
      if (!camera || !scene || !renderer || !material) return;

      if (animate) {
        const time = Date.now() * 0.00005;
        const h = ((360 * (1.0 + time)) % 360) / 360;
        material.color.setHSL(h, 0.45, 0.45);
      }

      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animateScene);
    };

    renderer = init();
    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove);
    animateScene();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);

      if (renderer) {
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }

      if (material) material.dispose();
      if (geometry) geometry.dispose();
      if (sprite) sprite.dispose();
    };
  }, [mounted, color, particleCount, particleSize, animate]);

  // Render an empty placeholder div that matches SSR exactly;
  // the canvas is appended inside it by the effect on client only.
  return (
    <div
      ref={mountRef}
      suppressHydrationWarning
      className={`absolute top-0 left-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
