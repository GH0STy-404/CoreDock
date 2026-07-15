import React, { useState } from 'react';
import { Mail, Phone as PhoneIcon, Clock, MapPin } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';
import { SITE_CONSTANTS } from '../utils/constants';
import SEO from '../components/SEO';
import { SectionTitle } from '../components/ui/SectionTitle';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [reason, setReason] = useState('quote');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !phone || !company) return;

    console.log('B2B Site Inquiry:', { name, email, phone, company, city, reason, message });
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setCity('');
      setReason('quote');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="space-y-12">
      <SEO
        title="Contact B2B Sales"
        description={`Inquire about Voxel Dynamics Apex Series printers, schedule virtual demonstrations, or request dealer packages.`}
      />

      {/* Page Title */}
      <SectionTitle
        title="Corporate Communications"
        tagline="Contact Interface"
        subtitle="Establish communications with Voxel Dynamics industrial sales desks or request operator maintenance contracts."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact details (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <GlassCard hoverEffect={false} className="space-y-4">
            <h4 className="font-outfit text-xs font-bold uppercase tracking-wider text-brand-primary">
              // Corporate Channels
            </h4>

            <div className="space-y-4 text-xs text-text-secondary">
              <div className="flex gap-3">
                <MapPin className="w-4.5 h-4.5 text-brand-accent flex-shrink-0" />
                <div>
                  <span className="text-[10px] font-outfit text-text-muted uppercase block">FACILITY LOCATION</span>
                  <span>{BRAND_CONFIG.support.address}</span>
                </div>
              </div>

              <div className="flex gap-3 border-t border-border-primary/40 pt-3">
                <Mail className="w-4.5 h-4.5 text-brand-accent flex-shrink-0" />
                <div>
                  <span className="text-[10px] font-outfit text-text-muted uppercase block">SALES ENQUIRY</span>
                  <span>{BRAND_CONFIG.support.salesEmail}</span>
                </div>
              </div>

              <div className="flex gap-3 border-t border-border-primary/40 pt-3">
                <PhoneIcon className="w-4.5 h-4.5 text-brand-accent flex-shrink-0" />
                <div>
                  <span className="text-[10px] font-outfit text-text-muted uppercase block">COMMUNICATIONS DESK</span>
                  <span>{BRAND_CONFIG.support.phone}</span>
                </div>
              </div>

              <div className="flex gap-3 border-t border-border-primary/40 pt-3">
                <Clock className="w-4.5 h-4.5 text-brand-accent flex-shrink-0" />
                <div>
                  <span className="text-[10px] font-outfit text-text-muted uppercase block">OPERATING INTERVALS</span>
                  <span>{BRAND_CONFIG.support.hours}</span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Map layout */}
          <div className="border border-border-primary rounded bg-bg-surface/30 p-4 relative overflow-hidden select-none">
            <div className="absolute inset-0 bg-telemetry-nodes opacity-10 pointer-events-none"></div>
            
            <div className="flex justify-between text-[8px] font-mono text-text-muted mb-2">
              <span>LAT: 12.9716° N</span>
              <span>LON: 77.5946° E</span>
            </div>

            <div className="h-[180px] border border-border-primary/60 rounded bg-black/40 relative flex items-center justify-center">
              <svg viewBox="0 0 200 100" className="w-full h-full stroke-border-glass stroke-[0.7] fill-none">
                <line x1="0" y1="20" x2="200" y2="20" />
                <line x1="0" y1="40" x2="200" y2="40" />
                <line x1="0" y1="60" x2="200" y2="60" />
                <line x1="0" y1="80" x2="200" y2="80" />
                
                <line x1="40" y1="0" x2="40" y2="100" />
                <line x1="80" y1="0" x2="80" y2="100" />
                <line x1="120" y1="0" x2="120" y2="100" />
                <line x1="160" y1="0" x2="160" y2="100" />

                <circle cx="120" cy="40" r="6" stroke="#EA580C" className="animate-ping origin-center" style={{ transformOrigin: '120px 40px' }} />
                <circle cx="120" cy="40" r="2.5" fill="#F97316" stroke="#F97316" />
              </svg>
              <div className="absolute top-1/2 left-[62%] -translate-y-1/2 bg-[#090909]/90 border border-brand-primary px-1.5 py-0.5 rounded text-[8px] font-outfit tracking-wider text-brand-primary">
                {BRAND_CONFIG.companyName.toUpperCase()} HQ
              </div>
            </div>
          </div>

        </div>

        {/* Form (7 Cols) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="border border-border-primary rounded bg-bg-surface/30 p-6 space-y-6 relative"
          >
            <div className="absolute inset-0 bg-telemetry-nodes opacity-5 pointer-events-none"></div>

            <div className="flex justify-between items-center border-b border-border-primary/60 pb-3">
              <h3 className="font-outfit text-xs font-bold uppercase tracking-wider text-text-primary">
                // Secure Communications Form
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-outfit text-text-secondary uppercase block mb-1.5 font-semibold tracking-wide">
                  Contact Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Arthur Vance"
                  className="w-full bg-bg-base border border-border-primary rounded px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-brand-primary transition-colors placeholder:text-text-muted"
                />
              </div>

              <div>
                <label className="text-[10px] font-outfit text-text-secondary uppercase block mb-1.5 font-semibold tracking-wide">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vance@voxeldynamics.com"
                  className="w-full bg-bg-base border border-border-primary rounded px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-brand-primary transition-colors placeholder:text-text-muted"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-outfit text-text-secondary uppercase block mb-1.5 font-semibold tracking-wide">
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

              <div>
                <label className="text-[10px] font-outfit text-text-secondary uppercase block mb-1.5 font-semibold tracking-wide">
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-outfit text-text-secondary uppercase block mb-1.5 font-semibold tracking-wide">
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

              <div>
                <label className="text-[10px] font-outfit text-text-secondary uppercase block mb-1.5 font-semibold tracking-wide">
                  Inquiry Intent *
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-bg-base border border-border-primary rounded px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-brand-primary transition-colors cursor-pointer"
                >
                  {SITE_CONSTANTS.contactReasons.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-bg-surface text-text-primary">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-outfit text-text-secondary uppercase block mb-1.5 font-semibold tracking-wide">
                Requirements Description
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Detail technical requirements, deployment timelines, or custom material tolerances targeted..."
                className="w-full bg-bg-base border border-border-primary rounded px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-brand-primary transition-colors resize-none placeholder:text-text-muted"
              />
            </div>

            {submitted ? (
              <div className="bg-brand-primary/10 border border-brand-primary text-brand-primary rounded p-4 text-xs font-semibold font-outfit tracking-wider text-center flex items-center justify-center gap-2">
                <span>INQUIRY ROUTED. OUR COMMUNICATIONS DESK WILL CALL YOU WITHIN 24 HOURS.</span>
              </div>
            ) : (
              <Button type="submit" variant="primary" glow className="w-full py-3 justify-center gap-2">
                <span>Submit Inquiry</span>
              </Button>
            )}

          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
