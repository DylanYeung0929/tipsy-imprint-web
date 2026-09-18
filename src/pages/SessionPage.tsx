import { Bluetooth } from "lucide-react";
import { useState } from "react";
import type { ActionKind, SessionSummary } from "../types";
import { SmartGlassMotion } from "../components/SmartGlassMotion";
import { MetricStrip } from "../components/MetricStrip";
import { SensorChart } from "../components/SensorChart";
import { InteractionControls } from "../components/InteractionControls";
import { useSensorDemo } from "../hooks/useSensorDemo";
import { LiquidGlassButton } from "../components/LiquidGlassButton";
import { DrinkLibrary } from "../components/DrinkLibrary";

const classify = (lift: number, swirl: number, sip: number, seconds: number) => {
  if (lift >= 8 && swirl >= 5) return "热烈碰杯者";
  if (swirl >= 7) return "风味实验家";
  if (sip >= 8 && seconds < 180) return "自在畅饮者";
  if (lift >= 6) return "社交引力场";
  if (seconds >= 300 && sip <= 4) return "余韵守望者";
  if (swirl >= 3) return "节奏收藏家";
  if (sip >= 4) return "轻盈漫游者";
  if (lift >= 3) return "夜色叙事者";
  if (seconds >= 120) return "慢品探索者";
  return "安静观察者";
};

export function SessionPage({ initial, onComplete }: { initial: SessionSummary; onComplete: (summary: SessionSummary) => void }) {
  const { points, liftCount, swirlCount, sipCount, elapsedSeconds, events, trigger } = useSensorDemo();
  const [drink,setDrink]=useState(initial.drink); const [drinkIndex,setDrinkIndex]=useState(initial.drinkIndex); const [action,setAction]=useState<{kind:ActionKind;id:number}|null>(null);
  const runAction=(kind:ActionKind)=>{trigger(kind);setAction({kind,id:Date.now()})};
  return (
    <main className="relative mx-auto min-h-dvh max-w-7xl overflow-hidden px-5 pb-24 pt-28 lg:px-8" data-cursor="LIVE">
      <div className="pointer-events-none absolute -right-32 top-20 size-[34rem] rounded-[50%] bg-cyan-400/10 blur-[110px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 bottom-20 size-[30rem] rounded-[50%] bg-amber-400/10 blur-[110px]" aria-hidden="true" />
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="flex items-center gap-2 text-sm text-emerald-300">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
              <span className="relative size-2 rounded-full bg-emerald-400" />
            </span>
            杯底模块已连接
          </p>
          <h1 className="mt-3 font-serif text-5xl text-stone-50">
            这一杯，正在发生
          </h1>
          <p className="display-en mt-2 text-sm text-stone-600">LIVE SESSION</p>
        </div>
        <span className="flex items-center gap-2 text-sm text-stone-500">
          <Bluetooth className="size-4" aria-hidden="true" />
          MARK-07&nbsp;&nbsp;82%
        </span>
      </div>
      <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <SmartGlassMotion pulse action={action} drinkIndex={drinkIndex} />
          <div className="relative z-10 mx-auto -mt-8 max-w-sm">
            <InteractionControls onTrigger={runAction} />
          </div>
        </div>
        <section className="flex flex-col justify-center">
          <MetricStrip
            metrics={[
              { label: "举杯", value: String(liftCount), unit: "次" },
              { label: "轻晃", value: String(swirlCount), unit: "次" },
              {
                label: "剩余重量",
                value: points.at(-1)!.value.toFixed(1),
                unit: "g",
              },
            ]}
          />
          <SensorChart points={points} />
          <h2 className="mt-6 text-lg text-stone-100">刚刚捕捉到</h2>
          <ol className="mt-2">
            {events.map((event) => (
              <li
                key={event.id}
                className="flex items-center gap-4 border-b border-white/10 py-3"
              >
                <span className="size-2 rounded-full bg-amber-400" />
                <span className="flex-1 text-sm text-stone-200">
                  {event.label}
                </span>
                <time className="text-xs text-stone-500">{event.detail}</time>
              </li>
            ))}
          </ol>
          <LiquidGlassButton
            onClick={() => onComplete({ drink, drinkIndex, liftCount, swirlCount, sipCount, durationSeconds: elapsedSeconds, remainingWeight: points.at(-1)!.value, imprint: classify(liftCount,swirlCount,sipCount,elapsedSeconds) })}
            arrow
            className="mt-7 min-h-12 px-6 font-semibold"
          >
            结束这一杯
          </LiquidGlassButton>
        </section>
      </div>
      <DrinkLibrary selected={drink} onSelect={(next,index)=>{setDrink(next);setDrinkIndex(index)}} />
    </main>
  );
}
