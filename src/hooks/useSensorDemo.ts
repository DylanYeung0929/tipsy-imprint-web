import { useCallback, useEffect, useRef, useState } from 'react'
import type { ActionKind, InteractionEvent, SensorPoint } from '../types'

const seed: SensorPoint[] = Array.from({ length: 28 }, (_, index) => ({ value: 72 - index * .18 + Math.sin(index / 2) * .5, motion: .15 + Math.abs(Math.sin(index)) * .08 }))

export function useSensorDemo() {
  const [points, setPoints] = useState(seed)
  const [liftCount, setLiftCount] = useState(0)
  const [swirlCount, setSwirlCount] = useState(0)
  const [sipCount, setSipCount] = useState(0)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [events, setEvents] = useState<InteractionEvent[]>([])
  const phaseRef = useRef(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      phaseRef.current += .38
      setPoints(current => [...current.slice(1), { value: Math.max(0, current.at(-1)!.value - .025 + Math.sin(phaseRef.current) * .06), motion: .12 + Math.abs(Math.sin(phaseRef.current * 1.7)) * .12 }])
    }, 420)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => { const id=window.setInterval(()=>setElapsedSeconds(value=>value+1),1000); return()=>window.clearInterval(id) },[])

  const trigger = useCallback((kind: ActionKind) => {
    const config = {
      lift: { label: '举起杯子', delta: 0, motion: 1.15 },
      swirl: { label: '轻轻摇晃', delta: 0, motion: 1.8 },
      sip: { label: '饮用一口', delta: -3.8, motion: .85 },
    }[kind]
    if (kind === 'lift') setLiftCount(value => value + 1)
    if (kind === 'swirl') setSwirlCount(value => value + 1)
    if (kind === 'sip') setSipCount(value => value + 1)
    setEvents(current => [{ id: Date.now(), label: config.label, detail: '刚刚' }, ...current.slice(0, 3)])
    setPoints(current => [...current.slice(4), ...Array.from({ length: 4 }, (_, index) => ({ value: Math.max(0, current.at(-1)!.value + config.delta * ((index + 1) / 4)), motion: config.motion * (1 - index * .14) }))])
  }, [])

  return { points, liftCount, swirlCount, sipCount, elapsedSeconds, events, trigger }
}
