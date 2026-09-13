import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Layers, Cpu, Zap, BarChart3 } from 'lucide-react';
import CaseStudyModal from './CaseStudyModal';
import SectionHeader from './SectionHeader';

export default function SelectedWork({ onOpenInquiry }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: '01',
      title: 'Aether AI — Enterprise Workflow Automation',
      client: 'Aether Technologies',
      category: 'AI & AUTOMATION',
      year: '2026',
      featured: true,
      shortDescription: 'Autonomous AI multi-agent orchestration platform processing high-volume financial document workflows with sub-second extraction accuracy.',
      fullDescription: 'Aether AI is a next-generation enterprise multi-agent system designed for automated document processing, invoice reconciliation, and automated decision-making across distributed financial institutions.',
      gradient: 'from-[var(--primary-data)]/30 via-[var(--primary-black)]/40 to-[var(--primary-black)]',
      impact: '+64% Operational Efficiency',
      services: ['AI Agents', 'LLM RAG Pipeline', 'React SaaS', 'Python Microservices'],
      metrics: [
        { label: 'EFFICIENCY GAIN', value: '+64%' },
        { label: 'DOCS PROCESSED', value: '4.2M+' },
        { label: 'EXTRACTION ACCURACY', value: '99.4%' },
        { label: 'LATENCY REDUCTION', value: '820ms' },
      ],
      challenge: 'Manual document compliance and reconciliation were bottlenecking operational throughput across 14 enterprise regional hubs.',
      solution: 'Engineered a multi-agent AI pipeline utilizing specialized agent roles (Parsing Agent, Audit Agent, Compliance Agent) linked to a high-speed vector store and React-based real-time control terminal.',
      deliverables: [
        'Multi-Agent System Architecture',
        'Custom RAG Vector Search Pipeline',
        'Framer-Grade Control Terminal',
        'Enterprise RBAC & Security Audit Logs'
      ]
    },
    {
      id: '02',
      title: 'Vanguard SaaS — Financial Intelligence Terminal',
      client: 'Vanguard Capital',
      category: 'SAAS PLATFORM',
      year: '2025',
      featured: false,
      shortDescription: 'Real-time financial analytics dashboard and multi-tenant SaaS terminal engineered for algorithmic trading firms.',
      fullDescription: 'Vanguard SaaS provides real-time latency-critical analytics, portfolio risk modeling, and automated hedging execution for global liquidity managers.',
      gradient: 'from-[var(--primary-circuit)]/30 via-[var(--primary-black)]/40 to-[var(--primary-black)]',
      impact: '$120M+ Daily Transacted Volume',
      services: ['Full-Stack SaaS', 'WebSockets', 'Tailwind Design System', 'Go API Engine'],
      metrics: [
        { label: 'DAILY VOLUME', value: '$120M+' },
        { label: 'WEBSOCKET LATENCY', value: '< 18ms' },
        { label: 'ACTIVE PORTFOLIOS', value: '18,500+' },
        { label: 'UPTIME SLA', value: '99.99%' },
      ],
      challenge: 'Existing legacy systems suffered from severe latency spikes during peak market hours, leading to slippage and delayed risk calculations.',
      solution: 'Architected a zero-allocation Go API backend paired with a high-frequency WebSocket data layer and modular React dashboard components.',
      deliverables: [
        'High-Frequency WebSocket Data Pipeline',
        'Custom Interactive Charting Engine',
        'Multi-Tenant Tenant Isolation',
        'Stripe Billing & Tiered Entitlements'
      ]
    },
    {
      id: '03',
      title: 'Krypton Experience — Global Digital Brand',
      client: 'Krypton Labs',
      category: 'WEB EXPERIENCE',
      year: '2025',
      featured: false,
      shortDescription: 'Editorial digital experience showcasing quantum-safe cryptographic infrastructure with immersive 3D shaders.',
      fullDescription: 'Krypton Labs required a Framer-grade, high-end digital web experience that communicated technical credibility to enterprise buyers while commanding modern aesthetic authority.',
      gradient: 'from-[var(--primary-data)]/30 via-[var(--primary-slate)]/40 to-[var(--primary-black)]',
      impact: '3.2x Lead Conversion Growth',
      services: ['Web Architecture', 'Three.js / WebGL', 'Framer Motion', 'Editorial Typography'],
      metrics: [
        { label: 'CONVERSION LIFT', value: '3.2x' },
        { label: 'LIGHTHOUSE SCORE', value: '100/100' },
        { label: 'AVG SESSION TIME', value: '4m 12s' },
        { label: 'GLOBAL REACH', value: '140+ Countries' },
      ],
      challenge: 'Communicating complex post-quantum encryption protocols without overwhelming prospective client executives with dry text.',
      solution: 'Designed an interactive WebGL spatial visualizer showing cryptographic key exchanges with fluid scroll choreography and micro-motion.',
      deliverables: [
        'Interactive 3D WebGL Shader Matrix',
        'Editorial Design Token System',
        'Responsive Mobile Layout System',
        'Headless CMS Content Pipeline'
      ]
    },
    {
      id: '04',
      title: 'Nova Core — Autonomous Business Intelligence',
      client: 'Nova Enterprise',
      category: 'CUSTOM SOFTWARE',
      year: '2025',
      featured: true,
      shortDescription: 'Bespoke business intelligence pipeline integrating machine learning models with automated executive reporting.',
      fullDescription: 'Nova Core unifies enterprise data sources across ERP, CRM, and analytics endpoints into an automated insight engine.',
      gradient: 'from-[var(--primary-signal)]/30 via-[var(--primary-muted)]/40 to-[var(--primary-black)]',
      impact: '10x Faster Executive Reporting',
      services: ['Custom Microservices', 'Data Pipeline', 'ML Predictive Analytics', 'API Gateway'],
      metrics: [
        { label: 'REPORTING SPEEDUP', value: '10x' },
        { label: 'DATA SOURCES', value: '45+ Connectors' },
        { label: 'ML ACCURACY', value: '98.7%' },
        { label: 'MAN HOURS SAVED', value: '1,400/mo' },
      ],
      challenge: 'Executive leadership lacked real-time visibility into cross-departmental operations due to siloed data systems.',
      solution: 'Built an autonomous ETL engine with machine learning models that generate weekly dynamic executive summaries and predictive forecasts.',
      deliverables: [
        'Automated ETL Data Pipeline',
        'Predictive Forecasting ML Models',
        'Real-time Executive Portal',
        'Slack & Email Automated Digest System'
      ]
    }
  ];

  return (
    <section id="work" className="py-28 px-4 sm:px-8 relative bg-[var(--primary-black)]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Animated Section Header */}
        <SectionHeader
          badge="03 // PORTFOLIO GALLERY"
          title="Selected Work"
          highlightWord="Work"
          description="Asymmetric showcase of high-impact AI platforms, SaaS products, and digital experiences engineered for enterprise leaders."
        />

        {/* Asymmetric Editorial Portfolio Grid */}
        <div className="space-y-10">
          
          {/* Project 01: Hero Spotlight Card (Full Width 12-col) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => { console.log('Clicked project 01'); setSelectedProject(projects[0]); }}
            className="group cursor-pointer rounded-3xl bg-[var(--primary-black)] border border-[var(--primary-border)]/10 overflow-hidden hover:border-[var(--primary-circuit)]/50 transition-all duration-500 shadow-2xl grid lg:grid-cols-12 items-stretch"
          >
            {/* Visual Area */}
            <div className={`lg:col-span-7 h-72 lg:h-auto bg-gradient-to-br ${projects[0].gradient} p-8 flex flex-col justify-between relative overflow-hidden`}>
              <div className="flex items-center justify-between relative z-10">
                <span className="text-xs font-mono tracking-widest text-[var(--primary-circuit)] bg-[var(--primary-black)]/60 px-3.5 py-1 rounded-full border border-[var(--primary-border)] backdrop-blur-md">
                  {projects[0].category}
                </span>
                <span className="text-xs font-mono text-[var(--primary-text)]/60">
                  {projects[0].year}
                </span>
              </div>

              <div className="relative z-10 space-y-2 my-auto py-6">
                <span className="text-xs font-mono text-[var(--primary-circuit)] tracking-widest uppercase">FEATURED CASE STUDY</span>
                <h3 className="font-display font-bold text-2xl sm:text-4xl text-[var(--primary-text)] group-hover:text-[var(--primary-circuit)] transition-colors">
                  {projects[0].title}
                </h3>
              </div>

              <div className="flex items-center justify-between relative z-10">
                <span className="text-xs font-mono text-[var(--primary-text)]/90 bg-[var(--primary-black)]/10 px-3 py-1.5 rounded-lg border border-[var(--primary-border)] backdrop-blur-md">
                  {projects[0].impact}
                </span>
                <div className="p-3 rounded-full bg-[var(--primary-black)] text-[var(--primary-text)] opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="text-xs font-mono text-[var(--primary-text)]/60">CLIENT: {projects[0].client}</div>
                <p className="text-sm text-[var(--primary-text)]/80 leading-relaxed">
                  {projects[0].fullDescription}
                </p>
              </div>

              {/* Metrics Preview */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[var(--primary-border)]/10">
                {projects[0].metrics.slice(0, 2).map((m, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[var(--primary-black)]/10 border border-[var(--primary-border)]/20">
                    <div className="text-xl font-display font-bold text-[var(--primary-circuit)]">{m.value}</div>
                    <div className="text-[10px] font-mono text-[var(--primary-text)]/60">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                {projects[0].services.map((service, i) => (
                  <span key={i} className="text-[11px] font-mono text-[var(--primary-text)]/70 bg-[var(--primary-black)]/10 px-3 py-1 rounded-md border border-[var(--primary-border)]/20">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Project 02 & Project 03: 2-Column Split */}
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.slice(1, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer rounded-3xl bg-[var(--primary-black)] border border-[var(--primary-border)]/10 overflow-hidden hover:border-[var(--primary-circuit)]/50 transition-all duration-500 shadow-xl flex flex-col justify-between"
              >
                {/* Visual Area */}
                <div className={`h-64 sm:h-72 w-full bg-gradient-to-br ${project.gradient} p-6 flex flex-col justify-between relative overflow-hidden`}>
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-xs font-mono tracking-widest text-[var(--primary-circuit)] bg-[var(--primary-black)]/60 px-3 py-1 rounded-full border border-[var(--primary-border)] backdrop-blur-md">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-[var(--primary-text)]/60">
                      {project.year}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <span className="text-xs font-mono text-[var(--primary-text)]/90 bg-[var(--primary-black)]/10 px-3 py-1.5 rounded-lg border border-[var(--primary-border)] backdrop-blur-md inline-block">
                      {project.impact}
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4 p-3 rounded-full bg-[var(--primary-black)] text-[var(--primary-text)] opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-[var(--primary-text)]/60">CLIENT: {project.client}</div>
                    <h3 className="font-display font-bold text-2xl text-[var(--primary-text)] group-hover:text-[var(--primary-circuit)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[var(--primary-text)]/60 leading-relaxed line-clamp-3">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--primary-border)]/10 flex flex-wrap gap-2">
                    {project.services.map((service, i) => (
                      <span key={i} className="text-[11px] font-mono text-[var(--primary-text)]/70 bg-[var(--primary-black)]/10 px-2.5 py-1 rounded-md border border-[var(--primary-border)]/20">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

          {/* Project 04: Full Width Executive Automation Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => setSelectedProject(projects[3])}
            className="group cursor-pointer rounded-3xl bg-[var(--primary-black)] border border-[var(--primary-border)]/10 overflow-hidden hover:border-[var(--primary-circuit)]/50 transition-all duration-500 shadow-2xl grid lg:grid-cols-12 items-stretch"
          >
            {/* Content Area */}
            <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="text-xs font-mono text-[var(--primary-text)]/60">CLIENT: {projects[3].client}</div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--primary-text)] group-hover:text-[var(--primary-circuit)] transition-colors">
                  {projects[3].title}
                </h3>
                <p className="text-sm text-[var(--primary-text)]/80 leading-relaxed">
                  {projects[3].fullDescription}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[var(--primary-border)]/10">
                {projects[3].metrics.slice(0, 2).map((m, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[var(--primary-black)]/10 border border-[var(--primary-border)]/20">
                    <div className="text-xl font-display font-bold text-[var(--primary-circuit)]">{m.value}</div>
                    <div className="text-[10px] font-mono text-[var(--primary-text)]/60">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                {projects[3].services.map((service, i) => (
                  <span key={i} className="text-[11px] font-mono text-[var(--primary-text)]/70 bg-[var(--primary-black)]/10 px-3 py-1 rounded-md border border-[var(--primary-border)]/20">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual Area */}
            <div className={`lg:col-span-7 h-72 lg:h-auto bg-gradient-to-br ${projects[3].gradient} p-8 flex flex-col justify-between relative overflow-hidden order-1 lg:order-2`}>
              <div className="flex items-center justify-between relative z-10">
                <span className="text-xs font-mono tracking-widest text-[var(--primary-circuit)] bg-[var(--primary-black)]/60 px-3.5 py-1 rounded-full border border-[var(--primary-border)] backdrop-blur-md">
                  {projects[3].category}
                </span>
                <span className="text-xs font-mono text-[var(--primary-text)]/60">
                  {projects[3].year}
                </span>
              </div>

              <div className="relative z-10 flex items-center justify-between mt-auto">
                <span className="text-xs font-mono text-[var(--primary-text)]/90 bg-[var(--primary-black)]/10 px-3 py-1.5 rounded-lg border border-[var(--primary-border)] backdrop-blur-md">
                  {projects[3].impact}
                </span>
                <div className="p-3 rounded-full bg-[var(--primary-black)] text-[var(--primary-text)] opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Spatial Modal Breakdown */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenInquiry={onOpenInquiry}
        />
      )}
    </section>
  );
}
