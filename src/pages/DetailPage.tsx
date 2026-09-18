import type { Route } from "../types";
import { LiquidGlassButton } from "../components/LiquidGlassButton";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

interface DetailPoint {
  label: string;
  desc: string;
}

const content: Record<string, { title: string; accent: string; zh: string; lead: string; points: DetailPoint[] }> = {
  "detail-clink": {
    title: "CLINK",
    accent: "#ffb84d",
    zh: "碰杯识别",
    lead: "压力突变与双轴冲击在同一时间窗内出现，系统将它理解为一次真实互动。",
    points: [
      {
        label: "IMU 捕捉瞬时加速度",
        desc: "边缘侧的 IMU 持续融合加速度与姿态数据，碰杯瞬间会出现与举杯、轻晃、放下都不同的双轴冲击尖峰；系统结合冲击方向与衰减时长，把一次真实的杯沿接触从日常动作中分离出来。",
      },
      {
        label: "压力膜确认杯体仍在承重",
        desc: "杯垫内的压力感知膜连续读取杯中余量，碰杯时承重曲线会出现短暂卸载再回升的特征；以此确认杯体未被拿起或倾倒，避免把放杯、推杯误判为碰杯。",
      },
      {
        label: "蓝牙上传匿名动作特征",
        desc: "设备端只把动作窗口内的特征向量（峰值、时长、方向）压缩后经蓝牙上传，原始高频数据不离开设备；上传内容不带身份信息，流量占用低，断线时也支持缓存补传。",
      },
    ],
  },
  "detail-ai": {
    title: "INTERPRET",
    accent: "#67e8f9",
    zh: "AI 行为解释",
    lead: "大模型不读取对话，只把重量、频率、停留和动作序列转译为可理解的饮用故事。",
    points: [
      {
        label: "传感序列结构化",
        desc: "余量变化、拿起次数、饮用量、摇晃幅度与停留时长被对齐为带时间戳的行为序列，每一条动作都有明确的开始与结束，成为大模型可直接阅读的结构化输入。",
      },
      {
        label: "行为标签与节奏聚类",
        desc: "高频拿起配小口慢饮、低频大口畅饮、一饮而尽等模式会被聚类为行为标签；模型结合整场节奏与相邻动作，判断用户的饮酒风格与当下状态。",
      },
      {
        label: "生成视觉提示词与叙事",
        desc: "解释结果被转译成视觉提示词与一句话叙事，驱动印记的图形、色彩与文字生成，让每一杯的体验都有独一无二的表达。",
      },
    ],
  },
  "detail-memory": {
    title: "REMEMBER",
    accent: "#ec78ff",
    zh: "专属微醺印记",
    lead: "每一张印记由这一杯的真实动作生成，可保存、分享，也能成为下一次推荐的依据。",
    points: [
      {
        label: "至少十种行为人格",
        desc: "系统内置慢酌者、闻香师、畅饮派、分享者等十余种行为人格，由本场动作特征匹配生成；随着会话数据积累，人格画像会持续细化。",
      },
      {
        label: "独立视觉徽章与色彩",
        desc: "每种人格对应独立的徽章轮廓、渐变配色与光效语言；本场动作参数还会参与画面生成，保证同一人格下的每张印记仍然各不相同。",
      },
      {
        label: "小程序和网页同步呈现",
        desc: "印记生成后自动同步到小程序个人页与现场 Web 看板，可保存到相册、分享给朋友，也会成为下一次到店个性化推荐的依据。",
      },
    ],
  },
  "detail-ui": {
    title: "INTERFACE",
    accent: "#72f1b8",
    zh: "多端体验",
    lead: "小程序承接个人印记，Web 端承接现场互动与酒馆数据，两端使用同一套行为语言。",
    points: [
      {
        label: "蓝牙设备状态同步",
        desc: "小程序通过蓝牙连接智能酒杯与杯垫，实时显示电量、连接状态与当前会话进度；断线自动重连并补传缓存的动作数据。",
      },
      {
        label: "实时传感可视化",
        desc: "Web 端以曲线与动效实时呈现杯中余量、倾斜角度与动作事件，现场大屏可同步展示整场互动节奏，让每一杯都看得见。",
      },
      {
        label: "印记保存与场域看板",
        desc: "商家后台汇总每款酒的行为统计与印记数据，用于经营分析与酒单调优；用户端的每张印记都可保存、分享与回顾。",
      },
    ],
  },
  privacy: {
    title: "PRIVACY",
    accent: "#67e8f9",
    zh: "隐私说明",
    lead: "杯底印记默认只处理重量和运动等行为数据，不采集录音、影像或身份信息。",
    points: [
      {
        label: "原始传感数据短期缓存后自动清除",
        desc: "原始传感器数据仅在设备与边缘节点短期缓存，用于会话内的实时解释；会话结束后按保留策略自动清除，不留存长期原始记录。",
      },
      {
        label: "对外展示使用匿名设备编号",
        desc: "展示与分享内容只携带随机分配的匿名设备标识，不关联手机号等身份信息；面向商家的统计均为聚合数据，无法反推个人。",
      },
      {
        label: "用户可随时结束会话并删除生成结果",
        desc: "可随时在小程序中结束当前会话；已生成的印记与关联数据支持一键删除，删除后云端数据即刻清理。",
      },
    ],
  },
  terms: {
    title: "TERMS",
    accent: "#ffb84d",
    zh: "体验条款",
    lead: "当前版本用于 AI 黑客松概念演示，模拟数据与生成结果不构成饮酒或健康建议。",
    points: [
      {
        label: "请理性饮酒，未成年人不得使用",
        desc: "本产品面向成年人提供理性饮酒场景的数字体验，未成年人不得注册或使用；过量饮酒有害健康，请适度饮用。",
      },
      {
        label: "演示中的数据和推荐仅用于体验",
        desc: "当前版本的传感器数据、AI 解释与个性化推荐均为概念演示内容，不构成医学、健康或饮酒建议，请勿据此作出决策。",
      },
      {
        label: "生成卡片版权归创作者与使用者共同约定",
        desc: "印记卡片的视觉内容由平台生成，具体版权归属与使用范围由创作者与使用者在参与体验前另行约定，平台保留演示场景下的展示权。",
      },
    ],
  },
};

