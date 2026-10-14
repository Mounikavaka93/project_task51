import { useEffect, useState } from 'react'
import { money, sizes } from '../data'
import { CloseIcon } from '../icons'
import ShoeScene from './ShoeScene'

function Accord({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={open ? 'accord open' : 'accord'}>
      <button aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {title}
        <span>{open ? '–' : '+'}</span>
      </button>
      {open && <div className="accord-body">{children}</div>}
    </div>
  )
}

export default function ProductDetail({
  open,
  product,
  colorIndex,
  onColor,
  size,
  onSize,
  qty,
  onQty,
  onAdd,
  onBuy,
  sizeNudge,
  onClose,
}) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open || !product) return null

  const color = product.colors[colorIndex]

  return (
    <div className="detail-root" role="presentation">
      <button className="detail-backdrop" aria-label="Close product details" onClick={onClose} />
      <div className="detail-panel" role="dialog" aria-modal="true" aria-label={`${product.name} details`}>
        <button className="icon-btn detail-close" onClick={onClose} aria-label="Close product details">
          <CloseIcon />
        </button>
        <div className="detail-stage">
          <ShoeScene product={product} colorIndex={colorIndex} />
          <div className="stage-foot">
            <p>Drag to spin</p>
            <div className="swatches" role="group" aria-label={`${product.name} colors`}>
              {product.colors.map((swatch, index) => (
                <button
                  key={swatch.name}
                  className="swatch"
                  style={{ background: swatch.upper }}
                  aria-label={swatch.name}
                  aria-pressed={index === colorIndex}
                  onClick={() => onColor(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="detail-copy" key={product.id}>
          <p className="kicker">
            {product.category}
            {product.tag ? ` · ${product.tag}` : ''}
          </p>
          <h2>{product.name}</h2>
          <p className="price">{money(product.price)}</p>
          <p className="desc">{product.description}</p>
          <dl className="specs">
            <div>
              <dt>Weight</dt>
              <dd>{product.weight}</dd>
            </div>
            <div>
              <dt>Drop</dt>
              <dd>{product.drop}</dd>
            </div>
            <div>
              <dt>Surface</dt>
              <dd>{product.surface}</dd>
            </div>
          </dl>
          <p className="field-label">
            Color <span>{color.name}</span>
          </p>
          <div className="color-names">
            {product.colors.map((swatch, index) => (
              <button key={swatch.name} className={index === colorIndex ? 'is-on' : ''} onClick={() => onColor(index)}>
                <i style={{ background: swatch.upper }} />
                {swatch.name}
              </button>
            ))}
          </div>
          <p className="field-label" id="detail-size-label">
            Size <span>US</span>
          </p>
          <div key={sizeNudge} className={sizeNudge ? 'sizes shake' : 'sizes'} role="group" aria-labelledby="detail-size-label">
            {sizes.map((item) => (
              <button key={item} aria-pressed={size === item} onClick={() => onSize(item)}>
                {item}
              </button>
            ))}
          </div>
          <div className="qty-row">
            <span>Quantity</span>
            <div className="stepper">
              <button aria-label="Decrease quantity" onClick={() => onQty(Math.max(1, qty - 1))}>
                –
              </button>
              <b>{qty}</b>
              <button aria-label="Increase quantity" onClick={() => onQty(Math.min(8, qty + 1))}>
                +
              </button>
            </div>
          </div>
          <div className="buy-row">
            <button className="btn solid" onClick={onAdd}>
              Add to cart
            </button>
            <button className="btn ghost" onClick={onBuy}>
              Buy now
            </button>
          </div>
          <p className="fine">Complimentary shipping over $150. Home trial for 30 days.</p>
          <div className="accords">
            <Accord title="Materials">
              <ul>
                {product.materials.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Accord>
            <Accord title="Fit notes">{product.fit}</Accord>
            <Accord title="Shipping & returns">
              Pairs in this preview leave the studio in 2–4 days on a live drop, and can come home within 30 days.
            </Accord>
          </div>
        </div>
      </div>
    </div>
  )
}
