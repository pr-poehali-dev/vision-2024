import { useCallback } from "react"

let sharedCtx: AudioContext | null = null

function getCtx() {
  if (!sharedCtx) sharedCtx = new AudioContext()
  return sharedCtx
}

export function useClickSound() {
  const play = useCallback(() => {
    const ac = getCtx()
    const t = ac.currentTime
    const notes = [659, 880]
    notes.forEach((freq, i) => {
      const osc = ac.createOscillator()
      const gain = ac.createGain()
      osc.connect(gain)
      gain.connect(ac.destination)
      osc.type = "sine"
      osc.frequency.setValueAtTime(freq, t + i * 0.06)
      gain.gain.setValueAtTime(0, t + i * 0.06)
      gain.gain.linearRampToValueAtTime(0.055, t + i * 0.06 + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.14)
      osc.start(t + i * 0.06)
      osc.stop(t + i * 0.06 + 0.16)
    })
  }, [])

  return play
}

export function playWelcomeSound() {
  const ac = getCtx()
  const t = ac.currentTime

  // Приятная мелодия: мягкие синус + небольшой реверб через delay
  const melody = [
    { freq: 392, start: 0,    dur: 0.28 },  // G4
    { freq: 523, start: 0.22, dur: 0.28 },  // C5
    { freq: 659, start: 0.44, dur: 0.28 },  // E5
    { freq: 784, start: 0.66, dur: 0.22 },  // G5
    { freq: 1047, start: 0.86, dur: 0.55 }, // C6 - долгая финальная
  ]

  melody.forEach(({ freq, start, dur }) => {
    // Основной тон (sine)
    const osc = ac.createOscillator()
    const gain = ac.createGain()
    osc.connect(gain)
    gain.connect(ac.destination)
    osc.type = "sine"
    osc.frequency.setValueAtTime(freq, t + start)
    gain.gain.setValueAtTime(0, t + start)
    gain.gain.linearRampToValueAtTime(0.042, t + start + 0.025)
    gain.gain.setValueAtTime(0.042, t + start + dur - 0.1)
    gain.gain.exponentialRampToValueAtTime(0.001, t + start + dur)
    osc.start(t + start)
    osc.stop(t + start + dur + 0.01)

    // Обертон для теплоты
    const osc2 = ac.createOscillator()
    const gain2 = ac.createGain()
    osc2.connect(gain2)
    gain2.connect(ac.destination)
    osc2.type = "sine"
    osc2.frequency.setValueAtTime(freq * 2, t + start)
    gain2.gain.setValueAtTime(0, t + start)
    gain2.gain.linearRampToValueAtTime(0.012, t + start + 0.03)
    gain2.gain.exponentialRampToValueAtTime(0.001, t + start + dur * 0.7)
    osc2.start(t + start)
    osc2.stop(t + start + dur)
  })
}

export function tryPlayWelcome() {
  if (sessionStorage.getItem("welcomed")) return
  sessionStorage.setItem("welcomed", "1")
  setTimeout(() => playWelcomeSound(), 350)
}
