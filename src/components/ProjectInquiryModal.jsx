import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Send, Star } from 'lucide-react';

export default function ProjectInquiryModal({ isOpen, onClose }) {
  const [selectedServices, setSelectedServices] = useState([]);
  const [budget, setBudget] = useState('$50k – $100k');
  const [timeline, setTimeline] = useState('1–2 Months');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    details: '',
    phone: '',
    websiteUrl: '',
    goal: '',
    referral: '',
    notes: '',
  });
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
      phone: '',
      websiteUrl: '',
      goal: '',
      referral: '',
      notes: '',
    });
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

  /**
   * Submits form data to Tally endpoint (https://tally.so/r/jaAJOx) in the background
   * without redirecting the user or requiring a backend server.
   * Tally automatically passes the submission to the connected Notion database.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side Validation
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError(null);

    // Map website fields to Tally fields according to specification
    const mappedPayload = {
      'Full Name': formData.name,
      'Email Address': formData.email,
      'Phone / WhatsApp': formData.phone || '',
      'Company Name': formData.company || '',
      'Project Type': selectedServices.join(', '),
      'Project Description': formData.details || '',
      'Project Goal': formData.goal || '',
      'Existing Website?': formData.websiteUrl ? 'Yes' : 'No',
      'Website URL': formData.websiteUrl || '',
      'Timeline': timeline,
      'Budget': budget,
      'Referral Source': formData.referral || '',
      'Additional Notes': formData.notes || '',

      // Fallback field key mappings for standard forms
      'name': formData.name,
      'email': formData.email,
      'company': formData.company || '',
      'services': selectedServices.join(', '),
      'details': formData.details || '',
      'phone': formData.phone || '',
      'websiteUrl': formData.websiteUrl || '',
      'timeline': timeline,
      'budget': budget,
    };

    const TALLY_ENDPOINT = 'https://tally.so/r/jaAJOx';

    try {
      // Create a background target iframe to process POST without page redirect
      const iframeName = `tally_target_iframe_${Date.now()}`;
      const hiddenIframe = document.createElement('iframe');
      hiddenIframe.name = iframeName;
      hiddenIframe.style.display = 'none';
      document.body.appendChild(hiddenIframe);

      // Create a hidden form targeting the background iframe
      const form = document.createElement('form');
      form.action = TALLY_ENDPOINT;
      form.method = 'POST';
      form.target = iframeName;

      Object.entries(mappedPayload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value;
          form.appendChild(input);
        }
      });

      document.body.appendChild(form);
      form.submit();

      // Parallel fetch post with no-cors as additional fallback
      const bodyFormData = new FormData();
      Object.entries(mappedPayload).forEach(([key, value]) => {
        bodyFormData.append(key, value);
      });

      fetch(TALLY_ENDPOINT, {
        method: 'POST',
        body: bodyFormData,
        mode: 'no-cors',
      }).catch(() => {});

      // Short delay for background processing
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Cleanup DOM nodes
      setTimeout(() => {
        if (document.body.contains(form)) document.body.removeChild(form);
        if (document.body.contains(hiddenIframe)) document.body.removeChild(hiddenIframe);
      }, 2000);

      // Success Behavior
      clearFormData();
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
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
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-polaris-blue animate-pulse" />
              <span className="text-xs font-mono text-polaris-blue uppercase tracking-widest">
                START A PROJECT &bull; POLARIS STUDIO
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
                  01 &bull; WHAT WOULD YOU LIKE TO BUILD? (SELECT ALL THAT APPLY)
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
                    02 &bull; ESTIMATED BUDGET
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
                    03 &bull; DESIRED TIMELINE
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
                  04 &bull; YOUR CONTACT DETAILS
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
                    <span className="mr-2">Submitting...</span>
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
                <h3 className="font-display font-bold text-2xl text-white">Inquiry Received</h3>
                <p className="text-sm text-polaris-muted max-w-md mx-auto leading-relaxed">
                  Thanks! We've received your project inquiry and will contact you soon.
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