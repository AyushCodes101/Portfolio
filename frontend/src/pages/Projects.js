import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiExternalLink,
  FiFilter,
  FiGithub,
  FiSearch,
  FiStar,
} from "react-icons/fi";

const projects = [
  {
    id: "docmind-rag",
    title: "DocMind RAG Assistant",
    category: "RAG",
    year: 2026,
    status: "In Progress",
    impact: 96,
    featured: true,
    description:
      "A production-oriented document QA assistant with OCR fallback, FAISS indexing, and grounded conversational answers.",
    stack: ["Python", "RAG", "FAISS", "Groq API", "Streamlit"],
    metrics: ["Response quality +38%", "Latency under 2.1s", "200k+ chunks indexed"],
    demoUrl: "",
    repoUrl: "",
    highlights: [
      "Built OCR plus chunking pipeline for mixed scanned and digital PDFs.",
      "Added adaptive retrieval to improve response quality on long document sets.",
      "Implemented citation-ready answer formatting with source traceability.",
    ],
    challenge:
      "Long and noisy documents created retrieval drift, which reduced answer precision in real-world queries.",
    approach:
      "Combined OCR cleanup, semantic chunking, query-aware retrieval, and relevance reranking before generation.",
    outcomes: [
      "Lower hallucination rate during benchmark tests.",
      "More stable answer grounding across mixed document formats.",
      "Faster troubleshooting with clear citation traces.",
    ],
  },
  {
    id: "agentops-copilot",
    title: "AgentOps Support Copilot",
    category: "Agents",
    year: 2026,
    status: "Private Repo",
    impact: 92,
    featured: true,
    description:
      "A multi-step intelligent agent workflow for support triage, intent classification, and action recommendations.",
    stack: ["Python", "LangGraph", "LLMs", "Prompt Engineering", "APIs"],
    metrics: ["Ticket triage -45%", "Draft quality +31%", "Escalation accuracy +24%"],
    demoUrl: "",
    repoUrl: "",
    highlights: [
      "Orchestrated tool-calling agents with bounded context and failure handling.",
      "Used YAML-based prompt templates for predictable and testable behavior.",
      "Reduced repetitive support handling time with automated draft actions.",
    ],
    challenge:
      "Support teams needed faster issue routing without losing context quality or compliance constraints.",
    approach:
      "Built a controlled agent graph with explicit tool permissions, validation checks, and fallback prompts.",
    outcomes: [
      "Faster first response time for high-volume support queues.",
      "Higher routing consistency across similar issue types.",
      "Improved operator trust through auditable action logs.",
    ],
  },
  {
    id: "visionparse-pipeline",
    title: "VisionParse OCR Pipeline",
    category: "Document AI",
    year: 2025,
    status: "Completed",
    impact: 89,
    featured: false,
    description:
      "A modular pipeline for document ingestion, OCR extraction, cleaning, and structured output generation.",
    stack: ["Python", "OCR", "NLP", "JSON Schemas", "FastAPI"],
    metrics: ["Parsing consistency +41%", "Manual correction -52%", "99.3% pipeline uptime"],
    demoUrl: "",
    repoUrl: "",
    highlights: [
      "Standardized noisy OCR output into consistent machine-readable fields.",
      "Added validation guards for missing pages and confidence drop scenarios.",
      "Designed reusable parsing modules for invoices, reports, and statements.",
    ],
    challenge:
      "Raw OCR outputs varied heavily by document quality and format, making downstream automation unreliable.",
    approach:
      "Introduced schema-driven normalization and confidence-based validation before persistence.",
    outcomes: [
      "Cleaner structured data with fewer manual interventions.",
      "Reusable extraction workflow across multiple document classes.",
      "Stable integration with analytics and search systems.",
    ],
  },
  {
    id: "adaptive-crawl-retrieval",
    title: "Adaptive Crawl Retrieval Engine",
    category: "Data Pipeline",
    year: 2025,
    status: "Completed",
    impact: 87,
    featured: false,
    description:
      "A web scraping and indexing engine that continuously refreshes knowledge bases for retrieval workflows.",
    stack: ["Python", "Web Scraping", "FAISS", "Scheduling", "ETL"],
    metrics: ["Content freshness +57%", "Duplicate pages -64%", "Daily ingestion reliability 98%"],
    demoUrl: "",
    repoUrl: "",
    highlights: [
      "Implemented site-aware crawling rules for reliable periodic content updates.",
      "Added deduplication and relevance scoring before vector indexing.",
      "Improved retrieval freshness in dynamic knowledge environments.",
    ],
    challenge:
      "Knowledge bases became stale quickly, reducing retrieval accuracy for changing source content.",
    approach:
      "Built scheduled crawling with change detection, deduplication, and incremental indexing.",
    outcomes: [
      "More up-to-date retrieval context for end users.",
      "Lower indexing noise from repeated or low-quality pages.",
      "Predictable refresh cycles for production support.",
    ],
  },
  {
    id: "promptops-studio",
    title: "PromptOps Studio",
    category: "Prompt Engineering",
    year: 2024,
    status: "Completed",
    impact: 84,
    featured: false,
    description:
      "An internal toolkit for structured prompt versioning, YAML prompt packs, and response evaluation workflows.",
    stack: ["Python", "YAML", "LLMs", "Evaluation", "Streamlit"],
    metrics: ["Iteration speed +48%", "Regression checks automated", "Prompt rollback under 1 minute"],
    demoUrl: "",
    repoUrl: "",
    highlights: [
      "Versioned prompts with environment-specific overrides for safer releases.",
      "Added lightweight scoring harness for consistency and hallucination checks.",
      "Enabled faster iteration across prompt variants and model providers.",
    ],
    challenge:
      "Prompt changes were difficult to track and hard to validate consistently across environments.",
    approach:
      "Introduced YAML prompt packs, test scenarios, and score-based release gating.",
    outcomes: [
      "Safer prompt deployment process with quick rollback paths.",
      "Better collaboration across developers and reviewers.",
      "Reduced hidden prompt regressions in production.",
    ],
  },
];

