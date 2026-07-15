import fs from 'fs';
import path from 'path';

// Define folders
const folders = [
  'public/images/printers',
  'public/images/logos',
  'public/images/applications',
  'public/images/gallery',
  'public/downloads/brochures',
  'public/downloads/cad',
];

// Create folders recursively if they don't exist
folders.forEach(folder => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
    console.log(`Created directory: ${folder}`);
  }
});

// Assets to copy from root
const copyJobs = [
  { src: '3d1.jpeg', dest: 'public/images/printers/3d1.jpeg' },
  { src: '3d2.jpeg', dest: 'public/images/printers/3d2.jpeg' },
  { src: '3dl1.jpeg', dest: 'public/images/logos/3dl1.jpeg' },
  { src: '3dl2.jpeg', dest: 'public/images/logos/3dl2.jpeg' },
];

copyJobs.forEach(job => {
  if (fs.existsSync(job.src)) {
    fs.copyFileSync(job.src, job.dest);
    console.log(`Moved asset: ${job.src} -> ${job.dest}`);
  } else {
    console.warn(`Asset not found in root: ${job.src}`);
  }
});

console.log('Asset organization complete.');
