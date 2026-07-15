import { PRINTERS_DATA } from '../data/printers';
import { MATERIALS_DATA } from '../data/materials';
import { APPLICATIONS_DATA } from '../data/applications';

export interface SearchResultItem {
  id: string;
  type: 'printer' | 'material' | 'application' | 'download';
  title: string;
  subtitle: string;
  url: string;
  details?: string;
}

export const searchSite = async (query: string): Promise<SearchResultItem[]> => {
  if (!query || query.trim() === '') return [];
  
  const q = query.toLowerCase().trim();
  const results: SearchResultItem[] = [];

  // 1. Search printers
  PRINTERS_DATA.forEach((printer) => {
    if (
      printer.name.toLowerCase().includes(q) ||
      printer.tagline.toLowerCase().includes(q) ||
      printer.description.toLowerCase().includes(q) ||
      printer.features.some((f) => f.toLowerCase().includes(q))
    ) {
      results.push({
        id: printer.id,
        type: 'printer',
        title: printer.name,
        subtitle: printer.tagline,
        url: `/printers/${printer.id}`,
        details: printer.description
      });
    }
  });

  // 2. Search materials
  MATERIALS_DATA.forEach((material) => {
    if (
      material.name.toLowerCase().includes(q) ||
      material.description.toLowerCase().includes(q) ||
      material.applications.some((a) => a.toLowerCase().includes(q))
    ) {
      results.push({
        id: material.id,
        type: 'material',
        title: material.name,
        subtitle: `${material.category} Material`,
        url: `/materials`,
        details: material.description
      });
    }
  });

  // 3. Search applications
  APPLICATIONS_DATA.forEach((app) => {
    if (
      app.title.toLowerCase().includes(q) ||
      app.description.toLowerCase().includes(q) ||
      app.industry.toLowerCase().includes(q) ||
      app.partDetails.materialUsed.toLowerCase().includes(q)
    ) {
      results.push({
        id: app.id,
        type: 'application',
        title: app.title,
        subtitle: `${app.industry} - ${app.partDetails.materialUsed}`,
        url: `/applications`,
        details: app.description
      });
    }
  });



  return results.slice(0, 10); // Return top 10 matches
};
