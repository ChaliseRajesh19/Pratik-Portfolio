import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'

/**
 * The actual Three.js scene rendered inside the About section.
 * A distorted glowing sphere is encircled by two orbital rings
 * rotating at different speeds and angles.
 */
function OrbScene() {
  const sphereRef = useRef()
  const ring1Ref  = useRef()
  const ring2Ref  = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.4
      sphereRef.current.rotation.z = t * 0.1
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.6
      ring1Ref.current.rotation.y = t * 0.25
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.4
      ring2Ref.current.rotation.z =  t * 0.5
    }
  })

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[3, 3, 3]}   intensity={2.5} color="#22d3ee" />
      <pointLight position={[-3, -3, -3]} intensity={1.5} color="#a855f7" />

      {/* Core glowing sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.75, 64, 64]} />
        <MeshDistortMaterial
          color="#0891b2"
          emissive="#0e7490"
          emissiveIntensity={0.7}
          metalness={0.9}
          roughness={0.05}
          distort={0.45}
          speed={2.5}
        />
      </mesh>

      {/* Inner orbital ring — cyan */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.35, 0.028, 16, 120]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1} />
      </mesh>

      {/* Outer orbital ring — indigo */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3.5, 0, 0]}>
        <torusGeometry args={[1.7, 0.018, 16, 120]} />
        <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={0.7} />
      </mesh>
    </>
  )
}

/**
 * Drop-in component: renders the orb scene in a transparent canvas.
 * Size is controlled by the parent container's dimensions.
 */
export function AboutOrb() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <OrbScene />
    </Canvas>
  )
}
