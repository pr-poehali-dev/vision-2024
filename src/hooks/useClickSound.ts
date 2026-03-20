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

  const melody = [
    { freq: 523, start: 0,    dur: 0.18 },
    { freq: 659, start: 0.16, dur: 0.18 },
    { freq: 784, start: 0.32, dur: 0.22 },
    { freq: 1047, start: 0.52, dur: 0.38 },
  ]

  melody.forEach(({ freq, start, dur }) => {
    const osc = ac.createOscillator()
    const gain = ac.createGain()
    osc.connect(gain)
    gain.connect(ac.destination)
    osc.type = "sine"
    osc.frequency.setValueAtTime(freq, t + start)
    gain.gain.setValueAtTime(0, t + start)
    gain.gain.linearRampToValueAtTime(0.05, t + start + 0.02)
    gain.gain.setValueAtTime(0.05, t + start + dur - 0.07)
    gain.gain.exponentialRampToValueAtTime(0.001, t + start + dur)
    osc.start(t + start)
    osc.stop(t + start + dur + 0.01)
  })
}
