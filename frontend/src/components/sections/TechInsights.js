import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const insights = [
  {
    id: "adaptive-rag",
    title: "Improving RAG Quality With Adaptive Retrieval",
    excerpt:
      "How query-aware chunk selection and multi-pass retrieval reduced irrelevant context in long document sets.",
    tags: ["RAG", "Retrieval", "Evaluation"],
  },
  {
    id: "promptops",
    title: "PromptOps With YAML Templates in Production",
    excerpt:
      "A practical pattern for versioning prompts, managing environments, and debugging model behavior safely.",
    tags: ["Prompt Engineering", "YAML", "LLMs"],
  },
  {
    id: "agent-reliability",
    title: "Building Reliable Multi-Step AI Agents",
    excerpt:
      "Designing tool-calling workflows with guardrails, retries, and deterministic fallbacks for real users.",
    tags: ["Agents", "LangGraph", "Reliability"],
  },
];

export default function TechInsights() {
  return (
    <section className="space-y-5">
      <div className="max-w-3xl">
        <p className="inline-flex rounded-full border border-brand-400/35 bg-brand-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand-200">
          Technical Insights
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-slate-100 sm:text-4xl">
          Build notes from real AI systems work
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {insights.map((insight, index) => (
          <motion.article
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.42, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="rounded-2xl border border-slate-700/60 bg-slate-900/55 p-5"
          >
            <h3 className="font-display text-xl font-semibold text-slate-100">{insight.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{insight.excerpt}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {insight.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-700/60 bg-slate-900/75 px-3 py-1 text-xs text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-300 transition hover:text-brand-200"
            >
              Read Note
              <FiArrowUpRight size={15} />
            </button>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
