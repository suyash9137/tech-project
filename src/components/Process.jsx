import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Target, Layout, Code2, LineChart, CheckCircle2 } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: '01',
      title: 'DISCOVER',
      subtitle: 'Strategic Alignment & Systems Audit',
      duration: 'Week 1',
      icon: Compass,
      description: 'We audit your existing tech stack, business workflows, user needs, and strategic objectives to formulate an engineering roadmap.',
      deliverables: ['Systems Architecture Audit', 'Technical Requirements Document', 'Scope & Milestone Schedule']
    },
    {
      id: '02',
      title: 'DEFINE',
      subtitle: 'Information Architecture & UX System',
      duration: 'Week 2',
      icon: Target,
      description: 'We map out user flows, data pipelines, API contracts, and high-fidelity wireframes that establish the foundation for build velocity.',
      deliverables: ['UX Information Architecture', 'API Contract Specifications', 'Component Blueprint']
    },
    {
      id: '03',
      title: 'DESIGN',
      subtitle: 'Framer-Grade UI & Motion Guidelines',
      duration: 'Week 3–4',
      icon: Layout,
      description: 'We craft high-fidelity visual UI designs, design token systems, and fluid spring micro-interactions tailored to your brand identity.',
      deliverables: ['Design Token System (DESIGN.md)', 'Framer Motion Prototypes', 'Asset Package']
    },
    {
      id: '04',
      title: 'BUILD',
      subtitle: 'Full-Stack Engineering & AI Integration',
      duration: 'Week 5–8',
      icon: Code2,
      description: 'We write clean, production-grade frontend and backend code, integrating custom AI models, databases, and CI/CD pipelines.',
      deliverables: ['Full Codebase Repository', 'Automated Testing Suite', 'Staging Deployment Preview']
    },
    {
      id: '05',
      title: 'OPTIMIZE',
      subtitle: 'Performance Tuning & Production Launch',
      duration: 'Ongoing',
      icon: LineChart,
      description: 'We run load testing, Lighthouse audits, security scans, and continuous analytics monitoring to ensure long-term stability and conversion.',
      deliverables: ['Production Cloud Deployment', 'Lighthouse 100/100 Audit', 'Knowledge Handoff & Support']
    }
  ];

  return (
    <section id="process" className="py-28 px-4 sm:px-8 bg-[var(--primary-black)]/20 relative border-t border-[var(--primary-border)]/20">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Animated Section Header */}
        <SectionHeader
          badge="06 // METHODOLOGY"
          title="Engineered Process"
          highlightWord="Process"
          description="A structured, transparent delivery methodology that ensures speed, reliability, and total alignment at every milestone."
        />

        {/* Horizontal Process Stepper */}
        <div className="grid md:grid-cols-5 gap-4">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            const StepIcon = step.icon;

            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setActiveStep(idx)}
                className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-6 ${
                  isActive
                    ? 'bg-[var(--primary-black)] border-[var(--primary-circuit)] shadow-[var(--shadow-circuit-0-0-20px-0-15)]'
                    : 'bg-[var(--primary-black)]/10 border-[var(--primary-border)]/10 hover:border-[var(--primary-border)]/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-sm ${isActive ? 'text-[var(--primary-circuit)]' : 'text-[var(--primary-text)]/60'}`}>
                    {step.id}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--primary-text)]/50 bg-[var(--primary-black)]/10 px-2 py-0.5 rounded">
                    {step.duration}
                  </span>
                </div>

                <div className="space-y-2">
                  <StepIcon className={`w-6 h-6 ${isActive ? 'text-[var(--primary-circuit)]' : 'text-[var(--primary-text)]/60'}`} />
                  <h3 className={`font-display font-bold text-lg ${isActive ? 'text-[var(--primary-text)]' : 'text-[var(--primary-text)]/70'}`}>
                    {step.title}
                  </h3>
                </div>

                <div className={`w-full h-1 rounded-full transition-all ${isActive ? 'bg-[var(--primary-circuit)]' : 'bg-[var(--primary-black)]/10'}`}></div>
              </div>
            );
          })}
        </div>

        {/* Detailed Active Step Breakdown Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--primary-black)]/20 border border-[var(--primary-border)]/10 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[var(--primary-circuit)] bg-[var(--primary-circuit)]/10 px-3 py-1 rounded-full border border-[var(--primary-circuit)]/20">
                PHASE {steps[activeStep].id} // {steps[activeStep].duration}
              </span>
              <span className="text-xs font-mono text-[var(--primary-text)]/60">
                {steps[activeStep].subtitle}
              </span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--primary-text)]">
              {steps[activeStep].title} Phase Blueprint
            </h3>
            <p className="text-[var(--primary-text)]/60 text-base leading-relaxed">
              {steps[activeStep].description}
            </p>
          </div>

          <div className="lg:col-span-5 p-6 rounded-2xl bg-[var(--primary-black)]/10 border border-[var(--primary-border)]/10 space-y-4">
            <span className="text-xs font-mono uppercase text-[var(--primary-text)]/60 tracking-wider">
              PHASE DELIVERABLES
            </span>
            <ul className="space-y-3">
              {steps[activeStep].deliverables.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-[var(--primary-text)]/90">
                  <CheckCircle2 className="w-4 h-4 text-[var(--primary-signal)] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
