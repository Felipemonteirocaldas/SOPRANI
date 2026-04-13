import React, { useRef, Component, ErrorInfo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';

class ThreeErrorCatcher extends Component<{ children: React.ReactNode }, { hasError: boolean, error: string }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: '' };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message + '\n' + error.stack };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ThreeDViewer Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-red-50 text-[#C41230] p-4 overflow-auto">
          <h2 className="font-bold text-lg mb-2">3D Engine Crash:</h2>
          <pre className="text-xs whitespace-pre-wrap">{this.state.error}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const IndustrialPart = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Cylinder args={[0.5, 0.5, 3, 32]} position={[0, 0, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.15} />
        </Cylinder>
        <Cylinder args={[1.5, 1.5, 0.2, 32]} position={[0, 1.4, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#666666" metalness={0.9} roughness={0.1} />
        </Cylinder>
        {Array.from({ length: 4 }).map((_, i) => (
          <Cylinder
            key={i}
            args={[0.1, 0.1, 0.45]}
            position={[
              Math.cos((i * Math.PI) / 2) * 1.3,
              -1.3,
              Math.sin((i * Math.PI) / 2) * 1.3
            ]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#555555" metalness={1} roughness={0.2} />
          </Cylinder>
        ))}
        <Cylinder args={[1.4, 1.4, 0.4, 32]} position={[0, -1.3, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#aaaaaa" metalness={0.7} roughness={0.3} />
        </Cylinder>
        <Torus args={[0.8, 0.15, 16, 32]} position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#cc0000" metalness={0.4} roughness={0.3} />
        </Torus>
        <Torus args={[0.8, 0.15, 16, 32]} position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#cc0000" metalness={0.4} roughness={0.3} />
        </Torus>
      </Float>
    </group>
  );
};

export default function ThreeDViewer() {
  return (
    <div className="w-full h-[400px] md:h-[500px] bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-inner relative border border-gray-200">
      <ThreeErrorCatcher>
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <span className="bg-white/90 backdrop-blur-sm text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-gray-700 shadow-sm border border-gray-200/50">
            Interactive Live Demo
          </span>
        </div>
        <Canvas shadows camera={{ position: [4, 2, 5], fov: 45 }}>
          <color attach="background" args={['#f8fafc']} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <spotLight position={[-10, 5, -10]} angle={0.25} penumbra={1} intensity={0.5} color="blue" />
          <IndustrialPart />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3}
            maxDistance={8}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      </ThreeErrorCatcher>
    </div>
  );
}
