import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import type { Route } from "../types";
import { Brand } from "./Brand";

const items: { route: Route; en: string; zh: string; note: string }[] = [
  { route: "home", en: "ORIGIN", zh: "项目首页", note: "认识杯底印记" },
  { route: "session", en: "SENSE", zh: "实时感知", note: "模拟杯底传感" },
  { route: "imprint", en: "REMEMBER", zh: "微醺印记", note: "查看个人故事" },
  { route: "dashboard", en: "INSIGHT", zh: "数据看板", note: "观察场域节奏" },
];

export function AppHeader({ route, navigate }: { route: Route; navigate: (route: Route) => void }) {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const go = (next: Route) => { navigate(next); setOpen(false); setMobile(false); };
  return <header className="fixed inset-x-0 top-0 z-30 pt-[env(safe-area-inset-top)]">
    <div className="border-b border-white/10 bg-black/70 backdrop-blur-xl"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
      <button onClick={() => go("home")} className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300" aria-label="返回首页"><Brand /></button>
      <button className="hidden min-h-10 items-center gap-2 rounded-xl border border-white/15 bg-white/[.06] px-4 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 md:flex" onPointerEnter={() => setOpen(true)} onFocus={() => setOpen(true)} aria-expanded={open}>EXPLORE <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} /></button>
      <button className="grid size-10 place-items-center rounded-xl border border-white/15 md:hidden" onClick={() => setMobile(!mobile)} aria-label="打开导航">{mobile ? <X/> : <Menu/>}</button>
    </div></div>
    <AnimatePresence>{(open || mobile) && <motion.div initial={{ opacity: 0, y: -18, clipPath: "inset(0 0 100% 0 round 0 0 18px 18px)" }} animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 0 0 18px 18px)" }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .28, ease: [0.22,1,0.36,1] }} onPointerLeave={() => setOpen(false)} className="border-b border-white/10 bg-[#090909]/95 backdrop-blur-2xl"><nav className="mx-auto grid max-w-7xl gap-px px-5 py-5 md:grid-cols-5 lg:px-8" aria-label="主要导航">{items.map(item => <button key={item.route} onClick={() => go(item.route)} className={`group rounded-xl p-5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${route === item.route ? "bg-white/10" : "hover:bg-white/[.06]"}`}><span className="block text-lg font-bold tracking-[.08em] text-white">{item.en}<span className="text-amber-300">.</span></span><span className="mt-3 block text-sm font-semibold text-white/65">{item.zh}</span><span className="mt-1 block text-xs text-white/35">{item.note}</span></button>)}<a href={import.meta.env.VITE_MERCHANT_URL ?? "https://tipsy-merchant.pages.dev"} target="_blank" rel="noreferrer" onClick={() => { setOpen(false); setMobile(false); }} className="group rounded-xl border border-amber-400/30 bg-amber-400/[.08] p-5 text-left transition-colors hover:bg-amber-400/[.16] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"><span className="block text-lg font-bold tracking-[.08em] text-white">MERCHANT<span className="text-amber-300">.</span></span><span className="mt-3 block text-sm font-semibold text-white/65">商家注册</span><span className="mt-1 block text-xs text-white/35">数据台 · 酒吧老板入口</span></a></nav></motion.div>}</AnimatePresence>
  </header>;
}
