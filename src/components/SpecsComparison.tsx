import React from 'react';
import { PRINTERS_DATA } from '../data/printers';
import { formatPrice } from '../utils/formatPrice';

export const SpecsComparison: React.FC = () => {
  const specsConfig = [
    { key: 'buildVolume', label: 'Build Volume' },
    { key: 'layerResolution', label: 'Layer Resolution' },
    { key: 'positioningAccuracy', label: 'Positioning Accuracy' },
    { key: 'maxNozzleTemp', label: 'Max Nozzle Temperature' },
    { key: 'maxBedTemp', label: 'Max Bed Temperature' },
    { key: 'maxChamberTemp', label: 'Chamber Thermal System' },
    { key: 'printSpeed', label: 'Max Print Speed' },
    { key: 'motionSystem', label: 'Motion System Gantry' },
    { key: 'connectivity', label: 'Connectivity Protocols' },
    { key: 'powerRequirements', label: 'Power Requirements' }
  ];

  return (
    <div className="border border-border-primary rounded bg-bg-surface/30 overflow-hidden relative">
      <div className="absolute inset-0 bg-telemetry-nodes opacity-5 pointer-events-none"></div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left border-collapse min-w-[700px]">
          
          {/* Table Header */}
          <thead>
            <tr className="border-b border-border-primary bg-bg-surface/80">
              <th className="p-4 text-xs font-orbitron font-bold tracking-widest text-text-muted uppercase min-w-[200px]">
                TECHNICAL PARAMETERS
              </th>
              {PRINTERS_DATA.map((printer) => (
                <th key={printer.id} className="p-4 min-w-[150px]">
                  <div className="font-orbitron font-black text-base text-text-primary">
                    {printer.name}
                  </div>
                  <div className="text-[10px] text-brand-primary uppercase tracking-wider mt-0.5">
                    From {formatPrice(printer.basePrice)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-border-primary/60 text-xs text-text-secondary">
            
            {/* Direct specs map */}
            {specsConfig.map((spec) => (
              <tr key={spec.key} className="hover:bg-bg-surface/20 transition-colors">
                <td className="p-4 font-medium text-text-primary bg-bg-surface/10 border-r border-border-primary/50">
                  {spec.label}
                </td>
                {PRINTERS_DATA.map((printer) => {
                  const val = (printer.specs as any)[spec.key];
                  return (
                    <td key={printer.id} className="p-4 leading-relaxed font-mono">
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
            
            {/* Supported materials (comma separated list) */}
            <tr className="hover:bg-bg-surface/20 transition-colors">
              <td className="p-4 font-medium text-text-primary bg-bg-surface/10 border-r border-border-primary/50">
                Materials Library Compatibility
              </td>
              {PRINTERS_DATA.map((printer) => (
                <td key={printer.id} className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {printer.specs.supportedMaterials.map((mat) => (
                      <span
                        key={mat}
                        className="px-1.5 py-0.5 rounded bg-border-glass text-[9px] font-orbitron text-text-secondary border border-border-primary/60"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Core structural features */}
            <tr className="hover:bg-bg-surface/20 transition-colors">
              <td className="p-4 font-medium text-text-primary bg-bg-surface/10 border-r border-border-primary/50">
                Primary Engineering Features
              </td>
              {PRINTERS_DATA.map((printer) => (
                <td key={printer.id} className="p-4">
                  <ul className="list-disc pl-4 space-y-1 text-[11px] leading-relaxed">
                    {printer.features.slice(0, 3).map((feat, i) => (
                      <li key={i}>{feat}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpecsComparison;
