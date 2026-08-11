import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, CheckCircle, ExternalLink, Cpu, Layers, BarChart3, Lock } from 'lucide-react';

export default function CaseStudyModal({ project, onClose, onOpenInquiry }) {
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
          className="fixed inset-0 bg-[#060608]/90 backdrop-blur-2xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="relative w-full max-w-5xl bg-[#0D0D14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 my-auto text-white flex flex-col max-h-[90vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#09090E]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-polaris-blue bg-polaris-blue/10 px-3 py-1 rounded-full border border-polaris-blue/20">
                CASE STUDY // {project.category}
              </span>
              <span className="text-xs font-mono text-polaris-muted hidden sm:inline">
                {project.client}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-10">
            {/* Title & Tagline */}
            <div className="space-y-4">
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-white">
                {project.title}
              </h2>
              <p className="text-lg text-polaris-muted max-w-3xl leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Visual Banner */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-gradient-to-br from-[#12121A] to-[#0A0A0E] flex items-center justify-center p-8">
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`}></div>
              <div className="relative z-10 text-center space-y-4">
                <div className="inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <Cpu className="w-12 h-12 text-polaris-cyan" />
                </div>
                <div className="text-2xl font-display font-semibold">{project.title} System Visualizer</div>
                <div className="text-xs font-mono text-polaris-muted">{project.services.join(' • ')}</div>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.metrics.map((metric, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-polaris-cyan">
                    {metric.value}
                  </div>
                  <div className="text-xs font-mono text-polaris-muted mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Breakdown Split: Challenge vs Solution */}
            <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-white/10">
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-polaris-muted">THE CHALLENGE</h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {project.challenge}
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-polaris-muted">THE SOLUTION & ARCHITECTURE</h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <h3 className="text-xs font-mono uppercase tracking-wider text-polaris-muted">KEY DELIVERABLES</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-white/90">
                    <CheckCircle className="w-4 h-4 text-polaris-blue shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="p-6 border-t border-white/10 bg-[#09090E] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs font-mono text-polaris-muted">
              WANT A SIMILAR SOLUTION FOR YOUR PRODUCT?
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenInquiry();
              }}
              className="px-6 py-3 rounded-full bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 hover:bg-polaris-blue hover:text-white transition-colors"
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
