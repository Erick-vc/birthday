import './style.css'
import { daisy, dove, bunny, cloud, cake, leaf, vine, envelope, HEART } from './art.js'
import { playSong, stopSong, isPlaying } from './music.js'
import { createKiss } from './kiss.js'

const $ = (id) => document.getElementById(id)
const rand = (a, b) => Math.random() * (b - a) + a
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const isMobile = innerWidth < 640
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

const COLORS = ['#f472b6', '#fb7185', '#fbbf24', '#a78bfa', '#34d399', '#22c55e', '#86efac', '#60a5fa', '#fda4af', '#a3e635']
const GREENS = ['#22c55e', '#4ade80', '#86efac', '#16a34a', '#a3e635']
const PINK = { petal: '#fbcfe8', stroke: '#f9a8d4' }

const heart = (c) => `<svg viewBox="-12 -14 24 22" class="block h-full w-full"><path d="${HEART}" fill="${c}"/></svg>`
const sparkle = (c) =>
  `<svg viewBox="0 0 24 24" class="block h-full w-full"><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10Z" fill="${c}"/></svg>`

// ---------- Banderines ----------
function bunting() {
  const flags = 24
  const colors = ['#f9a8d4', '#86efac', '#fde68a', '#ffffff', '#4ade80', '#c4b5fd', '#fda4af', '#bef264']
  const y = (t) => (1 - t) ** 2 * 6 + 2 * (1 - t) * t * 90 + t ** 2 * 6
  let out = `<path d="M0 6 Q600 90 1200 6" stroke="#16a34a" stroke-width="2" fill="none"/>`
  for (let i = 0; i < flags; i++) {
    const t = (i + 0.5) / flags
    const x = 1200 * t
    const yy = y(t)
    const c = colors[i % colors.length]
    out += `<g class="flag" style="animation-delay:${-i * 0.3}s">
      <path d="M${x - 20} ${yy} L${x + 20} ${yy} L${x} ${yy + 50} Z" fill="${c}" stroke="#fbcfe8" stroke-width="1"/>
      <circle cx="${x}" cy="${yy + 16}" r="4" fill="${c === '#ffffff' ? '#f9a8d4' : '#fff'}" opacity=".85"/>
    </g>`
  }
  $('bunting').innerHTML = `<svg viewBox="0 0 1200 150" preserveAspectRatio="xMidYMin slice" class="h-full w-full overflow-visible">${out}</svg>`
}

// ---------- Serpentinas rizadas ----------
function streamers() {
  const set = [
    { x: 18, len: 230, a: 5, b: 9, c: '#f472b6' },
    { x: 58, len: 300, a: 6, b: 11, c: '#fbbf24' },
    { x: 100, len: 190, a: 5, b: 8, c: '#22c55e' },
    { x: 140, len: 260, a: 6, b: 10, c: '#34d399' },
    { x: 180, len: 160, a: 5, b: 8, c: '#a78bfa' },
    { x: 205, len: 120, a: 5, b: 7, c: '#86efac' },
  ]
  const svg = set
    .map(({ x, len, a, b, c }, i) => {
      let d = ''
      for (let t = 0; a * t < len; t += 0.15) {
        const px = x + b * Math.sin(t)
        const py = a * t + b * (1 - Math.cos(t)) * 0.6
        d += `${d ? 'L' : 'M'}${px.toFixed(1)} ${py.toFixed(1)} `
      }
      return `<g class="streamer" style="animation-delay:${-i * 0.7}s"><path d="${d}" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`
    })
    .join('')
  const html = `<svg viewBox="0 0 220 340" class="block h-auto w-full overflow-visible">${svg}</svg>`
  $('streamer-left').innerHTML = html
  $('streamer-right').innerHTML = html
}

// ---------- Nubes ----------
function clouds() {
  for (let i = 0; i < 4; i++) {
    const d = rand(70, 110)
    $('clouds').insertAdjacentHTML(
      'beforeend',
      `<div class="cloud" style="top:${rand(12, 60)}%;width:${rand(110, 220)}px;animation-duration:${d}s;animation-delay:${-rand(0, d)}s">${cloud()}</div>`,
    )
  }
}

