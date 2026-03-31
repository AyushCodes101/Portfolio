import { motion } from "framer-motion";
import { FiActivity, FiCode, FiDatabase, FiPenTool } from "react-icons/fi";

const services = [
  {
    icon: FiPenTool,
    title: "Product Design Thinking",
    description: "Wireframe-first planning with user journeys, clear UX priorities, and conversion goals.",
  },
  {
    icon: FiCode,
    title: "Frontend Engineering",
    description: "Fast, accessible React interfaces with reusable components and meaningful interactions.",
  },
  {
    icon: FiDatabase,
    title: "Backend APIs",
    description: "Express + MongoDB APIs with validation, secure data handling, and deployment-ready structure.",
  },
  {
    icon: FiActivity,
    title: "Optimization & QA",
    description: "Lighthouse improvements, bug-proof edge cases, and observability-minded releases.",
  },
];

export default function ServiceCards() {
  return (
    <section className="space-y-5">
      <div className="max-w-3xl">
        <p className="inline-flex rounded-full border border-brand-400/35 bg-brand-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand-200">
          What I Build
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-slate-100 sm:text-4xl">
          End-to-end web products with clarity, speed, and polish
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.48,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -5 }}
              className="group rounded-2xl border border-slate-700/60 bg-slate-900/55 p-5 transition hover:border-brand-400/55 hover:bg-slate-900/80"
            >
              <div className="inline-flex rounded-xl border border-brand-400/35 bg-brand-500/10 p-3 text-brand-300 transition group-hover:bg-brand-500/20">
                <Icon size={20} />
              </div>

              <h3 className="mt-4 font-display text-xl font-semibold text-slate-100">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{service.description}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
