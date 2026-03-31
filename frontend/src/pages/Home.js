import Hero from "../components/sections/Hero";
import ImpactStats from "../components/sections/ImpactStats";
import ServiceCards from "../components/sections/ServiceCards";
import BuildJourney from "../components/sections/BuildJourney";
import TechInsights from "../components/sections/TechInsights";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="space-y-10 sm:space-y-12">
      <Hero />
      <ImpactStats />
      <ServiceCards />
      <BuildJourney />
      <TechInsights />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-brand-400/30 bg-gradient-to-r from-brand-500/15 via-sky-500/10 to-slate-900/70 p-7 sm:p-9"
      >
        <div className="pointer-events-none absolute -top-20 right-10 h-44 w-44 rounded-full bg-brand-400/25 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-200">Ready To Collaborate</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-100 sm:text-4xl">
              Have an idea? Let&apos;s turn it into a launch-ready product.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              I can help with full-stack development, UX polishing, performance tuning, and
              reliable deployments.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400"
            >
              Start a Project
            </Link>
            <Link
              to="/projects"
              className="rounded-xl border border-slate-600 bg-slate-900/75 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-brand-400 hover:text-brand-300"
            >
              Explore Work
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
