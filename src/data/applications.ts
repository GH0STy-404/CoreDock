import { Application } from '../types/application';

export const APPLICATIONS_DATA: Application[] = [
  {
    id: 'automotive-manifold',
    title: 'Custom Intake Manifold',
    industry: 'Automotive',
    description: 'Direct tooling replacement for race gantry intake systems. The part requires high heat deflection and resistance to fuel residues under vacuum cycles.',
    partDetails: {
      materialUsed: 'PA-CF (Carbon Fiber Reinforced Nylon)',
      printerUsed: 'Haxx0rCore HX-500',
      dimensions: '420 × 210 × 180 mm',
      strengthRating: 'Extreme rigidity'
    },
    metrics: {
      leadTimeReduction: '85% (from 4 weeks to 3 days)',
      costReduction: '78% savings compared to CNC aluminum tooling',
      weightSavings: '40% lighter than standard aluminum manifolds'
    },
    image: '/images/applications/automotive.jpeg',
    keyChallenge: 'Standard manifolds are heavy and require weeks of CNC machining time. Composites must withstand motor bay heat exceeding 140°C.',
    solutionOutcome: 'Printed in under 48 hours using carbon-fiber nylon on the HX-500. Handled 3 bar pressure tests and operated continuously on prototype engines.'
  },
  {
    id: 'drone-airframe',
    title: 'Aero Structural Quad-Frame',
    industry: 'Aerospace',
    description: 'High-rigidity drone fuselage with integrated internal wiring channels, fabricated as a single part to eliminate assembly tolerances.',
    partDetails: {
      materialUsed: 'PC (Polycarbonate)',
      printerUsed: 'Haxx0rCore HX-300',
      dimensions: '280 × 280 × 80 mm',
      strengthRating: 'High impact resilience'
    },
    metrics: {
      leadTimeReduction: '90% reduction in prototype iterations',
      costReduction: '65% tooling cost reduction',
      weightSavings: '25% weight reduction via hollow infill lattices'
    },
    image: '/images/applications/aerospace.jpeg',
    keyChallenge: 'Traditional molding requires complex multi-part assemblies, adding failure points and deadweight to aero frames.',
    solutionOutcome: 'Single-piece polycarbonate print featuring custom gyroid infills, providing crash-resistance and housing internal wiring without structural compromise.'
  },
  {
    id: 'robotic-gripper',
    title: 'Soft-Touch Industrial Gripper',
    industry: 'Robotics',
    description: 'Custom soft robotic actuator fingers with integrated air routing channels, designed for sorting sensitive fruits and electronics on conveyor belts.',
    partDetails: {
      materialUsed: 'TPU (Flexible Elastomer)',
      printerUsed: 'Haxx0rCore HX-300',
      dimensions: '140 × 60 × 40 mm',
      strengthRating: 'Highly flexible (95A Shore)'
    },
    metrics: {
      leadTimeReduction: '80% faster deployment',
      costReduction: '70% cost savings per gripper head',
      weightSavings: '50% lighter than pneumatic metal linkages'
    },
    image: '/images/applications/robotics.jpeg',
    keyChallenge: 'Silicone casting requires multiple molding steps, curing ovens, and exhibits joint delamination under cyclic inflation.',
    solutionOutcome: 'Extruded with 0.15mm layer seals. The TPU air channels are 100% airtight out of the machine and survive 500,000 actuation cycles.'
  },
  {
    id: 'medical-implant-model',
    title: 'High-Temp Orthopedic Implant Model',
    industry: 'Medical',
    description: 'Patient-specific bone reconstruction model used for custom surgical implant fitting. The model must be sterilizable via autoclave prior to surgery room entrance.',
    partDetails: {
      materialUsed: 'PEEK (Polyether Ether Ketone)',
      printerUsed: 'Haxx0rCore HX-500',
      dimensions: '180 × 120 × 95 mm',
      strengthRating: 'Biocompatible grade equivalent'
    },
    metrics: {
      leadTimeReduction: '93% lead time reduction',
      costReduction: '50% lower medical tool cost',
      weightSavings: 'Identical density profiles to natural bone'
    },
    image: '/images/applications/medical.jpeg',
    keyChallenge: 'Standard print filaments warp and melt under 121°C steam autoclave sterilization, rendering surgical fits useless.',
    solutionOutcome: 'Printed in biocompatible-capable PEEK under active heated chamber control on the HX-500. Fully autoclavable with zero dimensional warping.'
  },
  {
    id: 'industrial-gear-set',
    title: 'Self-Lubricating Transmission Gear',
    industry: 'Engineering',
    description: 'High-performance spur gears for textile conveyor lines. Low friction coefficient reduces noise levels and oil requirements.',
    partDetails: {
      materialUsed: 'Nylon (Polyamide)',
      printerUsed: 'Haxx0rCore HX-300',
      dimensions: '190 × 190 × 45 mm',
      strengthRating: 'High wear resistance'
    },
    metrics: {
      leadTimeReduction: '95% reduction in machinery downtime',
      costReduction: '88% cost savings compared to bronze gears',
      weightSavings: '80% lighter than brass equivalents'
    },
    image: '/images/applications/gear.jpeg',
    keyChallenge: 'Replacement parts from OEMs take weeks to arrive, halting manufacturing plants and causing high revenue losses.',
    solutionOutcome: 'Printed in self-lubricating Nylon. Mounted directly on the conveyor drive within 24 hours, restoring operations with equal runtime lifecycle.'
  }
];
