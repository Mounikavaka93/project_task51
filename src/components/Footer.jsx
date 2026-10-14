import { useState } from 'react'

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNote('Add a valid email to hear about the next drop.')
      return
    }
    setNote('You’re on the list. We’ll write when the next last is ready.')
    setEmail('')
  }

  return (
    <footer className="footer" id="contact">
      <div className="footer-top">
        <div>
          <p className="eyebrow">
            <i />
            The list
          </p>
          <h2>Next drop, first.</h2>
        </div>
        <form onSubmit={submit}>
          <label className="sr" htmlFor="list-email">
            Email
          </label>
          <input
            id="list-email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            inputMode="email"
          />
          <button className="btn solid" type="submit">
            Join
          </button>
          {note && <p role="status">{note}</p>}
        </form>
      </div>
      <div className="footer-grid">
        <div>
          <strong>VELA</strong>
          <p>Studio footwear. Small runs, walked in before they’re named.</p>
        </div>
        <div>
          <span>Visit</span>
          <button onClick={() => onNavigate('shop')}>Shop</button>
          <button onClick={() => onNavigate('studio')}>Studio</button>
          <button onClick={() => onNavigate('craft')}>Craft</button>
        </div>
        <div>
          <span>Studio</span>
          <p>14 Last Street</p>
          <p>Portland, OR</p>
          <p>hello@vela.studio</p>
        </div>
      </div>
      <div className="footer-base">
        <span>© {new Date().getFullYear()} VELA Studio</span>
        <span>A front-end study. Checkout is a preview.</span>
      </div>
    </footer>
  )
}
