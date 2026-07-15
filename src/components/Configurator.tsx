import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRINTERS_DATA } from '../data/printers';
import { formatPrice } from '../utils/formatPrice';
import { Button } from './ui/Button';
import { GlassCard } from './ui/GlassCard';
import { GlowBorder } from './ui/GlowBorder';
import { BRAND_CONFIG } from '../config/brand';

interface SelectedOptions {
  [categoryId: string]: string;
}

export const Configurator: React.FC = () => {
  const [selectedPrinterId, setSelectedPrinterId] = useState<string>('hx-300');
  const [selections, setSelections] = useState<SelectedOptions>({});
  const [showForm, setShowForm] = useState(false);
  
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const printer = PRINTERS_DATA.find((p) => p.id === selectedPrinterId) || PRINTERS_DATA[0];

  useEffect(() => {
    const initialSelections: SelectedOptions = {};
    printer.configurator.forEach((category) => {
      if (category.options.length > 0) {
        initialSelections[category.id] = category.options[0].id;
      }
    });
    setSelections(initialSelections);
    setShowForm(false);
    setSubmitted(false);
  }, [selectedPrinterId, printer]);

  const handleSelectOption = (categoryId: string, optionId: string) => {
    setSelections((prev) => ({
      ...prev,
      [categoryId]: optionId
    }));
  };

  const calculateTotal = (): number => {
    let total = printer.basePrice;
    printer.configurator.forEach((category) => {
      const selectedOptionId = selections[category.id];
      const option = category.options.find((o) => o.id === selectedOptionId);
      if (option) {
        total += option.priceModifier;
      }
    });
    return total;
  };

  const getConfiguredSummary = (): string => {
    return Object.entries(selections)
      .map(([categoryId, optionId]) => {
        const category = printer.configurator.find((c) => c.id === categoryId);
        const option = category?.options.find((o) => o.id === optionId);
        return `${category?.name}: ${option?.name}`;
      })
      .join(' | ');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !company) return;
    
    console.log('B2B Quote Request:', {
      printer: printer.name,
      configuration: selections,
      summary: getConfiguredSummary(),
      totalPrice: calculateTotal(),
      email,
      company,
      notes
    });
    
    setSubmitted(true);
    setTimeout(() => {
      setShowForm(false);
      setEmail('');
      setCompany('');
      setNotes('');
    }, 4000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
      <div className="absolute inset-0 bg-telemetry-nodes opacity-5 pointer-events-none"></div>

      {/* Controls (7 Cols) */}
      <div className="lg:col-span-7 space-y-6">
        <div className="border border-border-primary rounded bg-bg-surface/40 p-4">
          <label className="text-[10px] font-outfit text-text-muted uppercase tracking-wider block mb-3">
            Select Base Gantry Platform
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PRINTERS_DATA.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPrinterId(p.id)}
                className={`px-4 py-3 rounded text-left border font-outfit transition-all duration-200 cursor-pointer ${
                  p.id === selectedPrinterId
                    ? "bg-brand-primary/10 border-brand-primary text-brand-primary shadow-orange-glow"
                    : "bg-transparent border-border-primary text-text-secondary hover:border-text-secondary hover:text-white"
                }`}
              >
                <div className="text-sm font-bold">{p.name}</div>
                <div className="text-[9px] text-text-muted mt-1 uppercase tracking-wider">
                  Base {formatPrice(p.basePrice)}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs leading-relaxed text-text-secondary">
          <span className="font-outfit font-semibold text-text-primary text-xs uppercase tracking-wider mr-2">
            Base Specs:
          </span>
          Build volume: {printer.specs.buildVolume} | Max Nozzle: {printer.specs.maxNozzleTemp} | Speed: {printer.specs.printSpeed}
        </div>

        {/* Categories */}
        <div className="space-y-6">
          {printer.configurator.map((category) => (
            <div key={category.id} className="border border-border-primary rounded bg-bg-surface/20 p-5">
              <h4 className="font-outfit text-xs font-bold uppercase tracking-wider text-text-primary mb-3">
                {category.name}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {category.options.map((option) => {
                  const isSelected = selections[category.id] === option.id;
                  return (
                    <div
                      key={option.id}
                      onClick={() => handleSelectOption(category.id, option.id)}
                      className={`p-4 rounded border text-left cursor-pointer transition-all duration-200 select-none ${
                        isSelected
                          ? "bg-brand-primary/5 border-brand-primary/50 text-text-primary"
                          : "bg-transparent border-border-primary/60 text-text-secondary hover:border-border-primary hover:text-text-primary"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold">{option.name}</span>
                        {option.priceModifier > 0 && (
                          <span className="text-xs font-outfit text-brand-accent tracking-wider font-bold">
                            +{formatPrice(option.priceModifier)}
                          </span>
                        )}
                      </div>
                      {option.description && (
                        <p className="text-[10px] text-text-muted mt-1.5 leading-relaxed">
                          {option.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote summary panel (5 Cols) */}
      <div className="lg:col-span-5 lg:sticky lg:top-24">
        <GlowBorder glowColor="blue">
          <GlassCard hoverEffect={false} className="border-none">
            <div className="text-[10px] font-outfit tracking-wider text-brand-primary uppercase mb-2">
              // CONFIGURATION SUMMARY
            </div>

            <h3 className="font-outfit text-lg font-bold tracking-wide text-text-primary border-b border-border-primary/60 pb-3 mb-4">
              Platform Configuration
            </h3>

            <div className="space-y-3 mb-6 text-xs text-text-secondary max-h-[180px] overflow-y-auto pr-2">
              <div className="flex justify-between font-semibold border-b border-border-primary/20 pb-1">
                <span>{printer.name} Gantry Platform</span>
                <span className="font-mono">{formatPrice(printer.basePrice)}</span>
              </div>
              {printer.configurator.map((category) => {
                const optionId = selections[category.id];
                const option = category.options.find((o) => o.id === optionId);
                if (!option || option.priceModifier === 0) return null;
                return (
                  <div key={category.id} className="flex justify-between text-xs">
                    <span className="text-text-muted">{option.name}</span>
                    <span className="font-mono text-brand-primary font-medium">
                      +{formatPrice(option.priceModifier)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-border-primary pt-4 mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-[10px] font-outfit uppercase text-text-secondary tracking-wider">
                  Est. System Price:
                </span>
                <span className="font-outfit text-2xl font-black text-brand-primary">
                  {formatPrice(calculateTotal())}
                </span>
              </div>
              <p className="text-[9px] text-text-muted leading-relaxed">
                *Quotes represent standard hardware platforms configured to standard {BRAND_CONFIG.companyName} specifications. Localized taxes and deployment SLA services will be calculated by our regional sales team.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!showForm ? (
                <motion.div
                  key="cta-btn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Button
                    variant="primary"
                    className="w-full text-center py-3"
                    glow
                    onClick={() => setShowForm(true)}
                  >
                    Request B2B Quote
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="inquiry-form"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-4 border-t border-border-primary/40 pt-4"
                >
                  <div className="text-[10px] font-outfit text-brand-accent tracking-wider uppercase mb-1">
                    B2B Client Registry
                  </div>

                  <div>
                    <label className="text-[9px] font-outfit text-text-muted uppercase tracking-wider block mb-1">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@voxeldynamics.com"
                      className="w-full bg-[#121212] border border-border-primary rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-outfit text-text-muted uppercase tracking-wider block mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Lockheed Martin"
                      className="w-full bg-[#121212] border border-border-primary rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-outfit text-text-muted uppercase tracking-wider block mb-1">
                      Deployment Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Build volumes, target materials, or certifications required..."
                      className="w-full bg-[#121212] border border-border-primary rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-primary transition-colors resize-none"
                    />
                  </div>

                  {submitted ? (
                    <div className="bg-brand-primary/10 border border-brand-primary text-brand-primary rounded p-3 text-xs text-center font-semibold font-outfit tracking-wider">
                      ✓ QUOTE REQUEST LOGGED. SALES ASSIGNED.
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowForm(false)}
                        className="w-1/3 text-center py-2"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        className="w-2/3 text-center py-2"
                      >
                        Submit Request
                      </Button>
                    </div>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </GlassCard>
        </GlowBorder>
      </div>
    </div>
  );
};

export default Configurator;
