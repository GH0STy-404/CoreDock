import { Printer } from '../types/printer';
import printer1Img from '../../3d1.jpeg';
import printer2Img from '../../3d2.jpeg';

export const PRINTERS_DATA: Printer[] = [
  {
    id: 'apex-300',
    name: 'Apex-300 Industrial Platform',
    tagline: 'High-Precision Additive Gantry System',
    description: 'A completed industrial-grade prototyping platform. The Apex-300 delivers exceptional reliability, high dimensional stability, and supporting engineering composites warp-free.',
    image: printer1Img,
    detailsImage: printer2Img,
    basePrice: 14500,
    features: [
      'High-stability carbon-fiber reinforced gantry',
      'Dual Direct Drive Extruder (Up to 350°C)',
      'Precision Heated Bed (Up to 120°C)',
      'Sub-0.05mm positioning accuracy',
      'Integrated active carbon air-filtration system'
    ],
    certificationIds: ['iso9001', 'ce', 'rohs'],
    downloads: ['apex300-brochure', 'apex300-manual', 'apex300-step', 'apex300-slicer'],
    specs: {
      buildVolume: '300 × 300 × 300 mm',
      layerResolution: '50 - 300 microns',
      positioningAccuracy: 'X/Y: 10µm, Z: 2.5µm',
      maxNozzleTemp: '350°C',
      maxBedTemp: '120°C',
      maxChamberTemp: 'Passive Insulated (Up to 55°C)',
      printSpeed: 'Up to 300 mm/s',
      motionSystem: 'CoreXY with Linear Guide Rails',
      supportedMaterials: ['PLA', 'ABS', 'PETG', 'ASA', 'Nylon', 'Carbon Fiber', 'TPU', 'PC'],
      connectivity: 'Ethernet, Wi-Fi, USB, Off-grid local access',
      powerRequirements: '100-240V AC, 50/60Hz, Max 800W'
    },
    // Empty configurator list, since customization is disabled
    configurator: []
  }
];
