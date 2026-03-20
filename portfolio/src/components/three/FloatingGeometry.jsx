import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'

/**
 * The hero 3D object — a TorusKnot with a distorted, emissive
 * cyan material. Auto-rotates and tilts subtly toward the mouse.
 *
 * @param {{ x: number, y: number }} mouse  Normalized mouse [-1, 1]
 */
export function FloatingGeometry({ mouse }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime

    // Base auto-rotation
    meshRef.current.rotation.x += 0.004
    meshRef.current.rotation.y += 0.006

    // Mouse-reactive tilt (smooth lerp toward target)
    meshRef.current.rotation.x += (mouse.y * 0.25 - meshRef.current.rotation.x) * 0.04
    meshRef.current.rotation.y += (mouse.x * 0.25 - meshRef.current.rotation.y) * 0.04

    // Gentle floating up/down
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.12
  })

  return (
    <mesh ref={meshRef} scale={1.4}>
      {/* p=2, q=3 gives a nice, recognizable knot shape */}
      <torusKnotGeometry args={[1, 0.32, 180, 32, 2, 3]} />
      <MeshDistortMaterial
        color="#0891b2"
        emissive="#0e7490"
        emissiveIntensity={0.5}
        metalness={0.85}
        roughness={0.08}
        distort={0.25}
        speed={1.5}
      />
    </mesh>
  )
}
