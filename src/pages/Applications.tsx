import React, { useState } from 'react';
import { ShieldCheck, Layers, Award, BarChart3, HelpCircle } from 'lucide-react';
import { APPLICATIONS_DATA } from '../data/applications';
import SEO from '../components/SEO';
import { SectionTitle } from '../components/ui/SectionTitle';
import { TechBadge } from '../components/ui/TechBadge';
import { getPartSvg } from '../utils/placeholder';

export const Applications: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Aerospace' | 'Automotive' | 'Medical' | 'Engineering' | 'Robotics'>('All');

  const filteredApps = APPLICATIONS_DATA.filter(
    (app) => activeFilter === 'All' || app.industry === activeFilter
  );

  return (
    <div className="space-y-12">
      <SEO
        title="Industrial Print Case Studies"
        description="Review case studies of finished parts printed on Haxx0rCore machines, showing cost and weight savings."
      />

      {/* Page Title */}
      <SectionTitle
        title="Industrial Applications"
        tagline="Production Proof"
        subtitle="Real-world case studies detailing structural print performance, time savings, and material allocations across industries."
      />

      {/* Category filters */}
      <div className="flex gap-2 flex-wrap justify-center border-b border-border-primary/60 pb-6">
        {(['All', 'Aerospace', 'Automotive', 'Medical', 'Engineering', 'Robotics'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1.5 text-[10px] font-outfit tracking-wider uppercase border rounded transition-all duration-300 cursor-pointer ${
              activeFilter === filter
                ? "bg-brand-primary/10 border-brand-primary text-brand-primary shadow-orange-glow"
                : "border-border-primary text-text-muted hover:border-text-secondary hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Applications list */}
      <div className="space-y-10">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-bg-surface/30 border border-border-primary rounded-lg p-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-telemetry-nodes opacity-5 pointer-events-none"></div>

            {/* Metrics and CAD Image column (4 Cols) */}
            <div className="lg:col-span-4 space-y-4 flex flex-col">
              <div className="flex justify-between items-center pb-2 border-b border-border-primary/40">
                <TechBadge variant="accent">{app.industry}</TechBadge>
                <span className="text-[9px] font-mono text-text-muted">CASE_ID: {app.id.toUpperCase()}</span>
              </div>

              {/* Rendering the Custom CAD Schematic */}
              <div className="aspect-[2/1] border border-border-primary rounded bg-black/60 relative flex items-center justify-center p-3 select-none">
                <img
                  src={getPartSvg(app.id)}
                  alt={`${app.title} CAD Drawing`}
                  className="max-h-full max-w-full object-contain text-brand-primary"
                />
                <div className="absolute bottom-1 right-2 text-[7px] font-mono text-text-muted">
                  CAD_OUTLINE
                </div>
              </div>

              <h3 className="font-orbitron font-bold text-base text-text-primary mt-2">
                {app.title}
              </h3>

              {/* Performance numbers */}
              <div className="space-y-3 pt-2">
                <div className="bg-bg-surface border border-border-primary/60 rounded p-4 flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-brand-accent flex-shrink-0" />
                  <div>
                    <span className="text-[8px] font-outfit text-text-muted uppercase block">LEAD-TIME SAVINGS</span>
                    <span className="text-xs font-semibold text-brand-accent font-mono">{app.metrics.leadTimeReduction}</span>
                  </div>
                </div>

                <div className="bg-bg-surface border border-border-primary/60 rounded p-4 flex items-center gap-3">
                  <Award className="w-5 h-5 text-brand-primary flex-shrink-0" />
                  <div>
                    <span className="text-[8px] font-outfit text-text-muted uppercase block">COST REDUCTION</span>
                    <span className="text-xs font-semibold text-brand-primary font-mono">{app.metrics.costReduction}</span>
                  </div>
                </div>

                {app.metrics.weightSavings && (
                  <div className="bg-bg-surface border border-border-primary/60 rounded p-4 flex items-center gap-3">
                    <Layers className="w-5 h-5 text-text-secondary flex-shrink-0" />
                    <div>
                      <span className="text-[8px] font-outfit text-text-muted uppercase block">WEIGHT REDUCTION</span>
                      <span className="text-xs font-semibold text-text-primary font-mono">{app.metrics.weightSavings}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Details narrative column (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Part specifications block */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-bg-base/50 border border-border-primary/60 rounded p-4 text-[10px] text-text-secondary font-mono">
                <div>
                  <span className="text-text-muted block text-[8px] uppercase font-orbitron">MATERIAL APPLIED</span>
                  <span>{app.partDetails.materialUsed}</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[8px] uppercase font-orbitron">PLATFORM APPLIED</span>
                  <span>{app.partDetails.printerUsed}</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[8px] uppercase font-orbitron">PART DIMENSIONS</span>
                  <span>{app.partDetails.dimensions}</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[8px] uppercase font-orbitron">STRENGTH STATUS</span>
                  <span>{app.partDetails.strengthRating || 'Structural Grade'}</span>
                </div>
              </div>

              {/* Challenge and Solution narratives */}
              <div className="space-y-4 text-xs leading-relaxed text-text-secondary">
                <div className="border-l-2 border-brand-primary pl-4 py-1">
                  <span className="font-orbitron font-bold text-text-primary text-[10px] uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>The Engineering Challenge:</span>
                  </span>
                  <p>{app.keyChallenge}</p>
                </div>

                <div className="border-l-2 border-brand-accent pl-4 py-1">
                  <span className="font-orbitron font-bold text-text-primary text-[10px] uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
                    <span>Solution & Production Outcome:</span>
                  </span>
                  <p>{app.solutionOutcome}</p>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Applications;
