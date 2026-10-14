import { useEffect, useState } from 'react'
import { filters, money, sizes } from '../data'

export default function Showcase({ products, activeId, filter, onFilter, onSelect, onAdd }) {
  const [picker, setPicker] = useState(null)
  const fine = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

  useEffect(() => {
    if (!picker) return undefined
    const close = (event) => {
      if (!event.target.closest('.picker') && !event.target.closest('.add-btn')) setPicker(null)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [picker])

  const tilt = (event) => {
    if (!fine) return
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 12}deg) translateY(-8px)`
    const photo = card.querySelector('img')
    if (photo) photo.style.transform = `translateZ(36px) rotateY(${x * -18}deg) rotateX(${y * 8}deg) translateY(${-8 - y * 10}px)`
  }

  return (
    <section className="shop" id="shop">
      <div className="section-head">
        <div>
          <p className="eyebrow dark">
            <i />
            The lineup
          </p>
          <h2>Six ways to move.</h2>
        </div>
        <div className="filters" role="tablist" aria-label="Filter by surface">
          {filters.map((item) => (
            <button
              key={item}
              role="tab"
              aria-selected={filter === item}
              className={filter === item ? 'is-on' : ''}
              onClick={() => onFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid">
        {products.map((product, index) => {
          const color = product.colors[0]
          return (
            <article
              key={product.id}
              className={product.id === activeId ? 'card is-active reveal' : 'card reveal'}
              style={{ transitionDelay: `${index * 60}ms` }}
              onMouseMove={tilt}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = ''
                const photo = event.currentTarget.querySelector('img')
                if (photo) photo.style.transform = ''
              }}
            >
              <button className="card-visual" onClick={() => onSelect(product.id)}>
                <span className="glare" />
                {product.tag && <span className="tag">{product.tag}</span>}
                <img
                  src={color.image}
                  alt={`${product.name} in ${color.name}`}
                  onError={(event) => {
                    const img = event.currentTarget
                    if (img.dataset.fallback) return
                    img.dataset.fallback = '1'
                    img.src = color.image.replace('.png?v=3', '.jpg')
                  }}
                />
              </button>
              <div className="card-meta">
                <button className="card-name" onClick={() => onSelect(product.id)}>
                  <span>{product.category}</span>
                  <strong>{product.name}</strong>
                </button>
                <p>{product.blurb}</p>
                <div className="card-row">
                  <b>{money(product.price)}</b>
                  <button
                    className="add-btn"
                    aria-expanded={picker === product.id}
                    onClick={() => setPicker((current) => (current === product.id ? null : product.id))}
                  >
                    Add
                  </button>
                </div>
                {picker === product.id && (
                  <div className="picker" role="group" aria-label={`Size for ${product.name}`}>
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          onAdd(product, size)
                          setPicker(null)
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
