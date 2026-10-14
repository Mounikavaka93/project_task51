import { money, shippingFor } from '../data'
import { CloseIcon } from '../icons'

export default function CartDrawer({ open, lines, onClose, onQty, onRemove, onCheckout, onBrowse }) {
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.qty, 0)
  const shipping = shippingFor(subtotal)
  const total = subtotal + shipping

  return (
    <div className={open ? 'drawer-root open' : 'drawer-root'} aria-hidden={!open}>
      <button className="backdrop" aria-label="Close cart" onClick={onClose} tabIndex={open ? 0 : -1} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Your cart">
        <header>
          <h2>Cart</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close cart">
            <CloseIcon />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="empty-cart">
            <p>Nothing in the bag yet.</p>
            <button
              className="btn solid"
              onClick={() => {
                onClose()
                onBrowse()
              }}
            >
              Browse the drop
            </button>
          </div>
        ) : (
          <>
            <ul className="lines">
              {lines.map((line) => (
                <li key={line.key}>
                  <div className="line-art">
                    {line.image && (
                      <img
                        src={line.image}
                        alt=""
                        onError={(event) => {
                          const img = event.currentTarget
                          if (img.dataset.fallback) return
                          img.dataset.fallback = '1'
                          img.src = line.image.replace('.png?v=3', '.jpg').replace('.png', '.jpg')
                        }}
                      />
                    )}
                  </div>
                  <div className="line-copy">
                    <strong>{line.name}</strong>
                    <span>
                      {line.colorName} · US {line.size}
                    </span>
                    <div className="line-actions">
                      <div className="stepper">
                        <button aria-label={`Decrease ${line.name}`} onClick={() => onQty(line.key, line.qty - 1)}>
                          –
                        </button>
                        <b>{line.qty}</b>
                        <button aria-label={`Increase ${line.name}`} onClick={() => onQty(line.key, Math.min(8, line.qty + 1))}>
                          +
                        </button>
                      </div>
                      <button className="text-btn" onClick={() => onRemove(line.key)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <em>{money(line.price * line.qty)}</em>
                </li>
              ))}
            </ul>
            <footer>
              <div>
                <span>Subtotal</span>
                <b>{money(subtotal)}</b>
              </div>
              <div>
                <span>Shipping</span>
                <b>{shipping === 0 ? 'Free' : money(shipping)}</b>
              </div>
              <div className="total">
                <span>Total</span>
                <b>{money(total)}</b>
              </div>
              <button className="btn solid wide" onClick={onCheckout}>
                Checkout
              </button>
              <p>Preview checkout. No payment is taken.</p>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
