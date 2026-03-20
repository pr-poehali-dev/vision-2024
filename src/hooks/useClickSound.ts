import { useCallback, useRef } from "react"

export function useClickSound() {
  const ctx = useRef<AudioContext | null>(null)

  const play = useCallback(() => {
    if (!ctx.current) {
      ctx.current = new AudioContext()
    }
    const ac = ctx.current
    const osc = ac.createOscillator()
    const gain = ac.createGain()

    osc.connect(gain)
    gain.connect(ac.destination)

    osc.type = "sine"
    osc.frequency.setValueAtTime(880, ac.currentTime)
    osc.frequency.exponentialRampToValueAtTime(440, ac.currentTime + 0.08)

    gain.gain.setValueAtTime(0.07, ac.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.12)

    osc.start(ac.currentTime)
    osc.stop(ac.currentTime + 0.12)
  }, [])

  return play
}
