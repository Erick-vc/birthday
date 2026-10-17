// Animación: Gisela y Erick dándose un besito con el dedo
import { HEART } from './art.js'

const SKIN_HER = '#ecc19f'
const SKIN_HIM = '#ddb08c'
const OUTLINE = '#c08566'
const L1 = 46
const L2 = 46
const CYCLE = 11

const P = {
  herMouth: [165, 146],
  hisMouth: [244, 146],
  herShoulder: [181, 206],
  hisShoulder: [227, 204],
  herRest: [186, 272],
  hisRest: [222, 272],
  mid: [205, 58],
}

// Trayectoria de cada mano: [segundo, punto]
const HER_HAND = [[0, 'herRest'], [0.8, 'herRest'], [1.6, 'hisMouth'], [2.6, 'hisMouth'], [3.4, 'herMouth'], [4.4, 'herMouth'], [5.2, 'herRest'], [CYCLE, 'herRest']]
const HIS_HAND = [[0, 'hisRest'], [5.8, 'hisRest'], [6.6, 'herMouth'], [7.6, 'herMouth'], [8.4, 'hisMouth'], [9.4, 'hisMouth'], [10.2, 'hisRest'], [CYCLE, 'hisRest']]
const HIM_KISS = [[1.65, 2.55], [8.45, 9.35]]
const HER_KISS = [[3.45, 4.35], [6.65, 7.55]]
const HEARTS = [
  { t: 1.9, at: 'hisMouth', s: 1 },
  { t: 3.7, at: 'herMouth', s: 1 },
  { t: 4.5, at: 'mid', s: 2.2 },
  { t: 6.9, at: 'herMouth', s: 1 },
  { t: 8.7, at: 'hisMouth', s: 1 },
  { t: 9.6, at: 'mid', s: 2.2 },
]
const CAPTIONS = [
  [0, 'Tú pones tu dedito en mi boca… 🤭'],
  [3.1, '…y te lo llevas a la tuya 💋'],
  [5.5, 'Y a veces yo te lo devuelvo 🙈'],
  [8.2, 'Nuestro besito a nuestra manera 💚'],
]

const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)
const within = (ranges, t) => ranges.some(([a, b]) => t >= a && t <= b)

function track(keys, t) {
  for (let i = 0; i < keys.length - 1; i++) {
    const [t0, a] = keys[i]
    const [t1, b] = keys[i + 1]
    if (t >= t0 && t <= t1) {
      const p = ease((t - t0) / (t1 - t0))
      const A = P[a]
      const B = P[b]
      return [A[0] + (B[0] - A[0]) * p, A[1] + (B[1] - A[1]) * p]
    }
  }
  return P[keys[keys.length - 1][1]]
}

// Cinemática inversa de dos segmentos (codo hacia abajo)
function ik(S, T) {
  const dx = T[0] - S[0]
  const dy = T[1] - S[1]
  let d = Math.hypot(dx, dy)
  const max = L1 + L2 - 0.5
  if (d > max) {
    T = [S[0] + (dx / d) * max, S[1] + (dy / d) * max]
    d = max
  }
  const a = Math.atan2(dy, dx)
  const alpha = Math.acos(Math.min(1, Math.max(-1, (L1 * L1 + d * d - L2 * L2) / (2 * L1 * d))))
  const e1 = [S[0] + L1 * Math.cos(a + alpha), S[1] + L1 * Math.sin(a + alpha)]
  const e2 = [S[0] + L1 * Math.cos(a - alpha), S[1] + L1 * Math.sin(a - alpha)]
  return { E: e1[1] > e2[1] ? e1 : e2, H: T }
}

