import { useEffect, useRef } from 'react'
import poster from '../assets/generated/vanta-liquid-hero.png'

type VantaEffect = { destroy: () => void }

export function VantaHeroBackground() {
  const hostRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!hostRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let effect: VantaEffect | undefined
    let active = true
    Promise.all([import('three'), import('vanta/dist/vanta.waves.min')]).then(([THREE, module]) => {
      if (!active || !hostRef.current) return
      effect = module.default({ el: hostRef.current, THREE, mouseControls: true, touchControls: true, gyroControls: false, minHeight: 500, minWidth: 300, scale: 1, scaleMobile: 1, color: 0x2b170b, shininess: 48, waveHeight: 14, waveSpeed: .55, zoom: .78 })
    }).catch(() => undefined)
    return () => { active = false; effect?.destroy() }
  }, [])
  return <div ref={hostRef} className="absolute inset-0 overflow-hidden" aria-hidden="true"><img src={poster} alt="" className="size-full object-cover opacity-45" /></div>
}
