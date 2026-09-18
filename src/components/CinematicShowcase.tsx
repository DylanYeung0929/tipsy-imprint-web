import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ExplodedCoasterScroll } from "./ExplodedCoasterScroll";
import { ScrollEffectsShowcase } from "./ScrollEffectsShowcase";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function CinematicShowcase() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        "header h2",
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: root.current,
            start: "top 72%",
            end: "top 35%",
            scrub: 0.6,
          },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="从感知到印记">
      <header className="mx-auto flex min-h-[68dvh] max-w-5xl items-center justify-center px-5 py-24 text-center">
        <div>
          <p className="display-en text-sm text-stone-500">
            SENSE&nbsp;&nbsp;UNDERSTAND&nbsp;&nbsp;REMEMBER
          </p>
          <h2 className="mt-6 text-balance text-5xl font-medium leading-[1.06] text-white md:text-7xl">
            看见饮用节奏，
            <br className="hidden sm:block" />
            留住真实瞬间。
          </h2>
        </div>
      </header>
      <ExplodedCoasterScroll />
      <ScrollEffectsShowcase />
    </section>
  );
}
