import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, CheckCircle, ExternalLink, Cpu, Layers, BarChart3, Lock } from 'lucide-react';

export default function CaseStudyModal({ project, onClose, onOpenInquiry }) {
  console.log('CaseStudyModal rendered with project:', project ? project.title : null);
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[var(--primary-black)]/[0.9] backdrop-blur-2xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="relative w-full max-w-5xl bg-[var(--primary-black)]/[0.8] border border-[var(--primary-text)]/[0.1] rounded-3xl overflow-hidden shadow-2xl z-10 my-auto text-[var(--primary-text)] flex flex-col max-h-[90vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-6 border-b border-[var(--primary-text)]/[0.1] bg-[var(--primary-black)]/[0.6]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[var(--primary-circuit)] bg-[var(--primary-circuit)]/10 px-3 py-1 rounded-full border border-[var(--primary-circuit)]/20">
                CASE STUDY // {project.category}
              </span>
              <span className="text-xs font-mono text-[var(--primary-muted)] hidden sm:inline">
                {project.client}
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="p-2 rounded-full bg-[var(--primary-text)]/[0.05] border border-[var(--primary-text)]/[0.1] hover:bg-[var(--primary-text)]/[0.1] transition-colors text-[var(--primary-text)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-10">
            {/* Title & Tagline */}
            <div className="space-y-4">
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-[var(--primary-text)]">
                {project.title}
              </h2>
              <p className="text-lg text-[var(--primary-muted)] max-w-3xl leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Visual Banner */}
            <div className="relative rounded-2xl overflow-hidden border border-[var(--primary-text)]/[0.1] aspect-video bg-gradient-to-br from-[var(--primary-slate)] to-[var(--primary-black)] flex items-center justify-center p-8">
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`}></div>
              <div className="relative z-10 text-center space-y-4">
                <div className="inline-flex p-4 rounded-2xl bg-[var(--primary-text)]/[0.1] backdrop-blur-md border border-[var(--primary-text)]/[0.2]">
                  <Cpu className="w-12 h-12 text-[var(--primary-circuit)]" />
                </div>
                <div className="text-2xl font-display font-semibold">{project.title} System Visualizer</div>
                <div className="text-xs font-mono text-[var(--primary-muted)]">{project.services.join(' • ')}</div>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.metrics.map((metric, i) => (
                <div key={i} className="p-5 rounded-2xl bg-[var(--primary-text)]/[0.03] border border-[var(--primary-text)]/[0.08]">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-[var(--primary-circuit)]">
                    {metric.value}
                  </div>
                  <div className="text-xs font-mono text-[var(--primary-muted)] mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Breakdown Split: Challenge vs Solution */}
            <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-[var(--primary-text)]/[0.1]">
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--primary-muted)]">THE CHALLENGE</h3>
                <p className="text-sm text-[var(--primary-text)]/[0.8] leading-relaxed">
                  {project.challenge}
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--primary-muted)]">THE SOLUTION & ARCHITECTURE</h3>
                <p className="text-sm text-[var(--primary-text)]/[0.8] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="space-y-4 pt-6 border-t border-[var(--primary-text)]/[0.1]">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--primary-muted)]">KEY DELIVERABLES</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-[var(--primary-text)]/[0.9]">
                    <CheckCircle className="w-4 h-4 text-[var(--primary-circuit)] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="p-6 border-t border-[var(--primary-text)]/[0.1] bg-[var(--primary-black)]/[0.6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs font-mono text-[var(--primary-muted)]">
              WANT A SIMILAR SOLUTION FOR YOUR PRODUCT?
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenInquiry();
              }}
              className="px-6 py-3 rounded-full bg-[var(--primary-text)] text-[var(--primary-black)] font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[var(--primary-circuit)] hover:text-[var(--primary-black)] transition-colors"
            >
              <span>Build Something Similar</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}