const categories = ["All", "RAG", "Agents", "Document AI", "Data Pipeline", "Prompt Engineering"];

const statusStyles = {
  Completed: "border-emerald-400/40 bg-emerald-500/15 text-emerald-300",
  "In Progress": "border-amber-400/40 bg-amber-500/15 text-amber-300",
  "Private Repo": "border-slate-500/50 bg-slate-500/20 text-slate-200",
};

export default function Projects() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [expanded, setExpanded] = useState({});

  const filteredProjects = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const list = projects.filter((project) => {
      if (activeCategory !== "All" && project.category !== activeCategory) {
        return false;
      }

      if (featuredOnly && !project.featured) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const queryTarget = [
        project.title,
        project.category,
        project.description,
        project.stack.join(" "),
        project.highlights.join(" "),
        project.challenge,
        project.approach,
        project.outcomes.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return queryTarget.includes(normalizedSearch);
    });

    return list.sort((a, b) => {
      if (sortBy === "impact") {
        return b.impact - a.impact;
      }
      if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      }
      return b.year - a.year;
    });
  }, [activeCategory, featuredOnly, search, sortBy]);

  return (
    <section className="mx-auto max-w-6xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="glass rounded-3xl p-6 shadow-glow sm:p-8"
      >
        <p className="inline-flex rounded-full border border-brand-400/35 bg-brand-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand-200">
          AI Project Explorer
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-slate-100 sm:text-5xl">
          LLM, RAG, and agent systems I&apos;ve built
        </h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          Filter by AI domain, inspect case-study snapshots, and browse implementation details.
          Live and source links are ready to plug in once you share original URLs.
        </p>
      </motion.div>

      <section className="rounded-3xl border border-slate-700/60 bg-slate-900/45 p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="relative block">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title, category, architecture, metrics, or stack"
              className="w-full rounded-xl border border-slate-700/60 bg-slate-900/75 py-3 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none"
            />
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/70 px-3 py-2 text-sm text-slate-200">
              <FiFilter size={14} className="text-brand-300" />
              Sort
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="bg-transparent text-sm text-slate-100 outline-none"
              >
                <option value="newest" className="bg-slate-900">
                  Newest
                </option>
                <option value="impact" className="bg-slate-900">
                  Impact Score
                </option>
                <option value="name" className="bg-slate-900">
                  Name
                </option>
              </select>
            </label>

            <button
              type="button"
              onClick={() => setFeaturedOnly((prev) => !prev)}
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
                featuredOnly
                  ? "bg-brand-500 text-slate-950"
                  : "border border-slate-700/60 bg-slate-900/70 text-slate-200 hover:border-brand-400"
              }`}
            >
              <FiStar size={14} />
              Featured
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === category
                  ? "bg-brand-500 text-slate-950"
                  : "border border-slate-700/60 bg-slate-900/65 text-slate-200 hover:border-brand-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <p className="text-sm text-slate-400">
        Showing {filteredProjects.length} project{filteredProjects.length === 1 ? "" : "s"}.
      </p>

      <div className="grid gap-4 lg:grid-cols-2">
        {filteredProjects.map((project, index) => {
          const isExpanded = Boolean(expanded[project.id]);

          return (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5 }}
              className="rounded-3xl border border-slate-700/60 bg-slate-900/55 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-brand-300">
                    {project.category} | {project.year}
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-semibold text-slate-100">
                    {project.title}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs ${
                      statusStyles[project.status] || "border-slate-700/60 bg-slate-900/70 text-slate-300"
                    }`}
                  >
                    {project.status}
                  </span>
                  <span className="rounded-full border border-brand-400/35 bg-brand-500/10 px-3 py-1 text-xs text-brand-200">
                    Impact {project.impact}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-700/60 bg-slate-900/70 px-3 py-1 text-xs text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="rounded-lg border border-slate-700/60 bg-slate-900/75 px-3 py-2 text-xs text-slate-300"
                  >
                    {metric}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-brand-400"
                  >
                    Live Demo
                    <FiExternalLink size={14} />
                  </a>
                ) : (
                  <span className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2 text-xs text-slate-400">
                    Live link pending
                  </span>
                )}

                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-900/75 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:border-brand-400 hover:text-brand-300"
                  >
                    Source Code
                    <FiGithub size={14} />
                  </a>
                ) : (
                  <span className="rounded-lg border border-slate-700/60 bg-slate-900/70 px-3 py-2 text-xs text-slate-400">
                    Source link pending
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  setExpanded((prev) => ({
                    ...prev,
                    [project.id]: !prev[project.id],
                  }))
                }
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-300 transition hover:text-brand-200"
              >
                {isExpanded ? "Hide case snapshot" : "View case snapshot"}
                <FiArrowUpRight size={15} />
              </button>

              {isExpanded ? (
                <div className="mt-3 space-y-2">
                  <div className="rounded-xl border border-slate-700/60 bg-slate-900/75 px-3 py-2">
                    <p className="text-xs uppercase tracking-wider text-brand-300">Challenge</p>
                    <p className="mt-1 text-sm text-slate-300">{project.challenge}</p>
                  </div>
                  <div className="rounded-xl border border-slate-700/60 bg-slate-900/75 px-3 py-2">
                    <p className="text-xs uppercase tracking-wider text-brand-300">Approach</p>
                    <p className="mt-1 text-sm text-slate-300">{project.approach}</p>
                  </div>
                  <ul className="space-y-2">
                    {project.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="rounded-xl border border-slate-700/60 bg-slate-900/75 px-3 py-2 text-sm text-slate-300"
                      >
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </motion.article>
          );
        })}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-6 text-center">
          <p className="text-slate-200">No projects match your filters right now.</p>
          <p className="mt-1 text-sm text-slate-400">Try removing a category or search term.</p>
        </div>
      ) : null}
    </section>
  );
}
