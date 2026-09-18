import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import cards from "../assets/generated/interface-cards-v1.png";
import { LiquidGlassButton } from "./LiquidGlassButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function InterfaceCardSpread({ onOpen }: { onOpen: () => void }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".interface-card", { xPercent: 115, rotateY: -55, rotateZ: 4 }, { xPercent: (i) => i * -48, rotateY: (i) => 10 - i * 5, rotateZ: (i) => i * -1.4, stagger: .05, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "+=150%", scrub: .9, pin: true } });
    });
    return () => mm.revert();
  }, { scope: root });
  return <section ref={root} className="relative min-h-dvh overflow-hidden bg-[#07090a]" data-cursor="EXPLORE"><div className="mx-auto grid min-h-dvh max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-[.72fr_1.28fr] lg:px-8"><div className="relative z-20"><h2 className="display-en text-6xl leading-[.9] text-white md:text-8xl">ONE NIGHT<br/>FOUR VIEWS<span className="accent-dot">.</span></h2><p className="mt-6 max-w-sm text-sm leading-7 text-white/55">小程序、实时传感、生成印记与酒馆数据，在同一个体验中自然衔接。</p><LiquidGlassButton arrow onClick={onOpen} className="mt-8 min-h-12 px-5 text-sm font-semibold">CHECK IT OUT</LiquidGlassButton></div><div className="relative h-[540px] [perspective:1600px]">{[0,1,2,3].map((index) => <div key={index} className="interface-card absolute right-0 top-1/2 aspect-[.62] w-[250px] -translate-y-1/2 overflow-hidden rounded-xl border border-white/15 bg-black shadow-2xl will-change-transform" style={{ zIndex: 10-index }}><img src={cards} alt={["小程序首页","实时传感流","微醺印记","酒馆数据看板"][index]} className="h-full w-[400%] max-w-none object-cover" style={{ transform: `translateX(-${index*25}%)` }} /></div>)}</div></div></section>;
}
