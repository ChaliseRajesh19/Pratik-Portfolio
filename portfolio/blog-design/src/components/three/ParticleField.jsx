import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * Renders a field of ~600 particles distributed in a sphere.
 * Slowly rotates on each frame for a "galactic" depth effect.
 * Lives inside the HeroScene Canvas.
 */
export function ParticleField({ count = 600 }) {
  const ref = useRef()

  // Generate random positions in a spherical shell
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3.5 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count])

  // Slow rotation
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.025
    ref.current.rotation.x = state.clock.elapsedTime * 0.008
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#22d3ee"
        sizeAttenuation
        transparent
        opacity={0.55}
      />
    </points>
  )
}
