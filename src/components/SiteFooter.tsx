import { Brand } from "./Brand";
import type { Route } from "../types";

const groups = [
  { title: "EXPERIENCE", links: [["首页", "home"], ["实时感知", "session"], ["微醺印记", "imprint"]] },
  { title: "SYSTEM", links: [["数据看板", "dashboard"], ["AI 解释", "imprint"], ["隐私设计", "home"]] },
] as const;

export function SiteFooter({ navigate }: { navigate: (route: Route) => void }) {
  return (
    <footer className="border-t border-white/10 bg-[#080808] px-5 py-16 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div><Brand /><p className="mt-6 max-w-sm text-sm leading-7 text-white/45">让杯底传感与生成式 AI，把每一次真实互动变成可被带走的视觉记忆。</p></div>
        {groups.map((group) => <nav key={group.title} aria-label={group.title}><h2 className="text-xs font-semibold tracking-[.16em] text-white/35">{group.title}</h2><ul className="mt-5 space-y-3">{group.links.map(([label, route]) => <li key={label}><button className="text-left text-base font-semibold text-white/60 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300" onClick={() => navigate(route as Route)}>{label}</button></li>)}</ul></nav>)}
      </div>
      <div className="mx-auto mt-16 flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 text-xs tracking-[.08em] text-white/35 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Dylan Yeung Photographie &amp; Artistique</p><div className="flex gap-6"><a href={import.meta.env.VITE_MERCHANT_URL ?? "http://localhost:5174"} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">MERCHANT · 商家端</a><button onClick={() => navigate("privacy")} className="transition-colors hover:text-white">PRIVACY</button><button onClick={() => navigate("terms")} className="transition-colors hover:text-white">TERMS</button></div></div>
    </footer>
  );
}
