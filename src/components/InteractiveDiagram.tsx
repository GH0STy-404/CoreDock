import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

interface DiagramPart {
  id: string;
  name: string;
  specs: string[];
  description: string;
  cx: number;
  cy: number;
}

const DIAGRAM_PARTS: DiagramPart[] = [
  {
    id: 'extruder',
    name: 'Dual Hotend Assembly',
    specs: [
      'Dual direct drive motors',
      'Operating temperature: up to 420°C',
      'Liquid-cooled thermal barrier block',
      'Automatic nozzle offset calibration'
    ],
    description: 'Independent Dual Extruder (IDEX) setup enables soluble support structures (PVA, BVOH) or simultaneous mirror printing, doubling factory output.',
    cx: 200,
    cy: 160
  },
  {
    id: 'x-axis',
    name: 'Precision X-Axis Carbon Gantry',
    specs: [
      'Lightweight hollow carbon-fiber tube',
      'High-rigidity linear guide rails',
      'Vibration reduction coefficient: 40%',
      'Closed-loop magnetic encoder feedback'
    ],
    description: 'High-rigidity gantry system supports extreme nozzle accelerations without mechanical flexing, guaranteeing sub-50µm structural alignment.',
    cx: 200,
    cy: 120
  },
  {
    id: 'y-axis',
    name: 'Y-Axis Gantry Alignment Rails',
    specs: [
      'Dual alignment linear shafts',
      'Steel-reinforced timing belts',
      'Travel speeds: up to 500 mm/s',
      'Zero backlash transmission setup'
    ],
    description: 'High-torque closed-loop servo motors handle structural movement with absolute positional accuracy, tracking coordinate lines.',
    cx: 340,
    cy: 120
  },
  {
    id: 'z-axis',
    name: 'Quad Ball-Screw Z-Axis Platform',
    specs: [
      '4 × ground ball screws',
      'Self-aligning guide cylinders',
      'Z-resolution: up to 1.5 microns',
      'Independent bed level compensation'
    ],
    description: 'Rigid build platform gantry suspended on ground ball screws. Supports heavy industrial prototype prints weighing up to 30 kg.',
    cx: 85,
    cy: 260
  },
  {
    id: 'build-plate',
    name: 'Vacuum Clamped Heated Build Plate',
    specs: [
      'Cast tooling aluminum plate',
      'Max surface temperature: 140°C',
      'Quick-swap magnetic spring steel sheets',
      'Integrated magnetic thermal sensors'
    ],
    description: 'High-flatness build plate ensuring uniform thermal distribution. Quick-release spring steel sheets facilitate quick part removal.',
    cx: 200,
    cy: 220
  },
  {
    id: 'cooling',
    name: 'Ambient Air Chiller System',
    specs: [
      'Active water-cooling loops for hotends',
      'Focused parts blower cooling fans',
      'High-efficiency HEPA + Carbon filters',
      'CFD-optimized workspace circulation'
    ],
    description: 'Focused part cooling rapidly solidifies molten layers, facilitating overhangs and bridging, while HEPA filters purify exhaust gases.',
    cx: 260,
    cy: 170
  },
  {
    id: 'power',
    name: 'Control Motherboard & Power Unit',
    specs: [
      '3-phase electrical surge isolation',
      'Onboard 32-bit Cortex motion processors',
      'Fail-safe battery backup system',
      'Local offline web API panel'
    ],
    description: 'Core motherboard handling input shaping and optical failure loops, supported by surge protections and backup power relays.',
    cx: 200,
    cy: 330
  }
];

