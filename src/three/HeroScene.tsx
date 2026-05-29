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
    const c1 = new THREE.Color(0xf59e0b)
    const c2 = new THREE.Color(0xfbbf24)

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

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.7, 2),
      new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        wireframe: true,
        transparent: true,
        opacity: 0.9,
      }),
    )
    scene.add(core)

    const innerGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 32, 32),
      new THREE.MeshBasicMaterial({
        color: 0xd97706,
        transparent: true,
        opacity: 0.2,
      }),
    )
    scene.add(innerGlow)

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.6, 0.04, 16, 100),
      new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        transparent: true,
        opacity: 0.6,
      }),
    )
    ring.rotation.x = Math.PI / 3
    scene.add(ring)

    const outerRing = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.35, 0.2, 128, 20),
      new THREE.MeshBasicMaterial({
        color: 0xfde68a,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      }),
    )
    scene.add(outerRing)

    const mouse = { x: 0, y: 0 }
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }
    container.addEventListener('pointermove', onPointerMove)

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
      const speed = reducedMotion ? 0.15 : 1
      particles.rotation.y = t * 0.12 * speed
      particles.rotation.x = t * 0.04 * speed
      core.rotation.y = t * 0.65 * speed
      core.rotation.x = t * 0.3 * speed
      innerGlow.scale.setScalar(1 + Math.sin(t * 2.2) * 0.08)
      ring.rotation.z = t * 0.45 * speed
      ring.rotation.y = t * 0.28 * speed
      outerRing.rotation.x = t * 0.5 * speed
      outerRing.rotation.y = t * 0.7 * speed

      if (!reducedMotion) {
        camera.position.x += (mouse.x * 1 - camera.position.x) * 0.05
        camera.position.y += (mouse.y * 0.6 - camera.position.y) * 0.05
      }
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)
    window.dispatchEvent(new Event('hero-scene-ready'))

    return () => {
      cancelAnimationFrame(frameId)
      container.removeEventListener('pointermove', onPointerMove)
      resizeObserver.disconnect()
      particleGeometry.dispose()
      particles.material.dispose()
      core.geometry.dispose()
      ;(core.material as THREE.Material).dispose()
      innerGlow.geometry.dispose()
      ;(innerGlow.material as THREE.Material).dispose()
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
