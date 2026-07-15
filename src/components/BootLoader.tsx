import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BOOT_SEQUENCE, loaderContainerVariants } from '../animations/loader';
import { BRAND_CONFIG } from '../config/brand';

interface BootLoaderProps {
  onComplete: () => void;
}

export const BootLoader: React.FC<BootLoaderProps> = ({ onComplete }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (activeStep < BOOT_SEQUENCE.length) {
      const step = BOOT_SEQUENCE[activeStep];
      const timer = setTimeout(() => {
        const timestamp = new Date().toISOString().slice(11, 19);
        setBootLogs((prev) => [...prev, `[${timestamp}] ${step.label}`]);
        setActiveStep((prev) => prev + 1);
        setProgress(((activeStep + 1) / BOOT_SEQUENCE.length) * 100);
      }, step.duration);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(finishTimer);
    }
  }, [activeStep, onComplete]);

  return (
    <motion.div
      variants={loaderContainerVariants}
      initial="hidden"
      exit="visible"
      className="fixed inset-0 bg-[#090909] z-50 flex flex-col justify-center items-center font-mono text-xs text-brand-primary p-6 selection:bg-brand-primary/20 selection:text-white"
    >
      <div className="absolute inset-0 bg-telemetry-nodes opacity-5 pointer-events-none"></div>
      
      {/* Precision CAD bounding box around the terminal loader */}
      <div className="w-full max-w-lg border border-border-primary rounded bg-black/60 p-6 shadow-blue-glow flex flex-col relative h-[360px] overflow-hidden">
        
        {/* Terminal Header */}
        <div className="flex justify-between items-center border-b border-border-primary pb-3 mb-4 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
            <span className="font-orbitron font-semibold uppercase tracking-wider text-[10px] text-text-primary">
              System Initialization Diagnostic
            </span>
          </div>
          <span className="text-[10px] text-text-muted">
            HAXX0R_SYS_v4.2
          </span>
        </div>

        {/* Console Log Stream */}
        <div className="flex-grow space-y-2 overflow-y-auto mb-4 scrollbar-thin text-text-secondary select-text">
          {bootLogs.map((log, idx) => (
            <div key={idx} className="leading-relaxed">
              <span className="text-brand-accent">&gt;</span> {log}
            </div>
          ))}
          {activeStep < BOOT_SEQUENCE.length && (
            <div className="flex items-center gap-1.5 text-brand-primary animate-pulse">
              <span>&gt;</span>
              <span>Running calibrations...</span>
              <span className="w-1.5 h-3 bg-brand-primary"></span>
            </div>
          )}
        </div>

        {/* Progress Bar & Telemetry */}
        <div className="mt-auto border-t border-border-primary pt-4">
          <div className="flex justify-between text-[10px] text-text-secondary mb-1">
            <span>CALIBRATION PERCENTAGE</span>
            <span>{Math.round(progress)}%</span>
          </div>
          
          <div className="h-1.5 w-full bg-border-primary/40 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
              className="h-full bg-brand-primary shadow-[0_0_8px_rgba(0,191,255,0.7)]"
            />
          </div>

          <div className="flex justify-between text-[9px] text-text-muted mt-2">
            <span>CORE: ONLINE</span>
            <span>HOST: {BRAND_CONFIG.companyName.toUpperCase()}_HX_GANTRY</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BootLoader;
