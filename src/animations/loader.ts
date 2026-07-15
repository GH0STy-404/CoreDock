export const BOOT_SEQUENCE = [
  { id: 'init', label: 'Initializing Manufacturing Telemetry...', duration: 600 },
  { id: 'core', label: 'Loading Haxx0rCore HX Kernel v4.2.8...', duration: 700 },
  { id: 'axis', label: 'Calibrating High-Performance CoreXY Gantry...', duration: 900 },
  { id: 'temp', label: 'Verifying Extruder & Heated Chamber Loops...', duration: 500 },
  { id: 'optics', label: 'Calibrating AI Optical Failure Telemetry...', duration: 600 },
  { id: 'mount', label: 'Mounting Dynamic CAD Portal Canvas...', duration: 400 }
];

export const loaderContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      duration: 0.5,
      ease: 'easeInOut'
    }
  }
};
