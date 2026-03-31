import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiCode, FiLayers, FiTrendingUp, FiZap } from "react-icons/fi";
import { Link } from "react-router-dom";

const aboutTags = ["Python", "LLMs", "RAG", "AI Agents", "FAISS"];

const values = [
  {
    icon: FiLayers,
    title: "System Thinking",
    detail: "I design AI applications as full systems, from data ingestion to user-facing response quality.",
  },
  {
    icon: FiZap,
    title: "Execution Speed",
    detail: "I iterate quickly while preserving prompt structure, retrieval quality, and observability.",
  },
  {
    icon: FiTrendingUp,
    title: "Business Impact",
    detail: "Each AI feature is built to reduce manual effort, increase accuracy, or accelerate decisions.",
  },
];

const timeline = [
  {
    period: "Current Focus",
    role: "AI Systems Engineering",
    highlights:
      "Building production-ready LLM applications with modular orchestration and measurable response quality.",
  },
  {
    period: "Core Layer",
    role: "RAG + Agent Pipelines",
    highlights:
      "Implementing adaptive retrieval, FAISS indexing, OCR workflows, and YAML-based prompt control.",
  },
  {
    period: "Delivery Layer",
    role: "Interfaces + Integration",
    highlights:
      "Shipping Streamlit interfaces and API-connected assistants that teams can use in day-to-day workflows.",
  },
];

const skillsByCategory = {
  llm: [
    { name: "LLM Workflows", level: 91 },
    { name: "Prompt Engineering", level: 89 },
    { name: "Agent Orchestration", level: 86 },
  ],
  retrieval: [
    { name: "RAG Architecture", level: 90 },
    { name: "FAISS Vector Search", level: 88 },
    { name: "Document/OCR Pipelines", level: 84 },
  ],
  productization: [
    { name: "Python Backend Design", level: 87 },
    { name: "Streamlit Interfaces", level: 83 },
    { name: "Production Hardening", level: 82 },
  ],
};

const skillTabs = [
  { id: "llm", label: "LLM Systems" },
  { id: "retrieval", label: "Retrieval" },
  { id: "productization", label: "Productization" },
];

export default function About() {
  const [activeTab, setActiveTab] = useState("llm");

  const activeSkills = useMemo(() => skillsByCategory[activeTab] || [], [activeTab]);

  return (
    <section className="mx-auto max-w-5xl space-y-8">
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="glass rounded-3xl p-6 shadow-glow sm:p-8"
      >
        <p className="inline-flex rounded-full border border-brand-400/35 bg-brand-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand-200">
          About Me
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-slate-100 sm:text-5xl">
          Python AI Engineer Building Production-Ready LLM Systems
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">
          I build AI systems that move beyond demos and work in production. As a Python developer
          specializing in LLM applications, I design end-to-end pipelines for OCR, document
          understanding, retrieval, and conversational workflows. My stack includes RAG
          architectures, FAISS vector search, adaptive retrieval strategies, and intelligent
          agents orchestrated with LangChain/LangGraph-style patterns and Groq APIs. I write
          structured, YAML-driven prompts to make behavior testable, modular, and easy to iterate.
          I also build Streamlit interfaces that turn complex models into usable products for teams
          and customers.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {aboutTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-700/70 bg-slate-900/75 px-3 py-1 text-xs text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.article>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-slate-700/60 bg-slate-900/45 p-6"
        >
          <div className="flex items-center gap-3">
            <FiCode className="text-brand-300" size={18} />
            <h2 className="font-display text-2xl font-semibold text-slate-100">How I Work</h2>
          </div>
          <div className="mt-5 space-y-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-slate-700/60 bg-slate-900/75 p-4"
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="text-brand-300" />
                    <h3 className="font-medium text-slate-100">{value.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{value.detail}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.42, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-slate-700/60 bg-slate-900/45 p-6"
        >
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Quick Snapshot</p>
          <div className="mt-4 space-y-4 text-sm text-slate-300">
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/75 p-4">
              <p className="font-medium text-slate-100">Primary Stack</p>
              <p className="mt-1">Python, LLM APIs, LangChain/LangGraph, FAISS, Streamlit</p>
            </div>
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/75 p-4">
              <p className="font-medium text-slate-100">Core Focus</p>
              <p className="mt-1">RAG, AI agents, document intelligence, and conversational systems</p>
            </div>
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/75 p-4">
              <p className="font-medium text-slate-100">Preferred Workflow</p>
              <p className="mt-1">Modular architecture, iterative prompt tuning, and production reliability</p>
            </div>
          </div>
        </motion.aside>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-3xl border border-slate-700/60 bg-slate-900/45 p-6 sm:p-7"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-semibold text-slate-100">Skill Matrix</h2>
          <div className="flex flex-wrap gap-2">
            {skillTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "bg-brand-500 text-slate-950"
                    : "border border-slate-600 bg-slate-900/60 text-slate-200 hover:border-brand-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {activeSkills.map((skill, index) => (
            <motion.article
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-slate-700/60 bg-slate-900/75 p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-slate-100">{skill.name}</p>
                <p className="text-xs text-brand-200">{skill.level}%</p>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800/80">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
                  className="h-full rounded-full bg-gradient-to-r from-brand-400 to-sky-400"
                />
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-3xl border border-slate-700/60 bg-slate-900/45 p-6 sm:p-7"
      >
        <h2 className="font-display text-2xl font-semibold text-slate-100">Experience Timeline</h2>

        <div className="mt-5 space-y-3">
          {timeline.map((item) => (
            <article
              key={item.period}
              className="rounded-2xl border border-slate-700/60 bg-slate-900/75 p-4 sm:p-5"
            >
              <p className="text-xs uppercase tracking-wider text-brand-300">{item.period}</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-slate-100">{item.role}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.highlights}</p>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-brand-400/35 bg-brand-500/10 p-6"
      >
        <div>
          <h2 className="font-display text-2xl font-semibold text-slate-100">
            Want to build something together?
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            Let&apos;s discuss your AI use case and map a reliable path from prototype to production.
          </p>
        </div>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400"
        >
          Contact Me
          <FiArrowRight size={16} />
        </Link>
      </motion.div>
    </section>
  );
}
