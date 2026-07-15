export interface MaterialProperty {
  label: string;
  value: number; // Scale of 1-10 for rating
  displayValue: string;
}

export interface Material {
  id: string;
  name: string;
  category: 'Standard' | 'Engineering' | 'High-Performance';
  nozzleTemp: string;
  bedTemp: string;
  chamberRequirement: string;
  tensileStrength: MaterialProperty;
  flexibility: MaterialProperty;
  impactResistance: MaterialProperty;
  thermalProperties: MaterialProperty;
  applications: string[];
  description: string;
  colorHexList: string[];
}
