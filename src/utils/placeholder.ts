/**
 * Returns a custom SVG vector component representing a CAD schematic of the product part.
 * Highly aligned with the NVIDIA/Tesla premium engineering aesthetic.
 */
export const getPartSvg = (partId: string): string => {
  let svgContent = '';

  switch (partId) {
    case 'automotive-manifold':
      // Intake Manifold shape: chamber with runner pipes
      svgContent = `
        <rect x="30" y="25" width="140" height="20" rx="3" fill="none" stroke="#00BFFF" stroke-width="1.5" />
        <path d="M45,45 C45,65 55,80 75,80 L125,80 C145,80 155,65 155,45" stroke="#00BFFF" stroke-width="1.5" />
        <line x1="60" y1="45" x2="60" y2="80" stroke="#00F5FF" stroke-width="1.2" />
        <line x1="90" y1="45" x2="90" y2="80" stroke="#00F5FF" stroke-width="1.2" />
        <line x1="110" y1="45" x2="110" y2="80" stroke="#00F5FF" stroke-width="1.2" />
        <line x1="140" y1="45" x2="140" y2="80" stroke="#00F5FF" stroke-width="1.2" />
        <circle cx="100" cy="35" r="3" fill="#00F5FF" />
      `;
      break;

    case 'drone-airframe':
      // Quadcopter X frame
      svgContent = `
        <line x1="30" y1="20" x2="170" y2="80" stroke="#00BFFF" stroke-width="2" />
        <line x1="30" y1="80" x2="170" y2="20" stroke="#00BFFF" stroke-width="2" />
        <circle cx="100" cy="50" r="14" stroke="#00F5FF" stroke-width="1.5" />
        <rect x="94" y="44" width="12" height="12" stroke="#00F5FF" stroke-width="1" />
        {/* Motors at edges */}
        <circle cx="30" cy="20" r="6" stroke="#00F5FF" stroke-width="1" />
        <circle cx="170" cy="80" r="6" stroke="#00F5FF" stroke-width="1" />
        <circle cx="30" cy="80" r="6" stroke="#00F5FF" stroke-width="1" />
        <circle cx="170" cy="20" r="6" stroke="#00F5FF" stroke-width="1" />
      `;
      break;

    case 'robotic-gripper':
      // Gripper fingers
      svgContent = `
        <rect x="75" y="65" width="50" height="20" rx="2" stroke="#00BFFF" stroke-width="1.5" />
        <path d="M85,65 C85,45 70,30 70,15 L60,15" stroke="#00F5FF" stroke-width="1.5" />
        <path d="M115,65 C115,45 130,30 130,15 L140,15" stroke="#00F5FF" stroke-width="1.5" />
        <line x1="100" y1="65" x2="100" y2="40" stroke="#00BFFF" stroke-width="1" stroke-dasharray="3 3" />
        <circle cx="100" cy="75" r="4" fill="#00F5FF" />
      `;
      break;

    case 'medical-implant-model':
      // Bone structure outline
      svgContent = `
        <path d="M80,15 C90,10 110,10 120,15 C120,30 110,35 110,50 L110,75 C110,85 120,90 120,95 C110,100 90,100 80,95 C80,90 90,85 90,75 L90,50 C90,35 80,30 80,15 Z" stroke="#00BFFF" stroke-width="1.5" />
        <line x1="100" y1="20" x2="100" y2="80" stroke="#00F5FF" stroke-width="1" stroke-dasharray="4 4" className="opacity-40" />
      `;
      break;

    case 'industrial-gear-set':
    default:
      // Mesh spur gears
      svgContent = `
        {/* Large gear */}
        <circle cx="80" cy="50" r="30" stroke="#00BFFF" stroke-width="2" />
        <circle cx="80" cy="50" r="8" stroke="#00BFFF" stroke-width="1.2" />
        {/* Teeth segments */}
        <path d="M80,15 L80,20 M80,80 L80,85 M45,50 L50,50 M110,50 L115,50 M55,25 L59,29 M101,71 L105,75 M55,75 L59,71 M101,29 L105,25" stroke="#00BFFF" stroke-width="1.5" />
        {/* Smaller gear meshed */}
        <circle cx="135" cy="50" r="18" stroke="#00F5FF" stroke-width="1.5" />
        <circle cx="135" cy="50" r="5" stroke="#00F5FF" stroke-width="1" />
        <path d="M135,28 L135,32 M135,68 L135,72 M117,50 L121,50 M149,50 L153,50" stroke="#00F5FF" stroke-width="1.2" />
      `;
      break;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" width="100%" height="100%" class="stroke-current fill-none">
    {/* Grid coordinates backdrop */}
    <line x1="0" y1="50" x2="200" y2="50" stroke="rgba(255,255,255,0.03)" stroke-width="0.5" />
    <line x1="100" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.03)" stroke-width="0.5" />
    ${svgContent}
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};
