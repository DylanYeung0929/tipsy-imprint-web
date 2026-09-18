import { motion } from "motion/react";
import { useEffect, useState } from "react";
import clinkGif from "../assets/clink.gif";

const stages = [
  "提取互动节奏",
  "理解停留与动作",
  "生成专属叙事",
  "绘制微醺印记",
];

export function GeneratingPage() {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const id = window.setInterval(
      () => setStage((value) => Math.min(value + 1, stages.length - 1)),
      720,
    );
    return () => window.clearInterval(id);
  }, [stages.length]);
  return (
    <main className="grid min-h-dvh place-items-center px-5 pt-16">
      <section
        className="w-full max-w-lg text-center"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="mx-auto size-72 overflow-hidden rounded-full border border-amber-300/20">
          <img
            src={clinkGif}
            alt="两只琥珀色酒杯轻轻碰杯"
            className="size-full object-cover"
          />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-9 text-balance font-serif text-5xl text-stone-50"
        >
          生成印记
        </motion.h1>
        <p className="display-en mt-4 text-sm text-stone-500">AI IMPRINT</p>
        <div className="mx-auto mt-8 h-px max-w-xs overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-amber-400"
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.8, ease: "easeOut" }}
          />
        </div>
        <motion.p
          key={stage}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-sm text-amber-200"
        >
          {stages[stage]}
        </motion.p>
      </section>
    </main>
  );
}
