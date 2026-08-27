import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Send, Star, AlertCircle } from 'lucide-react';
import { submitProjectInquiry } from '../utils/tallySubmission';

export default function ProjectInquiryModal({ isOpen, onClose }) {
  const [selectedServices, setSelectedServices] = useState([]);
  const [budget, setBudget] = useState('$50k – $100k');
  const [timeline, setTimeline] = useState('1–2 Months');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    details: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const services = [
    'AI & Automation',
    'SaaS Development',
    'Web Experiences',
    'UI/UX Design',
    'Custom Software',
    'Digital Transformation',
  ];

  const budgets = ['< $25k', '$25k – $50k', '$50k – $100k', '$100k+'];
  const timelines = ['Immediate (< 2wks)', '1–2 Months', '3+ Months'];

  const clearFormData = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      details: '',
    });
    setSelectedServices([]);
    setBudget('$50k – $100k');
    setTimeline('1–2 Months');
    setFieldErrors({});
    setError(null);
  };

  const resetForm = () => {
    clearFormData();
    setSubmitted(false);
    onClose();
  };

  const toggleService = (service) => {
    let updated;
    if (selectedServices.includes(service)) {
      updated = selectedServices.filter((s) => s !== service);
    } else {
      updated = [...selectedServices, service];
    }
    setSelectedServices(updated);
    if (updated.length > 0 && fieldErrors.services) {
      setFieldErrors((prev) => ({ ...prev, services: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Full Name: Required, min 2 chars
    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = 'Full Name must be at least 2 characters.';
    }

    // Email: Required, valid email
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid work email address.';
    }

    // Services: At least 1 selected
    if (!selectedServices || selectedServices.length === 0) {
      errors.services = 'Please select at least one service.';
    }

    // Budget: Required
    if (!budget) {
      errors.budget = 'Please select an estimated budget.';
    }

    // Timeline: Required
    if (!timeline) {
      errors.timeline = 'Please select a desired timeline.';
    }

    // Project Description: Required, min 20 chars
    if (!formData.details || formData.details.trim().length < 20) {
      errors.details = 'Project description must be at least 20 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Submit Handler:
   * Prevents default submit, validates all fields, sends POST to Tally (https://tally.so/r/ODME9g),
   * waits for completion, and ONLY displays success modal if the response is successful.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError('Please resolve the highlighted errors before submitting.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await submitProjectInquiry({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        selectedServices,
        budget,
        timeline,
        details: formData.details,
      });

      if (result && result.success) {
        clearFormData();
        setSubmitted(true);
      } else {
        setError(result?.error || 'Something went wrong while submitting your inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Submit handler error:', err);
      setError('Something went wrong while submitting your inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetForm}
          className="fixed inset-0 bg-[#060608]/90 backdrop-blur-2xl"
          aria-hidden="true"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="relative w-full max-w-2xl bg-[#0D0D14] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 my-auto text-white"
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-polaris-blue animate-pulse" />
              <span id="modal-title" className="text-xs font-mono text-polaris-blue uppercase tracking-widest">
                START A PROJECT &bull; POLARIS TECHNOLOGIES
              </span>
            </div>
            <button
              onClick={resetForm}
              aria-label="Close modal"
              className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-polaris-blue"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              {/* Step 1: Select Services */}
              <div className="space-y-4">
                <label id="services-label" className="text-xs font-mono text-polaris-muted uppercase tracking-wider block">
                  01 &bull; WHAT WOULD YOU LIKE TO BUILD? (SELECT ALL THAT APPLY) *
                </label>
                <div className="grid grid-cols-2 gap-3" role="group" aria-labelledby="services-label">
                  {services.map((service) => {
                    const isSelected = selectedServices.includes(service);
                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => toggleService(service)}
                        aria-pressed={isSelected}
                        className={`cursor-pointer p-3.5 rounded-xl border text-xs font-semibold transition-all text-left focus:outline-none focus:ring-2 focus:ring-polaris-blue ${
                          isSelected
                            ? 'bg-polaris-blue text-black border-polaris-blue shadow-md'
                            : 'bg-white/[0.03] text-white/80 border-white/10 hover:bg-white/[0.06]'
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
                {fieldErrors.services && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1 font-mono">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {fieldErrors.services}
                  </p>
                )}
              </div>

              {/* Step 2: Budget & Timeline */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label id="budget-label" className="text-xs font-mono text-polaris-muted uppercase tracking-wider block">
                    02 &bull; ESTIMATED BUDGET *
                  </label>
                  <div className="space-y-2" role="radiogroup" aria-labelledby="budget-label">
                    {budgets.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => {
                          setBudget(b);
                          if (fieldErrors.budget) setFieldErrors((prev) => ({ ...prev, budget: null }));
                        }}
                        role="radio"
                        aria-checked={budget === b}
                        className={`w-full cursor-pointer p-2.5 rounded-lg border text-xs font-mono transition-all text-left focus:outline-none focus:ring-2 focus:ring-polaris-blue ${
                          budget === b
                            ? 'bg-white text-black font-semibold border-white'
                            : 'bg-white/[0.02] text-white/70 border-white/10 hover:bg-white/[0.05]'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                  {fieldErrors.budget && (
                    <p className="text-xs text-red-400 flex items-center gap-1 mt-1 font-mono">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {fieldErrors.budget}
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <label id="timeline-label" className="text-xs font-mono text-polaris-muted uppercase tracking-wider block">
                    03 &bull; DESIRED TIMELINE *
                  </label>
                  <div className="space-y-2" role="radiogroup" aria-labelledby="timeline-label">
                    {timelines.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => {
                          setTimeline(t);
                          if (fieldErrors.timeline) setFieldErrors((prev) => ({ ...prev, timeline: null }));
                        }}
                        role="radio"
                        aria-checked={timeline === t}
                        className={`w-full cursor-pointer p-2.5 rounded-lg border text-xs font-mono transition-all text-left focus:outline-none focus:ring-2 focus:ring-polaris-blue ${
                          timeline === t
                            ? 'bg-white text-black font-semibold border-white'
                            : 'bg-white/[0.02] text-white/70 border-white/10 hover:bg-white/[0.05]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  {fieldErrors.timeline && (
                    <p className="text-xs text-red-400 flex items-center gap-1 mt-1 font-mono">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {fieldErrors.timeline}
                    </p>
                  )}
                </div>
              </div>

              {/* Step 3: Contact Inputs */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <label className="text-xs font-mono text-polaris-muted uppercase tracking-wider block">
                  04 &bull; YOUR CONTACT DETAILS
                </label>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullNameInput" className="sr-only">Full Name</label>
                    <input
                      id="fullNameInput"
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: null }));
                      }}
                      className={`w-full p-3.5 rounded-xl bg-white/[0.03] border text-white text-sm focus:outline-none focus:border-polaris-blue focus:ring-1 focus:ring-polaris-blue transition-colors ${
                        fieldErrors.name ? 'border-red-500/80' : 'border-white/10'
                      }`}
                    />
                    {fieldErrors.name && (
                      <p className="text-xs text-red-400 flex items-center gap-1 mt-1 font-mono">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="workEmailInput" className="sr-only">Work Email</label>
                    <input
                      id="workEmailInput"
                      type="email"
                      required
                      placeholder="Work Email *"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: null }));
                      }}
                      className={`w-full p-3.5 rounded-xl bg-white/[0.03] border text-white text-sm focus:outline-none focus:border-polaris-blue focus:ring-1 focus:ring-polaris-blue transition-colors ${
                        fieldErrors.email ? 'border-red-500/80' : 'border-white/10'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="text-xs text-red-400 flex items-center gap-1 mt-1 font-mono">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="companyNameInput" className="sr-only">Company Name</label>
                  <input
                    id="companyNameInput"
                    type="text"
                    placeholder="Company Name (Optional)"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-polaris-blue focus:ring-1 focus:ring-polaris-blue transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="projectDetailsInput" className="sr-only">Project Description</label>
                  <textarea
                    id="projectDetailsInput"
                    rows="3"
                    required
                    placeholder="Tell us briefly about your project, goals, or requirements... (Min 20 characters) *"
                    value={formData.details}
                    onChange={(e) => {
                      setFormData({ ...formData, details: e.target.value });
                      if (fieldErrors.details) setFieldErrors((prev) => ({ ...prev, details: null }));
                    }}
                    className={`w-full p-3.5 rounded-xl bg-white/[0.03] border text-white text-sm focus:outline-none focus:border-polaris-blue focus:ring-1 focus:ring-polaris-blue transition-colors resize-none ${
                      fieldErrors.details ? 'border-red-500/80' : 'border-white/10'
                    }`}
                  ></textarea>
                  {fieldErrors.details && (
                    <p className="text-xs text-red-400 flex items-center gap-1 mt-1 font-mono">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {fieldErrors.details}
                    </p>
                  )}
                </div>
              </div>

              {/* Honeypot field for spam protection */}
              <input
                type="text"
                name="gotcha"
                tabIndex={-1}
                autoComplete="off"
                style={{ position: 'absolute', left: '-9999px' }}
                aria-hidden="true"
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl ${
                  loading ? 'bg-white/[0.2] cursor-not-allowed' : 'bg-white hover:bg-polaris-blue hover:text-white'
                } text-black font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-polaris-blue`}
              >
                {loading ? (
                  <>
                    <span className="mr-2">Submitting...</span>
                    <svg className="w-4 h-4 animate-spin text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Submit Project Inquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* General Error Summary Message */}
              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs sm:text-sm flex items-center gap-2 font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="py-12 text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-polaris-blue/20 text-polaris-blue flex items-center justify-center mx-auto border border-polaris-blue/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-3">
                <h3 className="font-display font-bold text-2xl text-white">
                  Thanks for reaching out to Polaris Technologies! 🚀
                </h3>
                <p className="text-sm text-polaris-muted max-w-md mx-auto leading-relaxed font-sans">
                  We've received your project inquiry. Our team will review your requirements and contact you shortly.
                </p>
              </div>
              <button
                onClick={resetForm}
                className="px-6 py-3 rounded-full bg-white/10 text-white text-xs font-mono hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-polaris-blue"
              >
                Close Window
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}