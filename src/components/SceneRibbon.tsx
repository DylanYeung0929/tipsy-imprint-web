import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import hero from "../assets/generated/cinematic-hero-v2.png";
import clink from "../assets/generated/clink-contact-v4.png";
import memory from "../assets/generated/night-memory-v2.png";
import sensor from "../assets/generated/ai-imprint-flow-v4.png";
import story from "../assets/generated/lenis-story-scene.png";

const scenes = [hero, clink, memory, sensor, story];

export function SceneRibbon() {
  const viewport = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, x: 0, scroll: 0, moved: false });
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => {
    let frame = 0;
    const tick = () => { const el=viewport.current; if(el && !drag.current.active && !selected){ el.scrollLeft += .45; if(el.scrollLeft >= el.scrollWidth/2) el.scrollLeft=0; } frame=requestAnimationFrame(tick); };
    tick(); return () => cancelAnimationFrame(frame);
  }, [selected]);
  return <section className="border-y border-white/10 bg-black/70 py-5" aria-label="产品场景长廊" data-cursor="DRAG"><div ref={viewport} className="cursor-grab overflow-hidden active:cursor-grabbing" onPointerDown={e=>{drag.current={active:true,x:e.clientX,scroll:viewport.current?.scrollLeft??0,moved:false};e.currentTarget.setPointerCapture(e.pointerId)}} onPointerMove={e=>{if(!drag.current.active||!viewport.current)return;const delta=e.clientX-drag.current.x;drag.current.moved=Math.abs(delta)>5;viewport.current.scrollLeft=drag.current.scroll-delta}} onPointerUp={e=>{drag.current.active=false;e.currentTarget.releasePointerCapture(e.pointerId)}}><div className="flex w-max gap-5 px-5">{[...scenes,...scenes].map((src,index)=><button key={`${src}-${index}`} onClick={()=>{if(!drag.current.moved)setSelected(src)}} className="group relative h-56 w-[22rem] shrink-0 overflow-hidden rounded-xl border border-white/10 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"><img src={src} alt={index<scenes.length?"杯底印记产品使用场景":""} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" draggable={false}/><span className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent"/><span className="absolute bottom-4 left-4 text-xs font-bold tracking-[.14em] text-white/0 transition-colors group-hover:text-white">OPEN SCENE</span></button>)}</div></div><AnimatePresence>{selected&&<motion.div className="fixed inset-0 z-[70] grid place-items-center bg-black/85 p-5 backdrop-blur-xl" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)}><motion.img src={selected} alt="放大的产品场景" className="max-h-[85dvh] max-w-[92vw] rounded-xl object-contain" initial={{scale:.86,rotateX:8}} animate={{scale:1,rotateX:0}} exit={{scale:.9}} onClick={e=>e.stopPropagation()}/><button onClick={()=>setSelected(null)} className="liquid-button absolute right-6 top-6 grid size-11 place-items-center" aria-label="关闭大图"><X className="size-5"/></button></motion.div>}</AnimatePresence></section>;
}
