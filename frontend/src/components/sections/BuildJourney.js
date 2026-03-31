import { motion } from "framer-motion";

const stages = [
  {
    title: "Discover",
    detail: "Align product goals, define features, and translate ideas into a practical roadmap.",
  },
  {
    title: "Design",
    detail: "Craft wireframes and component systems that stay clean across desktop and mobile.",
  },
  {
    title: "Develop",
    detail: "Implement frontend + backend features iteratively with clear APIs and stable data models.",
  },
  {
    title: "Deploy",
    detail: "Ship confidently with QA checks, performance tuning, and fast post-launch support.",
  },
];

export default function BuildJourney() {
  return (
    <section className="rounded-3xl border border-slate-700/60 bg-slate-900/45 p-6 sm:p-8">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Workflow</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-slate-100 sm:text-4xl">
          A process that keeps projects moving without chaos
        </h2>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {stages.map((stage, index) => (
          <motion.article
            key={stage.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-4"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-brand-300">
              Step {index + 1}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-slate-100">{stage.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{stage.detail}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
