import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Info, Sliders } from 'lucide-react';
import { getPrinters } from '../services/products';
import { Printer } from '../types/printer';
import { formatPrice } from '../utils/formatPrice';
import SEO from '../components/SEO';
import { SectionTitle } from '../components/ui/SectionTitle';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import SpecsComparison from '../components/SpecsComparison';
import Skeleton from '../components/ui/Skeleton';

export const Printers: React.FC = () => {
  const [printers, setPrinters] = useState<Printer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const data = await getPrinters();
        setPrinters(data);
      } catch (err) {
        console.error('Error fetching printers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrinters();
  }, []);

  return (
    <div className="space-y-16">
      <SEO
        title="Apex Series Industrial 3D Printers"
        description="Explore the Voxel Dynamics Apex Series catalog, featuring the Apex-300, Apex-500, Apex-X, and Apex-Max large-format 3D printers."
      />

      {/* Page Title */}
      <SectionTitle
        title="Apex Gantry Platforms"
        tagline="Systems Catalog"
        subtitle="Industrial-grade gantries configured for high precision, speed, and structural composite printing."
      />

      {/* Printers Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton height={280} />
          <Skeleton height={280} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {printers.map((printer) => (
            <GlassCard key={printer.id} className="flex flex-col justify-between group h-full">
              
              <div>
                {/* Header details */}
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-border-primary/60">
                  <span className="font-outfit font-bold text-lg text-text-primary group-hover:text-brand-primary transition-colors">
                    {printer.name}
                  </span>
                  <span className="font-outfit text-sm text-brand-primary tracking-wider font-semibold">
                    From {formatPrice(printer.basePrice)}
                  </span>
                </div>

                {/* Subheading */}
                <h4 className="text-xs font-outfit font-semibold text-text-secondary uppercase mb-3">
                  {printer.tagline}
                </h4>

                <p className="text-xs text-text-secondary leading-relaxed mb-6">
                  {printer.description}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 bg-bg-base/40 border border-border-primary/60 rounded p-4 mb-6 text-xs">
                  <div>
                    <span className="text-[9px] font-outfit text-text-muted uppercase block">BUILD SPACE</span>
                    <span className="font-semibold text-text-primary font-mono">{printer.specs.buildVolume}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-outfit text-text-muted uppercase block">MAX HOTEND</span>
                    <span className="font-semibold text-text-primary font-mono">{printer.specs.maxNozzleTemp}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-outfit text-text-muted uppercase block">MAX BED</span>
                    <span className="font-semibold text-text-primary font-mono">{printer.specs.maxBedTemp}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-outfit text-text-muted uppercase block">CHAMBER SYSTEM</span>
                    <span className="font-semibold text-text-primary font-mono truncate block">{printer.specs.maxChamberTemp}</span>
                  </div>
                </div>
              </div>

              {/* Action routes */}
              <div className="flex gap-3 mt-auto">
                <Link to={`/printers/${printer.id}`} className="w-1/2">
                  <Button variant="outline" size="sm" className="w-full justify-center flex gap-1.5 py-2">
                    <Info className="w-3.5 h-3.5" />
                    <span>View Specifications</span>
                  </Button>
                </Link>
                <Link to={`/printers/${printer.id}#configure`} className="w-1/2">
                  <Button variant="primary" size="sm" className="w-full justify-center flex gap-1.5 py-2">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Configure</span>
                  </Button>
                </Link>
              </div>

            </GlassCard>
          ))}
        </div>
      )}

      {/* Specification Comparison Table */}
      <section className="space-y-8 pt-12 border-t border-border-primary/60">
        <div className="text-center">
          <span className="font-outfit text-xs font-semibold tracking-wide text-brand-primary uppercase block mb-1">
            // Parameter Comparison Matrix
          </span>
          <h3 className="font-outfit text-xl font-bold uppercase text-text-primary">
            Comparison Table
          </h3>
        </div>

        <SpecsComparison />
      </section>

    </div>
  );
};

export default Printers;
