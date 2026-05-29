import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x09090e, 0.028)

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100)
    camera.position.set(0, 0, 6)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const particleCount = 2200
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const c1 = new THREE.Color(0x10b981)
    const c2 = new THREE.Color(0x34d399)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const radius = 2 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)
      const mix = Math.random()
      const col = c1.clone().lerp(c2, mix)
      colors[i3] = col.r
      colors[i3 + 1] = col.g
      colors[i3 + 2] = col.b
    }

    const originalPositions = new Float32Array(positions)
    const velocities = new Float32Array(particleCount * 3)

    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        size: 0.065,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    )
    scene.add(particles)

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.6, 0.04, 16, 100),
      new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.6,
      }),
    )
    ring.rotation.x = Math.PI / 3
    scene.add(ring)

    const outerRing = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.35, 0.2, 128, 20),
      new THREE.MeshBasicMaterial({
        color: 0x6ee7b7,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      }),
    )
    scene.add(outerRing)

    const mouse = { x: 0, y: 0 }
    let isHovered = false
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      const inBounds =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      isHovered = inBounds
    }
    const onPointerLeave = () => { isHovered = false }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave, { passive: true })

    const raycaster = new THREE.Raycaster()
    const mouseVec2 = new THREE.Vector2()
    const repulsionPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const mouseWorld = new THREE.Vector3()

    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      if (width === 0 || height === 0) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()

    let frameId = 0
    const clock = new THREE.Clock()

    const animate = () => {
      const t = clock.getElapsedTime()
      const speed = reducedMotion ? 0.08 : 0.25
      particles.rotation.y = t * 0.12 * speed
      particles.rotation.x = t * 0.04 * speed
      ring.rotation.z = t * 0.45 * speed
      ring.rotation.y = t * 0.28 * speed
      outerRing.rotation.x = t * 0.5 * speed
      outerRing.rotation.y = t * 0.7 * speed

      if (!reducedMotion) {
        camera.position.x += (mouse.x * 1 - camera.position.x) * 0.05
        camera.position.y += (mouse.y * 0.6 - camera.position.y) * 0.05

        if (isHovered) {
          mouseVec2.set(mouse.x, mouse.y)
          raycaster.setFromCamera(mouseVec2, camera)
          const hit = raycaster.ray.intersectPlane(repulsionPlane, mouseWorld)
          if (hit) {
            const mouseLocal = particles.worldToLocal(mouseWorld.clone())
            const R = 1.6, R2 = R * R, FORCE = 0.016, SPRING = 0.014, DAMP = 0.87
            for (let i = 0; i < particleCount; i++) {
              const i3 = i * 3
              const dx = positions[i3]     - mouseLocal.x
              const dy = positions[i3 + 1] - mouseLocal.y
              const dz = positions[i3 + 2] - mouseLocal.z
              const d2 = dx * dx + dy * dy + dz * dz
              if (d2 < R2 && d2 > 0.0001) {
                const d = Math.sqrt(d2)
                // particles farther from scene centre get progressively less push
                const ox = originalPositions[i3], oy = originalPositions[i3 + 1], oz = originalPositions[i3 + 2]
                const origR = Math.sqrt(ox * ox + oy * oy + oz * oz)
                const edgeFade = Math.max(0, 1 - (origR - 2) / 5)
                const f = ((R - d) / R) * FORCE * edgeFade
                velocities[i3]     += (dx / d) * f
                velocities[i3 + 1] += (dy / d) * f
                velocities[i3 + 2] += (dz / d) * f
              }
              velocities[i3]     += (originalPositions[i3]     - positions[i3])     * SPRING
              velocities[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * SPRING
              velocities[i3 + 2] += (originalPositions[i3 + 2] - positions[i3 + 2]) * SPRING
              velocities[i3]     *= DAMP
              velocities[i3 + 1] *= DAMP
              velocities[i3 + 2] *= DAMP
              positions[i3]     += velocities[i3]
              positions[i3 + 1] += velocities[i3 + 1]
              positions[i3 + 2] += velocities[i3 + 2]
            }
            particleGeometry.attributes.position.needsUpdate = true
          }
        } else {
          let anyActive = false
          for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3
            if (Math.abs(velocities[i3]) > 0.0001 || Math.abs(velocities[i3 + 1]) > 0.0001) {
              anyActive = true
              velocities[i3]     += (originalPositions[i3]     - positions[i3])     * 0.014
              velocities[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * 0.014
              velocities[i3 + 2] += (originalPositions[i3 + 2] - positions[i3 + 2]) * 0.014
              velocities[i3]     *= 0.87
              velocities[i3 + 1] *= 0.87
              velocities[i3 + 2] *= 0.87
              positions[i3]     += velocities[i3]
              positions[i3 + 1] += velocities[i3 + 1]
              positions[i3 + 2] += velocities[i3 + 2]
            }
          }
          if (anyActive) particleGeometry.attributes.position.needsUpdate = true
        }
      }
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)
    window.dispatchEvent(new Event('hero-scene-ready'))

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      resizeObserver.disconnect()
      particleGeometry.dispose()
      particles.material.dispose()
      ring.geometry.dispose()
      ;(ring.material as THREE.Material).dispose()
      outerRing.geometry.dispose()
      ;(outerRing.material as THREE.Material).dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [reducedMotion])

  return <div ref={containerRef} className="hero-canvas" />
}