// ---------- Prado de margaritas ----------
function meadow() {
  const el = $('meadow')
  const n = isMobile ? 14 : 28
  for (let i = 0; i < n; i++) {
    const left = ((i + rand(0.1, 0.9)) / n) * 100
    const h = rand(22, isMobile ? 60 : 85)
    const size = rand(isMobile ? 24 : 28, isMobile ? 36 : 48)
    el.insertAdjacentHTML(
      'beforeend',
      `<div class="stem-wrap" style="left:${left}%;height:${h}px;--sway:${rand(2, 5)}deg;animation-delay:${-rand(0, 4)}s">
        <div class="stem"></div>
        <div class="leaf" style="top:${h * 0.55}px;transform:rotate(-30deg)"></div>
        <div class="leaf" style="top:${h * 0.7}px;margin-left:-14px;transform:rotate(30deg) scaleX(-1)"></div>
        <div class="daisy-head absolute" style="width:${size}px;height:${size}px;left:50%;margin-left:${-size / 2}px;top:${-size / 2}px;animation-duration:${rand(14, 26)}s">
          ${daisy(Math.random() < 0.25 ? PINK : undefined)}
        </div>
      </div>`,
    )
  }
  $('bunny').innerHTML = bunny()
}

// ---------- Cositas cayendo ----------
function fallers() {
  const layer = $('falling')
  const n = isMobile ? 22 : 38
  const kinds = ['petal', 'petal', 'leaf', 'leaf', 'confetti', 'confetti', 'daisy', 'heart', 'sparkle']
  for (let i = 0; i < n; i++) {
    const kind = pick(kinds)
    const s = rand(12, 24)
    let inner
    switch (kind) {
      case 'petal':
        inner = `<div class="petal" style="width:${s}px;height:${s * 0.7}px;background:${pick(['#fbcfe8', '#f9a8d4', '#ffffff', '#fce7f3'])}"></div>`
        break
      case 'leaf':
        inner = `<div style="width:${s}px;height:${s}px">${leaf(pick(GREENS))}</div>`
        break
      case 'confetti':
        inner = `<div style="width:${s * 0.45}px;height:${s * 0.9}px;border-radius:2px;background:${pick(COLORS)}"></div>`
        break
      case 'daisy':
        inner = `<div style="width:${s + 4}px;height:${s + 4}px">${daisy()}</div>`
        break
      case 'heart':
        inner = `<div style="width:${s}px;height:${s}px">${heart(pick(['#f472b6', '#fb7185', '#f9a8d4']))}</div>`
        break
      default:
        inner = `<div style="width:${s * 0.8}px;height:${s * 0.8}px">${sparkle(pick(['#fbbf24', '#fde68a', '#f9a8d4']))}</div>`
    }
    const d = rand(10, 20)
    layer.insertAdjacentHTML(
      'beforeend',
      `<div class="faller" style="--x:${rand(0, 100)}vw;--d:${d}s;--delay:${-rand(0, d)}s;--drift:${rand(15, 60)}px;--rot:${rand(30, 180)}deg;--sd:${rand(1.6, 3.6)}s">
        <div class="${kind === 'confetti' ? 'flip' : 'flutter'}">${inner}</div>
      </div>`,
    )
  }
}

// ---------- Palomas (blancas y el par gris) ----------
function fly(html, width, { initial = false, top } = {}) {
  const layer = $('doves')
  const d = rand(15, 22)
  const el = document.createElement('div')
  el.className = `dove-fly${Math.random() < 0.35 ? ' rtl' : ''}`
  el.style.cssText = `top:${top ?? rand(8, 45)}vh;width:${width}px;--d:${d}s`
  if (initial) el.style.animationDelay = `${-rand(d * 0.15, d * 0.45)}s`
  el.innerHTML = html
  el.addEventListener('animationend', (e) => e.target === el && el.remove())
  layer.append(el)
}

function spawnDove(initial) {
  if (document.hidden || $('doves').childElementCount >= 5) return
  fly(`<div class="dove-bob" style="animation-delay:${-rand(0, 1.6)}s">${dove()}</div>`, rand(isMobile ? 55 : 70, isMobile ? 85 : 115), { initial })
}

