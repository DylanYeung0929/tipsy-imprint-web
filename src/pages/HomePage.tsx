import { useRef } from "react";
import { Bluetooth, ShieldCheck, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { VantaHeroBackground } from "../components/VantaHeroBackground";
import { ScrollStory } from "../components/ScrollStory";
import { CinematicShowcase } from "../components/CinematicShowcase";
import { InteractiveLiquidGlass } from "../components/InteractiveLiquidGlass";
import { InterfaceCardSpread } from "../components/InterfaceCardSpread";
import { LiquidGlassButton } from "../components/LiquidGlassButton";
import { SceneRibbon } from "../components/SceneRibbon";
import heroImage from "../assets/generated/cinematic-hero-v2.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HomePage({ onStart }: { onStart: () => void }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap
        .timeline()
        .from(".hero-line", {
          y: 70,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".hero-detail",
          { y: 18, opacity: 0, stagger: 0.08, duration: 0.5 },
          "-=.35",
        );
      gsap.to(".hero-product", {
        scale: 1.14,
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=100%",
          scrub: 0.8,
        },
      });
      gsap.to(".hero-copy", {
        yPercent: -14,
        opacity: 0.18,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=78%",
          scrub: 0.8,
        },
      });
    },
    { scope: root },
  );
  return (
    <main ref={root}>
      <section className="relative isolate min-h-dvh overflow-hidden" data-cursor="FLOW">
        <VantaHeroBackground />
        <img
          src={heroImage}
          alt="琥珀色酒杯与智能杯底模块"
          className="hero-product absolute inset-0 size-full object-cover opacity-35 mix-blend-luminosity will-change-transform"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/5"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid min-h-dvh max-w-7xl items-center gap-10 px-5 pb-16 pt-28 lg:grid-cols-[1fr_.8fr] lg:px-8">
          <section className="hero-copy max-w-2xl">
            <p className="display-en hero-detail mb-5 text-sm text-amber-300">
              SENSE THE MOMENT
            </p>
            <h1 className="display-en text-balance text-6xl leading-[.9] text-stone-50 lg:text-8xl xl:text-9xl">
              <span className="hero-line block">SENSE THE</span>
              <span className="hero-line block">MOMENT<span className="accent-dot">.</span></span>
            </h1>
            <p className="hero-detail mt-7 max-w-lg text-pretty text-base font-semibold leading-8 text-stone-300">
              不记录你说了什么，只记住你如何与这一杯相处。
            </p>
            <LiquidGlassButton
              onClick={onStart}
              arrow
              className="hero-detail mt-9 min-h-12 px-6 font-semibold"
            >
              开始这一杯
            </LiquidGlassButton>
            <ul className="hero-detail mt-12 grid max-w-xl gap-5 border-t border-white/20 pt-7 sm:grid-cols-3">
              {[
                [Bluetooth, "无感连接", "杯底自动采集"],
                [ShieldCheck, "匿名处理", "只记录行为数据"],
                [Sparkles, "AI 生成", "把节奏变成故事"],
              ].map(([Icon, title, body]) => {
                const I = Icon as typeof Bluetooth;
                return (
                  <li key={String(title)} className="group relative min-h-20 overflow-hidden">
                    <I
                      className="absolute left-2 top-1/2 size-16 -translate-y-1/2 text-amber-300 opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-20"
                      aria-hidden="true"
                    />
                    <strong className="relative block text-sm text-stone-100">
                      {String(title)}
                    </strong>
                    <span className="relative mt-1 block text-xs text-stone-400">
                      {String(body)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
          <div className="hidden xl:block"><InteractiveLiquidGlass /></div>
        </div>
      </section>
      <CinematicShowcase />
      <InterfaceCardSpread onOpen={() => { window.location.hash = "detail-ui"; }} />
      <SceneRibbon />
      <ScrollStory />
    </main>
  );
}
