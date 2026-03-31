import { useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiCheckCircle, FiClock, FiCopy, FiMail, FiMapPin, FiMessageSquare } from "react-icons/fi";

const INITIAL_FORM = {
  name: "",
  email: "",
  projectType: "RAG Assistant",
  budget: "Not decided",
  timeline: "2-4 weeks",
  message: "",
};

const PROJECT_TYPES = [
  "RAG Assistant",
  "AI Agent Workflow",
  "Document OCR Pipeline",
  "PromptOps / Evaluation",
  "Custom AI Integration",
];
const BUDGET_RANGES = ["Not decided", "< $1k", "$1k - $3k", "$3k - $8k", "$8k+"];
const TIMELINES = ["1-2 weeks", "2-4 weeks", "1-2 months", "2+ months", "Flexible"];

const TEMPLATE_PRESETS = [
  {
    id: "rag",
    label: "RAG Assistant",
    projectType: "RAG Assistant",
    budget: "$1k - $3k",
    timeline: "2-4 weeks",
    message:
      "I want to build a retrieval-augmented assistant for internal documents. The goal is grounded answers with citations and reliable search quality.",
  },
  {
    id: "agent",
    label: "AI Agent Workflow",
    projectType: "AI Agent Workflow",
    budget: "$3k - $8k",
    timeline: "1-2 months",
    message:
      "I need a multi-step agent workflow that can classify tasks, call tools safely, and provide auditable outputs for operators.",
  },
  {
    id: "ocr",
    label: "OCR Pipeline",
    projectType: "Document OCR Pipeline",
    budget: "$1k - $3k",
    timeline: "2-4 weeks",
    message:
      "I am looking for an OCR + document processing pipeline that extracts structured fields and connects to a searchable knowledge base.",
  },
];

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const apiBaseUrl = useMemo(
    () => process.env.REACT_APP_API_URL || "http://localhost:5000",
    []
  );

  const messageLength = form.message.trim().length;
  const messageProgress = Math.min((messageLength / 240) * 100, 100);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    setError("");
    setSuccess("");
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email.trim() && !emailRegex.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Message is required.";
    } else if (form.message.trim().length < 20) {
      nextErrors.message = "Please share at least 20 characters so I can help properly.";
    }

    return nextErrors;
  };

  const buildSubmissionMessage = () => {
    return [
      form.message.trim(),
      "",
      `Project Type: ${form.projectType}`,
      `Budget Range: ${form.budget}`,
      `Timeline: ${form.timeline}`,
    ].join("\n");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const validationErrors = validate();
    setFieldErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setError("Please fix the highlighted fields before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.post(`${apiBaseUrl}/api/contact`, {
        name: form.name.trim(),
        email: form.email.trim(),
        message: buildSubmissionMessage(),
      });

      setSuccess("Message sent successfully. I will get back to you within 24 hours.");
      setForm(INITIAL_FORM);
      setFieldErrors({});
      setSelectedTemplate("");
    } catch (requestError) {
      setError(
        requestError?.response?.data?.error ||
          "Unable to send your message right now. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("ayush.dev@example.com");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch (copyError) {
      setError("Unable to copy email right now. Please copy it manually.");
    }
  };

  const handleApplyTemplate = (template) => {
    setSelectedTemplate(template.id);
    setForm((prev) => ({
      ...prev,
      projectType: template.projectType,
      budget: template.budget,
      timeline: template.timeline,
      message: template.message,
    }));
    setFieldErrors((prev) => ({ ...prev, message: "" }));
    setError("");
    setSuccess("");
  };

  return (
    <section className="mx-auto max-w-6xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="glass rounded-3xl p-6 shadow-glow sm:p-8"
      >
        <p className="inline-flex rounded-full border border-brand-400/35 bg-brand-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand-200">
          Let&apos;s Collaborate
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-slate-100 sm:text-5xl">
          Contact Me
        </h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          Share your goal, timeline, and constraints. I&apos;ll help shape a practical solution
          and delivery plan.
        </p>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.form
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-700/60 bg-slate-900/45 p-5 sm:p-6"
        >
          <div className="mb-4 rounded-2xl border border-slate-700/60 bg-slate-900/70 p-4">
            <p className="text-sm font-medium text-slate-100">Quick Start Brief</p>
            <p className="mt-1 text-xs text-slate-400">
              Pick a template to prefill the form and speed up your first message.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {TEMPLATE_PRESETS.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => handleApplyTemplate(template)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    selectedTemplate === template.id
                      ? "bg-brand-500 text-slate-950"
                      : "border border-slate-700/60 bg-slate-900 text-slate-300 hover:border-brand-400"
                  }`}
                >
                  {template.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Name</span>
              <input
                name="name"
                value={form.name}
                placeholder="Your name"
                onChange={handleChange}
                className={`w-full rounded-xl border bg-slate-900/70 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none ${
                  fieldErrors.name
                    ? "border-red-400/80"
                    : "border-slate-700/60 focus:border-brand-400"
                }`}
              />
              {fieldErrors.name ? <p className="mt-1 text-xs text-red-400">{fieldErrors.name}</p> : null}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                placeholder="you@example.com"
                onChange={handleChange}
                className={`w-full rounded-xl border bg-slate-900/70 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none ${
                  fieldErrors.email
                    ? "border-red-400/80"
                    : "border-slate-700/60 focus:border-brand-400"
                }`}
              />
              {fieldErrors.email ? <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p> : null}
            </label>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Project Type</span>
              <select
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700/60 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 focus:border-brand-400 focus:outline-none"
              >
                {PROJECT_TYPES.map((item) => (
                  <option key={item} value={item} className="bg-slate-900">
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Budget</span>
              <select
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700/60 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 focus:border-brand-400 focus:outline-none"
              >
                {BUDGET_RANGES.map((item) => (
                  <option key={item} value={item} className="bg-slate-900">
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Timeline</span>
              <select
                name="timeline"
                value={form.timeline}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700/60 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 focus:border-brand-400 focus:outline-none"
              >
                {TIMELINES.map((item) => (
                  <option key={item} value={item} className="bg-slate-900">
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm text-slate-300">Message</span>
            <textarea
              name="message"
              value={form.message}
              rows={7}
              placeholder="Tell me your goals, target users, and what success looks like..."
              onChange={handleChange}
              className={`w-full rounded-xl border bg-slate-900/70 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none ${
                fieldErrors.message
                  ? "border-red-400/80"
                  : "border-slate-700/60 focus:border-brand-400"
              }`}
            />

            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="text-xs text-slate-400">{messageLength} characters</p>
              <p className="text-xs text-slate-400">
                {messageLength < 20 ? "Add a little more detail for best results." : "Great detail level."}
              </p>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800/85">
              <motion.div
                animate={{ width: `${messageProgress}%` }}
                transition={{ duration: 0.25 }}
                className="h-full rounded-full bg-gradient-to-r from-brand-400 to-sky-400"
              />
            </div>
            {fieldErrors.message ? (
              <p className="mt-1 text-xs text-red-400">{fieldErrors.message}</p>
            ) : null}
          </label>

          {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}
          {success ? (
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-400">
              <FiCheckCircle size={14} />
              {success}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </motion.form>

        <motion.aside
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.42, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <div className="rounded-3xl border border-slate-700/60 bg-slate-900/45 p-5">
            <h2 className="font-display text-2xl font-semibold text-slate-100">Direct Contact</h2>

            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-slate-700/60 bg-slate-900/75 p-4">
                <p className="inline-flex items-center gap-2 font-medium text-slate-100">
                  <FiMail size={15} className="text-brand-300" />
                  Email
                </p>
                <p className="mt-1">ayush.dev@example.com</p>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="mt-2 inline-flex items-center gap-2 text-xs text-brand-300 transition hover:text-brand-200"
                >
                  <FiCopy size={13} />
                  {isCopied ? "Copied" : "Copy email"}
                </button>
              </div>

              <div className="rounded-2xl border border-slate-700/60 bg-slate-900/75 p-4">
                <p className="inline-flex items-center gap-2 font-medium text-slate-100">
                  <FiMapPin size={15} className="text-brand-300" />
                  Location
                </p>
                <p className="mt-1">India | Open to remote collaboration</p>
              </div>

              <div className="rounded-2xl border border-slate-700/60 bg-slate-900/75 p-4">
                <p className="inline-flex items-center gap-2 font-medium text-slate-100">
                  <FiClock size={15} className="text-brand-300" />
                  Typical Response
                </p>
                <p className="mt-1">Within 24 hours</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-brand-400/30 bg-brand-500/10 p-5">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-200">
              <FiMessageSquare size={14} />
              Best First Message
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">
              Include your goal, current blockers, and ideal launch window. I&apos;ll reply with a
              suggested approach and next steps.
            </p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