const arm = (id, skin, sleeve) => `
  <g id="${id}">
    <path class="a-out" stroke="${OUTLINE}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path class="a-skin" stroke="${skin}" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    ${sleeve ? `<path class="a-sleeve" stroke="${sleeve}" stroke-width="17" fill="none" stroke-linecap="round"/>` : ''}
    <line class="f-out" stroke="${OUTLINE}" stroke-width="6.5" stroke-linecap="round"/>
    <line class="f-skin" stroke="${skin}" stroke-width="4" stroke-linecap="round"/>
    <circle class="hand" r="8" fill="${skin}" stroke="${OUTLINE}" stroke-width="1.5"/>
  </g>`

const staticArm = (d, skin) =>
  `<path d="${d}" stroke="${OUTLINE}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${skin}" stroke-width="11" fill="none" stroke-linecap="round"/>`

const SVG = `
<svg viewBox="0 0 400 320" class="block h-auto w-full overflow-visible">
  <ellipse cx="205" cy="312" rx="150" ry="9" fill="#14532d" opacity=".12"/>

  <!-- Gisela -->
  <path d="M100 118 C 92 52, 208 50, 202 118 L 210 252 C 182 264, 122 264, 92 252 Z" fill="#2a1b17"/>
  <rect x="142" y="156" width="18" height="34" rx="6" fill="${SKIN_HER}"/>
  ${staticArm('M118 206 Q 106 240 110 276', SKIN_HER)}
  <path d="M112 316 C 110 236, 122 196, 151 190 C 180 196, 192 236, 190 316 Z" fill="#fff" stroke="#f3c6d3" stroke-width="2"/>
  <path d="M141 190 Q151 202 161 190" stroke="#d4a017" stroke-width="1.5" fill="none"/>
  <circle cx="151" cy="199" r="2.2" fill="#d4a017"/>
  <circle cx="150" cy="118" r="46" fill="${SKIN_HER}"/>
  <path d="M103 122 C 96 66, 150 52, 186 70 C 200 80, 204 100, 199 124 C 190 102, 172 90, 152 92 C 132 92, 112 104, 103 122 Z" fill="#2a1b17"/>
  <path d="M104 112 C 94 160, 98 214, 112 246 L 122 244 C 112 204, 110 154, 114 118 Z" fill="#2a1b17"/>
  <g id="her-open">
    <ellipse cx="141" cy="123" rx="3.6" ry="4.6" fill="#2b2118"/><ellipse cx="169" cy="123" rx="3.6" ry="4.6" fill="#2b2118"/>
    <circle cx="142.3" cy="121.3" r="1.3" fill="#fff"/><circle cx="170.3" cy="121.3" r="1.3" fill="#fff"/>
  </g>
  <path id="her-closed" d="M136 124 Q141 128 146 124 M164 124 Q169 128 174 124" stroke="#2b2118" stroke-width="2" fill="none" stroke-linecap="round" display="none"/>
  <g fill="#fff" fill-opacity=".15" stroke="#8b5a2b" stroke-width="2.8">
    <rect x="129" y="113" width="24" height="19" rx="8"/><rect x="157" y="113" width="24" height="19" rx="8"/>
  </g>
  <path d="M153 120 H157" stroke="#8b5a2b" stroke-width="2.4"/>
  <g class="blush-her" fill="#fb7185"><ellipse cx="132" cy="139" rx="7" ry="4"/><ellipse cx="177" cy="139" rx="7" ry="4"/></g>
  <path id="her-smile" d="M158 145 Q165 151 172 145" stroke="#be123c" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <ellipse id="her-kiss" cx="166" cy="146" rx="3.6" ry="4.2" fill="#e11d48" display="none"/>

  <!-- Erick -->
  <circle cx="209" cy="122" r="8" fill="${SKIN_HIM}"/><circle cx="301" cy="122" r="8" fill="${SKIN_HIM}"/>
  <rect x="246" y="154" width="18" height="36" rx="6" fill="${SKIN_HIM}"/>
  <path d="M290 204 Q 298 220 300 234" stroke="#6b7280" stroke-width="17" fill="none" stroke-linecap="round"/>
  ${staticArm('M299 232 Q 302 256 298 276', SKIN_HIM)}
  <path d="M212 316 C 210 234, 224 194, 255 188 C 286 194, 300 234, 298 316 Z" fill="#6b7280"/>
  <path d="M243 190 Q255 201 267 190" stroke="#4b5563" stroke-width="3" fill="none"/>
  <circle cx="255" cy="116" r="47" fill="${SKIN_HIM}"/>
  <path d="M220 138 C 226 166, 284 166, 290 138 C 282 160, 228 160, 220 138 Z" fill="#7c5a45" opacity=".22"/>
  <path d="M207 116 C 200 64, 238 52, 262 56 C 292 58, 310 84, 303 118 C 298 98, 290 90, 280 88 L 274 96 L 266 84 L 258 96 L 250 84 L 242 96 L 236 88 C 222 94, 211 104, 207 116 Z" fill="#1c1917"/>
  <g id="him-open">
    <ellipse cx="238" cy="121" rx="3.6" ry="4.4" fill="#1c1917"/><ellipse cx="264" cy="121" rx="3.6" ry="4.4" fill="#1c1917"/>
    <circle cx="236.8" cy="119.4" r="1.3" fill="#fff"/><circle cx="262.8" cy="119.4" r="1.3" fill="#fff"/>
  </g>
  <path id="him-closed" d="M233 122 Q238 126 243 122 M259 122 Q264 126 269 122" stroke="#1c1917" stroke-width="2" fill="none" stroke-linecap="round" display="none"/>
  <g fill="#fff" fill-opacity=".15" stroke="#111827" stroke-width="2.8">
    <rect x="225" y="112" width="25" height="18" rx="4"/><rect x="252" y="112" width="25" height="18" rx="4"/>
  </g>
  <path d="M250 119 H252 M225 117 L212 119 M277 117 L296 119" stroke="#111827" stroke-width="2.4"/>
  <g class="blush-him" fill="#fb7185"><ellipse cx="228" cy="138" rx="7" ry="4"/><ellipse cx="284" cy="138" rx="7" ry="4"/></g>
  <path id="him-smile" d="M237 145 Q244 150 251 145" stroke="#9f1239" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <ellipse id="him-kiss" cx="243" cy="146" rx="3.4" ry="4" fill="#be123c" display="none"/>

  ${arm('her-arm', SKIN_HER)}
  ${arm('his-arm', SKIN_HIM, '#6b7280')}
  <g id="kiss-hearts">${HEARTS.map(() => `<g opacity="0"><path d="${HEART}" fill="#f43f5e" stroke="#fff" stroke-width="1"/></g>`).join('')}</g>
</svg>`

