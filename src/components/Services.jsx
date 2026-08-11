import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Bot, Layers, Layout, Palette, Terminal, RefreshCw } from 'lucide-react';
import MagneticButton from './MagneticButton';
import SectionHeader from './SectionHeader';

export default function Services({ onOpenInquiry }) {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: '01',
      title: 'AI & Automation',
      shortDesc: 'Intelligent workflows, autonomous AI agents, LLM integrations, and core business process automation.',
      icon: Bot,
      deliverables: [
        'Autonomous AI Agent Orchestration',
        'Custom LLM Fine-Tuning & Prompt Pipelines',
        'Business Process Automation Systems',
        'Intelligent Vector RAG Search Engines',
        'API & Workflow Integrations'
      ],
      impact: 'Up to 75% reduction in manual operation cycles',
      tag: 'MACHINE INTELLIGENCE'
    },
    {
      id: '02',
      title: 'SaaS Development',
      shortDesc: 'End-to-end cloud-native SaaS platforms engineered for scale, reliability, and security.',
      icon: Layers,
      deliverables: [
        'Multi-Tenant SaaS Architecture',
        'Subscription & Payment Engine (Stripe/RevenueCat)',
        'Role-Based Auth & Security Permissions',
        'High-Performance Real-Time Dashboards',
        'Cloud Infrastructure & CI/CD Pipelines'
      ],
      impact: 'Sub-100ms API latency with enterprise uptime SLAs',
      tag: 'CLOUD ARCHITECTURE'
    },
    {
      id: '03',
      title: 'Web Experiences',
      shortDesc: 'High-conversion, Framer-grade web applications and brand websites built with modern frameworks.',
      icon: Layout,
      deliverables: [
        'Framer-Grade Micro-Interactions & Motion',
        'Interactive 3D & Vector Visualizations',
        'Ultra-Fast Headless Architecture (Vite/Next.js)',
        'SEO & Performance Optimization',
        'Design System Implementation'
      ],
      impact: '100/100 Lighthouse performance & conversion lift',
      tag: 'DIGITAL CRAFTSMANSHIP'
    },
    {
      id: '04',
      title: 'UI/UX Design',
      shortDesc: 'User-centered product design, interface design systems, and high-fidelity interactive prototypes.',
      icon: Palette,
      deliverables: [
        'Product Strategy & UX Information Architecture',
        'Design System Token Architectures',
        'High-Fidelity Interactive Wireframes',
        'Micro-Motion & Transition Guidelines',
        'Responsive Desktop & Mobile Layouts'
      ],
      impact: 'Intuitive user flows that reduce churn & friction',
      tag: 'PRODUCT SYSTEMS'
    },
    {
      id: '05',
      title: 'Custom Software',
      shortDesc: 'Bespoke enterprise software, custom API backends, microservices, and database systems.',
      icon: Terminal,
      deliverables: [
        'Bespoke Backend Microservices',
        'High-Throughput Data Streaming Pipelines',
        'Custom Protocol & Integration Layer',
        'Zero-Trust Security & Encryption',
        'Scalable Database & Caching Layer'
      ],
      impact: 'Custom infrastructure built specifically for your domain',
      tag: 'ENTERPRISE CORE'
    },
    {
      id: '06',
      title: 'Digital Transformation',
      shortDesc: 'Modernizing legacy architectures, migrating to cloud-native platforms, and optimizing tech stacks.',
      icon: RefreshCw,
      deliverables: [
        'Legacy Codebase Refactoring & Migration',
        'Cloud Architecture Optimization (AWS/GCP)',
        'Automated DevOps & Infrastructure as Code',
        'Security & Compliance Audit',
        'Technical Team Upskilling & Handoff'
      ],
      impact: 'Future-proofed technology foundation for long-term growth',
      tag: 'SYSTEM MODERNIZATION'
    }
  ];

  return (
    <section id="services" className="py-28 px-4 sm:px-8 relative bg-[#060608]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Animated Section Header */}
        <SectionHeader
          badge="02 // CAPABILITIES"
          title="Interactive Services"
          highlightWord="Services"
          description="We don't build generic websites. We design and engineer tailored digital systems that elevate modern businesses."
        />

        {/* Editorial Split-Screen Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Service Title Selectors */}
          <div className="lg:col-span-5 space-y-2">
            {services.map((service, idx) => {
              const isActive = activeService === idx;
              const ServiceIcon = service.icon;

              return (
                <div
                  key={service.id}
                  onClick={() => setActiveService(idx)}
                  onMouseEnter={() => setActiveService(idx)}
                  className={`group cursor-pointer p-5 rounded-2xl transition-all duration-300 border ${
                    isActive
                      ? 'bg-[#0E0E14] border-polaris-blue/40 shadow-[0_0_20px_rgba(79,140,255,0.1)]'
                      : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className={`font-mono text-sm ${isActive ? 'text-polaris-blue' : 'text-polaris-muted'}`}>
                        {service.id}
                      </span>
                      <h3 className={`font-display font-semibold text-lg sm:text-xl transition-colors ${
                        isActive ? 'text-white' : 'text-white/60 group-hover:text-white'
                      }`}>
                        {service.title}
                      </h3>
                    </div>
                    <ServiceIcon className={`w-5 h-5 transition-all ${
                      isActive ? 'text-polaris-blue scale-110' : 'text-polaris-muted group-hover:text-white'
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Dynamic Capability Display Panel */}
          <div className="lg:col-span-7 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 sm:p-10 rounded-3xl bg-[#0D0D14] border border-white/10 space-y-8 relative overflow-hidden shadow-2xl"
              >
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-polaris-blue/10 blur-[80px] pointer-events-none"></div>

                {/* Card Header */}
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono tracking-widest text-polaris-blue bg-polaris-blue/10 px-3 py-1 rounded-full border border-polaris-blue/20">
                      {services[activeService].tag}
                    </span>
                    <span className="text-xs font-mono text-polaris-muted">
                      SERVICE {services[activeService].id} / 06
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                    {services[activeService].title}
                  </h3>
                  <p className="text-polaris-muted text-base leading-relaxed">
                    {services[activeService].shortDesc}
                  </p>
                </div>

                {/* Key Deliverables List */}
                <div className="space-y-4 relative z-10 pt-4 border-t border-white/10">
                  <span className="text-xs font-mono uppercase text-polaris-muted tracking-wider">
                    KEY DELIVERABLES & CAPABILITIES
                  </span>
                  <ul className="space-y-3">
                    {services[activeService].deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white/90">
                        <CheckCircle2 className="w-4 h-4 text-polaris-cyan shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Impact Metric & CTA */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div>
                    <div className="text-[11px] font-mono text-polaris-muted uppercase">BUSINESS IMPACT</div>
                    <div className="text-sm font-semibold text-polaris-cyan mt-0.5">
                      {services[activeService].impact}
                    </div>
                  </div>
                  <MagneticButton
                    onClick={onOpenInquiry}
                    className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-polaris-blue hover:text-white transition-colors"
                  >
                    <span>Request Proposal</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </MagneticButton>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
