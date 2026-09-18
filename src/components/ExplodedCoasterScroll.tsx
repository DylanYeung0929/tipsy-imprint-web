import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import topLayer from "../assets/generated/layer-top-v3.png";
import pressureLayer from "../assets/generated/layer-pressure-v3.png";
import ringLayer from "../assets/generated/layer-ring-v3.png";
import boardLayer from "../assets/generated/layer-board-v3.png";
import baseLayer from "../assets/generated/layer-base-v3.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const layers = [
  { src: topLayer, number: "01", name: "防滑盖板", en: "ANTI-SLIP TOP", detail: "适配不同杯型，隔绝水汽与杯壁冷凝，让重量变化稳定传递至感知层。", y: -250 },
  { src: pressureLayer, number: "02", name: "压力感知膜", en: "PRESSURE FILM", detail: "连续读取杯中余量变化，形成饮用量、放置状态与饮用节奏的基础数据。", y: -125 },
  { src: ringLayer, number: "03", name: "状态光环", en: "STATUS RING", detail: "用克制的环形光反馈连接、识别与生成状态，不打断真实饮用过程。", y: 0 },
  { src: boardLayer, number: "04", name: "IMU 与边缘计算", en: "MOTION CORE", detail: "融合加速度与姿态数据，识别举杯、轻晃、碰杯、饮用和放下动作。", y: 135 },
  { src: baseLayer, number: "05", name: "金属结构底座", en: "STRUCTURAL BASE", detail: "承托感知组件并隔离桌面扰动，为传感器提供稳定、可靠的物理基准。", y: 270 },
];

export function ExplodedCoasterScroll() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const images = gsap.utils.toArray<HTMLElement>(".exploded-layer");
      const cards = gsap.utils.toArray<HTMLElement>(".layer-detail");
      gsap.set(images, { opacity: .72, filter: "brightness(.76) saturate(.72)", transformOrigin: "50% 50%" });
      gsap.set(cards, { autoAlpha: 0, y: 30 });
      gsap.set(".layer-panel", { autoAlpha: 0, x: 36 });

      const timeline = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=520%", pin: stage.current, scrub: .7, anticipatePin: 1, invalidateOnRefresh: true },
      });
      timeline
        .to(".assembly-heading", { opacity: 0, y: -24, duration: .35 })
        .to(".exploded-assembly", { xPercent: -34, scale: .78, duration: .9, ease: "power2.inOut" }, .1)
        .to(".layer-panel", { autoAlpha: 1, x: 0, duration: .35 }, .68);

      layers.forEach((_, index) => {
        const start = 1.05 + index * .82;
        if (index > 0) timeline.to(cards[index - 1], { autoAlpha: 0, y: -22, duration: .18 }, start);
        timeline
          .to(images, { opacity: .16, filter: "brightness(.42) saturate(.35)", duration: .2 }, start)
          .to(images[index], { opacity: 1, scale: 1.055, filter: "brightness(1.18) saturate(1.18) drop-shadow(0 0 28px rgba(251,191,36,.28))", duration: .28 }, start + .04)
          .fromTo(cards[index], { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: .3 }, start + .08)
          .to({}, { duration: .34 });
      });
    });
    return () => media.revert();
  }, { scope: root });

  return <section ref={root} className="relative bg-black" aria-labelledby="assembly-title">
    <div ref={stage} className="relative min-h-dvh overflow-hidden border-y border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_58%,rgba(245,158,11,.12),transparent_30%),radial-gradient(circle_at_76%_30%,rgba(34,211,238,.07),transparent_24%)]" />
      <header className="assembly-heading absolute inset-x-5 top-24 z-30 text-center">
        <p className="display-en text-sm text-amber-300">INSIDE THE SENSOR</p>
        <h2 id="assembly-title" className="display-en mt-3 text-5xl leading-none text-white md:text-7xl">FIVE LAYERS<span className="accent-dot">.</span></h2>
        <p className="mt-4 text-sm text-white/45">继续滚动，逐层查看感知结构</p>
      </header>

      <div className="exploded-assembly absolute left-1/2 top-[55%] h-[680px] w-[min(76vw,980px)] -translate-x-1/2 -translate-y-1/2 will-change-transform" aria-label="智能杯底五层分解结构">
        {layers.map((layer,index)=><img key={layer.number} src={layer.src} alt={layer.name} style={{ transform:`translate(-50%, calc(-50% + ${layer.y}px))`, zIndex:layers.length-index }} className="exploded-layer pointer-events-none absolute left-1/2 top-1/2 w-full object-contain will-change-[opacity,filter,transform]"/>)}
      </div>

      <aside className="layer-panel absolute right-[7%] top-1/2 z-30 w-[30%] max-w-md -translate-y-1/2">
        <p className="display-en text-xs text-white/35">LAYER DETAIL</p>
        <div className="relative mt-8 min-h-64">
          {layers.map(layer=><article key={layer.number} className="layer-detail invisible absolute inset-0 border-t border-white/15 pt-6 opacity-0"><span className="display-en text-sm text-amber-300">{layer.number} / 05</span><p className="display-en mt-5 text-sm tracking-[.14em] text-white/40">{layer.en}</p><h3 className="mt-2 text-4xl font-bold text-white">{layer.name}</h3><p className="mt-6 text-base leading-8 text-white/58">{layer.detail}</p></article>)}
        </div>
      </aside>

      <div className="absolute inset-x-5 bottom-8 grid gap-3 md:hidden">{layers.map(layer=><div key={layer.number} className="rounded-xl border border-white/10 bg-black/70 p-4"><span className="text-xs text-amber-300">{layer.number}</span><strong className="ml-3 text-white">{layer.name}</strong></div>)}</div>
    </div>
  </section>;
}
