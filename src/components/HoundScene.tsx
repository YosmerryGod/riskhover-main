import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const REST_ROTATION = { x: 0.025, y: -Math.PI / 2 - 0.08 }

function disposeModel(root: THREE.Object3D) {
  const geometries = new Set<THREE.BufferGeometry>()
  const materials = new Set<THREE.Material>()
  const textures = new Set<THREE.Texture>()

  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return
    geometries.add(object.geometry)
    const meshMaterials = Array.isArray(object.material) ? object.material : [object.material]
    meshMaterials.forEach((material) => materials.add(material))
  })

  materials.forEach((material) => {
    Object.values(material).forEach((value) => {
      if (value instanceof THREE.Texture) textures.add(value)
    })
  })

  textures.forEach((texture) => texture.dispose())
  materials.forEach((material) => material.dispose())
  geometries.forEach((geometry) => geometry.dispose())
}

export default function HoundScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let disposed = false
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
    } catch {
      queueMicrotask(() => {
        if (!disposed) setStatus('error')
      })
      return () => {
        disposed = true
      }
    }

    let frame = 0
    let inView = true
    let modelGroup: THREE.Group | null = null
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const targetRotation = { ...REST_ROTATION }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.domElement.setAttribute('aria-hidden', 'true')
    renderer.domElement.dataset.houndCanvas = 'true'
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
    camera.position.set(0, 0.04, 4.4)

    const ambient = new THREE.HemisphereLight(0xf4ffdf, 0x10182a, 1.8)
    const key = new THREE.DirectionalLight(0xffffff, 3.1)
    key.position.set(-3.5, 4.5, 5)
    const fill = new THREE.DirectionalLight(0xc8ff4d, 1.05)
    fill.position.set(4, 0.5, 3)
    const rim = new THREE.DirectionalLight(0xe9ffba, 1.8)
    rim.position.set(0, 3, -4)
    scene.add(ambient, key, fill, rim)

    const render = () => {
      if (disposed) return
      renderer.render(scene, camera)
      if (modelGroup) {
        renderer.domElement.dataset.rotationX = modelGroup.rotation.x.toFixed(4)
        renderer.domElement.dataset.rotationY = modelGroup.rotation.y.toFixed(4)
        renderer.domElement.dataset.triangles = String(renderer.info.render.triangles)
        renderer.domElement.dataset.drawCalls = String(renderer.info.render.calls)
      }
    }

    const tick = () => {
      frame = 0
      if (disposed || motionQuery.matches || !inView) return
      if (modelGroup) {
        modelGroup.rotation.x = THREE.MathUtils.lerp(modelGroup.rotation.x, targetRotation.x, 0.085)
        modelGroup.rotation.y = THREE.MathUtils.lerp(modelGroup.rotation.y, targetRotation.y, 0.085)
      }
      render()
      frame = window.requestAnimationFrame(tick)
    }

    const start = () => {
      if (!frame && !disposed && inView && !motionQuery.matches) {
        frame = window.requestAnimationFrame(tick)
      }
    }

    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      if (!width || !height) return
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      render()
    }

    const resetRotation = () => {
      targetRotation.x = REST_ROTATION.x
      targetRotation.y = REST_ROTATION.y
      if (motionQuery.matches && modelGroup) {
        modelGroup.rotation.x = REST_ROTATION.x
        modelGroup.rotation.y = REST_ROTATION.y
        render()
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || motionQuery.matches) return
      const rect = container.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      targetRotation.y = REST_ROTATION.y + x * 0.68
      targetRotation.x = REST_ROTATION.x + y * 0.38
      start()
    }

    const onPointerLeave = () => {
      resetRotation()
      start()
    }

    const onMotionChange = () => {
      resetRotation()
      if (motionQuery.matches) {
        window.cancelAnimationFrame(frame)
        frame = 0
        render()
      } else {
        start()
      }
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (inView) {
        resize()
        start()
      } else {
        window.cancelAnimationFrame(frame)
        frame = 0
      }
    })
    intersectionObserver.observe(container)

    container.addEventListener('pointermove', onPointerMove, { passive: true })
    container.addEventListener('pointerleave', onPointerLeave)
    motionQuery.addEventListener('change', onMotionChange)

    const loader = new GLTFLoader()
    loader.load(
      '/riskrover-hound.glb',
      (gltf) => {
        if (disposed) {
          disposeModel(gltf.scene)
          return
        }

        const model = gltf.scene
        const bounds = new THREE.Box3().setFromObject(model)
        const center = bounds.getCenter(new THREE.Vector3())
        const size = bounds.getSize(new THREE.Vector3())
        const largestDimension = Math.max(size.x, size.y, size.z)
        if (!Number.isFinite(largestDimension) || largestDimension <= 0) {
          disposeModel(model)
          setStatus('error')
          return
        }

        model.position.sub(center)
        model.scale.setScalar(2.35 / largestDimension)
        modelGroup = new THREE.Group()
        modelGroup.rotation.set(REST_ROTATION.x, REST_ROTATION.y, 0)
        modelGroup.add(model)
        scene.add(modelGroup)
        setStatus('ready')
        resize()
        start()
      },
      undefined,
      () => {
        if (!disposed) setStatus('error')
      },
    )

    resize()
    start()

    return () => {
      disposed = true
      window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerleave', onPointerLeave)
      motionQuery.removeEventListener('change', onMotionChange)
      if (modelGroup) {
        scene.remove(modelGroup)
        disposeModel(modelGroup)
      }
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      className={`hound-webgl is-${status}`}
      ref={containerRef}
      role="img"
      aria-label="A three-dimensional lime-green RiskRover hound with dark ears, glossy eyes, and a radar nose"
    >
      <span className="hound-shadow" aria-hidden="true" />
      <img className="hound-fallback" src="/riskrover-hound.svg" alt="" aria-hidden="true" />
    </div>
  )
}
