import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import storyImage from "../assets/generated/lenis-story-scene.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ScrollStory() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".story-image",
        { scale: 1.08, yPercent: -4 },
        {
          scale: 1,
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );
      gsap.from(".story-copy > *", {
        y: 38,
        opacity: 0,
        stagger: 0.11,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
    },
    { scope: root },
  );
  return (
    <section
      ref={root}
      className="relative min-h-[90dvh] overflow-hidden border-t border-white/10"
    >
      <img
        src={storyImage}
        alt="一只手将琥珀色饮品放在智能杯底模块上"
        loading="lazy"
        className="story-image absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
      <div className="story-copy relative mx-auto flex min-h-[90dvh] max-w-7xl flex-col justify-end px-5 pb-20 lg:px-8 lg:pb-28">
        <p className="display-en text-sm text-amber-300">EFFORTLESS</p>
        <h2 className="display-en mt-4 max-w-3xl text-balance text-6xl leading-[.9] text-white md:text-8xl">
          LIFT. SWIRL. REST<span className="accent-dot">.</span>
        </h2>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-stone-300">
          正常喝完一杯，印记自然出现。
        </p>
      </div>
    </section>
  );
}
