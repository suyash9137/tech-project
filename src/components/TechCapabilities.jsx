import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code2, Server, Cloud, Database, Bot, Sparkles } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function TechCapabilities() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', 'AI & ML', 'FRONTEND', 'BACKEND', 'CLOUD', 'DATA & AUTOMATION'];

  const capabilities = [
    { name: 'PyTorch / TensorFlow', category: 'AI & ML', desc: 'Custom model training & neural architecture' },
    { name: 'LangChain & LlamaIndex', category: 'AI & ML', desc: 'RAG pipelines & LLM agent orchestration' },
    { name: 'OpenAI & Anthropic APIs', category: 'AI & ML', desc: 'Enterprise LLM integration & prompt engineering' },
    { name: 'Pinecone / Qdrant', category: 'AI & ML', desc: 'Vector database search & embeddings' },
    { name: 'React 18 / Next.js 14', category: 'FRONTEND', desc: 'High-performance web apps & server components' },
    { name: 'Vite / TypeScript', category: 'FRONTEND', desc: 'Type-safe ultra-fast build tooling' },
    { name: 'Tailwind CSS', category: 'FRONTEND', desc: 'Custom design systems & utility token architecture' },
    { name: 'Framer Motion & Three.js', category: 'FRONTEND', desc: 'Framer-grade motion & 3D WebGL visualizations' },
    { name: 'Node.js / Express', category: 'BACKEND', desc: 'Scalable async microservices' },
    { name: 'Python FastAPI', category: 'BACKEND', desc: 'High-throughput API endpoints' },
    { name: 'Go (Golang)', category: 'BACKEND', desc: 'Ultra-low latency microservices' },
    { name: 'GraphQL & REST', category: 'BACKEND', desc: 'Flexible API data fetching layers' },
    { name: 'AWS (ECS, Lambda, S3)', category: 'CLOUD', desc: 'Enterprise cloud infrastructure' },
    { name: 'GCP & Vercel Edge', category: 'CLOUD', desc: 'Global edge deployment networks' },
    { name: 'Docker & Kubernetes', category: 'CLOUD', desc: 'Container orchestration & CI/CD pipelines' },
    { name: 'PostgreSQL & Redis', category: 'DATA & AUTOMATION', desc: 'Relational data stores & high-speed caching' },
  ];

  const filtered = activeCategory === 'ALL'
    ? capabilities
    : capabilities.filter((c) => c.category === activeCategory);

  return (
    <section id="capabilities" className="py-28 px-4 sm:px-8 bg-[var(--primary-black)] relative">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Animated Section Header */}
        <SectionHeader
          badge="07 // CAPABILITY MATRIX"
          title="Technical Capabilities"
          highlightWord="Capabilities"
          description="Production-grade stack engineered for stability, security, scale, and high-velocity product delivery."
        />

        {/* Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[var(--primary-text)] text-[var(--primary-black)] font-semibold shadow-[var(--shadow-text-light-0-0-20px-0-25)]'
                  : 'bg-[var(--primary-black)]/20 text-[var(--primary-text)]/60 hover:bg-[var(--primary-black)]/30 hover:text-[var(--primary-text)] border border-[var(--primary-border)]/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Capabilities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((cap, idx) => (
            <motion.div
              key={cap.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              className="p-5 rounded-2xl bg-[var(--primary-black)]/20 border border-[var(--primary-border)]/10 space-y-2 hover:border-[var(--primary-circuit)]/40 transition-colors"
            >
              <span className="text-[10px] font-mono text-[var(--primary-circuit)] bg-[var(--primary-circuit)]/10 px-2 py-0.5 rounded border border-[var(--primary-circuit)]/20">
                {cap.category}
              </span>
              <h3 className="font-display font-semibold text-base text-[var(--primary-text)]">
                {cap.name}
              </h3>
              <p className="text-xs text-[var(--primary-text)]/60 leading-relaxed">
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
