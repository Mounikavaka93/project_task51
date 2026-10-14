import { money } from '../data'
import ShoeScene from './ShoeScene'

const TICKER = [
  'Engineered mesh',
  'Nitrogen foam',
  'Mapped rubber',
  'Studio last',
  'Home trial',
  'Ships in 2–4 days',
  'Six silhouettes',
]

export default function Hero({ product, colorIndex, onColor, onNavigate }) {
  const color = product.colors[colorIndex]

  return (
    <>
      <section className="hero" id="top">
        <p className="hero-rail">SS26 — Motion study</p>
        <div className="hero-copy">
          <p className="eyebrow">
            <i />
            The spring drop
          </p>
          <h1>
            Light on
            <br />
            the <em>last.</em>
          </h1>
          <p className="lede">
            Six silhouettes, cut in studio and walked until the foam goes quiet. Drag the shoe. Change the color. Keep the one that fits the day.
          </p>
          <div className="cta-row">
            <button className="btn solid" onClick={() => onNavigate('shop')}>
              Shop the drop
            </button>
            <button className="btn ghost" onClick={() => onNavigate('studio')}>
              View in studio
            </button>
          </div>
          <ul className="stats">
            <li>
              <strong>248 g</strong>
              <span>Lightest pair</span>
            </li>
            <li>
              <strong>06</strong>
              <span>Silhouettes</span>
            </li>
            <li>
              <strong>30 days</strong>
              <span>Home trial</span>
            </li>
          </ul>
        </div>

        <div className="stage">
          <ShoeScene product={product} colorIndex={colorIndex} />
          <div className="stage-ui">
            <div>
              <p>{product.category}</p>
              <strong>{product.name}</strong>
            </div>
            <div className="stage-price">
              <span>{color.name}</span>
              <strong>{money(product.price)}</strong>
            </div>
          </div>
          <div className="stage-foot">
            <p>Drag to rotate</p>
            <div className="swatches" role="group" aria-label="Colorways">
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
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...TICKER, ...TICKER].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}
              <i />
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
