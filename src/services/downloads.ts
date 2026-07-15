import { Download } from '../types/download';

const DOWNLOADS_REGISTRY: Download[] = [
  {
    id: 'apex300-brochure',
    name: 'Apex-300 Technical Brochure',
    category: 'Brochure',
    fileSize: '4.8 MB',
    version: '2026.1',
    releaseDate: '2026-01-15',
    fileUrl: '/downloads/brochures/apex-300-brochure.pdf',
    printerIds: ['apex-300'],
    description: 'Detailed mechanical specs, footprint clearances, and utility guidelines for lab deployments.'
  },
  {
    id: 'apex300-manual',
    name: 'Apex-300 Operator Instruction Manual',
    category: 'Manual',
    fileSize: '12.4 MB',
    version: 'v2.4.2',
    releaseDate: '2026-03-10',
    fileUrl: '/downloads/manuals/apex-300-operators-guide.pdf',
    printerIds: ['apex-300'],
    description: 'Comprehensive installation guide, calibration protocols, and maintenance schedules.'
  },
  {
    id: 'apex300-step',
    name: 'Apex-300 Gantry Assembly CAD (STEP)',
    category: 'CAD Model',
    fileSize: '34.2 MB',
    version: 'Rev_C',
    releaseDate: '2025-11-20',
    fileUrl: '/downloads/cad/apex-300-envelope-assembly.stp',
    printerIds: ['apex-300'],
    description: 'Standard STEP file representing mechanical envelope clearances for integration planning.'
  },
  {
    id: 'apex300-slicer',
    name: 'VoxelSlicer Pro Profiles - Apex-300',
    category: 'Slicer Profile',
    fileSize: '1.2 MB',
    version: 'v4.1.0',
    releaseDate: '2026-05-02',
    fileUrl: '/downloads/profiles/apex300-slicer-bundle.zip',
    printerIds: ['apex-300'],
    description: 'Optimized slicing presets for PLA, ABS, Nylon-CF, and TPU, tuned for accuracy.'
  },
  {
    id: 'apex500-brochure',
    name: 'Apex-500 Enterprise Systems Brochure',
    category: 'Brochure',
    fileSize: '6.2 MB',
    version: '2026.1',
    releaseDate: '2026-02-01',
    fileUrl: '/downloads/brochures/apex-500-industrial-brochure.pdf',
    printerIds: ['apex-500'],
    description: 'B2B overview of production capacities, liquid-cooling modules, and ROI analytics.'
  },
  {
    id: 'apex500-manual',
    name: 'Apex-500 Industrial Operations Guide',
    category: 'Manual',
    fileSize: '18.7 MB',
    version: 'v3.1.0',
    releaseDate: '2026-04-18',
    fileUrl: '/downloads/manuals/apex-500-industrial-manual.pdf',
    printerIds: ['apex-500'],
    description: 'High-temperature safety, industrial 3-phase hookup guidelines, and liquid-chiller maintenance.'
  },
  {
    id: 'apex500-step',
    name: 'Apex-500 CAD Enclosure Layout (STEP)',
    category: 'CAD Model',
    fileSize: '58.1 MB',
    version: 'Rev_E',
    releaseDate: '2026-01-10',
    fileUrl: '/downloads/cad/apex-500-gantry-chassis.stp',
    printerIds: ['apex-500'],
    description: 'Standard STEP files for facility layouts, active exhaust ventilation ports, and plumbing runs.'
  },
  {
    id: 'apex500-firmware',
    name: 'Apex-500 CoreMotion Firmware v4.8.2',
    category: 'Firmware',
    fileSize: '8.4 MB',
    version: 'v4.8.2',
    releaseDate: '2026-06-25',
    fileUrl: '/downloads/firmware/apex500-motion-core-v482.bin',
    printerIds: ['apex-500'],
    description: 'Enables active vibration compensation, input shaping, and improved AI monitoring loops.'
  },
  {
    id: 'apex500-slicer',
    name: 'VoxelSlicer Pro Profiles - Apex-500 IDEX',
    category: 'Slicer Profile',
    fileSize: '1.5 MB',
    version: 'v4.1.2',
    releaseDate: '2026-05-18',
    fileUrl: '/downloads/profiles/apex500-slicer-bundle.zip',
    printerIds: ['apex-500'],
    description: 'Dual-extruder support offsets, soluble support interface parameters, and PEEK prints profiles.'
  }
];

export const getDownloads = async (): Promise<Download[]> => {
  return [...DOWNLOADS_REGISTRY];
};

export const getDownloadsForPrinter = async (printerId: string): Promise<Download[]> => {
  return DOWNLOADS_REGISTRY.filter((d) => d.printerIds.includes(printerId));
};

export const searchDownloads = async (query: string): Promise<Download[]> => {
  if (!query) return [...DOWNLOADS_REGISTRY];
  const q = query.toLowerCase();
  return DOWNLOADS_REGISTRY.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      (d.description && d.description.toLowerCase().includes(q))
  );
};
