// "Cumpleaños feliz" en tono de cajita musical (Web Audio, sin archivos)
const NOTES = { G4: 392, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99 }
const SONG = [
  ['G4', 0.75], ['G4', 0.25], ['A4', 1], ['G4', 1], ['C5', 1], ['B4', 2],
  ['G4', 0.75], ['G4', 0.25], ['A4', 1], ['G4', 1], ['D5', 1], ['C5', 2],
  ['G4', 0.75], ['G4', 0.25], ['G5', 1], ['E5', 1], ['C5', 1], ['B4', 1], ['A4', 2],
  ['F5', 0.75], ['F5', 0.25], ['E5', 1], ['C5', 1], ['D5', 1], ['C5', 3],
]
const BEAT = 0.42

let ctx = null

export const isPlaying = () => ctx !== null

export function stopSong() {
  if (ctx) {
    ctx.close()
    ctx = null
  }
}

export function playSong(onEnd) {
  stopSong()
  const current = (ctx = new AudioContext())
  const master = ctx.createGain()
  master.gain.value = 0.22
  master.connect(ctx.destination)

  let t = ctx.currentTime + 0.1
  for (const [note, beats] of SONG) {
    const len = beats * BEAT
    for (const [type, mult, vol] of [['sine', 1, 1], ['triangle', 2, 0.18]]) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = type
      osc.frequency.value = NOTES[note] * mult
      gain.gain.setValueAtTime(0.0001, t)
      gain.gain.exponentialRampToValueAtTime(vol, t + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + len + 0.6)
      osc.connect(gain).connect(master)
      osc.start(t)
      osc.stop(t + len + 0.7)
    }
    t += len
  }

  setTimeout(() => {
    if (ctx === current) {
      stopSong()
      onEnd?.()
    }
  }, (t - ctx.currentTime + 0.8) * 1000)
}
