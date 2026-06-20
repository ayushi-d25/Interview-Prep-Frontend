import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  LineChart,
  MessageSquare,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PreprAI — Master your next tech interview with AI" },
      {
        name: "description",
        content:
          "AI-powered interview practice for developers. Realistic questions, instant scoring, and personalized feedback to help you land the role.",
      },
      { property: "og:title", content: "PreprAI — AI Interview Prep Platform" },
      {
        property: "og:description",
        content:
          "Realistic AI interviews tailored to your role. Get instant feedback, scoring, and a clear plan to improve.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: Brain,
    title: "AI-generated questions",
    desc: "Role-specific, difficulty-tuned questions that mirror real interview loops at top tech companies.",
  },
  {
    icon: MessageSquare,
    title: "Instant feedback",
    desc: "Detailed scoring, strengths, and weaknesses delivered the moment you finish each session.",
  },
  {
    icon: LineChart,
    title: "Progress tracking",
    desc: "Watch your scores climb over time with a personal dashboard and historical analytics.",
  },
  {
    icon: Target,
    title: "Role-targeted",
    desc: "Choose Frontend, Backend, Full-Stack, React, or Node.js — practice gets sharper, not generic.",
  },
  {
    icon: Zap,
    title: "Built for speed",
    desc: "Spin up a realistic mock interview in under 10 seconds. No setup, no friction.",
  },
  {
    icon: Sparkles,
    title: "Personalized plan",
    desc: "Get a tailored improvement plan after every session, focused on what actually moves the needle.",
  },
];

const testimonials = [
  {
    quote:
      "PreprAI cut my prep time in half. The feedback felt like a senior engineer reviewing me — and I got the offer.",
    name: "Aarav Patel",
    role: "Frontend Engineer @ Stripe",
  },
  {
    quote:
      "The role-specific questions are unreal. I practiced 6 mock sessions and walked into my onsite calm and ready.",
    name: "Mei Tanaka",
    role: "Full-Stack Developer @ Linear",
  },
  {
    quote:
      "It's the only tool that gives actionable feedback. I knew exactly what to study between sessions.",
    name: "Diego Romero",
    role: "Backend Engineer @ Vercel",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    desc: "Get a feel for the platform.",
    features: ["3 interviews / month", "Basic feedback", "Frontend & React roles"],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    desc: "For serious job seekers.",
    features: [
      "Unlimited interviews",
      "Detailed scoring & feedback",
      "All roles & difficulties",
      "History & analytics",
    ],
    cta: "Go Pro",
    featured: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "per month",
    desc: "Bootcamps & cohorts.",
    features: ["Everything in Pro", "Up to 10 seats", "Shared insights", "Priority support"],
    cta: "Contact sales",
    featured: false,
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full gradient-hero opacity-20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-card"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Now with adaptive difficulty
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-5xl md:text-7xl font-bold tracking-tight font-display"
          >
            Master your next <br />
            <span className="gradient-text">tech interview</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            AI-powered mock interviews tailored to your role. Get instant scoring, detailed
            feedback, and a clear plan to improve — all in one beautiful workspace.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-xl gradient-hero px-6 py-3 text-base font-semibold text-white shadow-elegant transition-transform hover:scale-[1.03]"
            >
              Start practicing free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-base font-semibold text-foreground hover:bg-secondary transition"
            >
              Sign in
            </Link>
          </motion.div>

          <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              ["50k+", "Interviews"],
              ["94%", "Offer rate"],
              ["4.9", "Avg rating"],
            ].map(([v, l]) => (
              <div key={l} className="text-center">
                <p className="text-3xl font-bold font-display gradient-text">{v}</p>
                <p className="text-xs text-muted-foreground mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Features</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold font-display">
            Everything you need to <span className="gradient-text">land the offer</span>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant hover:border-primary/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-hero text-white shadow-glow">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="border-y border-border bg-card/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">Loved by engineers</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold font-display">
              Stories from people who shipped <span className="gradient-text">their offer</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-border bg-card p-6 shadow-card"
              >
                <p className="text-foreground leading-relaxed">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-hero text-sm font-bold text-white">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Pricing</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold font-display">
            Simple, <span className="gradient-text">honest pricing</span>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {pricing.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl border p-8 shadow-card ${
                p.featured
                  ? "border-primary/60 bg-card shadow-elegant scale-[1.02]"
                  : "border-border bg-card"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full gradient-hero px-3 py-1 text-xs font-semibold text-white shadow-glow">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold font-display">{p.price}</span>
                <span className="text-sm text-muted-foreground">/ {p.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span className="text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className={`mt-8 block rounded-xl px-4 py-3 text-center text-sm font-semibold transition ${
                  p.featured
                    ? "gradient-hero text-white shadow-elegant hover:scale-[1.02]"
                    : "border border-border bg-transparent text-foreground hover:bg-secondary"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-12 md:p-16 text-center shadow-elegant">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-display">
            Ready to ace your next interview?
          </h2>
          <p className="mt-4 text-lg text-white/85 max-w-xl mx-auto">
            Join thousands of engineers who use PreprAI to walk into interviews with confidence.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-primary hover:scale-[1.03] transition"
            >
              Get started free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition"
            >
              I have an account
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