function spawnGrayPair(top) {
  if (document.hidden) return
  const w = isMobile ? 70 : 90
  fly(
    `<div class="relative" style="height:${w * 0.9}px">
      <div class="dove-bob absolute left-0" style="top:${w * 0.35}px;width:${w}px">
        <span class="dove-tag">el panzón de Erick 🤭</span>
        ${dove({ gray: true })}
      </div>
      <div class="dove-bob absolute" style="left:${w * 1.05}px;top:0;width:${w * 0.85}px;animation-delay:-.6s">${dove({ gray: true })}</div>
    </div>`,
    w * 2,
    { top },
  )
}

function doves() {
  spawnDove(true)
  setTimeout(() => spawnDove(true), 600)
  setTimeout(() => spawnGrayPair(), 6000)
  let n = 0
  const loop = () => {
    if (++n % 4 === 0) spawnGrayPair()
    else spawnDove()
    setTimeout(loop, rand(4500, 8000))
  }
  setTimeout(loop, 3000)
}

// ---------- Explosión de confeti ----------
function burst(x, y, count = 120, power = 1, onlyHearts = false) {
  const layer = $('burst')
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div')
    p.className = 'burst-piece'
    const s = rand(8, 16)
    const r = onlyHearts ? 0.3 : Math.random()
    if (r < 0.12) p.innerHTML = `<div style="width:${s + 2}px;height:${s + 2}px">${leaf(pick(GREENS))}</div>`
    else if (r < 0.24) p.innerHTML = `<div style="width:${s + 6}px;height:${s + 6}px">${daisy()}</div>`
    else if (r < 0.36) p.innerHTML = `<div style="width:${s + 4}px;height:${s + 4}px">${heart(pick(['#f472b6', '#fb7185', '#e11d48', '#22c55e']))}</div>`
    else {
      p.style.width = `${s * 0.5}px`
      p.style.height = `${s}px`
      p.style.borderRadius = '2px'
      p.style.background = pick(COLORS)
    }
    p.style.left = `${x}px`
    p.style.top = `${y}px`
    layer.append(p)

    const angle = rand(-Math.PI * 0.95, -Math.PI * 0.05)
    const v = rand(120, 420) * power
    const dx = Math.cos(angle) * v
    const dy = Math.sin(angle) * v
    p.animate(
      [
        { transform: 'translate(-50%,-50%) rotate(0deg)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${rand(180, 540)}deg)`, opacity: 1, offset: 0.35 },
        { transform: `translate(${dx * 1.4}px, ${dy + rand(300, 600) * power}px) rotate(${rand(540, 1080)}deg)`, opacity: 0 },
      ],
      { duration: rand(1800, 3200), easing: 'cubic-bezier(.15,.7,.4,1)' },
    ).onfinish = () => p.remove()
  }
}

const burstAt = (el, count, power, hearts) => {
  const r = el.getBoundingClientRect()
  burst(r.left + r.width / 2, r.top + r.height / 2, count, power, hearts)
}

// ---------- Música ----------
function setMusicUI(playing) {
  $('music-icon').textContent = playing ? '⏸️' : '🎵'
  $('music-label').textContent = playing ? 'Pausar' : 'Música'
}
function startSong() {
  playSong(() => setMusicUI(false))
  setMusicUI(true)
}
$('music').addEventListener('click', () => {
  if (isPlaying()) {
    stopSong()
    setMusicUI(false)
  } else startSong()
})

// ---------- Decoraciones fijas ----------
function decorations() {
  document.querySelectorAll('.vine').forEach((el) => (el.innerHTML = vine()))
  document.querySelectorAll('.mini-daisy').forEach((el) => (el.innerHTML = daisy()))
  document.querySelectorAll('.corner-daisy').forEach((el, i) => {
    el.innerHTML = daisy(i % 2 ? PINK : undefined)
    el.classList.add('daisy-head')
    el.style.animationDuration = `${20 + i * 4}s`
  })

  // Corona de margaritas y hojas alrededor de la foto
  const n = 18
  let ring = ''
  for (let i = 0; i < n; i++) {
    const a = (i / n) * 360
    const isLeaf = i % 2 === 1
    const size = isLeaf ? 20 : 34
    const inner = isLeaf
      ? `<div style="transform:rotate(${a + 45}deg)" class="h-full w-full">${leaf(GREENS[i % GREENS.length])}</div>`
      : daisy(i % 4 === 2 ? PINK : undefined)
    ring += `<div class="absolute left-1/2 top-1/2" style="width:${size}px;height:${size}px;margin:${-size / 2}px 0 0 ${-size / 2}px;transform:rotate(${a}deg) translateY(calc(var(--r) * -1)) rotate(${-a}deg)">${inner}</div>`
  }
  $('wreath').insertAdjacentHTML('beforeend', `<div class="wreath-ring pointer-events-none absolute inset-0">${ring}</div>`)
}

