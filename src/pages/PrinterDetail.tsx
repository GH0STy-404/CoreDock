import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, Download } from 'lucide-react';
import { getPrinterById } from '../services/products';
import { Printer } from '../types/printer';
import { getDownloadsForPrinter } from '../services/downloads';
import { Download as DownloadType } from '../types/download';
import SEO from '../components/SEO';
import { Button } from '../components/ui/Button';
import { TechBadge } from '../components/ui/TechBadge';
import { MetricCard } from '../components/ui/MetricCard';
import Skeleton from '../components/ui/Skeleton';

export const PrinterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [printer, setPrinter] = useState<Printer | null>(null);
  const [downloads, setDownloads] = useState<DownloadType[]>([]);
  const [loading, setLoading] = useState(true);

  // Inquiry form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchPrinterDetails = async () => {
      const targetId = id || 'apex-300';
      try {
        const product = await getPrinterById(targetId);
        setPrinter(product);
        if (product) {
          const files = await getDownloadsForPrinter(product.id);
          setDownloads(files);
        }
      } catch (err) {
        console.error('Error fetching printer details:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPrinterDetails();
  }, [id]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !company || !name || !phone) return;

    console.log('B2B Specification Inquiry:', {
      platform: printer?.name,
      name,
      email,
      phone,
      company,
      city,
      notes
    });

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

  if (loading) {
    return (
      <div className="space-y-8 py-6">
        <Skeleton height={40} className="w-1/4" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton height={280} />
          <Skeleton height={280} />
        </div>
      </div>
    );
  }

  if (!printer) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center text-center py-12 space-y-6">
        <h2 className="font-outfit text-lg font-bold uppercase text-red-500">
          Product Details Offline
        </h2>
        <p className="text-text-secondary text-xs max-w-sm">
          The requested system gantry does not resolve to active registers.
        </p>
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <SEO
        title={`${printer.name} Technical Specifications`}
        description={`Full mechanical tolerances, heating limits, and supported materials for the Voxel Dynamics ${printer.name} prototype.`}
      />

      {/* 1. PROTO HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Detail specs (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap gap-2">
            <TechBadge variant="accent">SYSTEM STATUS: VALIDATED PROTO</TechBadge>
            <TechBadge variant="outline">ISO 9001 COMPLIANT</TechBadge>
          </div>

          <h1 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-text-primary">
            {printer.name}
          </h1>

          <p className="text-text-secondary text-xs sm:text-sm leading-relaxed max-w-xl">
            {printer.description}
          </p>

          {/* Quick specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border-primary/60">
            <MetricCard label="Volume" value={printer.specs.buildVolume.split(' ')[0]} unit="mm" />
            <MetricCard label="Nozzle" value={printer.specs.maxNozzleTemp} accent />
            <MetricCard label="Bed" value={printer.specs.maxBedTemp} />
            <MetricCard label="Enclosure" value={printer.specs.maxChamberTemp.includes('Passive') ? 'Passive' : '75°C'} accent />
          </div>

          <div className="flex gap-4 pt-4">
            <a href="#spec-sheet">
              <Button variant="primary" glow>Inspect Parameters</Button>
            </a>
            <a href="#downloads-section">
              <Button variant="outline">Technical Downloads</Button>
            </a>
          </div>
        </div>

        {/* CAD Card showing secondary workspace photo (5 Cols) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[340px] aspect-[4/5] bg-glass rounded border border-border-glass p-5 relative flex flex-col justify-between overflow-hidden shadow-orange-glow">
            <div className="absolute inset-0 bg-telemetry-nodes opacity-15 pointer-events-none"></div>
            
            <div className="text-[9px] font-mono text-text-muted">CHASSIS_CAD_WIRE_APEX</div>
            
            <div className="flex-grow flex items-center justify-center my-4 overflow-hidden rounded border border-border-primary">
              <img
                src={printer.detailsImage}
                alt="Apex-300 Detail Workspace"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>

            <div className="flex justify-between items-center text-[9px] text-text-secondary font-mono">
              <span>GANTRY: ALIGNED</span>
              <span>VAL_TEMP: 350°C</span>
            </div>
          </div>
        </div>

      </section>

      {/* 2. SPECIFICATION TABLE */}
      <section id="spec-sheet" className="space-y-8 pt-12 border-t border-border-primary/60 scroll-mt-20">
        <h3 className="font-outfit text-lg font-bold uppercase tracking-wider text-text-primary">
          // Full Gantry Technical Parameters
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-border-primary/60 rounded bg-bg-surface/30 p-6 relative">
          <div className="absolute inset-0 bg-telemetry-nodes opacity-5 pointer-events-none"></div>

          <div className="space-y-4 divide-y divide-border-primary/40">
            <div className="flex justify-between py-2.5 text-xs">
              <span className="font-medium text-text-secondary">Build Volume Size</span>
              <span className="font-mono text-text-primary">{printer.specs.buildVolume}</span>
            </div>
            <div className="flex justify-between py-2.5 text-xs">
              <span className="font-medium text-text-secondary">Layer Heights Range</span>
              <span className="font-mono text-text-primary">{printer.specs.layerResolution}</span>
            </div>
            <div className="flex justify-between py-2.5 text-xs">
              <span className="font-medium text-text-secondary">Positioning Tolerance</span>
              <span className="font-mono text-text-primary">{printer.specs.positioningAccuracy}</span>
            </div>
            <div className="flex justify-between py-2.5 text-xs">
              <span className="font-medium text-text-secondary">Max Nozzle Heat Limit</span>
              <span className="font-mono text-text-primary">{printer.specs.maxNozzleTemp}</span>
            </div>
            <div className="flex justify-between py-2.5 text-xs">
              <span className="font-medium text-text-secondary">Max Bed Surface Heat</span>
              <span className="font-mono text-text-primary">{printer.specs.maxBedTemp}</span>
            </div>
          </div>

          <div className="space-y-4 divide-y divide-border-primary/60 md:border-l md:border-border-primary/60 md:pl-8">
            <div className="flex justify-between py-2.5 text-xs">
              <span className="font-medium text-text-secondary">Chamber Heat Control</span>
              <span className="font-mono text-text-primary">{printer.specs.maxChamberTemp}</span>
            </div>
            <div className="flex justify-between py-2.5 text-xs">
              <span className="font-medium text-text-secondary">Extrusion Speed Limit</span>
              <span className="font-mono text-text-primary">{printer.specs.printSpeed}</span>
            </div>
            <div className="flex justify-between py-2.5 text-xs">
              <span className="font-medium text-text-secondary">Motion Kinematic Assembly</span>
              <span className="font-mono text-text-primary">{printer.specs.motionSystem}</span>
            </div>
            <div className="flex justify-between py-2.5 text-xs">
              <span className="font-medium text-text-secondary">Power Draw Requirements</span>
              <span className="font-mono text-text-primary">{printer.specs.powerRequirements}</span>
            </div>
            <div className="flex justify-between py-2.5 text-xs">
              <span className="font-medium text-text-secondary">Connectivity Interfaces</span>
              <span className="font-mono text-text-primary">{printer.specs.connectivity}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DOWNLOADS SECTION */}
      <section id="downloads-section" className="space-y-8 pt-12 border-t border-border-primary/60">
        <h3 className="font-outfit text-lg font-bold uppercase tracking-wider text-text-primary">
          // Engineering Resources & Clearances
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {downloads.map((file) => (
            <div
              key={file.id}
              className="flex justify-between items-center p-4 border border-border-primary bg-bg-surface/30 rounded hover:border-brand-primary/40 transition-colors"
            >
              <div>
                <div className="text-xs font-semibold text-text-primary font-outfit uppercase flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-brand-primary" />
                  <span>{file.name}</span>
                </div>
                <p className="text-[10px] text-text-secondary mt-1 max-w-sm">
                  {file.description}
                </p>
                <div className="text-[9px] text-text-muted mt-2 font-mono uppercase">
                  Version: {file.version} | Size: {file.fileSize}
                </div>
              </div>

              <a
                href={file.fileUrl}
                download
                className="p-2.5 rounded bg-bg-surface border border-border-primary text-text-secondary hover:text-white hover:border-brand-primary transition-all cursor-pointer flex-shrink-0"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DIRECT B2B INQUIRY FORM */}
      <section className="space-y-8 pt-12 border-t border-border-primary/60">
        <div className="text-center">
          <span className="font-outfit text-xs font-semibold tracking-wide text-brand-primary uppercase block mb-1">
            // Corporate Procurement Enquiry
          </span>
          <h3 className="font-outfit text-xl font-bold uppercase text-text-primary">
            Request Proposal & Spec Consultation
          </h3>
          <p className="text-text-secondary text-xs max-w-lg mx-auto mt-2 leading-relaxed">
            Register your inquiry to book an inspection at Voxel Dynamics Bangalore facility, consult with our engineering lead, or request formal corporate pricing.
          </p>
        </div>

        <div className="max-w-2xl mx-auto border border-border-primary rounded bg-bg-surface/30 p-6 space-y-6 relative">
          <div className="absolute inset-0 bg-telemetry-nodes opacity-5 pointer-events-none"></div>

          <form onSubmit={handleInquirySubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-outfit text-text-secondary uppercase block mb-1.5 font-semibold">
                  Contact Name *
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

              <div>
                <label className="text-[9px] font-outfit text-text-secondary uppercase block mb-1.5 font-semibold">
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-outfit text-text-secondary uppercase block mb-1.5 font-semibold">
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
                <label className="text-[9px] font-outfit text-text-secondary uppercase block mb-1.5 font-semibold">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. AeroDynamics Corp"
                  className="w-full bg-bg-base border border-border-primary rounded px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-brand-primary transition-colors placeholder:text-text-muted"
                />
              </div>
            </div>

            <div>
              <label className="text-[9px] font-outfit text-text-secondary uppercase block mb-1.5 font-semibold">
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
              <label className="text-[9px] font-outfit text-text-secondary uppercase block mb-1.5 font-semibold">
                Technical requirements or notes (Optional)
              </label>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specify structural polymers targeted, validation standards required, or quantity requirements..."
                className="w-full bg-bg-base border border-border-primary rounded px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-brand-primary transition-colors resize-none placeholder:text-text-muted"
              />
            </div>

            {submitted ? (
              <div className="bg-brand-primary/10 border border-brand-primary text-brand-primary rounded p-3.5 text-xs text-center font-semibold font-outfit tracking-wide flex items-center justify-center gap-2">
                <span>✓ REQ RECEIVED. VOXEL DYNAMICS COMMUNICATIONS DEPT ENGAGED.</span>
              </div>
            ) : (
              <Button type="submit" variant="primary" glow className="w-full py-3 justify-center gap-2">
                <span>Dispatch Inquiry</span>
              </Button>
            )}
          </form>
        </div>
      </section>

    </div>
  );
};

export default PrinterDetail;
