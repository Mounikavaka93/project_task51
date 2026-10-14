export const sizes = [6, 7, 8, 9, 10, 11, 12, 13]

export const filters = ['All', 'Run', 'Court', 'Daily', 'Trail']

export const products = [
  {
    id: 'orbit',
    name: 'Orbit Runner',
    category: 'Run',
    group: 'Run',
    price: 189,
    tag: 'New',
    style: 'runner',
    weight: '248 g',
    drop: '8 mm',
    surface: 'Road',
    blurb: 'Rockered last, lively foam, a heel that stays put.',
    description:
      'Orbit is the workout shoe that stayed on after the workout. The last rolls you forward, the foam keeps its snap past mile twenty, and the heel lock is quiet enough to forget.',
    fit: 'Snug through the heel, easy across the toes. Most runners stay with their usual size.',
    materials: ['Mono-mesh upper', 'Nitrogen foam midsole', 'Blown rubber forefoot'],
    colors: [
      { name: 'Ember', upper: '#1c1c1c', sole: '#141414', mid: '#f4f1ea', accent: '#ff4d2e', lace: '#f4f1ea', image: '/shoes/orbit-ember.png?v=3' },
      { name: 'Glacier', upper: '#d5e0e4', sole: '#8ea0a8', mid: '#f7fbfc', accent: '#1d3c52', lace: '#1a1a1a', image: '/shoes/orbit-glacier.png?v=3' },
      { name: 'Volt', upper: '#15170f', sole: '#10120c', mid: '#d6ff3f', accent: '#d6ff3f', lace: '#f4f1ea', image: '/shoes/orbit-volt.png?v=3' },
    ],
  },
  {
    id: 'halo',
    name: 'Halo Court',
    category: 'Court',
    group: 'Court',
    price: 164,
    tag: null,
    style: 'court',
    weight: '312 g',
    drop: '4 mm',
    surface: 'Court',
    blurb: 'Low stack, sticky rubber, a clean leather-like shell.',
    description:
      'Halo sits close to the floor. A firmer midsole and a wider forefoot keep you planted on polished wood, with a shell that scuffs into something better.',
    fit: 'True to size with a little more room in the toe box. Size down if you like a glove fit.',
    materials: ['Smooth microfiber upper', 'Cupsole', 'Gum traction rubber'],
    colors: [
      { name: 'Chalk', upper: '#f3efe4', sole: '#cbbba6', mid: '#fffdf8', accent: '#1a1a1a', lace: '#1a1a1a', image: '/shoes/halo-chalk.png?v=3' },
      { name: 'Navy', upper: '#1b2744', sole: '#10182c', mid: '#e7e9ee', accent: '#d6ff3f', lace: '#f4f1ea', image: '/shoes/halo-navy.png?v=3' },
      { name: 'Clay', upper: '#8c4a38', sole: '#4a2b24', mid: '#f0d2c4', accent: '#f6efe6', lace: '#f6efe6', image: '/shoes/halo-clay.png?v=3' },
    ],
  },
  {
    id: 'drift',
    name: 'Drift Daily',
    category: 'Daily',
    group: 'Daily',
    price: 148,
    tag: null,
    style: 'daily',
    weight: '286 g',
    drop: '6 mm',
    surface: 'City',
    blurb: 'The all-day shoe. Soft collar, quiet sole, easy shape.',
    description:
      'Drift is built for the hours between places. A softer collar, a sole that doesn’t clap on stone, and a last that works with tailored trousers or a train ride home.',
    fit: 'Relaxed through the midfoot. If you are between sizes, take the larger one.',
    materials: ['Washed knit upper', 'Soft foam cradle', 'Quiet city rubber'],
    colors: [
      { name: 'Ink', upper: '#23262b', sole: '#15171a', mid: '#e7e2d8', accent: '#c9a27a', lace: '#f3efe6', image: '/shoes/drift-ink.png?v=3' },
      { name: 'Sand', upper: '#cbb89a', sole: '#8a7660', mid: '#f7f1e6', accent: '#fffaf3', lace: '#3a322b', image: '/shoes/drift-sand.png?v=3' },
      { name: 'Forest', upper: '#1e3a32', sole: '#12241f', mid: '#e7efe8', accent: '#d6ff3f', lace: '#f3efe6', image: '/shoes/drift-forest.png?v=3' },
    ],
  },
  {
    id: 'pulse',
    name: 'Pulse High',
    category: 'High',
    group: 'Daily',
    price: 214,
    tag: 'Limited',
    style: 'high',
    weight: '364 g',
    drop: '10 mm',
    surface: 'Street',
    blurb: 'A tall collar, a heavy sole, lines kept deliberate.',
    description:
      'Pulse is the statement pair. The collar clears the ankle, the sole has weight, and the upper stays plain so the silhouette can do the talking.',
    fit: 'The collar is padded, not tight. Order your usual size; the ankle opens wide.',
    materials: ['Full-grain look upper', 'Stacked foam', 'Carbon rubber wrap'],
    colors: [
      { name: 'Bone', upper: '#e6e1d6', sole: '#222222', mid: '#f7f4ee', accent: '#ff4d2e', lace: '#1a1a1a', image: '/shoes/pulse-bone.png?v=3' },
      { name: 'Black', upper: '#161616', sole: '#0c0c0c', mid: '#2c2c2c', accent: '#f3efe6', lace: '#f3efe6', image: '/shoes/pulse-black.png?v=3' },
      { name: 'Cobalt', upper: '#2046d4', sole: '#0e1a4a', mid: '#eef1f8', accent: '#d6ff3f', lace: '#f7f7f7', image: '/shoes/pulse-cobalt.png?v=3' },
    ],
  },
  {
    id: 'arc',
    name: 'Arc Slip',
    category: 'Slip',
    group: 'Daily',
    price: 128,
    tag: null,
    style: 'slip',
    weight: '232 g',
    drop: '6 mm',
    surface: 'City',
    blurb: 'No laces. A collapsible heel and a knit that holds.',
    description:
      'Arc is the shoe you step into without a thought. The heel collapses, the knit holds the midfoot, and there is nothing to tie on the way out the door.',
    fit: 'Stretch knit with a secure midfoot. Stick to your usual size.',
    materials: ['Engineered knit', 'Collapsible heel', 'Feather rubber'],
    colors: [
      { name: 'Fog', upper: '#c5c6c8', sole: '#8d9399', mid: '#f5f5f5', accent: '#ff4d2e', lace: '#ffffff', image: '/shoes/arc-fog.png?v=3' },
      { name: 'Midnight', upper: '#1a1c22', sole: '#111318', mid: '#d9dbe0', accent: '#d6ff3f', lace: '#ffffff', image: '/shoes/arc-midnight.png?v=3' },
      { name: 'Blush', upper: '#e7b7ae', sole: '#a56d68', mid: '#fff5f2', accent: '#fffdfb', lace: '#ffffff', image: '/shoes/arc-blush.png?v=3' },
    ],
  },
  {
    id: 'nova',
    name: 'Nova Trail',
    category: 'Trail',
    group: 'Trail',
    price: 198,
    tag: null,
    style: 'trail',
    weight: '308 g',
    drop: '6 mm',
    surface: 'Trail',
    blurb: 'Lugged rubber and a guarded toe for the long way home.',
    description:
      'Nova is for fire roads, wet stone, and the path that wasn’t on the map. The lugs clear mud, the toe is wrapped, and the foam still feels like a runner when the trail turns to pavement.',
    fit: 'Secure heel, room for a light sock. Go up a half size for long descents — we only cut whole sizes here, so try the next one up.',
    materials: ['Ripstop mesh', 'Protected toe', '4 mm trail lugs'],
    colors: [
      { name: 'Pine', upper: '#243128', sole: '#1a120e', mid: '#c5d1b8', accent: '#d6ff3f', lace: '#f3efe6', image: '/shoes/nova-pine.png?v=3' },
      { name: 'Dust', upper: '#b7a48e', sole: '#5c5146', mid: '#efe6d8', accent: '#1c1a17', lace: '#1c1a17', image: '/shoes/nova-dust.png?v=3' },
      { name: 'Signal', upper: '#f2f2f2', sole: '#ff4d2e', mid: '#ff5a3c', accent: '#161616', lace: '#161616', image: '/shoes/nova-signal.png?v=3' },
    ],
  },
]

export function money(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function shippingFor(subtotal) {
  if (subtotal <= 0 || subtotal >= 150) return 0
  return 12
}
