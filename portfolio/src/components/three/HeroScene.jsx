import { Canvas } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import { FloatingGeometry } from './FloatingGeometry'
import { ParticleField } from './ParticleField'
import { useMouseParallax } from '../../hooks/useMouseParallax'

/**
 * The main Three.js canvas for the Hero section.
 * Contains:
 *  - FloatingGeometry (TorusKnot with mouse-reactive tilt + distort shader)
 *  - ParticleField (600 cyan stars orbiting in a sphere)
 *  - Cyan + purple point lights for premium shading
 *  - drei Float wrapper for extra gentle bobbing
 *
 * alpha:true keeps the canvas background transparent so the page
 * gradient shows through.
 */
export function HeroScene() {
  const mouse = useMouseParallax()

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Lighting rig */}
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 4, 4]}   intensity={2.0} color="#22d3ee" />
      <pointLight position={[-4, -4, -2]} intensity={1.2} color="#6366f1" />
      <directionalLight position={[0, 5, 2]} intensity={0.4} />

      {/* Floating 3D geometry — slight extra bobbing from Float */}
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.6}>
        <FloatingGeometry mouse={mouse} />
      </Float>

      {/* Particle star field */}
      <ParticleField count={600} />

      {/* Environment for metalness reflection */}
      <Environment preset="night" />
    </Canvas>
  )
}
