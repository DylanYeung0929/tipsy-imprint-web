import { Download, RotateCcw, Share2 } from "lucide-react";
import { toPng } from "html-to-image";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import memoryImage from "../assets/generated/night-memory-v2.png";
import { MetricStrip } from "../components/MetricStrip";
import { LiquidGlassButton } from "../components/LiquidGlassButton";
import imprintBadge from "../assets/generated/imprint-badge-v1.png";
import { CocktailVisual } from "../components/CocktailVisual";
import type { SessionSummary } from "../types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ImprintPage({ summary, onAgain }: { summary: SessionSummary; onAgain: () => void }) {
  const rootRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [notice, setNotice] = useState("");
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(".imprint-hero-image", {
        scale: 1.12,
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: ".imprint-hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.to(".imprint-hero-copy", {
        yPercent: -18,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".imprint-hero",
          start: "top top",
          end: "bottom 35%",
          scrub: 0.7,
        },
      });
      gsap.from(".imprint-card", {
        y: 72,
        opacity: 0,
        rotateX: 7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".imprint-card",
          start: "top 82%",
          end: "top 48%",
          scrub: 0.7,
        },
      });
    },
    { scope: rootRef },
  );
  const saveCard = async () => {
    if (!cardRef.current) return;
    try {
      setNotice("正在生成图片…");
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `微醺印记-${summary.imprint}.png`;
      link.href = dataUrl;
      link.click();
      setNotice("卡片已保存");
    } catch {
      setNotice("生成失败，请再试一次");
    }
  };
  const shareCard = async () => {
    const payload = {
      title: `我的微醺印记：${summary.imprint}`,
      text: `今晚的 ${summary.drink}，记录了 ${summary.liftCount} 次举杯。`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(payload);
        setNotice("分享面板已打开");
      } else {
        await navigator.clipboard.writeText(
          `${payload.title}\n${payload.text}\n${payload.url}`,
        );
        setNotice("分享文案已复制");
      }
    } catch {
      setNotice("已取消分享");
    }
  };
  return (
    <main ref={rootRef} className="min-h-dvh bg-black">
      <section className="imprint-hero relative min-h-dvh overflow-hidden" data-cursor="IMPRINT">
        <img
          src={memoryImage}
          alt="雨夜酒桌与智能杯底留下的微醺记忆"
          className="imprint-hero-image absolute inset-0 size-full object-cover will-change-transform"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/35"
          aria-hidden="true"
        />
        <div className="imprint-hero-copy relative mx-auto flex min-h-dvh max-w-7xl flex-col justify-end px-5 pb-20 lg:px-8 lg:pb-28">
          <img src={imprintBadge} alt={`${summary.imprint}三维微醺印记徽章`} className="imprint-badge absolute right-[4%] top-[18%] hidden w-[36%] max-w-[480px] drop-shadow-[0_30px_90px_rgba(217,70,239,.22)] transition-transform duration-700 hover:[transform:perspective(1000px)_rotateY(28deg)_rotateX(-10deg)_scale(1.04)] md:block" />
          <p className="display-en text-sm text-amber-300">
            YOUR NIGHT, REMEMBERED.
          </p>
          <h1 className="mt-4 text-balance text-6xl font-medium text-white md:text-8xl">
            {summary.imprint}
          </h1>
          <p className="mt-5 text-lg tracking-[.08em] text-stone-300">
            {summary.liftCount} 次举杯&nbsp;&nbsp;{Math.floor(summary.durationSeconds/60)}:{String(summary.durationSeconds%60).padStart(2,"0")}
          </p>
        </div>
      </section>
      <section className="px-5 py-24 lg:px-8 lg:py-32 [perspective:1200px]">
        <div
          ref={cardRef}
          className="imprint-card mx-auto grid max-w-5xl overflow-hidden border border-white/10 bg-[#12100f] lg:grid-cols-[1.05fr_.95fr]"
        >
          <div className="relative grid min-h-[28rem] place-items-center bg-[radial-gradient(circle,#322017,transparent_68%)]"><CocktailVisual index={summary.drinkIndex} alt={summary.drink} className="size-[52%] max-h-[22rem] max-w-[22rem]"/><span className="absolute bottom-7 left-7 display-en text-xl text-white">{summary.drink}</span></div>
          <section className="flex flex-col justify-between p-7 sm:p-10">
            <div>
              <p className="display-en text-sm text-amber-300">
                PERSONAL IMPRINT
              </p>
              <h1 className="mt-4 text-balance font-serif text-6xl text-stone-50">
                {summary.imprint}
              </h1>
              <p className="mt-7 text-pretty leading-8 text-stone-300">
                {summary.liftCount} 次举杯，{summary.swirlCount} 次轻晃，{summary.sipCount} 次饮用。AI 将这些动作解释为“{summary.imprint}”。
              </p>
            </div>
            <div className="mt-10">
              <MetricStrip
                metrics={[
                  { label: "举杯次数", value: String(summary.liftCount) },
                  { label: "轻晃次数", value: String(summary.swirlCount) },
                  { label: "相处时长", value: `${Math.floor(summary.durationSeconds/60)}:${String(summary.durationSeconds%60).padStart(2,"0")}` },
                ]}
              />
              <p className="mt-6 text-xs text-stone-500">
                2026.09.14&nbsp;&nbsp;上海&nbsp;&nbsp;山海拾光
              </p>
            </div>
          </section>
        </div>
        <div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-3">
          <LiquidGlassButton
            onClick={saveCard}
            className="min-h-11 px-5 text-sm"
          >
            <Download className="size-4" aria-hidden="true" />
            保存卡片
          </LiquidGlassButton>
          <LiquidGlassButton
            onClick={shareCard}
            className="min-h-11 px-5 text-sm"
          >
            <Share2 className="size-4" aria-hidden="true" />
            分享印记
          </LiquidGlassButton>
          <LiquidGlassButton
            onClick={onAgain}
            className="min-h-11 px-5 text-sm"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            再来一杯
          </LiquidGlassButton>
        </div>
        {notice ? (
          <p role="status" className="mt-3 text-center text-sm text-amber-200">
            {notice}
          </p>
        ) : null}
      </section>
    </main>
  );
}
