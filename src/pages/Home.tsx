import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Award } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';
import { fadeInUp, staggerContainer } from '../animations/fade';
import SEO from '../components/SEO';
import Button from '../components/ui/Button';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import InteractiveDiagram from '../components/InteractiveDiagram';
import TechBadge from '../components/ui/TechBadge';
import { MATERIALS_DATA } from '../data/materials';

export const Home: React.FC = () => {
  // Inquiry form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !phone || !company) return;

    console.log('Hero Lead Captured:', { name, email, phone, company, city, notes });
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setCity('');
      setNotes('');
    }, 4000);
  };

  const credibilityStats = [
    { value: 150, suffix: '+', label: 'Industrial Gantries Deployed' },
    { value: 12000, suffix: '+', label: 'Validated Composite Parts' },
    { value: 99.98, suffix: '%', label: 'System Uptime Rating', decimals: 2 }
  ];

  const partnerLogos = [
    { name: 'Space Aerospace Labs', label: 'Spaceflight Supplier' },
    { name: 'National Automotive Group', label: 'Tooling Partner' },
    { name: 'Advanced Robotics Lab', label: 'Automation Integrator' },
    { name: 'Institute of Materials Research', label: 'Polymer Certification' }
  ];

  return (
    <div className="space-y-24">
      <SEO
        title="Industrial Additive Manufacturing Systems"
        description="Voxel Dynamics manufactures high-precision industrial 3D printers and carbon-fiber gantry systems. 99.9% operational uptime."
      />

      {/* 1. HERO FOLD & LEAD CAPTURE (2-Column high-conversion layout) */}
      <section className="relative pt-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: value prop & stats (7 Cols) */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.08, 0.05)}
            className="md:col-span-7 space-y-6"
          >
            {/* System Status Tag */}
            <motion.div variants={fadeInUp(0.4, 0, 10)} className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded border border-brand-primary/20 bg-brand-primary/5 text-brand-primary font-outfit font-semibold text-[10px] tracking-wider uppercase flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>COREDOCK APEX-300 PROTOTYPE VALIDATED</span>
              </span>
            </motion.div>

            {/* Core Value Statement */}
            <motion.h1
              variants={fadeInUp(0.4, 0, 10)}
              className="font-outfit font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight text-text-primary"
            >
              High-Precision CNC-Grade <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                Additive Manufacturing Gantries
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp(0.4, 0, 10)}
              className="text-text-secondary text-xs sm:text-sm max-w-xl leading-relaxed"
            >
              Voxel Dynamics designs and builds high-stability thermoplastic extrusion platforms engineered for aerospace components, carbon-fiber composite tooling, and high-precision prototyping laboratories.
            </motion.p>

            {/* Credibility Stats counters */}
            <motion.div
              variants={fadeInUp(0.4, 0, 10)}
              className="grid grid-cols-3 gap-4 border-y border-border-primary/40 py-6 max-w-xl"
            >
              {credibilityStats.map((stat, i) => (
                <div key={i} className="text-left border-l border-border-primary/60 pl-3 first:border-l-0 first:pl-0">
                  <div className="text-xl sm:text-2xl font-black text-brand-primary font-outfit flex items-baseline">
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals || 0}
                    />
                  </div>
                  <div className="text-[9px] text-text-secondary font-outfit uppercase tracking-wider mt-1.5 leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Key capabilities list */}
            <motion.div
              variants={fadeInUp(0.4, 0, 10)}
              className="space-y-2.5 text-xs text-text-secondary max-w-lg"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-primary flex-shrink-0" />
                <span>Closed-loop servo feedback for sub-50µm gantry positioning.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-primary flex-shrink-0" />
                <span>350°C liquid-cooled toolhead for printing Nylon, CF, and PC.</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Embedded lead-capture inquiry form (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="md:col-span-5"
          >
            <div className="w-full bg-glass rounded border border-border-glass p-6 relative shadow-orange-glow overflow-hidden">
              <div className="absolute inset-0 bg-telemetry-nodes opacity-15 pointer-events-none"></div>

              <div className="text-[10px] font-outfit tracking-wider text-brand-primary uppercase mb-2">
                // SPECIFICATION REQUEST
              </div>
              <h3 className="font-outfit text-base font-bold text-text-primary mb-4 uppercase tracking-wide">
                Get Expert Proposal & Quote
              </h3>

              <form onSubmit={handleLeadSubmit} className="space-y-4 relative z-10">
                <div>
                  <label className="text-[9px] font-outfit text-text-secondary uppercase block mb-1 font-semibold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Capt. James Miller"
                    className="w-full bg-bg-base border border-border-primary rounded px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-brand-primary transition-colors placeholder:text-text-muted"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-outfit text-text-secondary uppercase block mb-1 font-semibold">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-bg-base border border-border-primary rounded px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-brand-primary transition-colors placeholder:text-text-muted"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-outfit text-text-secondary uppercase block mb-1 font-semibold">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 90000 00000"
                      className="w-full bg-bg-base border border-border-primary rounded px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-brand-primary transition-colors placeholder:text-text-muted"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-outfit text-text-secondary uppercase block mb-1 font-semibold">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Lockheed Martin India"
                      className="w-full bg-bg-base border border-border-primary rounded px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-brand-primary transition-colors placeholder:text-text-muted"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-outfit text-text-secondary uppercase block mb-1 font-semibold">
                      City / Location
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Bengaluru"
                      className="w-full bg-bg-base border border-border-primary rounded px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-brand-primary transition-colors placeholder:text-text-muted"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-outfit text-text-secondary uppercase block mb-1 font-semibold">
                    Filament Material Targeted
                  </label>
                  <select
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-bg-base border border-border-primary rounded px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-brand-primary transition-colors cursor-pointer"
                  >
                    <option value="" className="bg-bg-surface text-text-primary">Select Material Group...</option>
                    <option value="carbon-nylon" className="bg-bg-surface text-text-primary">Carbon-Fiber Reinforced Nylon</option>
                    <option value="polycarbonate" className="bg-bg-surface text-text-primary">High-Temp Polycarbonate</option>
                    <option value="abs-asa" className="bg-bg-surface text-text-primary">ABS / ASA weathering polymers</option>
                    <option value="pla-tpu" className="bg-bg-surface text-text-primary">Standard PLA / TPU elastomeric</option>
                  </select>
                </div>

                {submitted ? (
                  <div className="bg-brand-primary/10 border border-brand-primary text-brand-primary rounded p-3 text-[10px] text-center font-semibold font-outfit tracking-wide flex items-center justify-center gap-1.5">
                    <span>✓ INQUIRY DISPATCHED. SALES ASSIGNED.</span>
                  </div>
                ) : (
                  <Button type="submit" variant="primary" glow className="w-full py-2.5 justify-center gap-1.5">
                    <span>Request Proposal Package</span>
                  </Button>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. REPUTATION GRID LOGOS */}
      <section className="border-y border-border-primary/60 py-6 bg-bg-surface/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-[9px] font-outfit font-semibold tracking-wider text-text-muted uppercase block mb-5">
            Proven Industrial Deployments
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {partnerLogos.map((partner, index) => (
              <div
                key={index}
                className="p-3.5 rounded border border-border-glass bg-bg-surface/30 hover:border-brand-primary/30 transition-all duration-200 select-none group"
              >
                <div className="font-outfit font-bold text-xs text-text-secondary group-hover:text-text-primary transition-colors">
                  {partner.name}
                </div>
                <div className="text-[8px] font-mono text-text-muted uppercase tracking-wide mt-1">
                  {partner.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE BLUEPRINT SCHEMATIC (Why is it better?) */}
      <section className="space-y-8">
        <div className="text-center">
          <span className="font-outfit text-xs font-semibold tracking-wide text-brand-primary uppercase mb-1 block">
            System Architecture
          </span>
          <h2 className="font-outfit text-2xl font-bold uppercase text-text-primary">
            Mechanical Integration Outline
          </h2>
          <p className="mt-2 text-text-secondary text-xs max-w-xl mx-auto leading-relaxed">
            Toggle node coordinates on the blueprint below to review mechanical components, tolerances, and active hotend assemblies.
          </p>
        </div>

        <InteractiveDiagram />
      </section>

      {/* 4. VALIDATED MATERIAL MATRIX PREVIEW */}
      <section className="space-y-8">
        <div className="text-center">
          <span className="font-outfit text-xs font-semibold tracking-wide text-brand-primary uppercase mb-1 block">
            Validated Polymers
          </span>
          <h2 className="font-outfit text-2xl font-bold uppercase text-text-primary">
            Tested Filament Matrix
          </h2>
          <p className="mt-2 text-text-secondary text-xs max-w-xl mx-auto leading-relaxed">
            The Apex-300 gantry is tested and optimized to extrude engineering materials with high dimensional accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MATERIALS_DATA.slice(0, 3).map((mat) => (
            <div
              key={mat.id}
              className="border border-border-primary rounded bg-bg-surface/30 p-5 space-y-4 hover:border-brand-primary/40 transition-colors"
            >
              <div className="flex justify-between items-center">
                <TechBadge variant="primary">{mat.category}</TechBadge>
                <span className="text-[9px] font-mono text-text-muted">MAX {mat.nozzleTemp}</span>
              </div>
              <h3 className="font-outfit text-base font-bold text-text-primary">{mat.name}</h3>
              <p className="text-[11px] text-text-secondary leading-relaxed">{mat.description}</p>
              <div className="text-[10px] text-text-muted font-sans border-t border-border-primary/40 pt-3">
                <span className="font-semibold text-text-secondary">Deflection:</span> {mat.thermalProperties.displayValue}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FUTURE ROADMAP AND B2B INTEGRATION */}
      <section className="bg-glass border border-border-glass rounded-lg p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-telemetry-nodes opacity-5 pointer-events-none"></div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="px-2 py-0.5 rounded border border-brand-primary/20 text-brand-primary font-outfit text-[9px] tracking-wide uppercase bg-brand-primary/5">
              Production Gantry Roadmap
            </span>
            <h3 className="font-outfit text-lg font-bold text-text-primary uppercase">
              {BRAND_CONFIG.companyName} Fleet Management Ecosystem
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              We design all hardware configurations to integrate with corporate software backplanes. Apex gantry models are prepared out of the box for secure local APIs, dealer networks, service SLAs, and fleet scheduling dashboards.
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <a href="#spec-sheet" className="w-full md:w-auto">
              <Button variant="outline" className="w-full md:w-auto text-xs py-2">
                Inquire Enterprise Support
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
