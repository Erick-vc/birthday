// Ilustraciones SVG

export function daisyG({ petals = 14, petal = '#ffffff', stroke = '#f5d0dc' } = {}) {
  let s = ''
  for (let i = 0; i < petals; i++) {
    s += `<ellipse cx="0" cy="-27" rx="8.5" ry="21" transform="rotate(${(360 / petals) * i})" fill="${petal}" stroke="${stroke}" stroke-width="1.2"/>`
  }
  return (
    s +
    `<circle r="15" fill="url(#dc)"/>` +
    `<circle cx="-5" cy="-5" r="2.2" fill="#fef9c3" opacity=".9"/>` +
    `<circle cx="4" cy="3" r="1.6" fill="#d97706" opacity=".5"/>` +
    `<circle cx="-2" cy="7" r="1.4" fill="#d97706" opacity=".5"/>`
  )
}

export const daisy = (opts) =>
  `<svg viewBox="-52 -52 104 104" class="block h-full w-full overflow-visible">${daisyG(opts)}</svg>`

export const HEART = 'M0 6 C -10 -2, -9 -12, -4 -12 C -1.5 -12, 0 -10, 0 -8 C 0 -10, 1.5 -12, 4 -12 C 9 -12, 10 -2, 0 6 Z'

const DOVE_WHITE = { back: '#e2e8f0', body: '#fff', head: '#fff', tail: '#f8fafc', wing: '#fff', line: '#cbd5e1', beak: '#fb923c', eye: '#334155' }
const DOVE_GRAY = { back: '#64748b', body: '#9ca3af', head: '#6b7280', tail: '#6b7280', wing: '#b4bac4', line: '#64748b', beak: '#44403c', eye: '#f97316' }

// Paloma blanca (con margarita) o paloma gris
export const dove = ({ gray = false } = {}) => {
  const c = gray ? DOVE_GRAY : DOVE_WHITE
  return `
<svg viewBox="0 0 150 90" class="block h-auto w-full overflow-visible">
  <g class="wing wing-back"><path d="M66 50 C 62 22, 78 4, 104 2 C 94 16, 88 32, 86 50 Z" fill="${c.back}"/></g>
  <path d="M30 52 L4 40 L11 53 L4 66 Z" fill="${c.tail}" stroke="${c.line}" stroke-width="1.2" stroke-linejoin="round"/>
  <ellipse cx="68" cy="54" rx="42" ry="14" fill="${c.body}" stroke="${c.line}" stroke-width="1.2"/>
  <circle cx="113" cy="45" r="11" fill="${c.head}" stroke="${c.line}" stroke-width="1.2"/>
  <ellipse cx="96" cy="52" rx="14" ry="10" fill="${c.body}"/>
  ${gray ? `<ellipse cx="102" cy="52" rx="9" ry="7" fill="#34d399" opacity=".55"/><ellipse cx="98" cy="56" rx="7" ry="5" fill="#a78bfa" opacity=".45"/>` : ''}
  <path d="M123 44 L132 47 L123 50 Z" fill="${c.beak}"/>
  ${gray ? `<circle cx="117" cy="42" r="2.6" fill="${c.eye}"/><circle cx="117" cy="42" r="1.2" fill="#1c1917"/>` : `<circle cx="116" cy="42" r="1.8" fill="${c.eye}"/>`}
  ${gray ? '' : `<ellipse cx="111" cy="49" rx="3" ry="1.8" fill="#fbcfe8" opacity=".9"/>
  <path d="M131 48 L137 58" stroke="#22c55e" stroke-width="1.6" stroke-linecap="round"/>
  <g transform="translate(138 60) scale(.13)">${daisyG({ petals: 12 })}</g>`}
  <g class="wing wing-front">
    <path d="M56 52 C 48 20, 70 -2, 100 -2 C 90 14, 82 32, 80 52 Z" fill="${c.wing}" stroke="${c.line}" stroke-width="1.2"/>
    ${gray ? `<path d="M60 40 L82 38 M62 46 L81 45" stroke="#374151" stroke-width="3" stroke-linecap="round"/>` : ''}
  </g>
</svg>`
}

export const envelope = () => `
<svg viewBox="0 -50 200 185" class="block h-auto w-full overflow-visible">
  <rect x="10" y="30" width="180" height="100" rx="10" fill="#f9a8d4"/>
  <path class="env-flap-open" d="M10 30 L100 -25 L190 30 Z" fill="#f472b6"/>
  <g class="env-letter">
    <rect x="26" y="38" width="148" height="86" rx="6" fill="#fff"/>
    <text x="100" y="64" text-anchor="middle" font-family="Dancing Script, cursive" font-size="19" font-weight="700" fill="#e11d48">Para Gisela</text>
    <g transform="translate(100 92) scale(.22)">${daisyG({ petals: 12 })}</g>
  </g>
  <path d="M10 62 L100 108 L190 62 V120 Q190 130 180 130 H20 Q10 130 10 120 Z" fill="#fbcfe8"/>
  <path d="M10 62 L100 108 L190 62" stroke="#f9a8d4" stroke-width="2" fill="none"/>
  <g class="env-flap">
    <path d="M10 40 Q10 30 20 30 H180 Q190 30 190 40 L100 92 Z" fill="#f472b6"/>
    <g transform="translate(100 76) scale(1.5)"><path d="${HEART}" fill="#e11d48"/></g>
  </g>
</svg>`

