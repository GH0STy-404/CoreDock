import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { MATERIALS_DATA } from '../data/materials';
import SEO from '../components/SEO';
import { SectionTitle } from '../components/ui/SectionTitle';
import { GlassCard } from '../components/ui/GlassCard';
import { TechBadge } from '../components/ui/TechBadge';

export const Materials: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Standard' | 'Engineering' | 'High-Performance'>('All');

  const filteredMaterials = MATERIALS_DATA.filter((mat) => {
    const matchesSearch =
      mat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.applications.some((app) => app.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = activeCategory === 'All' || mat.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12">
      <SEO
        title="Industrial Material Library"
        description="Filter and search performance parameters for Voxel Dynamics filaments: PLA, ABS, Nylon-CF, PC, and PEEK."
      />

      {/* Page Title */}
      <SectionTitle
        title="Industrial Material Library"
        tagline="Polymer Science"
        subtitle="Detailed mechanical properties, thermal deflection, and suitable manufacturing applications for our engineering polymer matrices."
      />

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-bg-surface/30 border border-border-primary/80 rounded p-4 relative z-10">
        <div className="relative flex items-center bg-bg-base border border-border-primary rounded w-full md:max-w-xs focus-within:border-brand-primary/60 transition-colors">
          <div className="pl-3 text-text-muted">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search polymers, properties..."
            className="w-full bg-transparent border-none text-text-primary text-xs px-3 py-2.5 focus:outline-none placeholder-text-muted"
          />
        </div>

        <div className="flex gap-2 flex-wrap w-full md:w-auto">
          {(['All', 'Standard', 'Engineering', 'High-Performance'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-[10px] font-outfit tracking-wider uppercase border rounded transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-brand-primary/10 border-brand-primary text-brand-primary shadow-orange-glow"
                  : "border-border-primary text-text-muted hover:border-text-secondary hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Materials grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredMaterials.map((mat) => (
          <GlassCard key={mat.id} className="flex flex-col justify-between h-full group">
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <TechBadge
                  variant={
                    mat.category === 'High-Performance'
                      ? 'accent'
                      : mat.category === 'Engineering'
                      ? 'primary'
                      : 'outline'
                  }
                >
                  {mat.category} Matrix
                </TechBadge>
                
                <div className="flex gap-1">
                  {mat.colorHexList.map((color, i) => (
                    <span
                      key={i}
                      style={{ backgroundColor: color }}
                      className="w-2.5 h-2.5 rounded-full border border-border-glass"
                      title="Available filament shade"
                    />
                  ))}
                </div>
              </div>

              <h3 className="font-outfit font-bold text-base text-text-primary group-hover:text-brand-primary transition-colors">
                {mat.name}
              </h3>

              <p className="text-xs text-text-secondary leading-relaxed mt-2.5 mb-6">
                {mat.description}
              </p>

              {/* Sliders */}
              <div className="space-y-3 mb-6 bg-bg-base/30 border border-border-primary/50 rounded p-4">
                <span className="text-[9px] font-outfit text-text-muted uppercase tracking-wider block mb-1">
                  Mechanical Performance Ratings
                </span>
                
                <div>
                  <div className="flex justify-between text-[10px] text-text-secondary mb-1">
                    <span>{mat.tensileStrength.label}</span>
                    <span className="font-mono">{mat.tensileStrength.displayValue}</span>
                  </div>
                  <div className="h-1 bg-border-primary/50 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${mat.tensileStrength.value * 10}%` }}
                      className="h-full bg-brand-primary"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] text-text-secondary mb-1">
                    <span>{mat.flexibility.label}</span>
                    <span className="font-mono">{mat.flexibility.displayValue}</span>
                  </div>
                  <div className="h-1 bg-border-primary/50 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${mat.flexibility.value * 10}%` }}
                      className="h-full bg-brand-primary"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] text-text-secondary mb-1">
                    <span>Heat Deflection Limit</span>
                    <span className="font-mono">{mat.thermalProperties.displayValue}</span>
                  </div>
                  <div className="h-1 bg-border-primary/50 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${mat.thermalProperties.value * 10}%` }}
                      className="h-full bg-brand-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-2 border-t border-border-primary/40 pt-4 mb-4 text-[10px] text-text-secondary font-mono">
                <div>
                  <span className="text-text-muted block text-[8px] uppercase font-outfit">NOZZLE TEMP</span>
                  <span>{mat.nozzleTemp}</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[8px] uppercase font-outfit">BED TEMP</span>
                  <span>{mat.bedTemp}</span>
                </div>
                <div>
                  <span className="text-text-muted block text-[8px] uppercase font-outfit">CHAMBER REQ</span>
                  <span className="truncate block">{mat.chamberRequirement}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border-primary/40 pt-4 mt-auto">
              <span className="text-[8px] font-outfit text-text-muted uppercase tracking-wider block mb-1.5">
                Recommended Applications:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {mat.applications.map((app) => (
                  <span
                    key={app}
                    className="px-2 py-0.5 rounded bg-bg-surface text-[9px] border border-border-glass text-text-secondary"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>

          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Materials;
