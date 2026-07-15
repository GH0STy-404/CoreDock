export interface Download {
  id: string;
  name: string;
  category: 'Brochure' | 'Datasheet' | 'Manual' | 'Firmware' | 'Slicer Profile' | 'CAD Model';
  fileSize: string;
  version: string;
  releaseDate: string;
  fileUrl: string;
  printerIds: string[]; // Printers that this download applies to
  description?: string;
}