export const bunny = () => `
<svg viewBox="0 0 140 180" class="block h-auto w-full overflow-visible">
  <ellipse class="bunny-shadow" cx="70" cy="175" rx="44" ry="6" fill="#14532d" opacity=".2"/>
  <g class="bunny-hop">
    <g transform="rotate(-14 54 70)"><g class="ear-twitch">
      <ellipse cx="54" cy="36" rx="13" ry="36" fill="#fff" stroke="#f3d1dc" stroke-width="2"/>
      <ellipse cx="54" cy="40" rx="6.5" ry="26" fill="#fbcfe8"/>
    </g></g>
    <g transform="rotate(14 86 70)"><g class="ear-twitch" style="animation-delay:1.3s">
      <ellipse cx="86" cy="36" rx="13" ry="36" fill="#fff" stroke="#f3d1dc" stroke-width="2"/>
      <ellipse cx="86" cy="40" rx="6.5" ry="26" fill="#fbcfe8"/>
    </g></g>
    <circle cx="113" cy="148" r="13" fill="#fff" stroke="#f3d1dc" stroke-width="2"/>
    <ellipse cx="70" cy="137" rx="42" ry="36" fill="#fff" stroke="#f3d1dc" stroke-width="2"/>
    <ellipse cx="70" cy="144" rx="24" ry="22" fill="#fdf2f8"/>
    <ellipse cx="70" cy="86" rx="35" ry="31" fill="#fff" stroke="#f3d1dc" stroke-width="2"/>
    <g class="eye"><ellipse cx="57" cy="83" rx="4.5" ry="5.5" fill="#3f3f46"/><circle cx="58.5" cy="81" r="1.6" fill="#fff"/></g>
    <g class="eye"><ellipse cx="83" cy="83" rx="4.5" ry="5.5" fill="#3f3f46"/><circle cx="84.5" cy="81" r="1.6" fill="#fff"/></g>
    <ellipse cx="49" cy="95" rx="7" ry="4" fill="#fda4af" opacity=".6"/>
    <ellipse cx="91" cy="95" rx="7" ry="4" fill="#fda4af" opacity=".6"/>
    <path d="M66 93 Q70 90 74 93 Q70 98 66 93 Z" fill="#f472b6"/>
    <path d="M70 97 q-3 5 -7 3 M70 97 q3 5 7 3" stroke="#be185d" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    <path d="M44 93 h-16 M44 98 l-15 4 M96 93 h16 M96 98 l15 4" stroke="#e7c4d0" stroke-width="1.2" stroke-linecap="round"/>
    <ellipse cx="56" cy="126" rx="9" ry="7" fill="#fff" stroke="#f3d1dc" stroke-width="2"/>
    <ellipse cx="84" cy="126" rx="9" ry="7" fill="#fff" stroke="#f3d1dc" stroke-width="2"/>
    <ellipse cx="48" cy="169" rx="16" ry="8" fill="#fff" stroke="#f3d1dc" stroke-width="2"/>
    <ellipse cx="92" cy="169" rx="16" ry="8" fill="#fff" stroke="#f3d1dc" stroke-width="2"/>
    <g transform="translate(50 60) scale(.17)">${daisyG({ petals: 12 })}</g>
    <g transform="translate(70 55) scale(.2)">${daisyG({ petals: 12, petal: '#fbcfe8', stroke: '#f9a8d4' })}</g>
    <g transform="translate(90 60) scale(.17)">${daisyG({ petals: 12 })}</g>
  </g>
</svg>`

export const leaf = (c = '#4ade80') => `
<svg viewBox="0 0 24 24" class="block h-full w-full overflow-visible">
  <path d="M3 21 C 3 10, 10 3, 21 3 C 21 14, 14 21, 3 21 Z" fill="${c}"/>
  <path d="M3 21 L 16 8" stroke="#166534" stroke-width="1.1" stroke-linecap="round" opacity=".45"/>
</svg>`

const leafG = (x, y, rot, c) =>
  `<path transform="translate(${x} ${y}) rotate(${rot})" d="M0 0 C 2 -7, 9 -10, 15 -9 C 13 -3, 7 1, 0 0 Z" fill="${c}"/>`

