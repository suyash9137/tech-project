import React from 'react';
import { motion } from 'framer-motion';

const CloudInfrastructure = () => {
  const features = [
    {
      title: 'Global Edge Network',
      description: 'Low-latency connectivity across continents with our distributed edge infrastructure.',
      icon: '���🌐'
    },
    {
      title: 'AI-Optimized Workloads',
      description: 'Specialized hardware and software stacks for machine learning and AI workloads.',
      icon: '���🤖'
    },
    {
      title: 'Serverless Computing',
      description: 'Event-driven architectures that scale instantly to meet demand.',
      icon: '��⚡'
    },
    {
      title: 'Quantum-Ready Security',
      description: 'Post-quantum cryptography and zero-trust security models.',
      icon: '���🔒'
    }
  ];

  return (
    <section className="space-y-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative group"
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
          >
            <motion.div
              whileHover={{
                rotateY: 10,
                rotateX: -10,
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="absolute inset-0 glass-panel bg-gradient-to-b from-space-darker/80 to-space-dark/60 backdrop-blur-sm border border-neon-cyan/20 overflow-hidden hover:border-neon-cyan/40 transition-all duration-500"
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-neon-cyan">{feature.title}</h3>
                <p className="text-[var(--primary-text)]/[0.8] leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CloudInfrastructure;