import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  Float, 
  Html, 
  Cylinder, 
  Torus, 
  Box, 
  PresentationControls,
  ContactShadows,
  PerspectiveCamera
} from '@react-three/drei';
import * as THREE from 'three';

const Tooltip = ({ label, visible }: { label: string; visible: boolean }) => (
  <Html
    distanceFactor={8}
    position={[0, 0, 0]}
    style={{
      transition: 'all 0.4s',
      opacity: visible ? 1 : 0,
      transform: `scale(${visible ? 1 : 0.8})`,
      pointerEvents: 'none',
      whiteSpace: 'nowrap'
    }}
  >
    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-accent shadow-xl flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
      <span className="text-[10px] font-bold uppercase tracking-tight text-primary">{label}</span>
    </div>
  </Html>
);

const SoudronicWelder = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef} rotation={[0.2, -0.4, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Main Upper Welding Roller */}
        <group 
          onPointerOver={() => setHovered('upper')} 
          onPointerOut={() => setHovered(null)}
          position={[0, 0.8, 0]}
        >
          <Cylinder args={[1, 1, 0.5, 64]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <meshStandardMaterial color="#E2E8F0" metalness={0.9} roughness={0.1} />
          </Cylinder>
          <Cylinder args={[1.05, 1.05, 0.05, 64]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.2]}>
            <meshStandardMaterial color="#94A3B8" metalness={1} roughness={0} />
          </Cylinder>
          <Tooltip label="Upper Welding Roller (High Precision)" visible={hovered === 'upper'} />
        </group>

        {/* Copper Wire Electrode */}
        <group 
          onPointerOver={() => setHovered('wire')} 
          onPointerOut={() => setHovered(null)}
        >
          <Torus args={[1.02, 0.03, 16, 100]} position={[0, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#B45309" metalness={1} roughness={0.2} emissive="#B45309" emissiveIntensity={0.2} />
          </Torus>
          <Tooltip label="Continuous Copper Wire Electrode" visible={hovered === 'wire'} />
        </group>

        {/* Lower Welding Roller */}
        <group 
          onPointerOver={() => setHovered('lower')} 
          onPointerOut={() => setHovered(null)}
          position={[0, -0.8, 0]}
        >
          <Cylinder args={[1, 1, 0.5, 64]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <meshStandardMaterial color="#E2E8F0" metalness={0.9} roughness={0.1} />
          </Cylinder>
          <Tooltip label="Lower Precision Support Roller" visible={hovered === 'lower'} />
        </group>

        {/* Arm/Structure */}
        <group position={[-2, 0, 0]}>
          <Box args={[1, 3, 1]}>
            <meshStandardMaterial color="#1E293B" metalness={0.5} roughness={0.5} />
          </Box>
          <Box args={[2.5, 0.5, 0.5]} position={[1.2, 0.8, 0]}>
            <meshStandardMaterial color="#1E293B" metalness={0.5} roughness={0.5} />
          </Box>
          <Box args={[2.5, 0.5, 0.5]} position={[1.2, -0.8, 0]}>
            <meshStandardMaterial color="#1E293B" metalness={0.5} roughness={0.5} />
          </Box>
        </group>

        {/* Cooling Manifold Details */}
        <group position={[1.2, 1.2, 0]}>
          <Cylinder args={[0.1, 0.1, 0.8]} rotation={[0, 0, Math.PI / 2]}>
             <meshStandardMaterial color="#3B82F6" metalness={0.8} roughness={0.2} />
          </Cylinder>
          <Tooltip label="Integrated Cooling System" visible={hovered === 'upper'} />
        </group>
      </Float>
    </group>
  );
};

export default function MachineryPart3D() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[5, 2, 8]} fov={35} />
        <color attach="background" args={['#0F172A']} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -5, -10]} intensity={0.5} color="#3B82F6" />
        
        <PresentationControls
          global
          snap
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
          config={{ mass: 2, tension: 400 }}
        >
          <SoudronicWelder />
        </PresentationControls>

        <ContactShadows 
          position={[0, -2.5, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2.5} 
          far={4} 
        />
        
        <Environment preset="studio" />
        
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          enablePan={false}
        />
      </Canvas>
      
      {/* Overlay Text */}
      <div className="absolute bottom-6 left-6 pointer-events-none">
        <h4 className="text-white/20 text-4xl font-black uppercase tracking-tighter select-none">
          Precision Engineering
        </h4>
      </div>
    </div>
  );
}
