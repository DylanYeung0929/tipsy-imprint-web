import imprintBadge from "../assets/generated/imprint-badge-v1.png";

export function Brand() {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-10 place-items-center overflow-hidden rounded-[50%] border border-white/15 bg-white/[.04]">
        <img src={imprintBadge} alt="" className="size-9 object-contain" />
      </span>
      <span className="font-serif text-lg text-stone-100">微醺印记</span>
    </div>
  );
}
