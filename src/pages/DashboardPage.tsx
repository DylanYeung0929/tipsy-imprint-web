import { Activity, GlassWater, Radio, Timer } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import dashboardImage from "../assets/generated/night-memory-v2.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const drinks = [
  {
    name: "山海拾光",
    style: "慢品型",
    count: 12.4,
    time: "31 min",
    color: "#c8863d",
  },
  {
    name: "烟熏旧港",
    style: "玩味型",
    count: 8.2,
    time: "42 min",
    color: "#b9523d",
  },
  {
    name: "薄雾青柠",
    style: "畅饮型",
    count: 5.1,
    time: "18 min",
    color: "#4f8576",
  },
];

export function DashboardPage() {
  const rootRef = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(".dashboard-hero-image", {
        scale: 1.12,
        yPercent: 7,
        ease: "none",
        scrollTrigger: {
          trigger: ".dashboard-hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.from(".dashboard-stat", {
        y: 56,
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".dashboard-stats",
          start: "top 78%",
          end: "top 45%",
          scrub: 0.6,
        },
      });
      gsap.from(".dashboard-detail", {
        y: 64,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".dashboard-detail",
          start: "top 85%",
          end: "top 52%",
          scrub: 0.7,
        },
      });
    },
    { scope: rootRef },
  );
  return (
    <main ref={rootRef} className="min-h-dvh bg-black pb-24">
      <header className="dashboard-hero relative min-h-[82dvh] overflow-hidden" data-cursor="INSIGHT">
        <img
          src={dashboardImage}
          alt="雨夜酒会数据场景"
          className="dashboard-hero-image absolute inset-0 size-full object-cover opacity-70 will-change-transform"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/55"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex min-h-[82dvh] max-w-7xl items-end justify-between gap-6 px-5 pb-16 lg:px-8 lg:pb-24">
          <div>
            <p className="display-en text-sm text-amber-300">
              NIGHT IN NUMBERS
            </p>
            <h1 className="mt-4 text-6xl font-medium text-white md:text-8xl">
              今晚的互动
            </h1>
          </div>
          <p className="mb-2 flex items-center gap-2 text-sm text-emerald-300">
            <Radio className="size-4" aria-hidden="true" />
            实时
          </p>
        </div>
      </header>
      <section className="dashboard-stats mx-auto grid max-w-7xl gap-px overflow-hidden border-x border-white/10 bg-white/10 sm:grid-cols-3">
        {[
          [GlassWater, "已生成印记", "86"],
          [Timer, "平均相处时长", "28 min"],
          [Activity, "互动事件", "1,247"],
        ].map(([Icon, label, value]) => {
          const I = Icon as typeof GlassWater;
          return (
            <div
              key={String(label)}
              className="dashboard-stat bg-black px-6 py-12 md:py-16"
            >
              <I className="size-5 text-amber-300" aria-hidden="true" />
              <p className="mt-8 text-5xl font-medium tabular-nums tracking-[.04em] text-stone-50 md:text-7xl">
                {String(value)}
              </p>
              <p className="mt-1 text-sm text-stone-500">{String(label)}</p>
            </div>
          );
        })}
      </section>
      <section className="dashboard-detail mx-auto mt-24 grid max-w-7xl gap-10 px-5 lg:grid-cols-[1.2fr_.8fr] lg:px-8">
        <div>
          <h2 className="text-xl text-stone-100">饮品互动对比</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead className="border-y border-white/10 text-xs text-stone-500">
                <tr>
                  <th className="py-4 font-normal">饮品</th>
                  <th className="font-normal">主要风格</th>
                  <th className="font-normal">平均举杯</th>
                  <th className="font-normal">平均停留</th>
                </tr>
              </thead>
              <tbody>
                {drinks.map((d) => (
                  <tr key={d.name} className="border-b border-white/10">
                    <td className="py-5 text-stone-100">
                      <span
                        className="mr-3 inline-block size-2 rounded-full"
                        style={{ backgroundColor: d.color }}
                      />
                      {d.name}
                    </td>
                    <td className="text-stone-400">{d.style}</td>
                    <td className="tabular-nums text-stone-300">{d.count}</td>
                    <td className="tabular-nums text-stone-300">{d.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10">
            <h2 className="text-xl text-stone-100">今晚的互动节奏</h2>
            <div
              className="mt-6 flex h-40 items-end gap-2 border-b border-white/10"
              aria-label="每小时互动数量柱状图"
            >
              {[22, 34, 28, 48, 62, 52, 76, 68, 88, 72, 56, 42].map(
                (value, index) => (
                  <motion.div
                    key={index}
                    className="relative flex-1 bg-amber-400/70"
                    initial={{ scaleY: 0, transformOrigin: "bottom" }}
                    animate={{ scaleY: value / 100 }}
                    transition={{ delay: index * 0.035, duration: 0.5 }}
                  >
                    <span className="sr-only">
                      第 {index + 1} 时段：{value} 次互动
                    </span>
                  </motion.div>
                ),
              )}
            </div>
            <div className="mt-2 flex justify-between text-xs text-stone-600">
              <span>18:00</span>
              <span>21:00</span>
              <span>00:00</span>
            </div>
          </div>
        </div>
        <aside>
          <h2 className="text-xl text-stone-100">实时事件</h2>
          <ol className="mt-5 border-l border-white/10 pl-5">
            {[
              "A-07 轻轻摇晃了杯子",
              "C-12 完成一张慢品型印记",
              "B-03 举起了杯子",
              "A-11 将杯子放回桌面",
            ].map((event, i) => (
              <li key={event} className="relative pb-7 text-sm text-stone-300">
                <span className="absolute -left-[1.44rem] top-1 size-2 rounded-full bg-amber-400" />
                <time className="mb-1 block text-xs text-stone-600">
                  {i * 8 + 2} 秒前
                </time>
                {event}
              </li>
            ))}
          </ol>
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-sm text-stone-400">AI 观察</p>
            <p className="mt-3 text-pretty font-serif text-2xl leading-9 text-stone-200">
              21:00 后，“慢品型”互动明显增加，山海拾光的停留时间高于全场均值。
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
