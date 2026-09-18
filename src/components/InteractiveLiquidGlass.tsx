import { useEffect, useRef } from "react";
import emptyGlass from "../assets/generated/interactive-empty-glass-v1.png";

export function InteractiveLiquidGlass() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    let time = 0;
    let tiltX = 0;
    let tiltY = 0;
    const resize = () => { el.width = 700; el.height = 760; };
    resize();
    const draw = () => {
      time += 0.035;
      ctx.clearRect(0, 0, el.width, el.height);
      const surface = 230 + tiltY * 42;
      const gradient = ctx.createLinearGradient(0, surface, 0, 680);
      gradient.addColorStop(0, "rgba(255,190,56,.92)");
      gradient.addColorStop(.25, "rgba(190,72,8,.93)");
      gradient.addColorStop(1, "rgba(52,10,2,.98)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(75, surface);
      for (let x = 75; x <= 625; x += 7) {
        const y = surface + tiltX * (x - 350) * .13 + Math.sin(x * .027 + time * 3) * 7 + Math.sin(x * .011 - time * 2) * 4;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(625, 690); ctx.lineTo(75, 690); ctx.closePath(); ctx.fill();
      ctx.globalCompositeOperation = "screen";
      ctx.strokeStyle = "rgba(255,229,157,.75)"; ctx.lineWidth = 4; ctx.stroke();
      ctx.globalCompositeOperation = "source-over";
      frame = requestAnimationFrame(draw);
    };
    draw();
    const move = (event: PointerEvent) => {
      if (!root.current) return;
      const rect = root.current.getBoundingClientRect();
      tiltX += (((event.clientX - rect.left) / rect.width - .5) - tiltX) * .32;
      tiltY += (((event.clientY - rect.top) / rect.height - .5) - tiltY) * .25;
      root.current.style.setProperty("--rx", `${-tiltY * 12}deg`);
      root.current.style.setProperty("--ry", `${tiltX * 16}deg`);
    };
    const node = root.current;
    node?.addEventListener("pointermove", move);
    return () => { cancelAnimationFrame(frame); node?.removeEventListener("pointermove", move); };
  }, []);

  return (
    <div ref={root} className="liquid-glass relative mx-auto aspect-[4/5] w-full max-w-[31rem] [transform:perspective(1100px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]" data-cursor="FLOW">
      <canvas ref={canvas} className="absolute left-[16%] top-[20%] h-[61%] w-[68%] [clip-path:polygon(7%_0,93%_0,84%_100%,16%_100%)]" aria-hidden="true" />
      <img src={emptyGlass} alt="随光标实时流动的琥珀液体智能酒杯" className="relative z-10 size-full object-contain" />
      <span className="absolute inset-x-[20%] bottom-[5%] h-8 rounded-[50%] bg-amber-400/35 blur-2xl" aria-hidden="true" />
    </div>
  );
}
