import { motion } from 'motion/react'

export function DrinkVisual({ active = false }: { active?: boolean }) {
  return <div className="relative mx-auto aspect-square w-full max-w-[28rem] overflow-hidden rounded-full border border-amber-200/15 bg-[#160f0b]" aria-label="琥珀色饮品互动视觉">
    <div className="absolute inset-8 rounded-full border border-amber-200/10" />
    <motion.div animate={active ? { scale: [1, 1.04, 1], opacity: [0.7, 1, 0.7] } : undefined} transition={{ duration: 2.4, repeat: Infinity }} className="absolute inset-[17%] rounded-full border border-amber-400/30" />
    <div className="absolute inset-x-[22%] bottom-[18%] top-[12%] overflow-hidden rounded-b-[42%] rounded-t-[12%] border border-white/30 bg-white/5 shadow-[inset_0_0_20px_rgba(255,255,255,.08)]">
      <motion.div animate={active ? { y: ['4%', '-2%', '4%'], rotate: [-1.5, 1.5, -1.5] } : undefined} transition={{ duration: 2.4, repeat: Infinity }} className="absolute inset-x-[-15%] bottom-[-8%] h-[68%] rounded-[46%] bg-[#a95019] shadow-[0_-18px_45px_rgba(215,132,45,.25)]" />
      <span className="absolute left-[25%] top-[51%] size-12 rotate-12 rounded-md border border-white/30 bg-white/10" />
      <span className="absolute right-[20%] top-[61%] size-10 -rotate-12 rounded-md border border-white/20 bg-white/10" />
    </div>
    {active ? <div className="absolute inset-0 motion-reduce:hidden"><span className="spark left-[28%] top-[36%]" /><span className="spark right-[27%] top-[31%] [animation-delay:.6s]" /><span className="spark right-[35%] top-[22%] [animation-delay:1.1s]" /></div> : null}
  </div>
}
