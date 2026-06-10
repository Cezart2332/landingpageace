import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useReducedMotion } from '../hooks/useReducedMotion'

const VORTEX_PARTICLES = 2200
const AMBIENT_PARTICLES = 1600
const SCENE_BASE = { x: -1.05, y: 0.55, z: 6 }
const PARALLAX = { x: 0.22, y: 0.14 }

function fillSphere(count: number, minR: number, maxR: number) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const c1 = new THREE.Color(0x2563eb)
  const c2 = new THREE.Color(0x60a5fa)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const radius = minR + Math.random() * (maxR - minR)
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i3 + 2] = radius * Math.cos(phi)
    const col = c1.clone().lerp(c2, Math.random())
    colors[i3] = col.r
    colors[i3 + 1] = col.g
    colors[i3 + 2] = col.b
  }

  return { positions, colors }
}

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x09090e, 0.026)

    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100)
    camera.position.set(SCENE_BASE.x, SCENE_BASE.y, SCENE_BASE.z)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const ambient = new THREE.Group()
    scene.add(ambient)

    const ambientData = fillSphere(AMBIENT_PARTICLES, 3, 12)
    const ambientGeometry = new THREE.BufferGeometry()
    ambientGeometry.setAttribute('position', new THREE.BufferAttribute(ambientData.positions, 3))
    ambientGeometry.setAttribute('color', new THREE.BufferAttribute(ambientData.colors, 3))
    const ambientParticles = new THREE.Points(
      ambientGeometry,
      new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    )
    ambient.add(ambientParticles)

    const vortex = new THREE.Group()
    scene.add(vortex)

    const vortexData = fillSphere(VORTEX_PARTICLES, 2, 5)
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(vortexData.positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(vortexData.colors, 3))

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
    vortex.add(particles)

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.6, 0.04, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x2563eb, transparent: true, opacity: 0.6 }),
    )
    ring.rotation.x = Math.PI / 3
    vortex.add(ring)

    const outerRing = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.35, 0.2, 128, 20),
      new THREE.MeshBasicMaterial({
        color: 0x93c5fd,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      }),
    )
    vortex.add(outerRing)

    const vortexCenter = new THREE.Vector3(0, 0, 0)
    const pointer = { x: 0, y: 0 }

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

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

      ambient.rotation.y = t * 0.06 * speed
      ambient.rotation.x = t * 0.02 * speed
      vortex.rotation.y = t * 0.12 * speed
      vortex.rotation.x = t * 0.04 * speed
      ring.rotation.z = t * 0.45 * speed
      ring.rotation.y = t * 0.28 * speed
      outerRing.rotation.x = t * 0.5 * speed
      outerRing.rotation.y = t * 0.7 * speed

      if (!reducedMotion) {
        const targetX = SCENE_BASE.x + pointer.x * PARALLAX.x
        const targetY = SCENE_BASE.y + pointer.y * PARALLAX.y
        camera.position.x += (targetX - camera.position.x) * 0.05
        camera.position.y += (targetY - camera.position.y) * 0.05
        camera.position.z = SCENE_BASE.z
      }

      camera.lookAt(vortexCenter)
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)
    window.dispatchEvent(new Event('hero-scene-ready'))

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', onPointerMove)
      resizeObserver.disconnect()
      ambientGeometry.dispose()
      ambientParticles.material.dispose()
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

  return <div ref={containerRef} className="hero-canvas" aria-hidden="true" />
}