export function DetailPage({ route, onBack }: { route: Route; onBack: () => void }) {
  const item = content[route] ?? content["detail-clink"];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <main
      className="relative min-h-dvh overflow-hidden px-5 pb-24 pt-36 lg:px-8"
      style={{ "--detail-accent": item.accent } as React.CSSProperties}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_36%,color-mix(in_srgb,var(--detail-accent)_20%,transparent),transparent_34%)]" />
      <div className="relative mx-auto max-w-6xl">
        <p className="text-sm font-bold tracking-[.16em] text-white/50">{item.zh}</p>
        <h1 className="display-en mt-5 text-[clamp(4rem,13vw,11rem)] leading-[.78] text-white">
          {item.title}
          <span className="accent-dot">.</span>
        </h1>
        <p className="mt-12 max-w-2xl text-xl font-semibold leading-9 text-white/70">{item.lead}</p>
        <ol className="mt-16 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-3">
          {item.points.map((point, index) => (
            <li key={point.label} className="relative bg-black/70">
              <button
                onClick={() => setOpen(open === index ? null : index)}
                aria-expanded={open === index}
                className="group relative w-full overflow-hidden p-7 text-left"
              >
                <span className="text-xs text-white/35">0{index + 1}</span>
                <p className="mt-16 flex items-end justify-between gap-4 text-lg font-bold text-white">
                  {point.label}
                  <ChevronDown className={`size-5 shrink-0 transition-transform ${open === index ? "rotate-180" : ""}`} />
                </p>
                <span className="absolute -bottom-12 -right-8 text-[8rem] font-black text-white/[.025] transition-all duration-500 group-hover:-translate-y-6 group-hover:text-white/[.08]">
                  {index + 1}
                </span>
              </button>
              <AnimatePresence>
                {open === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="border-t border-white/10 px-7 py-6 text-sm leading-7 text-white/55">
                      {point.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ol>
        <LiquidGlassButton arrow onClick={onBack} className="mt-12 min-h-12 px-6">
          BACK TO EXPERIENCE
        </LiquidGlassButton>
      </div>
    </main>
  );
}
