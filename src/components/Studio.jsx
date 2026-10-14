import { useState } from 'react'
import { money, sizes } from '../data'
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

export default function Studio({
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
}) {
  const color = product.colors[colorIndex]

  return (
    <section className="studio" id="studio">
      <div className="section-head light">
        <div>
          <p className="eyebrow">
            <i />
            Product studio
          </p>
          <h2>Turn it. Size it. Take it.</h2>
        </div>
      </div>
      <div className="studio-grid">
        <div className="studio-view">
          <ShoeScene product={product} colorIndex={colorIndex} />
          <div className="stage-foot">
            <p>Drag · arrows rotate</p>
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

        <div className="studio-info" key={product.id}>
          <p className="kicker">
            {product.category}
            {product.tag ? ` · ${product.tag}` : ''}
          </p>
          <h3>{product.name}</h3>
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

          <p className="field-label" id="size-label">
            Size <span>US</span>
          </p>
          <div
            key={sizeNudge}
            className={sizeNudge ? 'sizes shake' : 'sizes'}
            role="group"
            aria-labelledby="size-label"
          >
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
              Orders in this preview ship nowhere — the flow is here so you can feel the path. On a live drop, pairs leave the studio in 2–4 days and can come home within 30.
            </Accord>
          </div>
        </div>
      </div>
    </section>
  )
}
