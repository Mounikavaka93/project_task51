const NOTES = [
  {
    id: 'orbit',
    kicker: '01 — Dawn',
    title: 'Before the city wakes.',
    copy: 'Orbit, wet pavement, a light that hasn’t decided yet.',
    tone: 'linear-gradient(160deg, #1b1c16 0%, #3c4318 48%, #d6ff3f 140%)',
  },
  {
    id: 'halo',
    kicker: '02 — Court',
    title: 'Under gallery light.',
    copy: 'Halo on polished wood, the sole quieter than the room.',
    tone: 'linear-gradient(165deg, #1b2744 0%, #8c4a38 120%)',
  },
  {
    id: 'nova',
    kicker: '03 — Switchback',
    title: 'When the pavement ends.',
    copy: 'Nova, dust on the midsole, the long way home.',
    tone: 'linear-gradient(160deg, #1a120e 0%, #243128 55%, #c5d1b8 140%)',
  },
]

const PILLARS = [
  {
    n: '01',
    title: 'Last',
    copy: 'Every shape starts on a wooden last, then gets walked until the pitch of the stride feels obvious.',
  },
  {
    n: '02',
    title: 'Foam',
    copy: 'Nitrogen-charged midsoles, tuned per silhouette. Soft for the day, snappy for the run, planted for trail.',
  },
  {
    n: '03',
    title: 'Rubber',
    copy: 'Blown rubber where you land, carbon rubber where you brake, lugs where the road gives out.',
  },
]

export default function Craft({ onSelect }) {
  return (
    <section className="craft" id="craft">
      <div className="section-head">
        <div>
          <p className="eyebrow dark">
            <i />
            How it’s made
          </p>
          <h2>Edited, then walked.</h2>
        </div>
        <p className="section-lede">
          We prototype on foot. If a shoe still announces itself at mile three, it goes back on the last.
        </p>
      </div>

      <div className="pillars">
        {PILLARS.map((item, index) => (
          <article key={item.n} className="pillar reveal" style={{ transitionDelay: `${index * 80}ms` }}>
            <span>{item.n}</span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>

      <div className="notes">
        {NOTES.map((note) => (
          <button key={note.id} className="note" style={{ background: note.tone }} onClick={() => onSelect(note.id)}>
            <span>{note.kicker}</span>
            <strong>{note.title}</strong>
            <em>{note.copy}</em>
          </button>
        ))}
      </div>
    </section>
  )
}
