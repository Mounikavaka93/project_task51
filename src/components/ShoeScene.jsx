import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const SLICES = 6
const DEPTH = 0.12
const PLANE = 2.35

function fitTexture(image) {
  const max = 640
  const largest = Math.max(image.width, image.height)
  if (!largest || largest <= max) return image
  const scale = max / largest
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(image.width * scale))
  canvas.height = Math.max(1, Math.round(image.height * scale))
  canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
  return canvas
}

export default function ShoeScene({ product, colorIndex }) {
  const wrapRef = useRef(null)
  const api = useRef({})
  const [live, setLive] = useState(false)
  const [fallback, setFallback] = useState(false)
  const image = product.colors[colorIndex]?.image
  const imageRef = useRef(image)
  imageRef.current = image

  useEffect(() => {
    const node = wrapRef.current
    if (!node) return undefined
    const watcher = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLive(true)
      },
      { rootMargin: '160px' },
    )
    watcher.observe(node)
    return () => watcher.disconnect()
  }, [])

  useEffect(() => {
    if (!live) return undefined
    const container = wrapRef.current
    if (!container) return undefined

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      setFallback(true)
      return undefined
    }
    if (!renderer.getContext()) {
      setFallback(true)
      renderer.dispose()
      return undefined
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 40)
    camera.position.set(0.2, 0.15, 4.5)

    const geo = new THREE.PlaneGeometry(PLANE, PLANE)
    const faceMat = new THREE.MeshBasicMaterial({
      transparent: true,
      alphaTest: 0.08,
      side: THREE.FrontSide,
    })
    const depthMat = new THREE.MeshBasicMaterial({
      transparent: true,
      alphaTest: 0.55,
      side: THREE.DoubleSide,
    })
    const reflectMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.2,
      alphaTest: 0.08,
      depthWrite: false,
      side: THREE.FrontSide,
    })

    const rig = new THREE.Group()
    const pivot = new THREE.Group()
    pivot.visible = false
    rig.add(pivot)
    scene.add(rig)

    const face = new THREE.Mesh(geo, faceMat)
    face.position.z = 0.01
    pivot.add(face)
    for (let i = 0; i < SLICES; i += 1) {
      const slice = new THREE.Mesh(geo, depthMat)
      slice.position.z = -((i + 1) / SLICES) * DEPTH
      pivot.add(slice)
    }
    const back = new THREE.Mesh(geo, faceMat)
    back.position.z = -DEPTH - 0.01
    back.rotation.y = Math.PI
    pivot.add(back)

    const reflect = new THREE.Mesh(geo, reflectMat)
    reflect.name = 'reflect'
    pivot.add(reflect)

    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(0.78, 40),
      new THREE.MeshBasicMaterial({ color: '#000000', transparent: true, opacity: 0.28, depthWrite: false }),
    )
    shadow.rotation.x = -Math.PI / 2
    shadow.position.y = -1.02
    scene.add(shadow)

    const ringMat = new THREE.MeshBasicMaterial({
      color: '#d6ff3f',
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
    })
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.25, 0.007, 8, 80), ringMat)
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(0.86, 0.005, 8, 64), ringMat.clone())
    ringB.material.opacity = 0.28
    scene.add(ring, ringB)

    const loader = new THREE.TextureLoader()
    let token = 0
    let currentTex = null
    let shoeHeight = 1.85
    let rot = -0.4
    let target = -0.4
    let punch = 1
    let dragging = false
    let lock = null
    let startX = 0
    let startY = 0
    let idle = 2
    let visible = true
    let frame = 0
    const pointer = { x: 0, y: 0 }
    let lastScroll = window.scrollY

    const applyTexture = (source) => {
      const tex = new THREE.CanvasTexture(fitTexture(source.image))
      tex.colorSpace = THREE.SRGBColorSpace
      tex.anisotropy = 4
      tex.generateMipmaps = true
      source.dispose()
      const aspect = tex.image.width / tex.image.height
      shoeHeight = 1.8
      const shoeWidth = shoeHeight * aspect
      const sx = shoeWidth / PLANE
      const sy = shoeHeight / PLANE
      pivot.visible = true
      pivot.children.forEach((child) => {
        if (child.name === 'reflect') {
          child.scale.set(sx, -sy * 0.42, 1)
          child.position.y = -shoeHeight * 0.78
        } else {
          child.scale.set(sx, sy, 1)
        }
      })
      shadow.position.y = -shoeHeight / 2 - 0.04
      faceMat.map = tex
      depthMat.map = tex
      reflectMat.map = tex
      faceMat.needsUpdate = true
      depthMat.needsUpdate = true
      reflectMat.needsUpdate = true
      if (currentTex) currentTex.dispose()
      currentTex = tex
    }

    const setImage = (url, spin) => {
      if (!url) return
      const mine = ++token
      loader.load(
        url,
        (tex) => {
          if (mine !== token) {
            tex.dispose()
            return
          }
          applyTexture(tex)
          if (spin) {
            target += Math.PI * 0.65
            punch = 1.08
          }
        },
        undefined,
        () => {
          if (mine === token) setFallback(true)
        },
      )
    }

    api.current.setImage = setImage
    setImage(imageRef.current, false)
    container.tabIndex = 0
    container.setAttribute('role', 'img')
    container.setAttribute('aria-label', '3D product photo. Drag or use the arrow keys to spin it.')

    const resize = () => {
      const w = container.clientWidth || 1
      const h = container.clientHeight || 1
      renderer.setSize(w, h, false)
      camera.aspect = w / Math.max(h, 1)
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(container)

    const onKey = (event) => {
      if (event.key === 'ArrowLeft') target -= 0.45
      if (event.key === 'ArrowRight') target += 0.45
      idle = 0
    }
    const onDown = (event) => {
      dragging = true
      lock = null
      idle = 0
      startX = event.clientX
      startY = event.clientY
    }
    const onMove = (event) => {
      const rect = container.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = ((event.clientY - rect.top) / rect.height) * 2 - 1
      if (!dragging) return
      const dx = event.clientX - startX
      const dy = event.clientY - startY
      if (!lock) {
        if (Math.hypot(dx, dy) < 5) return
        lock = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
        if (lock === 'y') {
          dragging = false
          return
        }
      }
      if (lock === 'x') {
        target += dx * 0.012
        startX = event.clientX
        idle = 0
      }
    }
    const onUp = () => {
      dragging = false
      lock = null
    }
    const onScroll = () => {
      const y = window.scrollY
      target += (y - lastScroll) * 0.0016
      lastScroll = y
    }

    container.addEventListener('keydown', onKey)
    container.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('scroll', onScroll, { passive: true })

    const clock = new THREE.Clock()
    const tick = () => {
      frame = requestAnimationFrame(tick)
      if (!visible) return
      const t = clock.getElapsedTime()
      if (!dragging && !reduce) idle += 0.016
      rot += (target - rot) * 0.08
      punch += (1 - punch) * 0.08
      const sway = reduce || dragging || idle < 0.4 ? 0 : Math.sin(t * 0.55) * 0.42
      const nod = reduce ? 0 : Math.sin(t * 0.85) * 0.1 + pointer.y * -0.16
      rig.rotation.y = rot + sway
      rig.rotation.x = nod
      rig.rotation.z = reduce ? 0 : Math.sin(t * 0.4) * 0.045
      rig.position.x = reduce ? 0 : Math.cos(t * 0.45) * 0.07 + pointer.x * 0.04
      rig.position.y = reduce ? 0 : Math.sin(t * 1.15) * 0.07
      rig.scale.setScalar(punch)
      ring.rotation.x = Math.PI / 2.6
      ring.rotation.z = t * 0.35
      ring.rotation.y = Math.sin(t * 0.3) * 0.4
      ringB.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.35
      ringB.rotation.z = -t * 0.55
      const lift = rig.position.y
      shadow.position.y = -shoeHeight / 2 - 0.04
      shadow.scale.set(0.7 * (1 - lift * 0.4), 0.2, 1)
      shadow.material.opacity = 0.22 + Math.abs(lift)
      camera.position.x += (0.2 + pointer.x * 0.35 - camera.position.x) * 0.06
      camera.position.y += (0.18 + pointer.y * -0.12 - camera.position.y) * 0.06
      camera.lookAt(0, 0.02, 0)
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(frame)
      api.current.setImage = null
      ro.disconnect()
      io.disconnect()
      container.removeEventListener('keydown', onKey)
      container.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('scroll', onScroll)
      geo.dispose()
      faceMat.dispose()
      depthMat.dispose()
      reflectMat.dispose()
      ring.geometry.dispose()
      ringB.geometry.dispose()
      ringMat.dispose()
      ringB.material.dispose()
      shadow.geometry.dispose()
      shadow.material.dispose()
      if (currentTex) currentTex.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement)
    }
  }, [live])

  const skipSpin = useRef(true)
  useEffect(() => {
    if (skipSpin.current) {
      skipSpin.current = false
      return
    }
    api.current.setImage?.(image, true)
  }, [image])

  if (fallback) {
    return (
      <div className="shoe-scene is-fallback">
        <img src={image} alt={`${product.name}, ${product.colors[colorIndex]?.name || ''}`} />
      </div>
    )
  }

  return (
    <div ref={wrapRef} className="shoe-scene">
      {!live && <img className="stage-poster" src={image} alt="" />}
    </div>
  )
}
