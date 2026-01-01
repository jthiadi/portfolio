import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Floating shapes that respond to mouse
function FloatingShapes({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const shapesRef = useRef<THREE.Group>(null!);
  
  const shapes = [
    { position: [-2.5, 1.5, -2], size: 0.4, type: 'box', speed: 0.5 },
    { position: [2.8, 0.5, -1.5], size: 0.3, type: 'octahedron', speed: 0.7 },
    { position: [-2, -1, -2.5], size: 0.35, type: 'tetrahedron', speed: 0.6 },
    { position: [2.2, -1.5, -2], size: 0.25, type: 'dodecahedron', speed: 0.8 },
    { position: [-1.5, 2, -1], size: 0.2, type: 'icosahedron', speed: 0.4 },
    { position: [1.8, 2.2, -2.5], size: 0.3, type: 'box', speed: 0.55 },
    { position: [-2.8, -0.5, -1.8], size: 0.28, type: 'octahedron', speed: 0.65 },
    { position: [0.5, -2, -2], size: 0.22, type: 'tetrahedron', speed: 0.75 },
  ];

  useFrame((state) => {
    if (shapesRef.current) {
      shapesRef.current.children.forEach((child, i) => {
        const shape = shapes[i];
        const time = state.clock.elapsedTime * shape.speed;
        
        // Base floating animation
        child.position.y = shape.position[1] + Math.sin(time + i) * 0.3;
        child.position.x = shape.position[0] + Math.cos(time * 0.5 + i) * 0.2;
        
        // React to mouse position
        child.position.x += mousePosition.x * 0.5 * (i % 2 === 0 ? 1 : -1);
        child.position.y += mousePosition.y * 0.3 * (i % 2 === 0 ? -1 : 1);
        
        // Rotation
        child.rotation.x += 0.005;
        child.rotation.y += 0.008;
      });
    }
  });

  const copperColor = '#B87333';
  const bronzeColor = '#8B6914';

  return (
    <group ref={shapesRef}>
      {shapes.map((shape, i) => (
        <mesh key={i} position={shape.position as [number, number, number]}>
          {shape.type === 'box' && <boxGeometry args={[shape.size, shape.size, shape.size]} />}
          {shape.type === 'octahedron' && <octahedronGeometry args={[shape.size]} />}
          {shape.type === 'tetrahedron' && <tetrahedronGeometry args={[shape.size]} />}
          {shape.type === 'dodecahedron' && <dodecahedronGeometry args={[shape.size]} />}
          {shape.type === 'icosahedron' && <icosahedronGeometry args={[shape.size]} />}
          <meshStandardMaterial 
            color={i % 2 === 0 ? copperColor : bronzeColor} 
            metalness={0.8} 
            roughness={0.2}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

function HironoRobot() {
  const groupRef = useRef<THREE.Group>(null!);
  const antennaRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const bronzeColor = '#8B6914';
  const copperColor = '#B87333';
  const darkMetal = '#4A3728';

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Robot Body - Main Box */}
        <mesh position={[0, -0.3, 0]} castShadow>
          <boxGeometry args={[1.2, 1.4, 0.8]} />
          <meshStandardMaterial 
            color={bronzeColor} 
            metalness={0.7} 
            roughness={0.3}
          />
        </mesh>

        {/* Abstract Chest Panel - Geometric pattern instead of circular gauges */}
        <mesh position={[0, -0.2, 0.41]} castShadow>
          <boxGeometry args={[0.85, 0.95, 0.03]} />
          <meshStandardMaterial 
            color={darkMetal} 
            metalness={0.5} 
            roughness={0.4}
          />
        </mesh>

        {/* Abstract geometric shapes on chest - horizontal lines */}
        {[-0.25, 0, 0.25].map((y, i) => (
          <mesh key={`line-${i}`} position={[0, -0.2 + y * 0.8, 0.44]}>
            <boxGeometry args={[0.6, 0.04, 0.01]} />
            <meshStandardMaterial color={copperColor} metalness={0.9} roughness={0.1} />
          </mesh>
        ))}

        {/* Small geometric accents */}
        <mesh position={[-0.25, -0.45, 0.44]}>
          <boxGeometry args={[0.12, 0.12, 0.02]} />
          <meshStandardMaterial color={copperColor} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.25, -0.45, 0.44]}>
          <boxGeometry args={[0.12, 0.12, 0.02]} />
          <meshStandardMaterial color={copperColor} metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Diamond accent in center */}
        <mesh position={[0, -0.1, 0.44]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.15, 0.15, 0.02]} />
          <meshStandardMaterial 
            color="#FF6B35" 
            emissive="#FF6B35" 
            emissiveIntensity={0.5}
            metalness={0.7} 
            roughness={0.3} 
          />
        </mesh>

        {/* Robot Head */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[1.0, 0.8, 0.7]} />
          <meshStandardMaterial 
            color={bronzeColor} 
            metalness={0.7} 
            roughness={0.3}
          />
        </mesh>

        {/* Face opening */}
        <mesh position={[0, 0.75, 0.36]}>
          <boxGeometry args={[0.6, 0.5, 0.1]} />
          <meshStandardMaterial color="#1a1410" metalness={0.2} roughness={0.8} />
        </mesh>

        {/* Eyes - glowing */}
        <mesh position={[-0.15, 0.8, 0.42]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial 
            color="#FFD93D" 
            emissive="#FFD93D" 
            emissiveIntensity={2}
          />
        </mesh>
        <mesh position={[0.15, 0.8, 0.42]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial 
            color="#FFD93D" 
            emissive="#FFD93D" 
            emissiveIntensity={2}
          />
        </mesh>

        {/* Antenna */}
        <group ref={antennaRef} position={[0, 1.25, 0]}>
          <mesh>
            <cylinderGeometry args={[0.02, 0.03, 0.3, 8]} />
            <meshStandardMaterial color={copperColor} metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial 
              color="#FF6B35" 
              emissive="#FF6B35" 
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>

        {/* Ear panels - more geometric */}
        <mesh position={[-0.55, 0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.2, 0.12, 0.2]} />
          <meshStandardMaterial color={copperColor} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.55, 0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.2, 0.12, 0.2]} />
          <meshStandardMaterial color={copperColor} metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Spring legs */}
        {[-0.3, 0.3].map((x, i) => (
          <group key={i} position={[x, -1.2, 0]}>
            <mesh>
              <torusGeometry args={[0.08, 0.03, 8, 16]} />
              <meshStandardMaterial color={copperColor} metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, -0.1, 0]}>
              <torusGeometry args={[0.08, 0.03, 8, 16]} />
              <meshStandardMaterial color={copperColor} metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0, -0.2, 0]}>
              <torusGeometry args={[0.08, 0.03, 8, 16]} />
              <meshStandardMaterial color={copperColor} metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Feet */}
            <mesh position={[0, -0.35, 0]}>
              <boxGeometry args={[0.2, 0.1, 0.25]} />
              <meshStandardMaterial color={darkMetal} metalness={0.6} roughness={0.4} />
            </mesh>
          </group>
        ))}

        {/* Arms */}
        {[-0.75, 0.75].map((x, i) => (
          <group key={i} position={[x, -0.3, 0]}>
            <mesh>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial color={copperColor} metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, -0.25, 0]}>
              <capsuleGeometry args={[0.06, 0.2, 8, 16]} />
              <meshStandardMaterial color={bronzeColor} metalness={0.7} roughness={0.3} />
            </mesh>
          </group>
        ))}

        {/* Corner rivets on body */}
        {[
          [-0.5, 0.3, 0.41],
          [0.5, 0.3, 0.41],
          [-0.5, -0.7, 0.41],
          [0.5, -0.7, 0.41],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <boxGeometry args={[0.06, 0.06, 0.02]} />
            <meshStandardMaterial color={copperColor} metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#FFE4C4" />
      <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#B87333" />
      <pointLight position={[0, 2, 3]} intensity={0.5} color="#FFD93D" />
      
      <FloatingShapes mousePosition={mousePosition} />
      <HironoRobot />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.8}
      />
      
      <Environment preset="warehouse" />
    </>
  );
}

export function RobotScene() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    setMousePosition({ x, y });
  };

  return (
    <div 
      className="w-full h-[450px] md:h-[550px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}