// ---------- Escena: sobre ----------
const envEl = $('envelope')
envEl.innerHTML = envelope()
let envelopeOpened = false
function openEnvelope() {
  if (envelopeOpened) return
  envelopeOpened = true
  envEl.classList.add('open')
  setTimeout(() => burstAt(envEl, isMobile ? 70 : 120, 1), 500)
  setTimeout(() => go(1), 1700)
}
envEl.addEventListener('click', openEnvelope)
$('open-envelope').addEventListener('click', openEnvelope)

// ---------- Escena: el día que te conocí ----------
const metLines = [...document.querySelectorAll('#s-met .line')]
const metLabels = ['¿Qué pasó ese día? 👀', '¿Y luego? 🙈', '¿Y ahora? 🥺', 'Siguiente 👉']
let metStep = 0
$('met-btn').addEventListener('click', (e) => {
  if (metStep < metLines.length) {
    metLines[metStep].classList.add('shown')
    metStep++
    e.currentTarget.textContent = metLabels[metStep]
    if (metStep === metLines.length) setTimeout(() => burstAt(metLines[metStep - 1], 40, 0.6, true), 300)
  } else go(current + 1)
})
function resetMet() {
  metStep = 0
  metLines.forEach((l) => l.classList.remove('shown'))
  $('met-btn').textContent = metLabels[0]
}

// ---------- Escena: fotos y deseos (cartas que se voltean) ----------
document.addEventListener('click', (e) => {
  const card = e.target.closest('.card3d')
  if (!card || card.classList.contains('flipped')) return
  card.classList.add('flipped')
  setTimeout(() => burstAt(card, 26, 0.5), 350)
})

function wishes() {
  const list = [
    ['🎓', 'Tu carrera', 'Que acabes tu carrera y logres todo lo que te propongas.'],
    ['🧵', 'Tu costura', 'Que tu emprendimiento de costura crezca muchísimo y te vaya súper bien.'],
    ['💚', 'Nosotros', 'Que nos vaya bien a los dos y, más adelante, formar algo lindo juntos.'],
    ['😄', 'Muchas risas', 'Que nunca te falten motivos para reírte a carcajadas.'],
    ['🌿', 'Salud y paz', 'Que estés bien, tranquila y con energía para todo.'],
    ['✨', 'Todo lo bonito', 'Porque lo mereces todo, de verdad.'],
  ]
  $('wishes').innerHTML = list
    .map(([icon, title, text], i) => {
      const green = i % 2 === 1
      return `
      <div class="pop" style="--delay:${0.3 + i * 0.08}s">
        <button class="card3d wish-card h-32 w-full sm:h-40">
          <span class="card3d-inner">
            <span class="face face-front ${green ? 'bg-gradient-to-br from-emerald-100 to-lime-50 ring-emerald-200' : 'bg-gradient-to-br from-pink-100 to-rose-50 ring-rose-200'} ring-1">
              <span class="mini-daisy-lg">${daisy(green ? undefined : PINK)}</span>
              <span class="text-xs font-bold tracking-wide ${green ? 'text-emerald-600' : 'text-rose-500'} uppercase">Toca 🎁</span>
            </span>
            <span class="face face-back bg-white ring-1 ${green ? 'ring-emerald-200' : 'ring-rose-200'} px-3">
              <span class="font-script text-xl font-bold sm:text-2xl ${green ? 'text-emerald-600' : 'text-rose-500'}">${icon} ${title}</span>
              <span class="mt-1 text-[13px] leading-snug text-rose-900/80 sm:text-sm">${text}</span>
            </span>
          </span>
        </button>
      </div>`
    })
    .join('')
}

