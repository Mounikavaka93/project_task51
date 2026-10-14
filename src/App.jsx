import { useEffect, useMemo, useState } from 'react'
import { products as catalog } from './data'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Showcase from './components/Showcase'
import Studio from './components/Studio'
import ProductDetail from './components/ProductDetail'
import Craft from './components/Craft'
import CartDrawer from './components/CartDrawer'
import Checkout from './components/Checkout'
import Footer from './components/Footer'

const STORAGE_KEY = 'vela-cart'

function loadCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export default function App() {
  const reduceMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )
  const [booting, setBooting] = useState(!reduceMotion)
  const [cart, setCart] = useState(loadCart)
  const [activeId, setActiveId] = useState(catalog[0].id)
  const [colorIndex, setColorIndex] = useState(0)
  const [size, setSize] = useState(null)
  const [qty, setQty] = useState(1)
  const [filter, setFilter] = useState('All')
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [checkout, setCheckout] = useState(null)
  const [section, setSection] = useState('top')
  const [toast, setToast] = useState(null)
  const [sizeNudge, setSizeNudge] = useState(0)
  const [curtain, setCurtain] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const product = catalog.find((item) => item.id === activeId) || catalog[0]
  const shown = filter === 'All' ? catalog : catalog.filter((item) => item.group === filter)
  const count = cart.reduce((sum, line) => sum + line.qty, 0)

  useEffect(() => {
    if (!booting) return undefined
    const timer = window.setTimeout(() => setBooting(false), 1500)
    return () => window.clearTimeout(timer)
  }, [booting])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    document.body.style.overflow = cartOpen || checkout || menuOpen || detailsOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [cartOpen, checkout, menuOpen, detailsOpen])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== 'Escape') return
      setCartOpen(false)
      setCheckout(null)
      setMenuOpen(false)
      setDetailsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 2600)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    const ids = ['top', 'shop', 'studio', 'craft', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -48% 0px', threshold: 0.01 },
    )
    ids.forEach((id) => {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16 },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [filter])

  function goTo(id) {
    if (curtain) return
    setMenuOpen(false)
    setCurtain(true)
    window.setTimeout(() => {
      if (id === 'top') window.scrollTo({ top: 0, behavior: 'auto' })
      else document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' })
    }, 420)
    window.setTimeout(() => setCurtain(false), 980)
  }

  function openDetails(id) {
    if (id !== activeId) {
      setActiveId(id)
      setColorIndex(0)
      setSize(null)
      setQty(1)
    }
    setMenuOpen(false)
    setDetailsOpen(true)
  }

  function addLine(item, chosenSize, chosenQty, chosenColor) {
    if (!chosenSize) {
      setSizeNudge((value) => value + 1)
      setToast({ kind: 'warn', text: 'Select a size to continue.' })
      return false
    }
    const key = `${item.id}-${chosenColor.name}-${chosenSize}`
    setCart((lines) => {
      const found = lines.find((line) => line.key === key)
      if (found) {
        return lines.map((line) => (line.key === key ? { ...line, qty: Math.min(8, line.qty + chosenQty) } : line))
      }
      return [
        ...lines,
        {
          key,
          id: item.id,
          name: item.name,
          price: item.price,
          qty: chosenQty,
          size: chosenSize,
          colorName: chosenColor.name,
          palette: chosenColor,
          image: chosenColor.image,
          style: item.style,
        },
      ]
    })
    return true
  }

  function addFromCard(item, chosenSize) {
    const ok = addLine(item, chosenSize, 1, item.colors[0])
    if (ok) setCartOpen(true)
  }

  function addFromStudio() {
    const ok = addLine(product, size, qty, product.colors[colorIndex])
    if (ok) {
      setDetailsOpen(false)
      setCartOpen(true)
    }
  }

  function buyFromStudio() {
    if (!size) {
      setSizeNudge((value) => value + 1)
      setToast({ kind: 'warn', text: 'Select a size to continue.' })
      return
    }
    setDetailsOpen(false)
    const color = product.colors[colorIndex]
    setCheckout({
      source: 'now',
      lines: [
        {
          key: `${product.id}-${color.name}-${size}`,
          id: product.id,
          name: product.name,
          price: product.price,
          qty,
          size,
          colorName: color.name,
          palette: color,
          image: color.image,
          style: product.style,
        },
      ],
    })
  }

  function setLineQty(key, nextQty) {
    setCart((lines) => lines.flatMap((line) => (line.key === key ? (nextQty <= 0 ? [] : [{ ...line, qty: nextQty }]) : [line])))
  }

  return (
    <div className={booting ? 'app booting' : 'app ready'}>
      <a className="skip" href="#shop">
        Skip to products
      </a>
      <Navbar
        count={count}
        section={section}
        menuOpen={menuOpen}
        onMenu={setMenuOpen}
        onNavigate={goTo}
        onCart={() => setCartOpen(true)}
        onSearchPick={openDetails}
      />
      <main>
        <Hero product={product} colorIndex={colorIndex} onColor={setColorIndex} onNavigate={goTo} />
        <Showcase
          products={shown}
          activeId={activeId}
          filter={filter}
          onFilter={setFilter}
          onSelect={openDetails}
          onAdd={addFromCard}
        />
        <Studio
          product={product}
          colorIndex={colorIndex}
          onColor={setColorIndex}
          size={size}
          onSize={setSize}
          qty={qty}
          onQty={setQty}
          onAdd={addFromStudio}
          onBuy={buyFromStudio}
          sizeNudge={sizeNudge}
        />
        <Craft onSelect={openDetails} />
      </main>
      <Footer onNavigate={goTo} />

      <ProductDetail
        open={detailsOpen}
        product={product}
        colorIndex={colorIndex}
        onColor={setColorIndex}
        size={size}
        onSize={setSize}
        qty={qty}
        onQty={setQty}
        onAdd={addFromStudio}
        onBuy={buyFromStudio}
        sizeNudge={sizeNudge}
        onClose={() => setDetailsOpen(false)}
      />
      <CartDrawer
        open={cartOpen}
        lines={cart}
        onClose={() => setCartOpen(false)}
        onQty={setLineQty}
        onRemove={(key) => setLineQty(key, 0)}
        onBrowse={() => goTo('shop')}
        onCheckout={() => {
          if (!cart.length) return
          setCartOpen(false)
          setCheckout({ source: 'cart', lines: cart })
        }}
      />
      <Checkout
        order={checkout}
        onClose={() => setCheckout(null)}
        onPlaced={() => {
          if (checkout?.source === 'cart') setCart([])
          setToast({ kind: 'ok', text: 'Order reserved in this preview.' })
        }}
      />

      {curtain && <div className="curtain" />}
      {booting && (
        <div className="boot" aria-hidden="true">
          <div>
            <p>Studio</p>
            <strong>VELA</strong>
            <div className="boot-bar">
              <span />
            </div>
          </div>
        </div>
      )}
      {toast && (
        <div className={toast.kind === 'warn' ? 'toast warn' : 'toast'} role="status">
          {toast.text}
        </div>
      )}
    </div>
  )
}