// Enredadera con margarita al centro
export const vine = () => {
  const greens = ['#22c55e', '#4ade80', '#86efac', '#16a34a']
  let leaves = ''
  ;[14, 34, 56, 76, 124, 144, 166, 186].forEach((x, i) => {
    const up = i % 2 === 0
    leaves += leafG(x, 16 + (up ? -2 : 2), up ? -20 : 160, greens[i % greens.length])
  })
  const buds = [44, 156].map((x) => `<circle cx="${x}" cy="10" r="3.2" fill="#f9a8d4"/><circle cx="${x}" cy="10" r="1.3" fill="#fde68a"/>`).join('')
  return `
<svg viewBox="0 0 200 32" class="block h-full w-full overflow-visible">
  <path d="M0 16 Q 25 6 50 16 T 100 16 T 150 16 T 200 16" stroke="#16a34a" stroke-width="2" fill="none" stroke-linecap="round"/>
  ${leaves}${buds}
  <g transform="translate(100 16) scale(.27)">${daisyG({ petals: 12 })}</g>
</svg>`
}

export const cloud = () => `
<svg viewBox="0 0 200 90" class="block h-auto w-full">
  <g fill="#fff">
    <ellipse cx="60" cy="60" rx="45" ry="26"/>
    <ellipse cx="100" cy="42" rx="40" ry="34"/>
    <ellipse cx="145" cy="58" rx="42" ry="26"/>
    <rect x="40" y="55" width="120" height="30" rx="15"/>
  </g>
</svg>`

// Glaseado con gotitas
function drips(x, y, w, color, depth = 12) {
  const n = Math.round(w / 17)
  const step = w / n
  let d = `M${x} ${y + 14} L${x} ${y + 12} Q${x} ${y} ${x + 14} ${y} L${x + w - 14} ${y} Q${x + w} ${y} ${x + w} ${y + 12} L${x + w} ${y + 14}`
  for (let i = 0; i < n; i++) {
    d += ` q${-step / 2} ${i % 2 ? depth : depth * 0.6} ${-step} 0`
  }
  return `<path d="${d} Z" fill="${color}"/>`
}

export function cake() {
  const sprinkles = Array.from({ length: 16 }, (_, i) => {
    const x = 64 + ((i * 37) % 92)
    const y = 112 + ((i * 13) % 22)
    const c = ['#f472b6', '#a78bfa', '#34d399', '#60a5fa', '#fb923c'][i % 5]
    return `<rect x="${x}" y="${y}" width="6" height="2.4" rx="1.2" fill="${c}" transform="rotate(${(i * 47) % 180} ${x + 3} ${y + 1})"/>`
  }).join('')

  const candles = [80, 110, 140]
    .map(
      (x, i) => `
    <g>
      <rect x="${x - 5}" y="50" width="10" height="40" rx="3" fill="${['#f9a8d4', '#c4b5fd', '#fde68a'][i]}"/>
      <path d="M${x - 5} 60 l10 -6 M${x - 5} 70 l10 -6 M${x - 5} 80 l10 -6 M${x - 5} 90 l10 -6" stroke="#fff" stroke-width="2.5" opacity=".8"/>
      <line x1="${x}" y1="50" x2="${x}" y2="43" stroke="#57534e" stroke-width="1.6" stroke-linecap="round"/>
      <circle class="flame" cx="${x}" cy="32" r="14" fill="#fde047" opacity=".45" filter="url(#blur)"/>
      <path class="flame" style="animation-delay:${-i * 0.11}s" d="M${x} 17 C ${x + 8} 28, ${x + 7} 40, ${x} 43 C ${x - 7} 40, ${x - 8} 28, ${x} 17 Z" fill="url(#flameG)"/>
      <circle class="smoke" style="animation-delay:${i * 0.12}s" cx="${x}" cy="36" r="6" fill="#d6d3d1"/>
    </g>`,
    )
    .join('')

  const tierDaisies = [52, 86, 120, 154, 188]
    .map((x, i) => `<g transform="translate(${x - 8} 180) scale(.2)">${daisyG({ petals: 12, petal: i % 2 ? '#fff' : '#fdf2f8' })}</g>`)
    .join('')

  return `
<svg viewBox="0 0 220 225" class="block h-auto w-full overflow-visible">
  <ellipse cx="110" cy="208" rx="106" ry="12" fill="#e2e8f0"/>
  <ellipse cx="110" cy="205" rx="98" ry="9" fill="#f8fafc"/>
  <rect x="25" y="135" width="170" height="70" rx="16" fill="#fbcfe8"/>
  <rect x="25" y="185" width="170" height="20" rx="10" fill="#f9a8d4" opacity=".6"/>
  ${drips(25, 135, 170, '#fff', 14)}
  ${tierDaisies}
  <rect x="55" y="90" width="110" height="50" rx="14" fill="#fef3c7"/>
  ${drips(55, 90, 110, '#f9a8d4', 10)}
  ${sprinkles}
  ${candles}
</svg>`
}
