import { useEffect, useState } from 'react'
import { money, products } from '../data'
import { BagIcon, CloseIcon, Mark, MenuIcon, SearchIcon } from '../icons'

const LINKS = [
  { id: 'shop', label: 'Shop' },
  { id: 'studio', label: 'Studio' },
  { id: 'craft', label: 'Craft' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ count, section, menuOpen, onMenu, onNavigate, onCart, onSearchPick }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!searchOpen) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setSearchOpen(false)
    }
    const onPointer = (event) => {
      if (!event.target.closest('.search') && !event.target.closest('.search-btn')) setSearchOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [searchOpen])

  const results = products.filter((product) => {
    const hay = `${product.name} ${product.category} ${product.blurb}`.toLowerCase()
    return hay.includes(query.trim().toLowerCase())
  })

  return (
    <header className="nav">
      <button className="logo" onClick={() => onNavigate('top')}>
        <Mark />
        <span>VELA</span>
      </button>

      <nav className="nav-links" aria-label="Primary">
        {LINKS.map((link) => (
          <button
            key={link.id}
            className="nav-link"
            aria-current={section === link.id ? 'page' : undefined}
            onClick={() => onNavigate(link.id)}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <div className="nav-tools">
        <button
          className="icon-btn search-btn"
          aria-expanded={searchOpen}
          aria-label="Search shoes"
          onClick={() => setSearchOpen((open) => !open)}
        >
          <SearchIcon />
        </button>
        <button className="icon-btn cart-btn" onClick={onCart} aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}>
          <BagIcon />
          {count > 0 && (
            <span className="badge" key={count}>
              {count}
            </span>
          )}
        </button>
        <button
          className="icon-btn menu-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => onMenu(!menuOpen)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {searchOpen && (
          <div className="search" role="dialog" aria-label="Search shoes">
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search silhouettes"
              aria-label="Search silhouettes"
            />
            <ul>
              {results.map((product) => (
                <li key={product.id}>
                  <button
                    onClick={() => {
                      setSearchOpen(false)
                      setQuery('')
                      onSearchPick(product.id)
                    }}
                  >
                    <span>{product.category}</span>
                    <strong>{product.name}</strong>
                    <em>{money(product.price)}</em>
                  </button>
                </li>
              ))}
              {results.length === 0 && <li className="search-empty">Nothing under that name.</li>}
            </ul>
          </div>
        )}
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {LINKS.map((link) => (
            <button key={link.id} onClick={() => onNavigate(link.id)}>
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
