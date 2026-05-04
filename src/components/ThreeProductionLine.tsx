import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Float, OrbitControls, Environment, ContactShadows, RoundedBox, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const BELT_LENGTH = 16;
const ITEM_COUNT = 8;
const CAN_RADIUS = 0.3;
const CAN_HEIGHT = 0.7;

function ConveyorBelt() {
  return (
    <group position={[0, -0.2, 0]}>
      <RoundedBox args={[BELT_LENGTH, 0.4, 2]} radius={0.1} smoothness={4} receiveShadow>
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      {/* Glowing neon side strips */}
      <mesh position={[0, 0, 1.01]}>
        <boxGeometry args={[BELT_LENGTH, 0.05, 0.05]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0, 0, -1.01]}>
        <boxGeometry args={[BELT_LENGTH, 0.05, 0.05]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function ProcessingMachine() {
  const logo = useTexture('/images/logo.png');

  return (
    <group position={[-3, 1, 0]}>
      {/* Top Roof (Cap) */}
      <RoundedBox position={[0, 0.6, 0]} args={[3.1, 0.8, 2.6]} radius={0.1} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#fbfbfd" metalness={0.2} roughness={0.1} />
      </RoundedBox>

      {/* Front Pillar */}
      <RoundedBox position={[0, -0.4, 0.9]} args={[2.9, 1.2, 0.6]} radius={0.1} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#f1f5f9" metalness={0.2} roughness={0.2} />
      </RoundedBox>

      {/* Back Pillar */}
      <RoundedBox position={[0, -0.4, -0.9]} args={[2.9, 1.2, 0.6]} radius={0.1} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#f1f5f9" metalness={0.2} roughness={0.2} />
      </RoundedBox>

      {/* Soprani Logo on the Roof */}
      <mesh position={[0, 0.6, 1.31]}>
        <planeGeometry args={[2.4, 0.6]} />
        <meshBasicMaterial map={logo} transparent depthWrite={false} color="#ffffff" />
      </mesh>

      {/* Front Glass Window (Decorative) */}
      <mesh position={[0, 0.2, 1.305]}>
        <planeGeometry args={[2, 0.3]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.9}
          roughness={0.1}
          thickness={0.5}
          ior={1.5}
        />
      </mesh>

      {/* Inner UV/Laser Glow in the Tunnel */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[2.8, 0.1, 1.2]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={3} />
      </mesh>

      {/* Top Status Light */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.2, 16]} />
        <meshStandardMaterial color="#C41230" emissive="#C41230" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function LaserScanner() {
  const laserRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (laserRef.current) {
      const mat = laserRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 10) * 0.2;
    }
  });

  return (
    <group position={[3, 1.2, 0]}>
      {/* Scanner Arch Base */}
      <mesh position={[0, 0, -1.1]} castShadow>
        <boxGeometry args={[1, 2.4, 0.4]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 1.1]} castShadow>
        <boxGeometry args={[1, 2.4, 0.4]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.3, 0]} castShadow>
        <boxGeometry args={[1, 0.4, 2.6]} />
        <meshStandardMaterial color="#C41230" metalness={0.5} roughness={0.2} />
      </mesh>
      {/* Scanning Laser Beam */}
      <mesh ref={laserRef} position={[0, -0.2, 0]}>
        <boxGeometry args={[0.1, 2.4, 2]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={3}
          transparent
          opacity={0.5}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function MovingCans() {
  const groupRef = useRef<THREE.Group>(null);
  const spacing = BELT_LENGTH / ITEM_COUNT;

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((can) => {
        can.position.x += delta * 2;
        if (can.position.x > BELT_LENGTH / 2) {
          can.position.x -= BELT_LENGTH;
        }
        can.rotation.y += delta * 2;

        const lid = can.getObjectByName("lid");
        if (lid) {
          // The machine is at x = -3. We place the lid exactly as it passes the center.
          lid.visible = can.position.x > -2.8;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: ITEM_COUNT }).map((_, i) => (
        <group key={i} position={[-BELT_LENGTH / 2 + i * spacing, CAN_HEIGHT / 2, 0]}>
          {/* Base Can Body */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[CAN_RADIUS, CAN_RADIUS, CAN_HEIGHT, 32]} />
            <meshStandardMaterial color="#f8fafc" metalness={1} roughness={0.15} />
          </mesh>

          {/* Brand/Label Band */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[CAN_RADIUS + 0.005, CAN_RADIUS + 0.005, CAN_HEIGHT * 0.4, 32]} />
            <meshStandardMaterial color="#C41230" metalness={0.2} roughness={0.6} />
          </mesh>

          {/* Dark hole to simulate empty/open can */}
          <mesh position={[0, CAN_HEIGHT / 2 + 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[CAN_RADIUS - 0.04, 32]} />
            <meshBasicMaterial color="#1e293b" />
          </mesh>

          {/* Seamed Lid (Visible after passing the machine) */}
          <mesh position={[0, CAN_HEIGHT / 2 + 0.002, 0]} name="lid">
            <cylinderGeometry args={[CAN_RADIUS, CAN_RADIUS, 0.02, 32]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function ThreeProductionLine() {
  return (
    <div className="w-full h-full bg-slate-100 rounded-none border border-slate-200 overflow-hidden shadow-2xl relative cursor-grab active:cursor-grabbing">
      {/* dpr={[1, 2]} ensures great performance on mobile displays while staying sharp */}
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 4, 12]} fov={35} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 4}
          autoRotate
          autoRotateSpeed={0.5}
        />

        <color attach="background" args={['#f1f5f9']} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow shadow-bias={-0.0001} />
        <spotLight position={[-10, 10, -5]} intensity={2} angle={0.3} penumbra={1} color="#3b82f6" />

        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
            <group position={[0, -1.5, 0]}>
              <ConveyorBelt />
              <ProcessingMachine />
              <LaserScanner />
              <MovingCans />
            </group>
          </Float>

          <Environment preset="city" />
          <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2.5} far={4} color="#0f172a" />
        </Suspense>
      </Canvas>

      <div className="absolute top-4 left-4 pointer-events-none">
        <div className="flex items-center gap-2 text-slate-700 text-[10px] font-bold uppercase tracking-widest bg-white/70 px-3 py-1.5 rounded-full backdrop-blur-md border border-slate-300 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          LIVE: AUTOMATED SEAMING PROCESS
        </div>
      </div>
    </div>
  );
}
