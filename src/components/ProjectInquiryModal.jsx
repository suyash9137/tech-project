import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Send, Star } from 'lucide-react';

export default function ProjectInquiryModal({ isOpen, onClose }) {
  const [selectedServices, setSelectedServices] = useState([]);
  const [budget, setBudget] = useState('$50k – $100k');
  const [timeline, setTimeline] = useState('1–2 Months');
  const [formData, setFormData] = useState({ name: '', email: '', company: '', details: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stars, setStars] = useState([]);

  // Mouse trail effect with stars
  useEffect(() => {
    const handleMouseMove = (e) => {
      const star = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        size: Math.random() * 3 + 2, // Random size between 2-5px
        lifetime: 1000 + Math.random() * 1500, // Random lifetime between 1-2.5s
        createdAt: Date.now()
      };

      setStars(prev => [...prev, star]);

      // Remove old stars
      const now = Date.now();
      setStars(prev => prev.filter(s => now - s.createdAt < s.lifetime));
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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

  // Helper to reset form data without closing modal
  const clearFormData = () => {
    setFormData({ name: '', email: '', company: '', details: '' });
    setSelectedServices([]);
    setBudget('$50k – $100k');
    setTimeline('1–2 Months');
  };

  const resetForm = () => {
    clearFormData();
    setSubmitted(false);
    onClose();
  };

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    // Optional: validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Prepare data for Tally (map fields)
      const tallyData = {
        // Full Name
        name: formData.name,
        // Email
        email: formData.email,
        // Phone / WhatsApp - we don't have this field; maybe we can leave empty or add later?
        // Since the existing form doesn't have phone, we'll omit or send empty.
        phone: '',
        // Company / Brand Name
        company: formData.company,
        // Service Required
        services: selectedServices.join(', '),
        // Budget
        budget: budget,
        // Timeline
        timeline: timeline,
        // Project Details
        details: formData.details,
        // Preferred Contact Method - not in form; we can default to Email or leave empty
        preferredContact: 'Email',
        // Referral Source (if available) - not in form
        referral: '',
      };

      const TALLY_ENDPOINT = 'https://tally.so/r/jaAJOx';

      const response = await fetch(TALLY_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tallyData),
      });

      if (!response.ok) {
        throw new Error(`Submission failed: ${response.status}`);
      }

      // Success
      clearFormData();
      setSubmitted(true);
    } catch (err) {
      console.error('Tally submission error:', err);
      setError('Something went wrong. Please try again.');
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
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="relative w-full max-w-2xl bg-[#0D0D14] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 my-auto text-white"
        >
          {/* Star Field */}
          <div className="pointer-events-none">
            {stars.map(star => (
              <Star
                key={star.id}
                className={`absolute left-[${star.x}px] top-[${star.y}px] text-polaris-blue/[${star.opacity}] w-[${star.size}px] h-[${star.size}px] `}
                // We'll use inline styles for better control
                style={{
                  position: 'absolute',
                  left: `${star.x}px`,
                  top: `${star.y}px`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  opacity: star.opacity,
                  color: '#4F46E5' // polaris-blue
                }}
              />
            ))}
          </div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-polaris-blue animate-pulse" />
              <span className="text-xs font-mono text-polaris-blue uppercase tracking-widest">
                START A PROJECT // POLARIS STUDIO
              </span>
            </div>
            <button
              onClick={resetForm}
              className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Select Services */}
              <div className="space-y-4">
                <label className="text-xs font-mono text-polaris-muted uppercase tracking-wider block">
                  01 // WHAT WOULD YOU LIKE TO BUILD? (SELECT ALL THAT APPLY)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((service) => {
                    const isSelected = selectedServices.includes(service);
                    return (
                      <div
                        key={service}
                        onClick={() => toggleService(service)}
                        className={`cursor-pointer p-3.5 rounded-xl border text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-polaris-blue text-black border-polaris-blue shadow-md'
                            : 'bg-white/[0.03] text-white/80 border-white/10 hover:bg-white/[0.06]'
                        }`}
                      >
                        {service}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Budget & Timeline */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-mono text-polaris-muted uppercase tracking-wider block">
                    02 // ESTIMATED BUDGET
                  </label>
                  <div className="space-y-2">
                    {budgets.map((b) => (
                      <div
                        key={b}
                        onClick={() => setBudget(b)}
                        className={`cursor-pointer p-2.5 rounded-lg border text-xs font-mono transition-all ${
                          budget === b
                            ? 'bg-white text-black font-semibold border-white'
                            : 'bg-white/[0.02] text-white/70 border-white/10 hover:bg-white/[0.05]'
                        }`}
                      >
                        {b}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-mono text-polaris-muted uppercase tracking-wider block">
                    03 // DESIRED TIMELINE
                  </label>
                  <div className="space-y-2">
                    {timelines.map((t) => (
                      <div
                        key={t}
                        onClick={() => setTimeline(t)}
                        className={`cursor-pointer p-2.5 rounded-lg border text-xs font-mono transition-all ${
                          timeline === t
                            ? 'bg-white text-black font-semibold border-white'
                            : 'bg-white/[0.02] text-white/70 border-white/10 hover:bg-white/[0.05]'
                        }`}
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Contact Inputs */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <label className="text-xs font-mono text-polaris-muted uppercase tracking-wider block">
                  04 // YOUR CONTACT DETAILS
                </label>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-polaris-blue transition-colors"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Work Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-polaris-blue transition-colors"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Company Name (Optional)"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-polaris-blue transition-colors"
                />
                <textarea
                  rows="3"
                  placeholder="Tell us briefly about your project, goals, or requirements..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-polaris-blue transition-colors resize-none"
                ></textarea>
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
                className={`w-full py-4 rounded-xl ${loading ? 'bg-white/[0.2]' : 'bg-white'} text-black font-semibold text-sm flex items-center justify-center gap-2 hover:bg-polaris-blue hover:text-white transition-colors shadow-lg ${
                  loading ? 'cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <span className="mr-2">Sending...</span>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l4 2" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Submit Project Inquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-3 bg-red-500/20 text-red-400 rounded-xl text-sm">
                  {error}
                </div>
              )}

              </form>
          ) : (
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-polaris-blue/20 text-polaris-blue flex items-center justify-center mx-auto border border-polaris-blue/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-2xl text-white">Project Request Sent Successfully!</h3>
                <p className="text-sm text-polaris-muted max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. I've received your project request and will get back to you within 24 hours.
                </p>
              </div>
              <button
                onClick={resetForm}
                className="px-6 py-3 rounded-full bg-white/10 text-white text-xs font-mono hover:bg-white/20 transition-colors"
              >
                Close Window
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}