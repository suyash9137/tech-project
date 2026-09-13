import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Cpu, Zap, Database, ArrowRight, CheckCircle2, Sparkles, Sliders } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function AiAutomationSection({ onOpenInquiry }) {
  const [activeInput, setActiveInput] = useState('crm');

  const inputs = [
    {
      id: 'crm',
      label: 'CRM & Customer Leads',
      data: 'Unstructured lead inquiries, support transcripts, & deal pipelines',
      aiAction: 'Analyzes intent, scores prospect priority, and drafts personalized responses',
      outcome: '3x Faster Deal Qualification & Instant Follow-ups'
    },
    {
      id: 'financial',
      label: 'Financial & Invoices',
      data: 'PDF invoices, bank receipts, expense claims, & payment ledgers',
      aiAction: 'Parses tabular line items, matches purchase orders, and flags anomalies',
      outcome: '99.4% Automated Reconciliation Accuracy'
    },
    {
      id: 'tickets',
      label: 'Support & Escalations',
      data: 'Customer support tickets, bug logs, & user feedback channels',
      aiAction: 'Categorizes urgency, auto-resolves Tier-1 issues, and routes Tier-2 to engineers',
      outcome: '65% Reduction in Support Ticket Resolution Time'
    },
    {
      id: 'analytics',
      label: 'System Metrics & Data',
      data: 'Server telemetry, database logs, user behavior metrics',
      aiAction: 'Detects system performance bottlenecks & forecasts operational scaling needs',
      outcome: 'Proactive Zero-Downtime Infrastructure Scaling'
    }
  ];

  const currentConfig = inputs.find((i) => i.id === activeInput);

  return (
    <section id="ai-systems" className="py-28 px-4 sm:px-8 bg-[var(--primary-black)]/20 relative border-y border-[var(--primary-border)]/20 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary-circuit)]/10 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Animated Section Header */}
        <SectionHeader
          badge="04 // AI ARCHITECTURE"
          title="Turn complexity into intelligent systems."
          highlightWord="intelligent"
          description="We build living AI architectures that ingest raw business data, process it through custom LLM agents, and execute autonomous workflows."
        />

        {/* Living Systems Architecture Interactive Canvas */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--primary-black)]/20 border border-[var(--primary-border)]/10 space-y-10 shadow-2xl">
          
          {/* Top Instruction */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--primary-border)]/10 pb-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--primary-text)]/60">
              <Sliders className="w-4 h-4 text-[var(--primary-circuit)]" />
              <span>SELECT INPUT SOURCE TO SIMULATE SYSTEM PIPELINE:</span>
            </div>
            <div className="text-xs font-mono text-[var(--primary-circuit)]">
              REAL-TIME ARCHITECTURE INTERACTION
            </div>
          </div>

          {/* Interactive Pipeline Steps */}
          <div className="grid lg:grid-cols-4 gap-6 relative">
            
            {/* Step 1: Input Data Source */}
            <div className="p-6 rounded-2xl bg-[var(--primary-black)]/20 border border-[var(--primary-border)]/10 space-y-4 relative">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--primary-text)]/60">
                <span>01 // INPUT</span>
                <Database className="w-4 h-4 text-[var(--primary-circuit)]" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono text-[var(--primary-circuit)]">DATA INGESTION</span>
                <div className="space-y-2 pt-2">
                  {inputs.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveInput(item.id)}
                      className={`w-full text-left p-2.5 rounded-lg text-xs font-mono transition-all ${
                        activeInput === item.id
                          ? 'bg-[var(--primary-circuit)] text-[var(--primary-black)] font-semibold shadow-md'
                          : 'bg-[var(--primary-black)]/10 text-[var(--primary-text)]/70 hover:bg-[var(--primary-black)]/20 hover:text-[var(--primary-text)]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Connecting Arrow 1 */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full flex items-center justify-center">
                <div className="w-full h-0.5 bg-gradient-to-r from-[var(--primary-circuit)]/40 to-[var(--primary-signal)]/40"></div>
                <div className="absolute w-3 h-3 rounded-full bg-[var(--primary-circuit)] animate-ping"></div>
              </div>
            </div>

            {/* Step 2: Polaris AI Layer */}
            <div className="p-6 rounded-2xl bg-[var(--primary-black)]/20 border border-[var(--primary-circuit)]/40 space-y-4 relative shadow-[var(--shadow-circuit-0-0-30px-0-15)]">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--primary-circuit)]">
                <span>02 // INTELLIGENCE</span>
                <Bot className="w-4 h-4 text-[var(--primary-circuit)]" />
              </div>
              <div className="space-y-3">
                <span className="text-xs font-mono text-[var(--primary-signal)]">POLARIS AI AGENT</span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeInput}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 rounded-xl bg-[var(--primary-black)]/10 border border-[var(--primary-border)]/10 text-xs font-mono text-[var(--primary-text)]/90 leading-relaxed"
                  >
                    {currentConfig.aiAction}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Step 3: Executive Business Outcome */}
            <div className="p-6 rounded-2xl bg-[var(--primary-black)]/20 border border-[var(--primary-signal)]/40 space-y-4 relative shadow-[var(--shadow-circuit-0-0-30px-0-15)]">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--primary-signal)]">
                <span>03 // OUTCOME</span>
                <Zap className="w-4 h-4 text-[var(--primary-signal)]" />
              </div>
              <div className="space-y-3">
                <span className="text-xs font-mono text-[var(--primary-text)]/60">AUTOMATED RESULT</span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeInput}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 rounded-xl bg-[var(--primary-black)]/10 border border-[var(--primary-border)]/10 text-xs font-mono text-[var(--primary-text)]/90 leading-relaxed font-medium"
                  >
                    {currentConfig.outcome}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Bottom Callout */}
          <div className="pt-6 border-t border-[var(--primary-border)]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs font-mono text-[var(--primary-text)]/80">
              <CheckCircle2 className="w-4 h-4 text-[var(--primary-circuit)]" />
              <span>SOC2 Compliant Architecture • End-to-End Encryption • Zero Data Retention Available</span>
            </div>
            <button
              onClick={onOpenInquiry}
              className="px-6 py-3 rounded-full bg-[var(--primary-black)]/10 text-[var(--primary-text)] font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[var(--primary-black)]/20 hover:text-[var(--primary-text)] transition-colors"
            >
              <span>Build Custom AI Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
