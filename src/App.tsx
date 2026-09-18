import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AppHeader } from "./components/AppHeader";
import type { Route, SessionSummary } from "./types";
import { RouteProgress } from "./components/RouteProgress";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { PointerExperience } from "./components/PointerExperience";
import { SiteFooter } from "./components/SiteFooter";
import { AmbientColorField } from "./components/AmbientColorField";
import { DetailPage } from "./pages/DetailPage";

const DashboardPage = lazy(() =>
  import("./pages/DashboardPage").then((module) => ({
    default: module.DashboardPage,
  })),
);
const GeneratingPage = lazy(() =>
  import("./pages/GeneratingPage").then((module) => ({
    default: module.GeneratingPage,
  })),
);
const HomePage = lazy(() =>
  import("./pages/HomePage").then((module) => ({ default: module.HomePage })),
);
const ImprintPage = lazy(() =>
  import("./pages/ImprintPage").then((module) => ({
    default: module.ImprintPage,
  })),
);
const SessionPage = lazy(() =>
  import("./pages/SessionPage").then((module) => ({
    default: module.SessionPage,
  })),
);

const validRoutes: Route[] = [
  "home",
  "session",
  "generating",
  "imprint",
  "dashboard",
  "detail-clink",
  "detail-ai",
  "detail-memory",
  "detail-ui",
  "privacy",
  "terms",
];
const readRoute = (): Route => {
  const value = window.location.hash.slice(1) as Route;
  return validRoutes.includes(value) ? value : "home";
};

export default function App() {
  useSmoothScroll();
  const [route, setRoute] = useState<Route>(readRoute);
  const [summary, setSummary] = useState<SessionSummary>({ drink: "Old Fashioned", drinkIndex: 0, liftCount: 0, swirlCount: 0, sipCount: 0, durationSeconds: 0, remainingWeight: 72, imprint: "安静观察者" });
  useEffect(() => {
    const onHash = () => {
      setRoute(readRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  useEffect(() => {
    if (route !== "generating") return;
    const timer = window.setTimeout(() => {
      window.location.hash = "imprint";
    }, 3200);
    return () => window.clearTimeout(timer);
  }, [route]);
  const navigate = (next: Route) => {
    window.location.hash = next;
  };
  return (
    <div className="min-h-dvh bg-[#0d0b0a] text-stone-100">
      <AmbientColorField />
      <PointerExperience />
      <AppHeader route={route} navigate={navigate} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={route}
          initial={{ opacity: 0, x: route === "dashboard" ? 0 : 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <Suspense
            fallback={
              <div
                className="grid min-h-[72dvh] place-items-center text-sm tracking-[.22em] text-stone-400"
                role="status"
              >
                正在载入杯底印记…
              </div>
            }
          >
            {route === "home" && (
              <HomePage onStart={() => navigate("session")} />
            )}{" "}
            {route === "session" && (
              <SessionPage initial={summary} onComplete={(next) => { setSummary(next); navigate("generating"); }} />
            )}{" "}
            {route === "generating" && <GeneratingPage />}{" "}
            {route === "imprint" && (
              <ImprintPage summary={summary} onAgain={() => navigate("session")} />
            )}{" "}
            {route === "dashboard" && <DashboardPage />}
            {(["detail-clink", "detail-ai", "detail-memory", "detail-ui", "privacy", "terms"] as Route[]).includes(route) && <DetailPage route={route} onBack={() => navigate("home")} />}
          </Suspense>
        </motion.div>
      </AnimatePresence>
      {route !== "generating" ? <SiteFooter navigate={navigate} /> : null}
      <RouteProgress route={route} />
    </div>
  );
}
