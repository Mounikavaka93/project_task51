import { useEffect, useState } from 'react'
import { money, shippingFor } from '../data'
import { CloseIcon } from '../icons'

const METHODS = [
  { id: 'card', label: 'Card', note: 'Visa, Mastercard' },
  { id: 'wallet', label: 'Wallet', note: 'Apple or Google' },
  { id: 'later', label: 'Pay later', note: 'Four short parts' },
]

const EMPTY = { name: '', email: '', address: '', city: '', postal: '', method: 'card' }

export default function Checkout({ order, onClose, onPlaced }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(null)

  useEffect(() => {
    if (!order) return undefined
    setForm(EMPTY)
    setErrors({})
    setDone(null)
    const frame = requestAnimationFrame(() => {
      document.getElementById('checkout-name')?.focus()
    })
    return () => cancelAnimationFrame(frame)
  }, [order])

  if (!order) return null

  const subtotal = order.lines.reduce((sum, line) => sum + line.price * line.qty, 0)
  const shipping = shippingFor(subtotal)
  const total = subtotal + shipping

  const set = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }))

  const submit = (event) => {
    event.preventDefault()
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Add the name for the label.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Use a real email shape.'
    if (form.address.trim().length < 4) next.address = 'Add a street address.'
    if (form.city.trim().length < 2) next.city = 'Add a city.'
    if (form.postal.trim().length < 3) next.postal = 'Add a postal code.'
    setErrors(next)
    if (Object.keys(next).length) return
    const code = `VELA-${Math.floor(10000 + Math.random() * 89999)}`
    onPlaced()
    setDone(code)
  }

  return (
    <div className="checkout" onMouseDown={onClose}>
      <div
        className="checkout-panel"
        role="dialog"
        aria-modal="true"
        aria-label={done ? 'Order confirmed' : 'Checkout'}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="icon-btn checkout-x" onClick={onClose} aria-label="Close checkout">
          <CloseIcon />
        </button>

        {done ? (
          <div className="success">
            <span className="check" aria-hidden="true" />
            <p className="eyebrow dark">
              <i />
              Order reserved
            </p>
            <h3>You’re set, {form.name.split(' ')[0] || 'friend'}.</h3>
            <p>
              <strong>{done}</strong> is held in this preview. Nothing was charged and nothing will ship — the studio path ends here.
            </p>
            <button className="btn solid" onClick={onClose}>
              Keep browsing
            </button>
          </div>
        ) : (
          <>
            <aside className="checkout-summary">
              <p className="eyebrow">
                <i />
                Your pair
              </p>
              <ul>
                {order.lines.map((line) => (
                  <li key={line.key}>
                    <div>
                      <strong>{line.name}</strong>
                      <span>
                        {line.colorName} · US {line.size} · ×{line.qty}
                      </span>
                    </div>
                    <b>{money(line.price * line.qty)}</b>
                  </li>
                ))}
              </ul>
              <div className="sum-row">
                <span>Shipping</span>
                <b>{shipping === 0 ? 'Free' : money(shipping)}</b>
              </div>
              <div className="sum-row total">
                <span>Total</span>
                <b>{money(total)}</b>
              </div>
            </aside>

            <form className="checkout-form" onSubmit={submit} noValidate>
              <h3>Buy now</h3>
              <p className="fine dark">Demo checkout. We don’t process a payment or store a card.</p>
              <label>
                Full name
                <input id="checkout-name" value={form.name} onChange={set('name')} autoComplete="name" />
                {errors.name && <small>{errors.name}</small>}
              </label>
              <label>
                Email
                <input value={form.email} onChange={set('email')} autoComplete="email" inputMode="email" />
                {errors.email && <small>{errors.email}</small>}
              </label>
              <label>
                Address
                <input value={form.address} onChange={set('address')} autoComplete="street-address" />
                {errors.address && <small>{errors.address}</small>}
              </label>
              <div className="split">
                <label>
                  City
                  <input value={form.city} onChange={set('city')} autoComplete="address-level2" />
                  {errors.city && <small>{errors.city}</small>}
                </label>
                <label>
                  Postal
                  <input value={form.postal} onChange={set('postal')} autoComplete="postal-code" />
                  {errors.postal && <small>{errors.postal}</small>}
                </label>
              </div>

              <fieldset>
                <legend>Payment preview</legend>
                <div className="methods">
                  {METHODS.map((method) => (
                    <label key={method.id} className={form.method === method.id ? 'method is-on' : 'method'}>
                      <input
                        type="radio"
                        name="method"
                        value={method.id}
                        checked={form.method === method.id}
                        onChange={set('method')}
                      />
                      <strong>{method.label}</strong>
                      <span>{method.note}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {form.method === 'card' && (
                <div className="faux-card" aria-hidden="true">
                  <span>VELA</span>
                  <strong>{form.name || 'Your name'}</strong>
                  <em>•••• 4242</em>
                </div>
              )}

              <button className="btn solid wide" type="submit">
                Place order · {money(total)}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
