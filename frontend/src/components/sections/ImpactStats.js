import { motion } from "framer-motion";

const stats = [
  {
    label: "Projects Delivered",
    value: "14+",
    detail: "MERN and React projects shipped from idea to production",
    progress: 88,
  },
  {
    label: "Average Lighthouse",
    value: "95",
    detail: "Performance-focused interfaces with responsive behavior",
    progress: 95,
  },
  {
    label: "API Uptime Target",
    value: "99.9%",
    detail: "Reliable backend flows with robust validation and error states",
    progress: 91,
  },
];

export default function ImpactStats() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {stats.map((stat, index) => (
        <motion.article
          key={stat.label}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          className="glass rounded-2xl p-5 transition"
        >
          <p className="text-sm text-slate-300">{stat.label}</p>
          <p className="mt-2 font-display text-3xl font-bold text-slate-100">{stat.value}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{stat.detail}</p>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800/80">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${stat.progress}%` }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-brand-400 to-sky-400"
            />
          </div>
        </motion.article>
      ))}
    </section>
  );
}