// ---------- Escena: me gustas ----------
$('like-btn').addEventListener('click', (e) => {
  e.currentTarget.classList.add('hidden')
  const reveal = $('like-reveal')
  reveal.classList.remove('hidden')
  reveal.classList.add('like-show')
  setTimeout(() => {
    burstAt(reveal.firstElementChild, isMobile ? 70 : 120, 1, true)
    heartRain()
  }, 300)
})
function heartRain() {
  const layer = $('burst')
  for (let i = 0; i < 36; i++) {
    const p = document.createElement('div')
    p.className = 'burst-piece'
    const s = rand(14, 30)
    p.style.cssText = `left:${rand(0, 100)}vw;top:-40px;width:${s}px;height:${s}px`
    p.innerHTML = heart(pick(['#f472b6', '#fb7185', '#e11d48', '#4ade80', '#22c55e']))
    layer.append(p)
    p.animate(
      [
        { transform: 'translateY(0) rotate(0)', opacity: 1 },
        { transform: `translateY(110vh) rotate(${rand(-90, 90)}deg)`, opacity: 0.8 },
      ],
      { duration: rand(2500, 4500), delay: rand(0, 1500), easing: 'ease-in', fill: 'backwards' },
    ).onfinish = () => p.remove()
  }
}
function resetLike() {
  $('like-btn').classList.remove('hidden')
  $('like-reveal').classList.add('hidden')
  $('like-reveal').classList.remove('like-show')
}

// ---------- Escena: pastel ----------
const cakeEl = $('cake')
cakeEl.innerHTML = cake()
$('blow').addEventListener('click', (e) => {
  const out = cakeEl.classList.toggle('out')
  if (out) {
    const r = cakeEl.getBoundingClientRect()
    burst(r.left + r.width / 2, r.top + r.height * 0.25, isMobile ? 90 : 160, isMobile ? 0.8 : 1.1)
    $('wish-msg').classList.remove('opacity-0')
    e.currentTarget.textContent = 'Encender otra vez 🕯️'
    $('to-final').classList.remove('hidden')
    startSong()
  } else {
    $('wish-msg').classList.add('opacity-0')
    e.currentTarget.textContent = 'Soplar las velas 🌬️'
  }
})
function resetCake() {
  cakeEl.classList.remove('out')
  $('wish-msg').classList.add('opacity-0')
  $('blow').textContent = 'Soplar las velas 🌬️'
  $('to-final').classList.add('hidden')
}

// ---------- Navegación entre escenas ----------
const scenes = [...document.querySelectorAll('.scene')]
const kiss = createKiss($('kiss'), $('kiss-caption'))
let current = -1

const hooks = {
  's-kiss': { enter: () => kiss.start(), leave: () => kiss.stop() },
  's-final': {
    enter: () => {
      setTimeout(() => burst(innerWidth / 2, innerHeight * 0.35, isMobile ? 80 : 140, 1.1), 400)
      setTimeout(() => spawnGrayPair(rand(10, 25)), 1200)
    },
  },
}

$('dots').innerHTML = scenes.map((_, i) => `<button class="dot" aria-label="Ir al paso ${i + 1}" data-go="${i}"></button>`).join('')
const dots = [...$('dots').children]

function go(i) {
  i = Math.max(0, Math.min(scenes.length - 1, i))
  if (i === current) return
  const prev = scenes[current]
  if (prev) {
    prev.classList.remove('active')
    hooks[prev.id]?.leave?.()
  }
  current = i
  const s = scenes[i]
  s.scrollTop = 0
  s.classList.add('active')
  hooks[s.id]?.enter?.()
  dots.forEach((d, j) => d.classList.toggle('on', j === i))
  $('prev').disabled = i === 0
}

function restart() {
  envelopeOpened = false
  envEl.classList.remove('open')
  resetMet()
  resetLike()
  resetCake()
  document.querySelectorAll('.card3d.flipped').forEach((c) => c.classList.remove('flipped'))
  go(0)
}

document.addEventListener('click', (e) => {
  if (e.target.closest('[data-next]')) go(current + 1)
  const d = e.target.closest('[data-go]')
  if (d) go(+d.dataset.go)
})
$('prev').addEventListener('click', () => go(current - 1))
$('restart').addEventListener('click', restart)
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') go(current + 1)
  if (e.key === 'ArrowLeft') go(current - 1)
})

// Chispitas al tocar cualquier parte
document.addEventListener('pointerdown', (e) => {
  if (e.target.closest('button, a')) return
  burst(e.clientX, e.clientY, 14, 0.45)
})

bunting()
streamers()
clouds()
meadow()
wishes()
decorations()
go(0)
if (!reduceMotion) {
  fallers()
  doves()
}
