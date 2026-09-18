import type { Metric } from "../types";

export function MetricStrip({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className="grid grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-5">
      {metrics.map((metric) => (
        <div key={metric.label} className="px-3 text-center">
          <dd className="font-serif text-2xl tabular-nums text-stone-50 md:text-3xl">
            {metric.value}
            <span className="ml-1 font-sans text-xs text-stone-500">
              {metric.unit}
            </span>
          </dd>
          <dt className="mt-1 text-xs text-stone-400">{metric.label}</dt>
        </div>
      ))}
    </dl>
  );
}