export function createKiss(el, captionEl) {
  el.innerHTML = SVG
  const q = (s) => el.querySelector(s)
  const parts = {
    herArm: q('#her-arm'),
    hisArm: q('#his-arm'),
    herOpen: q('#her-open'),
    herClosed: q('#her-closed'),
    herSmile: q('#her-smile'),
    herKiss: q('#her-kiss'),
    himOpen: q('#him-open'),
    himClosed: q('#him-closed'),
    himSmile: q('#him-smile'),
    himKiss: q('#him-kiss'),
    blushHer: q('.blush-her'),
    blushHim: q('.blush-him'),
    hearts: [...q('#kiss-hearts').children],
  }
  let raf = 0
  let start = 0
  let caption = ''

  const show = (node, on) => node.setAttribute('display', on ? 'inline' : 'none')

  function drawArm(g, S, rest, target, sleeve) {
    // El dedo apunta hacia la boca; la mano se queda un poquito antes
    const away = Math.min(1, Math.hypot(target[0] - rest[0], target[1] - rest[1]) / 25)
    const dir = [target[0] - S[0], target[1] - S[1]]
    const len = Math.hypot(...dir) || 1
    const fl = 12 * away
    const T = [target[0] - (dir[0] / len) * fl, target[1] - (dir[1] / len) * fl]
    const { E, H } = ik(S, T)
    const u = [H[0] - E[0], H[1] - E[1]]
    const ul = Math.hypot(...u) || 1
    const tip = [H[0] + (u[0] / ul) * fl, H[1] + (u[1] / ul) * fl]
    const d = `M${S[0]} ${S[1]} L${E[0]} ${E[1]} L${H[0]} ${H[1]}`
    g.querySelector('.a-out').setAttribute('d', d)
    g.querySelector('.a-skin').setAttribute('d', d)
    if (sleeve) {
      const m = [S[0] + (E[0] - S[0]) * 0.4, S[1] + (E[1] - S[1]) * 0.4]
      g.querySelector('.a-sleeve').setAttribute('d', `M${S[0]} ${S[1]} L${m[0]} ${m[1]}`)
    }
    for (const c of ['.f-out', '.f-skin']) {
      const l = g.querySelector(c)
      l.setAttribute('x1', H[0]); l.setAttribute('y1', H[1])
      l.setAttribute('x2', tip[0]); l.setAttribute('y2', tip[1])
      l.setAttribute('opacity', away)
    }
    const h = g.querySelector('.hand')
    h.setAttribute('cx', H[0]); h.setAttribute('cy', H[1])
  }

  function frame() {
    // Programar el siguiente cuadro primero: si algo falla, la animación no se congela
    raf = requestAnimationFrame(frame)
    // En móvil el timestamp de rAF puede ser anterior a `start` (t negativo); usamos performance.now()
    const t = (Math.max(0, performance.now() - start) / 1000) % CYCLE

    drawArm(parts.herArm, P.herShoulder, P.herRest, track(HER_HAND, t))
    drawArm(parts.hisArm, P.hisShoulder, P.hisRest, track(HIS_HAND, t), true)

    const herKissing = within(HER_KISS, t)
    const himKissing = within(HIM_KISS, t)
    const herBlink = t % 3.7 < 0.13
    const himBlink = (t + 1.3) % 4.1 < 0.13
    show(parts.herOpen, !herKissing && !herBlink)
    show(parts.herClosed, herKissing || herBlink)
    show(parts.herSmile, !herKissing)
    show(parts.herKiss, herKissing)
    show(parts.himOpen, !himKissing && !himBlink)
    show(parts.himClosed, himKissing || himBlink)
    show(parts.himSmile, !himKissing)
    show(parts.himKiss, himKissing)

    const blush = 0.35 + 0.4 * (within([[1.6, 5.4], [6.6, 10.4]], t) ? 1 : 0)
    parts.blushHer.setAttribute('opacity', blush)
    parts.blushHim.setAttribute('opacity', blush)

    HEARTS.forEach((h, i) => {
      const p = (t - h.t) / 1.3
      const g = parts.hearts[i]
      if (p < 0 || p > 1) return g.setAttribute('opacity', 0)
      const [x, y] = P[h.at]
      const s = h.s * (0.6 + 0.6 * Math.min(1, p * 3))
      g.setAttribute('transform', `translate(${x + Math.sin(p * 6) * 4} ${y - 14 - p * 45}) scale(${s})`)
      g.setAttribute('opacity', 1 - p * p)
    })

    const text = ([...CAPTIONS].reverse().find(([ct]) => t >= ct) ?? CAPTIONS[0])[1]
    if (text !== caption && captionEl) {
      caption = text
      captionEl.style.opacity = 0
      setTimeout(() => {
        captionEl.textContent = text
        captionEl.style.opacity = 1
      }, 250)
    }
  }

  return {
    start() {
      cancelAnimationFrame(raf)
      start = performance.now()
      caption = ''
      raf = requestAnimationFrame(frame)
    },
    stop() {
      cancelAnimationFrame(raf)
    },
  }
}
