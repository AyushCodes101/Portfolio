import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const toolbelt = ["React", "Node.js", "Express", "MongoDB", "Tailwind", "Framer Motion"];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800/50 bg-slate-900/30 p-6 shadow-glow sm:p-10">
      <div className="pointer-events-none absolute -right-16 top-20 h-64 w-64 rounded-full bg-brand-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-52 w-52 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.14,
              },
            },
          }}
          className="space-y-6"
        >
          <motion.p
            variants={fadeUp}
            className="inline-flex rounded-full border border-brand-400/40 bg-brand-500/10 px-4 py-1 text-sm font-medium text-brand-300"
          >
            MERN Stack Developer
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            I build clean, reliable web products that users actually enjoy.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            Hi, I&apos;m Ayush. I design and develop modern full-stack applications with React,
            Node.js, Express, and MongoDB with performance, accessibility, and product quality at
            the center.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {toolbelt.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-xs text-slate-300"
              >
                {tool}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400"
            >
              View Projects
            </Link>
            <Link
              to="/contact"
              className="rounded-xl border border-slate-600 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-brand-400 hover:text-brand-300"
            >
              Let&apos;s Talk
            </Link>
          </motion.div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-2xl p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-200">Current Focus</p>
            <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-300">
              Available
            </span>
          </div>

          <div className="space-y-4 text-sm text-slate-300">
            <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4">
              <p className="font-medium text-slate-100">Frontend</p>
              <p className="mt-1">React, Tailwind CSS, Framer Motion, responsive UI systems</p>
            </div>
            <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4">
              <p className="font-medium text-slate-100">Backend</p>
              <p className="mt-1">Node.js, Express APIs, MongoDB models, robust form workflows</p>
            </div>
            <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-4">
              <p className="font-medium text-slate-100">Deployment</p>
              <p className="mt-1">Vercel + Render + MongoDB Atlas production pipelines</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-3 text-center">
                <p className="font-display text-lg font-semibold text-slate-100">14+</p>
                <p className="text-xs text-slate-400">Shipped Projects</p>
              </div>
              <div className="rounded-xl border border-slate-700/60 bg-slate-900/60 p-3 text-center">
                <p className="font-display text-lg font-semibold text-slate-100">24h</p>
                <p className="text-xs text-slate-400">Response Time</p>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