export const InteractiveDiagram: React.FC = () => {
  const [selectedPartId, setSelectedPartId] = useState<string>('extruder');
  
  const currentPart = DIAGRAM_PARTS.find((p) => p.id === selectedPartId) || DIAGRAM_PARTS[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-bg-surface/50 rounded-lg border border-border-primary p-6 relative">
      <div className="absolute inset-0 bg-telemetry-nodes opacity-5 pointer-events-none"></div>
      
      {/* SVG (7 Cols) */}
      <div className="lg:col-span-7 flex justify-center relative select-none">
        <svg
          viewBox="0 0 400 400"
          className="w-full max-w-[380px] h-auto stroke-text-muted fill-none text-text-muted"
        >
          {/* Bounding box */}
          <rect x="20" y="20" width="360" height="360" rx="4" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="opacity-10" />
          
          {/* Printer Outline */}
          <rect
            x="50"
            y="60"
            width="300"
            height="300"
            rx="6"
            stroke="currentColor"
            strokeWidth="1.5"
            className={cn("transition-colors duration-300", selectedPartId === 'power' && "stroke-brand-primary")}
          />
          
          <rect x="65" y="100" width="270" height="210" rx="3" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="opacity-20" />

          {/* Gantry Y-axis */}
          <line x1="60" y1="120" x2="340" y2="120" stroke="currentColor" strokeWidth="2" className={cn("transition-colors duration-300", selectedPartId === 'y-axis' && "stroke-brand-primary")} />
          
          {/* Gantry X-axis */}
          <line x1="120" y1="120" x2="280" y2="120" stroke="currentColor" strokeWidth="3" className={cn("transition-colors duration-300", selectedPartId === 'x-axis' && "stroke-brand-primary")} />

          {/* Z-axis Screws */}
          <line x1="85" y1="100" x2="85" y2="310" stroke="currentColor" strokeWidth="2.5" className={cn("transition-colors duration-300", selectedPartId === 'z-axis' && "stroke-brand-primary")} />
          <line x1="315" y1="100" x2="315" y2="310" stroke="currentColor" strokeWidth="2.5" className={cn("transition-colors duration-300", selectedPartId === 'z-axis' && "stroke-brand-primary")} />

          {/* Toolhead Extruder */}
          <rect
            x="175"
            y="135"
            width="50"
            height="40"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
            className={cn("transition-colors duration-300", selectedPartId === 'extruder' && "stroke-brand-primary")}
          />
          <path d="M185,175 L187,180 L191,180 L193,175" stroke="currentColor" strokeWidth="1.5" className={cn("transition-colors", selectedPartId === 'extruder' && "stroke-brand-primary")} />
          <path d="M207,175 L209,180 L213,180 L215,175" stroke="currentColor" strokeWidth="1.5" className={cn("transition-colors", selectedPartId === 'extruder' && "stroke-brand-primary")} />

          {/* Cooling fan */}
          <circle cx="160" cy="155" r="10" stroke="currentColor" strokeWidth="1" className={cn("transition-colors", selectedPartId === 'cooling' && "stroke-brand-primary")} />
          <line x1="160" y1="145" x2="160" y2="165" stroke="currentColor" strokeWidth="1" className={cn("transition-colors", selectedPartId === 'cooling' && "stroke-brand-primary")} />
          <line x1="150" y1="155" x2="170" y2="155" stroke="currentColor" strokeWidth="1" className={cn("transition-colors", selectedPartId === 'cooling' && "stroke-brand-primary")} />

          {/* Build Bed */}
          <polygon
            points="95,220 305,220 285,240 115,240"
            stroke="currentColor"
            strokeWidth="2"
            className={cn("transition-colors duration-300", selectedPartId === 'build-plate' && "stroke-brand-primary")}
          />
          <path d="M130,227 L270,227" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className="opacity-20" />
          <path d="M135,233 L265,233" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className="opacity-20" />

          {/* Power Power supply */}
          <rect
            x="70"
            y="320"
            width="260"
            height="30"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
            className={cn("transition-colors duration-300", selectedPartId === 'power' && "stroke-brand-primary")}
          />
          <circle cx="95" cy="335" r="5" stroke="currentColor" strokeWidth="1" className={cn("transition-colors", selectedPartId === 'power' && "stroke-brand-primary")} />
          <circle cx="110" cy="335" r="5" stroke="currentColor" strokeWidth="1" className={cn("transition-colors", selectedPartId === 'power' && "stroke-brand-primary")} />

          {/* Interactive clickable nodes */}
          {DIAGRAM_PARTS.map((part) => {
            const isSelected = part.id === selectedPartId;
            return (
              <g key={part.id} className="cursor-pointer" onClick={() => setSelectedPartId(part.id)}>
                {isSelected && (
                  <circle
                    cx={part.cx}
                    cy={part.cy}
                    r="10"
                    fill="none"
                    stroke="#EA580C"
                    strokeWidth="1.5"
                    className="animate-ping origin-center"
                    style={{ transformOrigin: `${part.cx}px ${part.cy}px` }}
                  />
                )}
                <circle
                  cx={part.cx}
                  cy={part.cy}
                  r="5"
                  fill="#0A0A0A"
                  stroke={isSelected ? "#F97316" : "#EA580C"}
                  strokeWidth="2"
                  className="hover:fill-brand-primary transition-colors duration-200"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Content panel */}
      <div className="lg:col-span-5 h-[340px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPart.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-full justify-between"
          >
            <div>
              <div className="text-[10px] font-sans font-bold tracking-wider text-brand-primary uppercase mb-1.5">
                // PLATFORM MODULE: {currentPart.id.toUpperCase()}
              </div>

              <h3 className="font-outfit text-lg font-bold text-text-primary mb-3">
                {currentPart.name}
              </h3>

              <p className="text-text-secondary text-xs leading-relaxed mb-6">
                {currentPart.description}
              </p>

              <div className="space-y-2 border-t border-border-primary/60 pt-4">
                <span className="text-[10px] font-sans text-text-muted uppercase tracking-wider block mb-1">
                  Mechanical Specs:
                </span>
                {currentPart.specs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                    <span className="text-brand-primary font-bold mt-0.5">•</span>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selector footer */}
            <div className="flex gap-1.5 flex-wrap border-t border-border-primary/60 pt-4 mt-4">
              {DIAGRAM_PARTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPartId(p.id)}
                  className={cn(
                    "px-2 py-1 text-[9px] font-outfit font-semibold tracking-wider uppercase border rounded transition-all duration-200 cursor-pointer",
                    p.id === selectedPartId
                      ? "bg-brand-primary/10 border-brand-primary text-brand-primary shadow-orange-glow"
                      : "border-border-primary text-text-muted hover:border-text-secondary hover:text-text-primary"
                  )}
                >
                  {p.id}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveDiagram;
