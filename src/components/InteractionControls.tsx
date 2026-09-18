import { CupSoda, GlassWater, Waves } from 'lucide-react'

export function InteractionControls({ onTrigger }: { onTrigger: (kind: 'lift' | 'swirl' | 'sip') => void }) {
  const actions = [{ kind: 'lift' as const, label: '模拟举杯', Icon: GlassWater }, { kind: 'swirl' as const, label: '模拟轻晃', Icon: Waves }, { kind: 'sip' as const, label: '模拟饮用', Icon: CupSoda }]
  return <div className="grid grid-cols-3 gap-2" aria-label="传感器演示控制">{actions.map(({kind,label,Icon}) => <button key={kind} onClick={() => onTrigger(kind)} className="liquid-button group relative flex min-h-20 flex-col items-center justify-center overflow-hidden text-xs text-stone-300"><Icon className="absolute size-14 text-amber-300 opacity-0 blur-[1px] transition-all duration-500 group-hover:scale-125 group-hover:opacity-25" aria-hidden="true" /><span className="relative z-10">{label}</span></button>)}</div>
}
