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
    impact: 96,
    featured: true,
    description:
      "A production-oriented document QA assistant with OCR fallback, FAISS indexing, and grounded conversational answers.",
    stack: ["Python", "RAG", "FAISS", "Groq API", "Streamlit"],
    demoUrl: "",
    repoUrl: "",
    highlights: [
      "Built OCR plus chunking pipeline for mixed scanned and digital PDFs.",
      "Added adaptive retrieval to improve response quality on long document sets.",
      "Implemented citation-ready answer formatting with source traceability.",
    ],
  },
  {
    id: "agentops-copilot",
    title: "AgentOps Support Copilot",
    category: "Agents",
    year: 2026,
    impact: 92,
    featured: true,
    description:
      "A multi-step intelligent agent workflow for support triage, intent classification, and action recommendations.",
    stack: ["Python", "LangGraph", "LLMs", "Prompt Engineering", "APIs"],
    demoUrl: "",
    repoUrl: "",
    highlights: [
      "Orchestrated tool-calling agents with bounded context and failure handling.",
      "Used YAML-based prompt templates for predictable and testable behavior.",
      "Reduced repetitive support handling time with automated draft actions.",
    ],
  },
  {
    id: "visionparse-pipeline",
    title: "VisionParse OCR Pipeline",
    category: "Document AI",
    year: 2025,
    impact: 89,
    featured: false,
    description:
      "A modular pipeline for document ingestion, OCR extraction, cleaning, and structured output generation.",
    stack: ["Python", "OCR", "NLP", "JSON Schemas", "FastAPI"],
    demoUrl: "",
    repoUrl: "",
    highlights: [
      "Standardized noisy OCR output into consistent machine-readable fields.",
      "Added validation guards for missing pages and confidence drop scenarios.",
      "Designed reusable parsing modules for invoices, reports, and statements.",
    ],
  },
  {
    id: "adaptive-crawl-retrieval",
    title: "Adaptive Crawl Retrieval Engine",
    category: "Data Pipeline",
    year: 2025,
    impact: 87,
    featured: false,
    description:
      "A web scraping and indexing engine that continuously refreshes knowledge bases for retrieval workflows.",
    stack: ["Python", "Web Scraping", "FAISS", "Scheduling", "ETL"],
    demoUrl: "",
    repoUrl: "",
    highlights: [
      "Implemented site-aware crawling rules for reliable periodic content updates.",
      "Added deduplication and relevance scoring before vector indexing.",
      "Improved retrieval freshness in dynamic knowledge environments.",
    ],
  },
  {
    id: "promptops-studio",
    title: "PromptOps Studio",
    category: "Prompt Engineering",
    year: 2024,
    impact: 84,
    featured: false,
    description:
      "An internal toolkit for structured prompt versioning, YAML prompt packs, and response evaluation workflows.",
    stack: ["Python", "YAML", "LLMs", "Evaluation", "Streamlit"],
    demoUrl: "",
    repoUrl: "",
    highlights: [
      "Versioned prompts with environment-specific overrides for safer releases.",
      "Added lightweight scoring harness for consistency and hallucination checks.",
      "Enabled faster iteration across prompt variants and model providers.",
    ],
  },
];

const categories = ["All", "RAG", "Agents", "Document AI", "Data Pipeline", "Prompt Engineering"];

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
          Filter by AI domain, inspect architecture highlights, and browse stack details. Live and
          source links are ready to plug in once you share the original project URLs.
        </p>
      </motion.div>

      <section className="rounded-3xl border border-slate-700/60 bg-slate-900/45 p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="relative block">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title, category, architecture, or stack"
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

                <span className="rounded-full border border-brand-400/35 bg-brand-500/10 px-3 py-1 text-xs text-brand-200">
                  Impact {project.impact}
                </span>
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
                {isExpanded ? "Hide highlights" : "View highlights"}
                <FiArrowUpRight size={15} />
              </button>

              {isExpanded ? (
                <ul className="mt-3 space-y-2">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="rounded-xl border border-slate-700/60 bg-slate-900/75 px-3 py-2 text-sm text-slate-300"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
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
