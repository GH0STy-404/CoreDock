export interface PrinterSpec {
  buildVolume: string;
  layerResolution: string;
  positioningAccuracy: string;
  maxNozzleTemp: string;
  maxBedTemp: string;
  maxChamberTemp: string;
  printSpeed: string;
  motionSystem: string;
  supportedMaterials: string[];
  connectivity: string;
  powerRequirements: string;
}

export interface ConfiguratorOption {
  id: string;
  name: string;
  priceModifier: number;
  description?: string;
}

export interface ConfiguratorCategory {
  id: string;
  name: string;
  options: ConfiguratorOption[];
}

export interface Printer {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  detailsImage?: string;
  specs: PrinterSpec;
  basePrice: number;
  features: string[];
  certificationIds: string[];
  configurator: ConfiguratorCategory[];
  downloads: string[]; // Download IDs
}
