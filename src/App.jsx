import { useEffect, useRef, useState } from "react";
import "./App.css";

// ─── DATA ────────────────────────────────────────────────────────────────────

const techStack = {
  Frontend: [
    { name: "React", color: "#61DAFB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", color: "#ffffff", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Redux", color: "#764ABC", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
    { name: "TailwindCSS", color: "#38BDF8", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Three.js", color: "#ffffff", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
    { name: "TypeScript", color: "#3178C6", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "HTML5", color: "#E34F26", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", color: "#1572B6", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", color: "#F7DF1E", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" }
  ],
  Backend: [
    { name: "Go", color: "#00ADD8", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg" },
    { name: "Python", color: "#3776AB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "FastAPI", color: "#009688", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
    { name: "PHP", color: "#777BB4", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  ],
  DevOps: [
    { name: "Docker", color: "#2496ED", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Kubernetes", color: "#326CE5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
    { name: "Linux", color: "#FCC624", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "Git", color: "#F05032", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  ],
  Databases: [
    { name: "PostgreSQL", color: "#4169E1", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "MongoDB", color: "#47A248", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "MySQL", color: "#4479A1", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Redis", color: "#DC382D", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  ],
};

const catAccent = { Frontend: "#38BDF8", Backend: "#63ffb4", DevOps: "#f472b6", Databases: "#fbbf24" };

const projects = [
  {
    name: "omctl",
    badge: "CLI Tool",
    desc: "A Go-powered CLI for OpenMetadata — query lineage graphs, manage governance metadata, and automate data cataloging from the terminal.",
    highlights: [
      "Full lineage graph traversal via REST",
      "Upstream/downstream asset discovery",
      "Governance automation for data teams",
      "Built during GSoC 2026 contribution to OpenTransit",
    ],
    learned: "CLI architecture patterns, OpenMetadata API internals, graph traversal in Go, and how governance tooling fits into data engineering workflows.",
    tags: ["Go", "REST API", "OpenMetadata"],
    tagColors: ["#00ADD8", "#38BDF8", "#fbbf24"],
    github: "https://github.com/shivakumar2006/OpenMetaDataCommandLineTool",
  },
  {
    name: "API Resilience Platform",
    badge: "Backend",
    desc: "Production-grade Go backend with circuit breakers, rate limiting, retries, timeouts, and worker pools — enterprise reliability patterns from scratch.",
    highlights: [
      "Circuit breaker with 3-state FSM (closed/open/half-open)",
      "Token bucket rate limiter per-client",
      "Configurable retry with exponential backoff",
      "Worker pool for bounded concurrency",
    ],
    learned: "How distributed systems fail gracefully, Go's concurrency model with goroutines and channels, and Hystrix-style patterns implemented from scratch.",
    tags: ["Go", "Concurrency", "Resilience"],
    tagColors: ["#00ADD8", "#f472b6", "#38BDF8"],
    github: "https://github.com/shivakumar2006/resilientLab",
  },
  {
    name: "Online Bookstore",
    badge: "Microservices",
    desc: "A 7-microservice e-commerce platform with Stripe payments, full auth, API gateway, and production Docker/Kubernetes deployment.",
    highlights: [
      "7 services: auth, catalog, cart, orders, payments, notifications, gateway",
      "Stripe payment integration with webhook handling",
      "API gateway for unified routing",
      "Docker Compose + K8s manifests",
    ],
    learned: "Service orchestration, Docker networking, API gateway patterns, distributed request handling, and inter-service communication.",
    tags: ["Go", "Docker", "Kubernetes", "Stripe"],
    tagColors: ["#00ADD8", "#2496ED", "#326CE5", "#635BFF"],
    github: "https://github.com/shivakumar2006/online-bookStore",
  },
  {
    name: "FinanceOS",
    badge: "Full-Stack",
    desc: "Full-stack finance dashboard with JWT auth, three-tier RBAC, rate limiting, and Dockerized deployment — built as a 6-month internship submission.",
    highlights: [
      "Three-tier RBAC: Admin / Manager / User",
      "JWT auth with refresh tokens",
      "25+ Postman automated API tests",
      "Full Docker Compose deployment",
    ],
    learned: "RBAC design patterns, JWT refresh flows, production-grade API testing with Postman, and Docker networking for full-stack apps.",
    tags: ["Go", "PostgreSQL", "React", "Docker"],
    tagColors: ["#00ADD8", "#4169E1", "#61DAFB", "#2496ED"],
    github: "https://github.com/shivakumar2006/finance-project",
  },
  {
    name: "Autonomous Security Swarm",
    badge: "AI Agents",
    desc: "9-agent autonomous security system with 3 custom MCP servers. Top 0.2% of 5,000+ participants in Archestra hackathon.",
    highlights: [
      "9 specialized agents with custom tool routing",
      "3 hand-built MCP servers in Python",
      "Autonomous threat detection pipeline",
      "Top 10 swag winner — 5,000+ participants",
    ],
    learned: "MCP protocol internals, multi-agent coordination patterns, tool server design from scratch, and AI systems under hackathon pressure.",
    tags: ["Python", "MCP", "AI Agents"],
    tagColors: ["#3776AB", "#63ffb4", "#f472b6"],
    github: "https://github.com/shivakumar2006/mcp",
  },
  {
    name: "AutoOps",
    badge: "Event-Driven",
    desc: "Event-driven backend built in one week for the Backend Reloaded Hackathon — async processing, message queues, and automated operational workflows.",
    highlights: [
      "Event-driven architecture with message queues",
      "Async job processing pipeline",
      "Built end-to-end in under 7 days",
      "Automated operational workflows",
    ],
    learned: "Event-driven design patterns, async vs sync tradeoffs, queue-based decoupling, and shipping a complete system under extreme time constraints.",
    tags: ["Go", "Event-Driven", "Queues"],
    tagColors: ["#00ADD8", "#fbbf24", "#38BDF8"],
    github: "https://github.com/shivakumar2006/autoops-hackathon-project-",
  },
];

// GSoC hata diya, GitHub commits hata diya
const achievements = [
  { icon: "🏆", title: "Hackathon Winner", desc: '"Automate If You Can" by WeMakeDevs — won among 4,000+ participants.' },
  { icon: "🥇", title: "Top 10 Swag Winner", desc: "Archestra hackathon — top 0.2% out of 5,000+ for Autonomous Security Swarm." },
  { icon: "🚀", title: "6+ Hackathons", desc: "Smart India Hackathon screening, Backend Reloaded, Accomplish AI, Archestra, WeMakeDevs & more." },
  { icon: "📚", title: "Self-Taught Dev", desc: "1.5 years from zero to microservices, distributed systems & CLI tooling in Go." },
];

const learning = [
  "Kubernetes internals",
  "OSS contribution",
  "Distributed systems design",
  "CRIU checkpointing",
  "Cloud-native patterns",
  "Go runtime internals",
];

// Terminal lines shown in the mac window
const terminalLines = [
  { prompt: "~", cmd: "whoami", delay: 0 },
  { out: "shiva — backend dev, Go enthusiast", delay: 400 },
  { prompt: "~", cmd: "cat skills.txt", delay: 900 },
  { out: "Go · React · Docker · Kubernetes", delay: 1300 },
  { out: "PostgreSQL · MongoDB · Microservices", delay: 1500 },
  { prompt: "~", cmd: "cat wins.txt", delay: 2000 },
  { out: "🏆 WeMakeDevs hackathon winner", delay: 2400 },
  { out: "🥇 Archestra top 0.2% (5k+ devs)", delay: 2650 },
  { prompt: "~", cmd: "echo $STATUS", delay: 3400 },
  { out: "open to internships & collab 🚀", delay: 3800 },
  { prompt: "~", cmd: "", delay: 4300, cursor: true },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function FadeSection({ children, className = "" }) {
  const [ref, visible] = useFadeIn();
  return (
    <div ref={ref} className={className} style={{ transition: "opacity 0.7s ease, transform 0.7s ease", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(36px)" }}>
      {children}
    </div>
  );
}

function SectionHeader({ label, title }) {
  return (
    <div className="mb-14">
      <p className="font-mono text-sm text-emerald-400 tracking-[0.18em] uppercase mb-3">{label}</p>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white">{title}</h2>
      <div className="mt-5 w-16 h-0.5 bg-emerald-400 rounded-full" />
    </div>
  );
}

function SkillCard({ tech }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="flex flex-col items-center gap-3 cursor-default select-none" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div
        className="relative w-16 h-16 flex items-center justify-center rounded-2xl"
        style={{
          background: hovered ? `radial-gradient(circle at 50% 60%, ${tech.color}28 0%, ${tech.color}06 70%, transparent 100%)` : "rgba(255,255,255,0.03)",
          border: `1.5px solid ${hovered ? tech.color + "66" : "rgba(255,255,255,0.06)"}`,
          boxShadow: hovered ? `0 0 28px ${tech.color}55, 0 0 10px ${tech.color}33, inset 0 0 16px ${tech.color}0d` : "none",
          transform: hovered ? "translateY(-6px) scale(1.12)" : "translateY(0) scale(1)",
          transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <img
          src={tech.icon} alt={tech.name}
          className="w-9 h-9 object-contain"
          style={{ filter: hovered ? `drop-shadow(0 0 10px ${tech.color}dd) drop-shadow(0 0 4px ${tech.color}88)` : "none", transition: "filter 0.3s ease" }}
          onError={(e) => { e.target.style.display = "none"; e.target.parentNode.insertAdjacentHTML("beforeend", `<span style="font-size:13px;font-weight:800;color:${tech.color}">${tech.name.slice(0, 2).toUpperCase()}</span>`); }}
        />
      </div>
      <span className="font-mono text-xs font-medium" style={{ color: hovered ? tech.color : "#64748b", transition: "color 0.25s ease" }}>
        {tech.name}
      </span>
    </div>
  );
}

function ProjectCard({ project }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="group bg-[#0d0d1a] border border-white/5 rounded-2xl p-8 flex flex-col hover:border-emerald-400/22 transition-all duration-300"
      style={{ boxShadow: "none" }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 50px rgba(99,255,180,0.05)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-mono text-emerald-400 font-bold text-xl">{project.name}</h3>
        <span className="font-mono text-xs px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/18 shrink-0 ml-3">{project.badge}</span>
      </div>
      <p className="text-slate-400 text-base leading-relaxed mb-5 flex-1">{project.desc}</p>
      <ul className="mb-5 space-y-2.5">
        {project.highlights.map((h, i) => (
          <li key={i} className="text-sm text-slate-300 flex gap-3 leading-relaxed">
            <span className="text-emerald-400 shrink-0 mt-0.5">→</span><span>{h}</span>
          </li>
        ))}
      </ul>
      <div className="bg-emerald-400/4 border border-emerald-400/10 rounded-xl p-4 mb-5">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between font-mono text-xs text-emerald-400 tracking-[0.12em] uppercase">
          <span>// what i learned</span>
          <span style={{ transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s ease", display: "inline-block", fontSize: "1.25rem", lineHeight: 1 }}>+</span>
        </button>
        {open && <p className="text-sm text-slate-400 mt-3 leading-relaxed">{project.learned}</p>}
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((t, i) => (
          <span key={t} className="font-mono text-xs px-3 py-1 rounded-full border"
            style={{ color: project.tagColors[i] || "#63ffb4", borderColor: (project.tagColors[i] || "#63ffb4") + "30", background: (project.tagColors[i] || "#63ffb4") + "0c" }}>
            {t}
          </span>
        ))}
      </div>
      <a href={project.github} target="_blank" rel="noopener noreferrer" className="mt-auto self-start font-mono text-sm text-sky-400 border border-sky-400/22 px-5 py-2.5 rounded-lg hover:bg-sky-400/10 transition-colors">
        GitHub →
      </a>
    </div>
  );
}

// Mac-style terminal widget
function MacTerminal() {
  const [shownLines, setShownLines] = useState([]);

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    terminalLines.forEach((line) => {
      setTimeout(() => {
        setShownLines((prev) => [...prev, line]);
      }, line.delay);
    });
  }, []);

  return (
    <div
      className="w-full max-w-lg rounded-2xl overflow-hidden"
      style={{
        background: "rgba(10,10,20,0.92)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* Traffic light buttons */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57", boxShadow: "0 0 6px #ff5f5788" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e", boxShadow: "0 0 6px #febc2e88" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#28c840", boxShadow: "0 0 6px #28c84088" }} />
        </div>
        <span className="flex-1 text-center font-mono text-xs text-slate-500">shiva — zsh</span>
      </div>

      {/* Terminal body */}
      <div className="p-5 font-mono text-sm leading-relaxed min-h-[280px]" style={{ color: "#c8d3f5" }}>
        {shownLines.map((line, i) => (
          <div key={i} className="mb-0.5">
            {line.prompt !== undefined ? (
              <span>
                <span style={{ color: "#63ffb4" }}>shiva</span>
                <span style={{ color: "#636da6" }}>@dev</span>
                <span style={{ color: "#c8d3f5" }}> {line.prompt} </span>
                <span style={{ color: "#82aaff" }}>% </span>
                <span style={{ color: "#c8d3f5" }}>{line.cmd}</span>
                {line.cursor && (
                  <span
                    style={{
                      display: "inline-block",
                      width: "8px",
                      height: "15px",
                      background: "#63ffb4",
                      marginLeft: "3px",
                      verticalAlign: "middle",
                      animation: "termCursor 1s steps(1) infinite",
                    }}
                  />
                )}
              </span>
            ) : (
              <span style={{ color: "#a9b8e8" }}>{line.out}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = ["tech", "projects", "achievements", "contact"];

  return (
    <div className="min-h-screen bg-[#080810] text-slate-200 overflow-x-hidden">

      {/* Keyframes injected via style tag */}
      <style>{`
        @keyframes termCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .name-shine {
          background: linear-gradient(
            90deg,
            #63ffb4 0%,
            #38bdf8 20%,
            #a78bfa 40%,
            #ffffff 50%,
            #a78bfa 60%,
            #38bdf8 80%,
            #63ffb4 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3.5s linear infinite;
        }
      `}</style>

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-20 xl:px-28 transition-all duration-300"
        style={{
          height: scrolled ? "62px" : "76px",
          background: scrolled ? "rgba(8,8,16,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(99,255,180,0.08)" : "none",
        }}
      >
        <span className="font-mono text-emerald-400 text-base font-semibold tracking-wide">~/shiva</span>
        <ul className="hidden md:flex gap-12">
          {navLinks.map((s) => (
            <li key={s}>
              <a href={`#${s}`} className="font-mono text-sm text-slate-500 hover:text-emerald-400 transition-colors tracking-[0.14em] uppercase">{s}</a>
            </li>
          ))}
        </ul>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden font-mono text-slate-400 text-xl">
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#080810]/97 flex flex-col items-center justify-center gap-12">
          <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-8 font-mono text-slate-400 text-2xl">✕</button>
          {navLinks.map((s) => (
            <a key={s} href={`#${s}`} onClick={() => setMenuOpen(false)}
              className="font-mono text-3xl text-slate-300 hover:text-emerald-400 transition-colors tracking-[0.15em] uppercase">{s}</a>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section className="min-h-screen w-full flex flex-col justify-center px-8 lg:px-20 xl:px-28 relative overflow-hidden">
        {/* bg glows */}
        <div className="pointer-events-none absolute" style={{ top: "25%", left: "5%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,255,180,0.05) 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute" style={{ bottom: "20%", right: "5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 70%)" }} />

        {/* Two-column layout */}
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center gap-12 xl:gap-16">

          {/* LEFT — text */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-sm text-emerald-400 tracking-widest">shivakumar2006 — available for opportunities</span>
            </div>

            <h1 className="font-black tracking-tighter leading-[0.88] mb-8" style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}>
              <span className="text-white block">Hi, I'm</span>
              <span className="block name-shine">Shiva</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-2xl mb-4 leading-relaxed">
              Full-stack developer focused on backend systems, distributed applications, and developer tooling using Go and React.
            </p>
            <p className="text-base md:text-lg text-slate-500 max-w-xl mb-12 leading-relaxed">
              I build scalable backend systems, CLI tools, microservices, and developer-focused applications while exploring cloud-native and distributed systems.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#projects"
                className="font-mono font-bold text-base px-9 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "#63ffb4", color: "#080810" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 40px rgba(99,255,180,0.35)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                ⚡ View Projects
              </a>
              <a href="https://github.com/shivakumar2006" target="_blank" rel="noopener noreferrer"
                className="font-mono text-base px-9 py-4 rounded-xl border border-emerald-400/35 text-emerald-400 hover:bg-emerald-400/8 transition-all hover:-translate-y-0.5">
                ⌥ GitHub
              </a>
              <a href="#"
                className="font-mono text-base px-9 py-4 rounded-xl border border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20 transition-all">
                Resume →
              </a>
            </div>
          </div>

          {/* RIGHT — Mac terminal */}
          <div className="xl:flex-shrink-0 xl:w-[480px] w-full">
            <MacTerminal />
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="font-mono text-xs text-slate-500 tracking-widest">scroll</span>
          <div className="w-px h-14 bg-gradient-to-b from-slate-500 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section id="tech" className="w-full px-8 lg:px-20 xl:px-28 py-28">
        <FadeSection>
          <SectionHeader label="// tech stack" title="What I Build With" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(techStack).map(([cat, techs]) => (
              <div key={cat} className="bg-[#0c0c18] border border-white/5 rounded-2xl p-10 hover:border-white/9 transition-colors">
                <p className="font-mono text-xs tracking-[0.18em] uppercase mb-8 font-semibold" style={{ color: catAccent[cat] }}>{cat}</p>
                <div className="flex flex-wrap gap-10">
                  {techs.map((tech) => <SkillCard key={tech.name} tech={tech} />)}
                </div>
              </div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="w-full px-8 lg:px-20 xl:px-28 py-28">
        <FadeSection>
          <SectionHeader label="// featured projects" title="What I've Built" />
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((p) => <ProjectCard key={p.name} project={p} />)}
          </div>
        </FadeSection>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" className="w-full px-8 lg:px-20 xl:px-28 py-28">
        <FadeSection>
          <SectionHeader label="// achievements" title="Wins & Recognition" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {achievements.map((a) => (
              <div key={a.title}
                className="bg-[#0c0c18] border border-white/5 rounded-2xl p-8 flex gap-5 items-start hover:border-emerald-400/15 hover:-translate-y-1 transition-all duration-200">
                <span className="text-4xl shrink-0">{a.icon}</span>
                <div>
                  <p className="font-bold text-lg text-white mb-2">{a.title}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* ── CURRENTLY LEARNING ── */}
      <section className="w-full px-8 lg:px-20 xl:px-28 py-20">
        <FadeSection>
          <SectionHeader label="// currently learning" title="What's Next" />
          <div className="flex flex-wrap gap-4">
            {learning.map((item) => (
              <div key={item}
                className="flex items-center gap-3 font-mono text-base bg-[#0c0c18] border border-white/5 rounded-xl px-7 py-4 text-slate-300 hover:border-emerald-400/20 hover:text-emerald-400 transition-all cursor-default">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* ── RESUME ── */}
      <section className="w-full px-8 lg:px-20 xl:px-28 py-20">
        <FadeSection>
          <div className="border border-emerald-400/10 rounded-3xl p-14 flex flex-col md:flex-row items-center justify-between gap-8"
            style={{ background: "linear-gradient(135deg, #0d0d1a 0%, #0a0a16 100%)" }}>
            <div>
              <p className="font-mono text-sm text-emerald-400 tracking-[0.18em] uppercase mb-3">// resume</p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">Want the full picture?</h2>
              <p className="text-slate-500 text-lg">All projects, education, and experience in one place.</p>
            </div>
            <a href="#"
              className="shrink-0 font-mono font-bold text-base px-12 py-4 rounded-xl transition-all hover:-translate-y-0.5"
              style={{ background: "#63ffb4", color: "#080810" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 0 35px rgba(99,255,180,0.3)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              ⬇ Download Resume
            </a>
          </div>
        </FadeSection>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="w-full px-8 lg:px-20 xl:px-28 py-28">
        <FadeSection>
          <SectionHeader label="// contact" title="Let's Talk" />
          <p className="text-slate-500 text-lg mb-10 -mt-8">Open to internships, collaborations, and interesting problems.</p>
          <div className="flex flex-wrap gap-4">
            {[
              { icon: "✉", label: "official.shivakumar06@gmail.com", href: "mailto:official.shivakumar06@gmail.com" },
              { icon: "⌥", label: "github.com/shivakumar2006", href: "https://github.com/shivakumar2006" },
              { icon: "↗", label: "LinkedIn", href: "https://www.linkedin.com/in/shiva-shiva-8a48002a7/" },
            ].map((c) => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 font-mono text-base bg-[#0c0c18] border border-white/6 rounded-xl px-8 py-4 text-slate-300 hover:text-emerald-400 hover:border-emerald-400/25 hover:-translate-y-1.5 transition-all duration-200">
                <span className="text-xl">{c.icon}</span>{c.label}
              </a>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-8 text-center font-mono text-sm text-slate-600">
        built with Go mindset &amp; React hands — shiva © 2026
      </footer>
    </div>
  );
}