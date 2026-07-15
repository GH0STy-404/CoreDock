import { Printer } from '../types/printer';
import { PRINTERS_DATA } from '../data/printers';

/**
 * Service to fetch all printer models in the catalog.
 * In the future, this can easily hook into a Headless CMS (Strapi, Supabase, etc.)
 */
export const getPrinters = async (): Promise<Printer[]> => {
  // Simulate network latency if needed, or return static data directly
  return [...PRINTERS_DATA];
};

/**
 * Service to fetch a single printer model by its unique ID.
 */
export const getPrinterById = async (id: string): Promise<Printer | null> => {
  const printer = PRINTERS_DATA.find((p) => p.id.toLowerCase() === id.toLowerCase());
  return printer ? { ...printer } : null;
};
