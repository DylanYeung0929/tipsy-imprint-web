import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import smartGlass from '../assets/generated/gsap-smart-glass.png'
import type { ActionKind } from '../types'

gsap.registerPlugin(useGSAP)

export function SmartGlassMotion({ pulse = false, action }: { pulse?: boolean; action?: { kind: ActionKind; id: number } | null; drinkIndex: number }) {
  const root = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.fromTo('.smart-glass', { y: 16, opacity: 0, rotate: -1.5 }, { y: 0, opacity: 1, rotate: 0, duration: 1.25, ease: 'power3.out' })
    if (pulse) gsap.fromTo('.sensor-ring', { scale: .76, opacity: .65 }, { scale: 1.45, opacity: 0, duration: 2.4, repeat: -1, repeatDelay: 1.8, ease: 'power2.out' })
  }, { scope: root, dependencies: [pulse] })
  useGSAP(() => {
    if (!action || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const animations = {
      lift: { y: -72, rotate: -2, duration: .82, yoyo: true, repeat: 1 },
      swirl: { rotate: 12, x: 14, duration: .58, yoyo: true, repeat: 3 },
      sip: { y: -30, rotate: -10, scale: .94, duration: .78, yoyo: true, repeat: 1 },
    }
    gsap.to('.smart-glass', { ...animations[action.kind], ease: 'power2.inOut', overwrite: true })
    gsap.fromTo('.sensor-ring', { scale: .7, opacity: 1 }, { scale: 1.65, opacity: 0, duration: 1.4 })
  }, { scope: root, dependencies: [action?.id] })
  return <div ref={root} className="relative mx-auto aspect-square w-full max-w-[32rem] overflow-hidden" aria-label="智能杯底传感模块产品视觉"><img src={smartGlass} alt="智能杯底传感模块" className="smart-glass absolute inset-0 size-full object-contain"/><span className="sensor-ring absolute inset-[26%] rounded-full border border-amber-300/60" aria-hidden="true" /></div>
}
