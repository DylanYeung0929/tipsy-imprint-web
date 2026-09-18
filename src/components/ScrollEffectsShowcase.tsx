import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import glassAsset from "../assets/generated/interactive-empty-glass-v1.png";
import aiFlow from "../assets/generated/ai-imprint-flow-v4.png";
import { LiquidGlassButton } from "./LiquidGlassButton";
import { IPhone3D } from "./IPhone3D";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ScrollEffectsShowcase() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".clink-stage",
              start: "top top",
              end: "+=150%",
              pin: true,
              scrub: 0.8,
            },
          })
          .fromTo(".clink-left", { xPercent: -72, rotateZ: -16, rotateY: 18 }, { xPercent: -8, rotateZ: 8, rotateY: 0, duration: .72, ease: "power2.in" }, 0)
          .fromTo(".clink-right", { xPercent: 72, rotateZ: 16, rotateY: -18 }, { xPercent: 8, rotateZ: -8, rotateY: 0, duration: .72, ease: "power2.in" }, 0)
          .fromTo(".clink-impact", { scale: .25, opacity: 0 }, { scale: 1.7, opacity: .75, duration: .18, yoyo: true, repeat: 1 }, .7)
          .fromTo(
            ".clink-copy",
            { opacity: 0, y: 36 },
            { opacity: 1, y: 0, duration: 0.35 },
            0.68,
          );

        gsap.fromTo(
          ".ai-reveal",
          { clipPath: "inset(0 100% 0 0)", scale: 1.08 },
          {
            clipPath: "inset(0 0% 0 0)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".ai-stage",
              start: "top 78%",
              end: "bottom 30%",
              scrub: 0.8,
            },
          },
        );
        gsap.fromTo(
          ".ai-copy",
          { xPercent: -12, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".ai-stage",
              start: "top 65%",
              end: "center 50%",
              scrub: 0.6,
            },
          },
        );

        gsap.fromTo(
          ".result-copy",
          { y: 64, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".result-stage",
              start: "top 62%",
              end: "center 48%",
              scrub: 0.7,
            },
          },
        );
      });
      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="滚动体验章节">
      <article className="clink-stage relative min-h-dvh overflow-hidden border-t border-white/10" data-cursor="CLINK">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#2b1710_0%,#070707_62%)]" />
        <div className="absolute inset-x-0 top-[5%] flex h-[76%] items-center justify-center [perspective:1300px]">
          <img src={glassAsset} alt="左侧碰杯酒杯" className="clink-left h-full w-1/2 object-contain drop-shadow-[0_25px_55px_rgba(245,158,11,.25)] will-change-transform" />
          <img src={glassAsset} alt="右侧碰杯酒杯" className="clink-right h-full w-1/2 object-contain drop-shadow-[0_25px_55px_rgba(34,211,238,.18)] will-change-transform" />
          <span className="clink-impact absolute left-1/2 top-[43%] size-28 -translate-x-1/2 rounded-[50%] border border-amber-200/70 bg-amber-200/15" aria-hidden="true" />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/25"
          aria-hidden="true"
        />
        <div className="clink-copy relative mx-auto flex min-h-dvh max-w-7xl items-end px-5 pb-20 opacity-0 lg:px-8 lg:pb-28">
          <div className="max-w-3xl">
            <p className="text-base font-medium tracking-[.08em] text-amber-300">碰杯，被理解。</p>
            <h2 className="display-en mt-4 text-balance text-7xl leading-none text-white md:text-9xl">CLINK<span className="accent-dot">.</span></h2>
            <p className="mt-6 max-w-md text-lg text-stone-300">0.2 秒，识别一次互动。</p>
            <LiquidGlassButton arrow onClick={() => { window.location.hash = "detail-clink"; }} className="mt-7 min-h-11 px-5 text-sm">CHECK IT OUT</LiquidGlassButton>
          </div>
        </div>
      </article>

      <article className="ai-stage relative min-h-[125dvh] overflow-hidden border-t border-white/10 bg-black" data-cursor="CREATE">
        <img
          src={aiFlow}
          alt="传感信号转化为透明液态印记"
          loading="lazy"
          className="absolute inset-0 size-full object-cover opacity-30"
        />
        <img
          src={aiFlow}
          alt=""
          className="ai-reveal absolute inset-0 size-full object-cover will-change-[clip-path,transform]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/15 to-transparent"
          aria-hidden="true"
        />
        <div className="ai-copy relative mx-auto flex min-h-[125dvh] max-w-7xl items-center px-5 lg:px-8">
          <div className="max-w-xl">
            <p className="text-base font-medium tracking-[.08em] text-cyan-200">让信号获得形状。</p>
            <h2 className="display-en mt-4 text-balance text-6xl leading-none text-white md:text-8xl">INTERPRET<span className="accent-dot">.</span></h2>
            <p className="mt-6 max-w-md text-lg text-stone-300">重量塑造轮廓，动作留下纹理。</p>
            <LiquidGlassButton arrow onClick={() => { window.location.hash = "detail-ai"; }} className="mt-7 min-h-11 px-5 text-sm">CHECK IT OUT</LiquidGlassButton>
          </div>
        </div>
      </article>

      <article
        className="result-stage relative min-h-[145dvh] overflow-hidden border-t border-white/10 bg-black [perspective:1600px]"
        data-cursor="OPEN"
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty("--phone-x", `${((event.clientX - rect.left) / rect.width - .5) * 12}deg`);
          event.currentTarget.style.setProperty("--phone-y", `${-((event.clientY - rect.top) / rect.height - .5) * 8}deg`);
        }}
      >
        <div className="sticky top-0 min-h-dvh overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/45 to-transparent" aria-hidden="true" />
          <div className="result-copy relative z-20 mx-auto flex min-h-dvh max-w-7xl items-center px-5 lg:px-8">
            <div className="max-w-lg">
              <p className="text-base font-medium tracking-[.08em] text-amber-300">今晚，已经被记住。</p>
              <h2 className="display-en mt-4 text-balance text-6xl leading-none text-white md:text-8xl">REMEMBER<span className="accent-dot">.</span></h2>
              <p className="mt-6 max-w-sm text-lg text-stone-300">没有录音。只有你的行为故事。</p>
              <LiquidGlassButton arrow onClick={() => { window.location.hash = "detail-memory"; }} className="mt-7 min-h-11 px-5 text-sm">CHECK IT OUT</LiquidGlassButton>
            </div>
          </div>
          <div className="phone-follow pointer-events-none absolute right-[18%] top-[8vh] z-10 h-[76vh] w-[38%] [transform:perspective(1600px)_rotateX(var(--phone-y,0deg))_rotateY(var(--phone-x,0deg))] transition-transform duration-200 ease-out max-lg:right-[10%] max-lg:w-[46%]">
            <IPhone3D />
          </div>
        </div>
      </article>
    </section>
  );
}
