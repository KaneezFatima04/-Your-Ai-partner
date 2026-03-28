"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Center, useGLTF, ContactShadows, Stage } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function PenguinModel({ cursor }) {
  const ref = useRef();
  const { scene } = useGLTF("/models/penguin.glb");

  useFrame(() => {
    if (!ref.current) return;

    // 1. Correct 80-degree base rotation (in radians)
    // Note: I used 80 * Math.PI / 180 for a true 80-degree turn
    const baseRotationY = (50 * Math.PI) / 250;
    
    // 2. Target only Y rotation (Left/Right)
    const targetRotY = baseRotationY + (cursor.current.x * 0.7);

    // Smoothly transition Y rotation
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      targetRotY,
      0.08
    );

    // 3. LOCK X and Z rotation to exactly 0 to keep it perfectly level
    ref.current.rotation.x = 0;
    ref.current.rotation.z = 0;

    // 4. Ensure Position is locked (no floating)
    ref.current.position.y = 0;
  });

  return (
    <Center top>
      {/* Removed <Float> to stop all automatic up/down movement */}
      <primitive ref={ref} object={scene} scale={0.2} />
    </Center>
  );
}

export default function Character() {
  const cursor = useRef({ x: 0, y: 0 });

  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 40 }}
        onMouseMove={(e) => {
          // Normalize mouse coordinates (-1 to +1)
          cursor.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        }}
      >
        <ambientLight intensity={1.5} />
        <spotLight position={[5, 5, 5]} intensity={2} castShadow />

        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} contactShadow={false} adjustCamera={1.2}>
            <PenguinModel cursor={cursor} />
          </Stage>
          {/* Shadow stays static on the "floor" */}
          <ContactShadows position={[0, -1, 0]} opacity={0.4} scale={10} blur={2.5} far={1} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/penguin.glb");